import { createClient } from "@/src/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

export default async function Dashboard({
                                          searchParams,
                                        }: {
  searchParams?: {
    location?: string;
    job_type?: string;
    title?: string;
    company_name?: string;
  };

}) {
  const supabase = createClient();
  const params = await searchParams;
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  let query = supabase
    .from("jobs")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (params?.title) {
    query = query.ilike("title", `%${params.title}%`);
  }

  if (params?.company_name) {
    query = query.ilike("company_name", `%${params.company_name}%`);
  }

  if (params?.location) {
    query = query.ilike("location", `%${params.location}%`);
  }

  if (params?.job_type) {
    query = query.eq("job_type", params.job_type);
  }

  const { data: jobs } = await query;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Job Posts</h1>
        <div className="flex gap-2">
          <Link
            href="/dashboard/jobs/new"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Post New Job
          </Link>
          <LogoutButton />
        </div>
      </div>

      {/* Filter Controls */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Filter</h2>
        <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            className="p-2 border rounded"
            defaultValue={params?.title || ""}
          />
          <input
            type="text"
            name="company_name"
            placeholder="Company Name"
            className="p-2 border rounded"
            defaultValue={params?.company_name || ""}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            className="p-2 border rounded"
            defaultValue={params?.location || ""}
          />
          <select
            name="job_type"
            className="p-2 border rounded"
            defaultValue={params?.job_type || ""}
          >
            <option value="">All Types</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Contract">Contract</option>
          </select>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Apply
          </button>
        </form>
      </div>


      {/* Job Listings */ }
      <div className="space-y-4">
        { jobs?.length ? (
          jobs.map((job) => (
            <Link
              key={ job.id }
              href={ `/dashboard/jobs/${ job.id }` }
              className="block p-4 border rounded-lg hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold">{ job.title }</h2>
              <p className="text-gray-600">{ job.company_name }</p>
              <p className="text-gray-500">
                { job.location } • { job.job_type }
              </p>
            </Link>
          ))
        ) : (
          <p className="text-center py-8 text-gray-500">
            { params?.location || params?.job_type
              ? "No jobs match your filters"
              : "You haven't posted any jobs yet" }
          </p>
        ) }
      </div>
    </div>
  );
}
