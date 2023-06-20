import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const favoriteRouter = createTRPCRouter({
  ceateFavorite: protectedProcedure
    .input(
      z.object({
        entryId: z.string(),
        favoriteId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { favoriteId, entryId } = input;

      const ceateFavorite = await ctx.prisma.favorites.upsert({
        where: {
          id: favoriteId,
        },
        update: {
          entry: { connect: { id: entryId } },
          user: { connect: { id: ctx.session?.user?.id } },
        },
        create: {
          entry: { connect: { id: entryId } },
          user: { connect: { id: ctx.session?.user?.id } },
        },
      });
    }),

  getFavorites: protectedProcedure
    .input(
      z.object({
        entryId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { entryId } = input;
      const findFavorites = await ctx.prisma.favorites.findMany({
        where: {
          user: {
            id: ctx.session?.user?.id,
          },
          entry: {
            id: entryId,
          },
        },
      });
    }),
});