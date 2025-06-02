import { createClient } from "@/src/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function EditJobPage({
                                            params,
                                          }: {
  params: Promise<{ id: string }>;
}) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: job } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", (await params).id)
    .single();

  if (!job || job.user_id !== user.id) {
    redirect("/dashboard");
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Edit Job Posting</h1>
        <div className="flex gap-2">
          <Link
            href={`/dashboard/jobs/${job.id}`}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            View Job
          </Link>
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>

      <form action={updateJob} className="space-y-6">
        <input type="hidden" name="id" value={job.id} />

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Job Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={job.title}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="company_name" className="block text-sm font-medium text-gray-700 mb-1">
            Company Name *
          </label>
          <input
            type="text"
            id="company_name"
            name="company_name"
            defaultValue={job.company_name}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Job Description *
          </label>
          <textarea
            id="description"
            name="description"
            defaultValue={job.description}
            className="w-full p-2 border rounded min-h-[200px]"
            required
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location *
          </label>
          <input
            type="text"
            id="location"
            name="location"
            defaultValue={job.location}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="job_type" className="block text-sm font-medium text-gray-700 mb-1">
            Job Type *
          </label>
          <select
            id="job_type"
            name="job_type"
            defaultValue={job.job_type}
            className="w-full p-2 border rounded"
            required
          >
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Link
            href={`/dashboard/jobs/${job.id}`}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

async function updateJob(formData: FormData) {
  "use server";
  const supabase = createClient();
  const id = formData.get("id") as string;

  await supabase.from("jobs").update({
    title: formData.get("title"),
    company_name: formData.get("company_name"),
    description: formData.get("description"),
    location: formData.get("location"),
    job_type: formData.get("job_type"),
  }).eq("id", id);

  redirect(`/dashboard/jobs/${id}`);
}
