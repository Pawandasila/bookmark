"use client";

import { createBookmark } from "@/actions/bookmarks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { Loader2, Plus, Globe, Type } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-500/20 transition-all font-medium md:w-auto"
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Adding...
        </>
      ) : (
        <>
          <Plus className="mr-2 h-4 w-4" />
          Add
        </>
      )}
    </Button>
  );
}

export function AddBookmark() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    try {
      await createBookmark(formData);
      formRef.current?.reset();
    } catch (error) {
      console.error("Failed to add bookmark:", error);
    }
  };

  return (
    <Card className="overflow-hidden border-none bg-white/80 shadow-xl shadow-indigo-500/5 backdrop-blur-sm">
      <CardContent className="p-6">
        <h3 className="mb-4 text-base font-semibold text-slate-700">
          Add New Bookmark
        </h3>
        <form action={handleSubmit} ref={formRef}>
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Type size={16} />
              </div>
              <Input
                id="title"
                name="title"
                placeholder="Title (e.g., Google)"
                required
                className="pl-9 border-slate-200 bg-slate-50/50 focus:bg-white focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all"
              />
            </div>
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Globe size={16} />
              </div>
              <Input
                id="url"
                name="url"
                placeholder="https://..."
                type="url"
                required
                className="pl-9 border-slate-200 bg-slate-50/50 focus:bg-white focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all"
              />
            </div>
            <SubmitButton />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
