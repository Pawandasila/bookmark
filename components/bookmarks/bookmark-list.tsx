"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Trash2, Copy, Check, RefreshCw } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState, useCallback, useRef } from "react";
import { deleteBookmark } from "@/actions/bookmarks";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  RealtimeChannel,
  RealtimePostgresChangesPayload,
} from "@supabase/supabase-js";

interface Bookmark {
  id: string;
  title: string;
  url: string;
  created_at: string;
  user_id: string;
}

interface BookmarkListProps {
  initialBookmarks: Bookmark[] | null;
  userId: string;
}

function Favicon({ url }: { url: string }) {
  const [error, setError] = useState(false);

  const getFaviconUrl = (url: string) => {
    try {
      const hostname = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${hostname}&sz=128`;
    } catch {
      return "";
    }
  };

  if (error) {
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 p-2 shadow-sm border border-slate-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-slate-400"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" x2="22" y1="12" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 p-2 shadow-sm border border-slate-100 relative">
      <Image
        src={getFaviconUrl(url)}
        alt=""
        height={24}
        width={24}
        className="object-contain"
        onError={() => setError(true)}
        unoptimized
      />
    </div>
  );
}

export function BookmarkList({ initialBookmarks, userId }: BookmarkListProps) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(
    initialBookmarks || [],
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [status, setStatus] = useState<
    "CONNECTING" | "CONNECTED" | "DISCONNECTED"
  >("DISCONNECTED");

  const [supabase] = useState(() => createClient());

  const channelRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    if (initialBookmarks) {
      setBookmarks(initialBookmarks);
    }
  }, [initialBookmarks]);

  const handleRealtimeEvent = useCallback(
    (payload: RealtimePostgresChangesPayload<Bookmark>) => {
      console.log("Realtime event:", payload);
      if (payload.eventType === "INSERT") {
        const newBookmark = payload.new as Bookmark;
        setBookmarks((current) => {
          if (current.some((b) => b.id === newBookmark.id)) return current;
          return [newBookmark, ...current];
        });
      } else if (payload.eventType === "DELETE") {
        setBookmarks(
          (current) => current.filter((b) => b.id !== payload.old.id), // payload.old is partial but includes PK usually
        );
      }
    },
    [],
  );

  useEffect(() => {
    if (!userId) return;

    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
    }

    setStatus("CONNECTING");
    console.log("Initializing Realtime connection...");

    const channelId = `realtime-bookmarks-${Date.now()}`;
    const channel = supabase
      .channel(channelId)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks",
          filter: `user_id=eq.${userId}`,
        },
        handleRealtimeEvent,
      )
      .subscribe((status: string) => {
        console.log(`[${channelId}] Connection status:`, status);
        if (status === "SUBSCRIBED") {
          setStatus("CONNECTED");
        } else if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
          setStatus("DISCONNECTED");
        }
      });

    channelRef.current = channel;

    return () => {
      console.log(`[${channelId}] Cleaning up channel...`);
      supabase.removeChannel(channel);
      channelRef.current = null;
    };
  }, [supabase, userId, handleRealtimeEvent]);

  const handleDelete = async (id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
    await deleteBookmark(id);
  };

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="mt-8">
      <div className="flex justify-end mb-4">
        <div
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${
            status === "CONNECTED"
              ? "bg-green-50 text-green-700 border-green-200"
              : status === "CONNECTING"
                ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                : "bg-red-50 text-red-700 border-red-200"
          }`}
        >
          {status === "CONNECTED" ? (
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          ) : status === "CONNECTING" ? (
            <RefreshCw className="h-3 w-3 animate-spin" />
          ) : (
            <div className="h-2 w-2 rounded-full bg-red-500" />
          )}
          {status === "CONNECTED" ? "Live Sync Active" : status}
        </div>
      </div>

      {bookmarks.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center text-slate-500 py-12">
          <div className="mb-4 rounded-full bg-slate-100 p-6 shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-slate-300"
            >
              <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
            </svg>
          </div>
          <p className="text-lg font-medium text-slate-800">
            Your collection is empty
          </p>
          <p className="text-sm">Add your first bookmark to get started.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bookmarks.map((bookmark) => (
            <Card
              key={bookmark.id}
              className="group relative overflow-hidden border-none bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/10"
            >
              <CardContent className="p-5">
                <div className="mb-4 flex items-start justify-between">
                  <Favicon url={bookmark.url} />

                  <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-400 hover:bg-slate-50 hover:text-slate-700"
                      onClick={() => handleCopy(bookmark.url, bookmark.id)}
                      title="Copy URL"
                    >
                      {copiedId === bookmark.id ? (
                        <Check size={14} className="text-green-500" />
                      ) : (
                        <Copy size={14} />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-400 hover:bg-red-50 hover:text-red-500"
                      onClick={() => handleDelete(bookmark.id)}
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>

                <h3
                  className="mb-1 font-semibold text-slate-800 truncate"
                  title={bookmark.title}
                >
                  {bookmark.title}
                </h3>

                <Link
                  href={bookmark.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-slate-500 hover:text-indigo-600 transition-colors truncate mb-3"
                >
                  <ExternalLink className="mr-1.5 h-3 w-3 shrink-0" />
                  <span className="truncate">
                    {bookmark.url.replace(/^https?:\/\//, "")}
                  </span>
                </Link>

                <div className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                  {new Date(bookmark.created_at).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
