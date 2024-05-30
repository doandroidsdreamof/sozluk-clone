import { LOG_MESSAGES } from "@/constants/staticContents";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const imageServer = process.env.IMAGE_SERVER as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(LOG_MESSAGES.ERR_MISSING_API_KEY_FOR_SUPABASE);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
