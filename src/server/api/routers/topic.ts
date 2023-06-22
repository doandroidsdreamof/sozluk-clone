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
      const findTopics = await ctx.prisma.topic.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: 10,
        where: {
          topicTitle: {
            startsWith: input,
          },
        },
        select: {
          id: true,
          topicTitle: true,
        },
      });
      if (findTopics) {
        return findTopics.map((el) => {
          return {
            id: el.id.toString(),
            topicTitle: el.topicTitle,
          };
        });
      } else {
        return null;
      }
    }),
  getSingleTopic: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const findSingle = await ctx.prisma.topic.findFirst({
        where: {
          topicTitle: input.replace(/\+/g, " "),
        },
        select: {
          topicTitle: true,
          id: true,
        },
      });
      return findSingle;
    }),
  createTopic: protectedProcedure
    .input(z.object({ topicTitle: z.string(), entry: z.string().min(2) }))
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
          },
        });

        if (insertTopic) {
          const insertEntry = await ctx.prisma.entry.create({
            data: {
              user: { connect: { id: ctx.session?.user?.id } },
              topic: { connect: { id: insertTopic.id } },
              content: input.entry,
              favorites: {
                createMany: {
                  data: {
                    userId: ctx.session?.user?.id,
                  },
                },
              },
            },
          });
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
      take: 12,
      orderBy: {
        createdAt: "desc",
      },
    });
    if (getAll != null) {
      return getAll;
    } else {
      return null;
    }
  }),
  removeTopic: protectedProcedure
    .input(z.bigint().nullable())
    .mutation(async ({ ctx, input }) => {
      //*If there is no entry inside topic
      if (input) {
        const deleteTopic = await ctx.prisma.topic.delete({
          where: {
            id: input,
          },
        });
      }
    }),
  getRandomEntriesAndTopics: publicProcedure.query(async ({ ctx }) => {
    const totalRecords = await ctx.prisma.topic.count();
    const randomSkip = Math.floor(
      Math.random() * (totalRecords > 15 ? totalRecords - 10 : 1)
    );
    const randomTake = 10;
    const records = await ctx.prisma.topic.findMany({
      skip: randomSkip,
      take: randomTake,
      include: {
        entry: true,
        user: {
          select: {
            avatar: true,
            name: true,
            id: true,
          },
        },
      },
    });
    return records;
  }),
});
