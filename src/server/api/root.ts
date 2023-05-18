import { createTRPCRouter } from "~/server/api/trpc";
import { sessionRouter } from "~/server/api/routers/session";




export const appRouter = createTRPCRouter({
  session:sessionRouter,
});


export type AppRouter = typeof appRouter;
