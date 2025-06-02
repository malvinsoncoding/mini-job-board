import { supabase } from "@/src/lib/supabase/client";
import JobCard from "@/components/JobCard";
import { JobType } from "@/src/types";

export default async function JobsPage({ searchParams, }: {
  searchParams?: {
    location?: string;
    job_type?: JobType;
  };
}) {
  let query = supabase
    .from("jobs")
    .select("*")
    .order("created_at", { ascending: false });

  if (searchParams?.location) {
    query = query.ilike("location", `%${searchParams.location}%`);
  }

  if (searchParams?.job_type) {
    query = query.eq("job_type", searchParams.job_type);
  }

  const { data: jobs, error } = await query;

  if (error) {
    return <div>Error loading jobs.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Latest Job Listings</h1>

      {/* Filter Controls */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <form className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            name="location"
            placeholder="Filter by location"
            className="flex-1 p-2 border rounded"
            defaultValue={searchParams?.location || ""}
          />
          <select
            name="job_type"
            className="p-2 border rounded"
            defaultValue={searchParams?.job_type || ""}
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
            Apply Filters
          </button>
        </form>
      </div>

      {/* Job Listings */}
      <div className="space-y-4">
        {jobs?.length ? (
          jobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <p className="text-center py-8 text-gray-500">
            {searchParams?.location || searchParams?.job_type
              ? "No jobs match your filters"
              : "No jobs available yet"}
          </p>
        )}
      </div>
    </div>
  );
}
