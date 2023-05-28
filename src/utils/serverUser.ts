import { createServerSupabaseClient, type User } from '@supabase/auth-helpers-nextjs';

import type { NextApiRequest, NextApiResponse } from 'next';

export type Context = {
  res: NextApiResponse;
  req: NextApiRequest;
};
export const getUserFromContext = async (ctx: Context): Promise<User | null> => {
  const supabaseServerClient = createServerSupabaseClient(ctx);

  const {
    data: { user },
  } = await supabaseServerClient.auth.getUser();

  return user;
};