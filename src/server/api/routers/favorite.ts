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
      const { entryId, favoriteId } = input;
      const isFavoriteExist = await ctx.prisma.favorites.findFirst({
        where: {
          entryId: entryId,
          id: favoriteId,
        },
        select: {
          favorite: true,
          id: true,
        },
      });
      if (!isFavoriteExist) {
        const ceateFavorite = await ctx.prisma.favorites.create({
          data: {
            user: { connect: { id: ctx.session?.user?.id } },
            entry: { connect: { id: entryId } },
            favorite: true,
          },
        });
      } else {
        const removeFavorite = await ctx.prisma.entry.update({
          where: {
            id: entryId,
          },
          data: {
            favorites: {
              delete: {
                id: isFavoriteExist.id,
              },
            },
          },
        });
      }
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
