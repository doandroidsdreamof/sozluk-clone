import { z } from "zod";
import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(["development", "test", "production"]),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    IMAGE_SERVER: z.string(),
    PGPASSWORD: z.string(),
    PGUSER: z.string(),
    MAGIC_SECRET_KEY: z.string(),
    NEXTAUTH_SECRET:
      process.env.NODE_ENV === "production" ? z.string().min(1) : z.string(),
    NEXTAUTH_URL: z.preprocess(
      // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
      // Since NextAuth.js automatically uses the VERCEL_URL if present.
      (str) => process.env.VERCEL_URL ?? str,
      // VERCEL_URL doesn't include `https` so it cant be validated as a URL
      process.env.VERCEL ? z.string().min(1) : z.string().url()
    ),
  },

  client: {
    NEXT_PUBLIC_SUPABASE_URL: z.string(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
    NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY: z.string(),
  },

  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    PGUSER: process.env.PGUSER,
    NODE_ENV: process.env.NODE_ENV,
    PGPASSWORD: process.env.PGPASSWORD,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    IMAGE_SERVER: process.env.IMAGE_SERVER,
    MAGIC_SECRET_KEY: process.env.MAGIC_SECRET_KEY,
    NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY,
  },
});
