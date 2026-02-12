import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { AddBookmark } from "@/components/bookmarks/add-bookmark";
import { BookmarkList } from "@/components/bookmarks/bookmark-list";
import { Navbar } from "@/components/layout/navbar";

export const dynamic = "force-dynamic";

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login");
  }

  const { data: bookmarks, error: bookmarksError } = await supabase
    .from("bookmarks")
    .select("*")
    .order("created_at", { ascending: false });

  if (bookmarksError) {
    console.error("Error fetching bookmarks:", bookmarksError);
  }

  return (
    <div className="min-h-screen bg-slate-50 relative selection:bg-indigo-100 overflow-hidden">
      {/* Background Gradients */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,var(--tw-gradient-stops))] from-indigo-100/50 via-white to-blue-50/30 blur-3xl" />
      <div className="fixed bottom-0 right-0 -z-10 h-[500px] w-[500px] bg-linear-to-t from-blue-100/40 to-transparent blur-3xl rounded-full opacity-60" />

      <Navbar userEmail={user.email} />

      <main className="container mx-auto max-w-5xl px-4 py-12 relative z-10">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-3 bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Your Digital Brain
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Organize your most important links in one secure, private, and
            real-time dashboard.
          </p>
        </div>

        <div className="mb-16">
          <AddBookmark />
        </div>

        <div>
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200/60 dashed">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <span className="h-6 w-1 rounded bg-indigo-500 block"></span>
              Collection
            </h2>
            <span className="rounded-full bg-white border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">
              {bookmarks?.length || 0} Bookmarks
            </span>
          </div>
          <BookmarkList
            key={bookmarks?.map((b) => b.id).join("-")}
            initialBookmarks={bookmarks}
            userId={user.id}
          />
        </div>
      </main>
    </div>
  );
}
