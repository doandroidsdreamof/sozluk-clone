import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const userRouter = createTRPCRouter({
  getUserSession: protectedProcedure.query(async ({ ctx }) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: ctx.session?.user?.id,
        },
      });
      if (user != null) {
        return user;
      }
    } catch (err) {
      console.error(err);
    }
  }),

});