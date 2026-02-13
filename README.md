# SmartMarks - Your Real-Time Digital Brain 🧠

SmartMarks is a modern, high-performance bookmarking application built to help you organize your digital life with instant, real-time synchronization across all your devices.

**Live URL:** [Insert your Vercel URL here]

## 🚀 Features

- **Google OAuth**: Fast and secure login without passwords.
- **Instant Real-Time Sync**: Add a bookmark in one tab, see it appear in another instantly without refresh.
- **Privacy First**: Robust Row Level Security (RLS) ensures your bookmarks are only visible to you.
- **Clean UI**: Minimalist design with loading skeletons and smart favicons.
- **One-Click Deletion**: Easily manage your collection.

## 🛠 Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Backend**: [Supabase](https://supabase.com/) (Auth, Database, Realtime)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Components**: [Shadcn UI](https://ui.shadcn.com/)

---

## 🧠 Challenges & Solutions

Building a real-time application in a serverless environment presented several interesting technical hurdles. Here is how I solved them:

### 1. The "Silent" Realtime Failure (RLS)

**The Problem:** Initially, the database was updated, but the UI wouldn't sync in real-time. The connection was successful, but no events were being received.
**The Solution:** I discovered that Supabase Realtime requires a `SELECT` policy to broadcast changes over the `postgres_changes` channel. Even if a user can `INSERT`, they can't "subscribe" to updates without permission to `SELECT` those rows. I implemented a robust RLS policy ensuring only owner-authenticated users could select/subscribe to their specific `user_id`.

### 2. Connection Stability & Timeout Loops

**The Problem:** During development, I noticed the browser console was flooded with `CLOSED` and `TIMED_OUT` statuses. The subscription was re-creating itself too frequently.
**The Solution:** This was caused by the Supabase client being instantiated inside the React render cycle. I refactored the client implementation to use a **stable component-level singleton** (wrapping the client in `useState`) and implemented unique channel names for every mount. This prevented socket collision and stabilized the connection.

### 3. Cleaning the Console (Favicon 404s)

**The Problem:** Many websites don't provide a valid favicon for every sub-page, causing Google's favicon service to return a 404, which pollutes the browser console.
**The Solution:** I built a custom `<Favicon />` component using `next/image`. It listens for load errors and gracefully swaps the broken image for a beautiful fallback Globe SVG using React state, rather than just hiding it.

### 4. Reliable Loading States

**The Problem:** Using manual `useState(loading)` in forms can sometimes desync if the server action completes but the transition hasn't finished.
**The Solution:** I utilized the modern `useFormStatus` hook from React. By extracting the submit button into a sub-component, I let React manage the transition state natively, ensuring the "Adding..." spinner is 100% accurate to the background operation.

---

## 🔧 Setup & Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Pawandasila/bookmark.git
   cd bookmark
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env.local` file and add your Supabase credentials:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

4. **Database Setup:**
   Run these SQL commands in your Supabase SQL Editor:

   ```sql
   create table bookmarks (
     id uuid default gen_random_uuid() primary key,
     created_at timestamptz default now(),
     title text not null,
     url text not null,
     user_id uuid references auth.users not null
   );

   alter table bookmarks enable row level security;

   create policy "Users can manage their own bookmarks"
     on bookmarks for all
     to authenticated
     using (auth.uid() = user_id);

   alter publication supabase_realtime add table bookmarks;
   ```

5. **Run locally:**
   ```bash
   npm run dev
   ```

---

## 📝 License

MIT
