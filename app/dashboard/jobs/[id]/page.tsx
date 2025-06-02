import { supabase } from "@/src/lib/supabase/client";

export default async function JobDetailPage({ params, }: {
  params: { id: string };
}) {
  const { data: job, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !job) {
    return <div>Job not found.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
      <p className="text-xl text-gray-600 mb-4">{job.company_name}</p>
      <p className="text-gray-500 mb-4">
        {job.location} • {job.job_type}
      </p>
      <div className="prose">
        <p>{job.description}</p>
      </div>
    </div>
  );
}
