import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const followRouter = createTRPCRouter({
  getFollowers: publicProcedure
    .input(z.object({ userName: z.string() }))
    .query(async ({ ctx, input }) => {
      const { userName } = input;
      const findFavoritedEntries = await ctx.prisma.follower.findMany({
        where: {
          id: userName,
        },
      });
    }),
});
