import { createClient } from "@/src/lib/supabase/server";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/auth/LogoutButton";
import Link from "next/link";

export default async function Dashboard() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Job Posts</h1>
        <div className="flex gap-2">
          <Link
            href="/dashboard/jobs/new"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Post a Job
          </Link>
          <LogoutButton />
        </div>
      </div>
      <p>Welcome, {user.email}!</p>
    </div>
  );
}
