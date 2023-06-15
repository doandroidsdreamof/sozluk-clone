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
      const findEntrysAndToic = await ctx.prisma.entry.findMany({
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
      if (findEntrysAndToic) {
        return findEntrysAndToic;
      } else {
        return null;
      }
    }),
  updateEntry: protectedProcedure
    .input(
      z.object({
        entryId: z.string(),
        content: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const checkCurrentUser = await ctx.prisma.entry.findFirst({
        where: {
          userId: ctx.session?.user?.id,
        },
      });
      if (checkCurrentUser) {
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
          return { success: true, message: "entry is removed" };
        } else {
          return { success: false, message: "entry is not removed" };
        }
      } else {
        return { success: false, message: "entry is not removed" };
      }
    }),
});
