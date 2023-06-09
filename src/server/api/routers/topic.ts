import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const topicRouter = createTRPCRouter({
  filterTopic: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      if (input != null) {
        const findRooms = await ctx.prisma.topic.findMany({
          orderBy: {
            id: "desc",
          },
          take: 8,
          where: {
            topicTitle: {
              contains: input,
            },
          },
          select: {
            id: true,
            topicTitle: true,
          },
        });
        return findRooms;
      }
    }),
});
