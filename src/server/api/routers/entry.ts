import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const entryRouter = createTRPCRouter({
  createEntry: protectedProcedure
    .input(z.object({ content: z.string(), topicId: z.string() }))
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
});
