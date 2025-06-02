This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

---

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Setup Instructions

Below are the setup instructions of developing the mini-job-board application:

### Project Setup

- npx create-next-app@latest mini-job-board --typescript --tailwind --eslint
- Choose the following options:
  - Yes for Tailwind CSS
  - Yes for ESLint
  - Yes for App Router
  - No for src/ directory
  - No for custom import aliases
  - No for Turbopack
  - No for Custom Alias
- cd mini-job-board
- npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
- push the initial project to the repository

### Supabase Setup

- Access [Supabase Dashboard](https://app.supabase.com/) and click new project
- Insert the project name, database, region
- Project settings (API Keys) to get the secret
- Project settings (Data API) to get the project URL (access the endpoint)
- create table queries:

`CREATE TABLE jobs (
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
title TEXT NOT NULL,
company_name TEXT NOT NULL,
description TEXT NOT NULL,
location TEXT NOT NULL,
job_type TEXT NOT NULL CHECK (job_type IN ('Full-Time', 'Part-Time', 'Contract')),
created_at TIMESTAMP DEFAULT NOW(),
user_id UUID REFERENCES auth.users NOT NULL
);`

`CREATE TABLE profiles (
id UUID PRIMARY KEY REFERENCES auth.users,
email TEXT NOT NULL,
full_name TEXT
);`

- Create policies for doing CRUD

- Run the development server

## Approach

- Authentication: Implemented using Supabase Auth with email/password
- Data Flow:
  - Client components handle user interactions
  - Server components fetch data
  - Middleware protects routes
- UI/UX:
  - Responsive design with Tailwind CSS
  - Form validation
  - Loading states

## Architecture Overview

The project is structured in a modular and scalable way using **Next.js App Router**, **Supabase**, and **Tailwind CSS**.

### Tech stack

- **Next.js 15 (App Router)** – Frontend framework
- **TypeScript** – Static typing
- **Tailwind CSS** – Utility-first styling
- **Supabase** – Auth and PostgreSQL database
- **Vercel** – Hosting and deployment

---

### Authentication & Authorization

- Routes like `/dashboard` are **protected** using `middleware.ts`.
- Sessions and user auth handled via **Supabase**.
- Unauthorized users are redirected to `/login`.

---

### Folder Responsibilities

**Updated Folder Responsibility Table**

| Path                             | Description                                     |
|----------------------------------|-------------------------------------------------|
| `app/`                           | Next.js App Router pages and public job listing |
| `app/login/` `app/signup/`       | Login and registration pages                    |
| `app/dashboard/`                 | User dashboard with job posting management      |
| `app/dashboard/jobs/`            | Job management features for users               |
| `app/dashboard/jobs/[id]/`       | Dynamic job detail pages                        |
| `app/dashboard/jobs/edit/[id]/`  | Dynamic job edit pages                          |
| `app/dashboard/jobs/new/`        | Create new job pages                            |
| `app/globals.css`                | Global styles for the application               |
| `components/`                    | Reusable components (buttons, modals, etc.)     |
| `components/DeleteJobButton.tsx` | Component for deleting job postings             |
| `lib/supabase/`                  | Supabase client and server instance             |
| `lib/supabase/client.ts`         | Client configuration for Supabase               |
| `middleware.ts`                  | Middleware to protect private routes            |
| `types.ts`                       | Centralized TypeScript types for consistency    |
| `next.config.js`                 | Configuration file for Next.js settings         |
| `package.json`                   | Project dependencies and scripts                |
| `README.md`                      | Documentation for project setup and usage       |

---

## Future Improvement

- Add image as a company logo
- Implement google location for filling out the location field
- Add job application tracking
- Access grant between admin and user (create new job, update, and delete must be admin)
