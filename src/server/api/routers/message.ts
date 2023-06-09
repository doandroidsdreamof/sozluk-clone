import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const messageRouter = createTRPCRouter({
  postMessage: protectedProcedure
    .input(z.object({ message: z.string(), recipentId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.message.create({
          data: {
            recipient: { connect: { id: input.recipentId } },
            sender: { connect: { id: ctx.session.user.id } },
            message: input.message,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
});
