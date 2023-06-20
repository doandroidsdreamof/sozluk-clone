import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const favoriteRouter = createTRPCRouter({
  ceateFavorite: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const checkFavorite = await ctx.prisma.favorites.findFirst({
        where: {
          user: {
            id: ctx.session?.user?.id,
          },
          entry: {
            id: input,
          },
        },
      });
      if (checkFavorite) {
        const ceateFavorite = await ctx.prisma.favorites.create({
          data: {
            entry: { connect: { id: input } },
            user: { connect: { id: ctx.session?.user?.id } },
          },
        });
      }
    }),
});
