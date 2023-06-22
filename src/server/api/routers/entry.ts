/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const entryRouter = createTRPCRouter({
  createEntry: protectedProcedure
    .input(z.object({ content: z.string().min(2), topicId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const insertEntry = await ctx.prisma.entry.create({
        data: {
          user: { connect: { id: ctx.session?.user?.id } },
          topic: { connect: { id: input.topicId } },
          content: input.content,
          favorites: {
            createMany: {
              data: {
                userId: ctx.session?.user?.id,
              },
            },
          },
        },
      });

      if (insertEntry) {
        return { data: { success: true, message: "entry is created" } };
      } else {
        return { data: { success: false, message: "entry is not created" } };
      }
    }),
  getEntries: publicProcedure
    .input(z.string().nullable())
    .query(async ({ ctx, input }) => {
      if (input) {
        const findEntrysAndTopic = await ctx.prisma.entry.findMany({
          where: {
            topic: {
              topicTitle: input || "",
            },
          },
          select: {
            content: true,
            topic: true,
            id: true,
            createdAt: true,
            user: {
              select: {
                avatar: true,
                name: true,
                id: true,
              },
            },
          },
        });
        if (findEntrysAndTopic) {
          return findEntrysAndTopic;
        } else {
          return null;
        }
      }
    }),
  getUserEntries: protectedProcedure.query(async ({ ctx }) => {
    const findEntryAndTopic = await ctx.prisma.entry.findMany({
      include: {
        topic: true,
        user: {
          select: {
            avatar: true,
            name: true,
            id: true,
          },
        },
      },
    });
    if (findEntryAndTopic) {
      return findEntryAndTopic;
    } else {
      return null;
    }
  }),
  getInfitineEntries: publicProcedure
    .input(
      z.object({
        cursor: z.string().nullish(),
        limit: z.number(),
        topicTitle: z.string().nullish(),
        skip: z.number().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { limit, skip, topicTitle, cursor } = input;
      const [entries, totalCount] = await ctx.prisma.$transaction([
        ctx.prisma.entry.count(),
        ctx.prisma.entry.findMany({
          where: {
            topic: {
              topicTitle: topicTitle || "",
            },
          },
        }),
      ]);
      const infiniteEntries = await ctx.prisma.entry.findMany({
        take: limit + 1,
        skip: skip,
        cursor: cursor ? { id: cursor } : undefined,
        where: {
          topic: {
            topicTitle: topicTitle || "",
          },
        },
        orderBy: {
          id: "asc",
        },
        include: {
          favorites: true,
          topic: true,
          user: {
            select: {
              id: true,
              avatar: true,
              email: true,
              name: true,
            },
          },
        },
      });
      let nextCursor: typeof infiniteEntries | undefined | string = undefined;
      const entryCountPerTopic: number = totalCount.length;
      if (infiniteEntries.length > limit) {
        const nextItem = infiniteEntries.pop();
        nextCursor = nextItem?.id;
      }
      return {
        infiniteEntries,
        nextCursor,
        entryCountPerTopic,
      };
    }),
  updateEntry: protectedProcedure
    .input(
      z.object({
        entryId: z.string(),
        content: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.session.user.id === input.userId) {
        const updateSingleEntry = await ctx.prisma.entry.update({
          where: {
            id: input.entryId,
          },
          data: {
            content: input.content,
          },
        });
        if (updateSingleEntry) {
          return { success: true, message: "entry is updated" };
        } else {
          return { success: false, message: "entry is not updated" };
        }
      }
    }),
  removeEntry: protectedProcedure
    .input(z.string().nullable())
    .mutation(async ({ ctx, input }) => {
      if (input != null) {
        const removeSingleEntry = await ctx.prisma.entry.deleteMany({
          where: {
            id: input,
            userId: ctx.session.user.id,
          },
        });
        if (removeSingleEntry.count > 0) {
          return {
            success: true,
            message: "entry is removed",
            count: removeSingleEntry.count,
          };
        } else {
          return {
            success: false,
            message: "entry is not removed",
            count: removeSingleEntry.count,
          };
        }
      } else {
        return { success: false, message: "entry is not removed" };
      }
    }),
});
