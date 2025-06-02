import Link from "next/link";
import { createClient } from "@/src/lib/supabase/server";

export default async function PublicJobBoard({
                                               searchParams,
                                             }: {
  searchParams?: Promise<{
    title?: string;
    company_name?: string;
    location?: string;
    job_type?: string;
  }>;
}) {
  const supabase = createClient();

  const params = await searchParams;

  let query = supabase
    .from("jobs")
    .select("*")
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
    <div className="max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Job Board</h1>
        <Link
          href="/login"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </Link>
      </div>

      {/* Filter Section */}
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

      {/* Job Listings */}
      <div className="space-y-4">
        {jobs?.length ? (
          jobs.map((job) => (
            <div
              key={job.id}
              className="p-4 border rounded-lg hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="text-gray-600">{job.company_name}</p>
              <p className="text-gray-500">
                {job.location} • {job.job_type}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center py-8 text-gray-500">
            No jobs match your filters.
          </p>
        )}
      </div>
    </div>
  );
}
