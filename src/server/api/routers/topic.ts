import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

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
        return {
          findTopics,
        };
      } else {
        return null;
      }
    }),
  getSingleTopic: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const title = input.replace(/\+/g, " ");
      const findSingle = await ctx.prisma.topic.findUnique({
        where: {
          topicTitle: title,
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
      const findTopic = await ctx.prisma.topic.findUnique({
        where: {
          topicTitle: input.topicTitle,
        },
      });
      if (!findTopic) {
        const [insertTopic, decreaseEntry] = await ctx.prisma.$transaction([
          ctx.prisma.topic.create({
            data: {
              user: { connect: { id: ctx.session.user.id } },
              topicTitle: input.topicTitle,
            },
          }),
          ctx.prisma.user.update({
            where: { id: ctx.session.user.id },
            data: { entryCount: { increment: 1 } },
          }),
        ]);
        if (insertTopic) {
          const insertEntry = await ctx.prisma.entry.create({
            data: {
              user: { connect: { id: ctx.session?.user?.id } },
              topic: { connect: { id: insertTopic.id } },
              content: input.entry,
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
  getAllTopics: publicProcedure
    .input(
      z.object({
        startDate: z.string().nullable(),
        endDate: z.string().nullable(),
        author: z.string(),
        keywords: z.string(),
        selected: z.string().nullable(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { selected, endDate, author, keywords, startDate } = input;
      if (selected === null) {
        const getAll = await ctx.prisma.topic.findMany({
          take: 12,
          orderBy: {
            createdAt: "desc",
          },
        });
        return getAll;
      } else {
        const orderItems = (param: string) => {
          switch (param) {
            case "decrease":
              return "desc";
            case "increase":
              return "asc";
            default:
              return "asc";
          }
        };
        const getAllFiltered = await ctx.prisma.topic.findMany({
          take: 12,
          where: {
            OR: [
              { topicTitle: { contains: keywords } },
              { user: { name: { contains: author } } },
            ],
          },
          orderBy: {
            createdAt: orderItems(selected),
          },
        });
        if (selected === "alphabetical")
          getAllFiltered.sort((a, b) =>
            a.topicTitle.localeCompare(b.topicTitle)
          );
        if (typeof startDate == "string" && typeof endDate == "string")
          return getAllFiltered.filter(
            (item) =>
              item.createdAt >= new Date(startDate) &&
              item.createdAt <= new Date(endDate)
          );

        return getAllFiltered;
      }
    }),
  removeTopic: protectedProcedure
    .input(z.string().nullable())
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
        entry: {
          take: 1,
          select: {
            content: true,
            createdAt: true,
            entryId: true,
            user: {
              select: {
                avatar: true,
                name: true,
                id: true,
              },
            },
          },
        },
      },
    });
    return records;
  }),
});
