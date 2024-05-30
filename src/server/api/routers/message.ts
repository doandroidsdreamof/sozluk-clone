import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const messageRouter = createTRPCRouter({
  postMessage: protectedProcedure
    .input(z.object({ message: z.string(), receiverId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { message, receiverId } = input;
      const isChatRoomExist = await ctx.prisma.chatRoom.findFirst({
        where: {
          AND: [
            {
              users: {
                some: {
                  id: ctx.session.user.id,
                },
              },
            },
            {
              users: {
                some: {
                  id: receiverId,
                },
              },
            },
          ],
        },
      });
      if (isChatRoomExist) {
        const createMessage = await ctx.prisma.message.create({
          data: {
            receiver: { connect: { id: receiverId } },
            sender: { connect: { id: ctx.session.user.id } },
            message: input.message,
            chatRoom: { connect: { id: isChatRoomExist.id } },
          },
        });
      } else {
        const [initChatRoom] = await ctx.prisma.$transaction([
          ctx.prisma.chatRoom.create({
            data: {
              receiverId: receiverId,
              senderId: ctx.session.user.id,
              users: {
                connect: [
                  {
                    id: ctx.session.user.id,
                  },
                  {
                    id: receiverId,
                  },
                ],
              },
            },
          }),
        ]);

        const createMessage = await ctx.prisma.message.create({
          data: {
            message: message,
            receiverId: receiverId,
            senderId: ctx.session.user.id,
            chatRoomId: initChatRoom.id,
          },
        });
      }
    }),

  getUserMessageData: protectedProcedure
    .input(z.object({ userName: z.string().nullable() }))
    .query(async ({ ctx, input }) => {
      const { userName } = input;
      if (userName) {
        const getMessageData = await ctx.prisma.chatRoom.findMany({
          where: {
            OR: [
              {
                senderId: ctx.session.user.id,
              },
              { receiverId: ctx.session.user.id },
            ],
          },
          select: {
            id: true,
            receiverId: true,
            senderId: true,
            users: {
              select: {
                avatar: true,
                name: true,
                id: true,
              },
              where: {
                name: {
                  not: userName,
                },
              },
            },
          },
        });
        return getMessageData.filter(
          (item) =>
            item.receiverId != ctx.session.user.id ||
            item.senderId != ctx.session.user.id
        );
      }
    }),
  getChatRoom: protectedProcedure
    .input(
      z.object({
        receiverId: z.string().nullable(),
        senderId: z.string().nullable(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { receiverId, senderId } = input;
      if (receiverId && senderId) {
        const findChatRoom = await ctx.prisma.chatRoom.findFirst({
          where: {
            AND: [
              {
                users: {
                  some: {
                    id: senderId,
                  },
                },
              },
              {
                users: {
                  some: {
                    id: receiverId,
                  },
                },
              },
            ],
          },
          include: {
            messages: {
              orderBy: {
                createdAt: "asc",
              },
              select: {
                createdAt: true,
                message: true,

                id: true,
                receiver: {
                  select: {
                    avatar: true,
                    name: true,
                    id: true,
                  },
                },
                sender: {
                  select: {
                    avatar: true,
                    name: true,
                    id: true,
                  },
                },
              },
            },
          },
        });
        if (findChatRoom) {
          return findChatRoom;
        } else {
          return null;
        }
      }
    }),
});
