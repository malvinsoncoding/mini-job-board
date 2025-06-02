export type JobType = "Full-Time" | "Part-Time" | "Contract";
export interface Job {
  id: string;
  title: string;
  company_name: string;
  description: string;
  location: string;
  job_type: JobType;
  created_at: string;
  user_id: string;
}
