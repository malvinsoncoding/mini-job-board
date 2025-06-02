"use client";
import { useRouter } from "next/navigation";

export default function JobCard({ job }: { job: any }) {
  const router = useRouter();

  return (
    <div
      className="p-4 border rounded hover:shadow-md cursor-pointer"
      onClick={() => router.push(`/dashboard/jobs/${job.id}`)}
    >
      <h2 className="text-xl font-semibold">{job.title}</h2>
      <p className="text-gray-600">{job.company_name}</p>
      <p className="text-gray-500">{job.location} • {job.job_type}</p>
    </div>
  );
}
