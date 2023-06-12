import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const topicRouter = createTRPCRouter({
  filterTopic: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      if (input != null) {
        const findTopics = await ctx.prisma.topic.findMany({
          orderBy: {
            id: "desc",
          },
          take: 10,
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
        if (findTopics.length > 0) {
          return findTopics;
        } else {
          return null;
        }
      }
    }),
  createTopic: protectedProcedure
    .input(z.object({ topicTitle: z.string(), entry: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const findTopic = await ctx.prisma.topic.findFirst({
        where: {
          topicTitle: input.topicTitle,
        },
      });
      if (!findTopic) {
        const insertTopic = await ctx.prisma.topic.create({
          data: {
            user: { connect: { id: ctx.session.user.id } },
            topicTitle: input.topicTitle,
            entry: {
              createMany: {
                data: [
                  {
                    content: input.entry,
                    userId: ctx.session.user.id,
                  },
                ],
              },
            },
          },
        });
        if (insertTopic) {
          return { success: true, message: "topic and first entry is created" };
        } else {
          return {
            success: false,
            message: "topic and first entry is not created",
          };
        }
      } else {
        return { success: false, message: "topic already exist" };
      }
    }),
  getAllTopics: publicProcedure.query(async ({ ctx }) => {
    const getAll = await ctx.prisma.topic.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        userId: true,
        topicTitle: true,
        createdAt: true,
        id: true,
        user: {
          select: {
            email: true,
            name: true,
            avatar: true,
          },
        },
      },
    });
    if (getAll != null) {
      return getAll;
    } else {
      return null;
    }
  }),
});
