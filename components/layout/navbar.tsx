"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/actions/auth";
import { LogOut, User } from "lucide-react";

interface NavbarProps {
  userEmail?: string;
}

export function Navbar({ userEmail }: NavbarProps) {
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      await signOut();
    });
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/20 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-md transition-all">
      <div className="container mx-auto flex max-w-5xl items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800">
            SmartMarks
          </span>
        </div>

        <div className="flex items-center gap-4">
          {userEmail && (
            <div className="hidden items-center gap-2 rounded-full bg-slate-100/50 px-3 py-1.5 text-sm font-medium text-slate-600 md:flex border border-slate-200/50">
              <User size={14} className="text-slate-400" />
              <span>{userEmail}</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            disabled={isPending}
            className="text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut size={16} className="mr-2" />
            {isPending ? "Exiting..." : "Sign Out"}
          </Button>
        </div>
      </div>
    </nav>
  );
}
