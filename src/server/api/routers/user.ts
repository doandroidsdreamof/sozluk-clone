import { hash } from "bcrypt";
import { registerSchema } from "~/schemas";
import { createTRPCRouter, protectedProcedure,publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const userRouter = createTRPCRouter({
  insertUser: publicProcedure
    .input(registerSchema)
    .mutation(async ({ ctx, input }) => {
      const { email, userName, password } = input;
      const checkEmail = await ctx.prisma.user.findFirst({
        where: { email },
      });
      if (checkEmail) {
          const hashedPassword =  await hash(password, 12);
            const insertUser = await ctx.prisma.user.create({
              data: {
                email,
                name: userName,
                password:  hashedPassword ,
              },
            });

          return {
            status: 201,
            message: "Account created successfully",
            success: true,
            data: insertUser,
          };
        }
    }),

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
