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
        const checkUserLiked = await ctx.prisma.favorites.create({
          data: {
            entry: { connect: { id: insertEntry.id } },
            user: { connect: { id: ctx.session?.user?.id } },
          },
        });
        return { data: { success: true, message: "entry is created" } };
      } else {
        return { data: { success: false, message: "entry is not created" } };
      }
    }),

  getUserEntries: protectedProcedure
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
              email: true,
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
  getFavorites: protectedProcedure
    .input(z.object({ userName: z.string() }))
    .query(async ({ ctx, input }) => {
      const { userName } = input;
      const findFavoritedEntries = await ctx.prisma.entry.findMany({
        where: {
          favorites: {
            every: {
              userId: ctx.session?.user?.id,
              user: {
                name: userName,
              },
            },
            some: {
              favorite: true,
            },
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
              email: true,
            },
          },
        },
      });
      if (findFavoritedEntries) {
        return findFavoritedEntries;
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
            favorites: {
              select: {
                id: true,
                favorite: true,
                entryId: true,
              },
            },
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
    .input(z.string().nullable())
    .mutation(async ({ ctx, input }) => {
      if (input != null) {
        const [removeSingleEntry] = await ctx.prisma.$transaction([
          ctx.prisma.entry.delete({
            where: {
              id: input,
            },
          }),
          ctx.prisma.user.update({
            where: { id: ctx.session.user.id },
            data: { entryCount: { increment: -1 } },
          }),
        ]);
      } else {
        return { success: false, message: "entry is not removed" };
      }
    }),
});
