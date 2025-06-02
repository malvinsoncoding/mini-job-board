"use client";
import { useState } from "react";
import { supabase } from "@/src/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function NewJobPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    company_name: "",
    description: "",
    location: "",
    job_type: "Full-Time",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setError("You must be logged in to post a job.");
      return;
    }

    const { error } = await supabase.from("jobs").insert({
      ...formData,
      user_id: user.id,
    });

    if (error) {
      setError(error.message);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Post a New Job</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Job Title"
          className="w-full p-2 border rounded"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Company Name"
          className="w-full p-2 border rounded"
          value={formData.company_name}
          onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
          required
        />
        <textarea
          placeholder="Job Description"
          className="w-full p-2 border rounded min-h-[200px]"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Location"
          className="w-full p-2 border rounded"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          required
        />
        <select
          className="w-full p-2 border rounded"
          value={formData.job_type}
          onChange={(e) => setFormData({ ...formData, job_type: e.target.value })}
        >
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Contract">Contract</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Post Job
        </button>
      </form>
    </div>
  );
}
