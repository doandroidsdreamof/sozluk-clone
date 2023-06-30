import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const followRouter = createTRPCRouter({
  checkFollow: protectedProcedure
    .input(z.object({ followerId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { followerId } = input;
      const isUserAlreadyFollow = await ctx.prisma.follower.findFirst({
        where: {
          AND: [
            { followingId: { equals: ctx.session.user.id } },
            { followerId: { equals: followerId } },
          ],
        },
      });
      return isUserAlreadyFollow ? true : false;
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
        const [createFollower, increaseFollower] =
          await ctx.prisma.$transaction([
            ctx.prisma.follower.create({
              data: {
                followingId: ctx.session.user.id,
                followerId: followerId,
              },
            }),
            ctx.prisma.user.update({
              where: {
                id: ctx.session?.user?.id,
              },
              data: { followingCount: { increment: 1 } },
            }),
            ctx.prisma.user.update({
              where: {
                id: followerId,
              },
              data: { followersCount: { increment: 1 } },
            }),
          ]);
      } else {
        const [removeFollower, decreaseFollower] =
          await ctx.prisma.$transaction([
            ctx.prisma.follower.delete({
              where: {
                id: isUserAlreadyFollow.id,
              },
            }),
            ctx.prisma.user.update({
              where: {
                id: ctx.session?.user?.id,
              },
              data: { followingCount: { decrement: 1 } },
            }),
            ctx.prisma.user.update({
              where: {
                id: followerId,
              },
              data: { followersCount: { decrement: 1 } },
            }),
          ]);
      }
    }),
});
