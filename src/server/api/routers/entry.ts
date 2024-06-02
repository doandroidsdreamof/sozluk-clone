import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

//TODO IDOR vulnerability

export const entryRouter = createTRPCRouter({
  createEntry: protectedProcedure
    .input(z.object({ content: z.string().min(2), topicId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const [insertEntry, incrementEntry] = await ctx.prisma.$transaction([
        ctx.prisma.entry.create({
          data: {
            user: { connect: { id: ctx.session?.user?.id } },
            topic: { connect: { id: input.topicId } },
            content: input.content,
          },
        }),
        ctx.prisma.user.update({
          where: { id: ctx.session.user.id },
          data: { entryCount: { increment: 1 } },
        }),
      ]);
      if (insertEntry) {
        return { data: { success: true, message: "entry is created" } };
      } else {
        return { data: { success: false, message: "entry is not created" } };
      }
    }),

  getUserEntries: publicProcedure
    .input(z.object({ userName: z.string() }))
    .query(async ({ ctx, input }) => {
      const { userName } = input;
      const findEntryAndTopic = await ctx.prisma.entry.findMany({
        where: {
          user: {
            name: userName,
          },
        },
        include: {
          topic: true,
          favorites: true,
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
        cursor: z.number().nullish(),
        take: z.number(),
        topicTitle: z.string().nullish(),
        skip: z.number().optional(),
      })
    )

    .query(async ({ ctx, input }) => {
      const { take, skip, topicTitle } = input;
      const [infiniteEntries, totalCount] = await ctx.prisma.$transaction([
        ctx.prisma.entry.findMany({
          take: take,
          skip: skip,
          where: {
            topic: {
              topicTitle: topicTitle || "",
            },
          },
          orderBy: {
            createdAt: "asc",
          },
          include: {
            topic: {
              select: {
                topicTitle: true,
                id: true,
              },
            },
            user: {
              select: {
                id: true,
                avatar: true,
                email: true,
                name: true,
              },
            },
          },
        }),
        ctx.prisma.entry.count({
          where: {
            topic: {
              topicTitle: topicTitle || "",
            },
          },
        }),
      ]);
      return {
        infiniteEntries,
        totalCount,
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
    .input(
      z.object({
        entryId: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (input.userId && ctx.session.user.id === input.userId) {
        const [removeSingleEntry] = await ctx.prisma.$transaction([
          ctx.prisma.entry.delete({
            where: {
              id: input.entryId,
            },
          }),
          ctx.prisma.user.update({
            where: { id: ctx.session.user.id },
            data: { entryCount: { decrement: 1 } },
          }),
        ]);
      } else {
        return { success: false, message: "entry is not removed" };
      }
    }),
});
