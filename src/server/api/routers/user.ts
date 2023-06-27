import { hash } from "bcrypt";
import { z } from "zod";
import { registerSchema } from "~/schemas/registerSchema";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const userRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(registerSchema)
    .mutation(async ({ ctx, input }) => {
      const { email, userName, password } = input;
      const checkUser = await ctx.prisma.user.findFirst({
        where: { OR: [{ email: input.email }, { name: input.userName }] },
      });
      if (!checkUser) {
        const hashedPassword = await hash(password, 12);
        const insertUser = await ctx.prisma.user.create({
          data: {
            email,
            name: userName,
            password: hashedPassword,
          },
        });

        return {
          status: 201,
          message: "Account created successfully",
          success: true,
          data: insertUser,
        };
      } else {
        return {
          success: false,
          message: "email or username is wrong",
        };
      }
    }),

  getUserSession: protectedProcedure.query(async ({ ctx }) => {
    const user = await prisma.user.findUnique({
      where: {
        id: ctx.session?.user?.id,
      },
    });
    if (user != null) {
      return user;
    }
  }),
  getUserProfileData: protectedProcedure
    .input(z.object({ userName: z.string() }))
    .query(async ({ ctx, input }) => {
      const { userName } = input;
      const profileInfo = await prisma.user.findUnique({
        where: {
          name: userName,
        },
        select: {
          email: true,
          id: true,
          avatar: true,
          followersCount: true,
          following: true,
        },
      });
      if (profileInfo != null) {
        return profileInfo;
      }
    }),
  getUser: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const userInfo = await prisma.user.findUnique({
        where: {
          name: input,
        },
        select: {
          email: true,
          id: true,
          avatar: true,
          topic: {
            select: {
              id: true,
              topicTitle: true,
              entry: true,
            },
          },
        },
      });
      if (userInfo != null) {
        return userInfo;
      }
    }),
});
