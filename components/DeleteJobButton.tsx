"use client";
import { useRouter } from "next/navigation";
import { supabase } from '@/src/lib/supabase/client';

export default function DeleteJobButton({ jobId }: { jobId: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this job?")) return;

    const { error } = await supabase
      .from("jobs")
      .delete()
      .eq("id", jobId);

    if (error) {
      alert("Error deleting job: " + error.message);
    } else {
      router.refresh();
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
    >
      Delete Job
    </button>
  );
}
