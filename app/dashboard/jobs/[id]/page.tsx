import { createClient } from "@/src/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import DeleteJobButton from '@/components/DeleteJobButton';

export default async function JobDetailPage({
                                              params,
                                            }: {
  params: { id: string };
}) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: job } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!job || job.user_id !== user.id) {
    redirect("/dashboard");
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Job Details</h1>
        <Link
          href="/dashboard"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-gray-600"
        >
          Back to Dashboard
        </Link>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">{job.title}</h2>
          <p className="text-gray-600">{job.company_name}</p>
          <p className="text-gray-500">
            {job.location} • {job.job_type}
          </p>
        </div>

        <div className="prose">
          <p>{job.description}</p>
        </div>

        <div className="flex gap-2 mt-6">
          <Link
            href={`/dashboard/jobs/edit/${job.id}`}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Edit Job
          </Link>
          <DeleteJobButton jobId={job.id} />
        </div>
      </div>
    </div>
  );
}
