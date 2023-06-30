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
  followUser: protectedProcedure
    .input(z.object({ followerId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { followerId } = input;
      const isUserAlreadyFollow = await ctx.prisma.follower.findFirst({
        where: {
          AND: [
            { followingId: { equals: ctx.session.user.id } },
            { followerId: { equals: followerId } },
          ],
        },
      });
      if (!isUserAlreadyFollow) {
        const createFollower = await ctx.prisma.follower.create({
          data: {
            followingId: ctx.session.user.id,
            followerId: followerId,
          },
        });
        return {
          alreadyFollow: false,
        };
      } else {
        return {
          alreadyFollow: true,
        };
      }
    }),
});
