import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

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
        const [initChatRoom, createMessage] = await ctx.prisma.$transaction([
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
          ctx.prisma.user.update({
            where: { id: ctx.session.user.id },
            data: { entryCount: { increment: 1 } },
          }),
        ]);
      }
    }),

  getUserMessageData: protectedProcedure
    .input(z.object({ userName: z.string().nullable() }))
    .query(async ({ ctx, input }) => {
      const { userName } = input;
      if (userName) {
        const getMessageData = await ctx.prisma.message.findMany({
          where: {
            OR: [
              {
                receiver: {
                  name: userName,
                },
              },
              { sender: { name: userName } },
            ],
          },
          select: {
            id: true,
            sender: {
              select: {
                avatar: true,
                name: true,
                id: true,
                email: true,
                messagesSent: {
                  where: {
                    receiverId: ctx.session.user.id,
                  },
                  select: {
                    message: true,
                  },
                },
              },
            },
          },
        });
        return getMessageData;
      }
    }),
  getChatRoom: protectedProcedure
    .input(
      z.object({
        recieverId: z.string().nullable(),
        senderId: z.string().nullable(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { recieverId, senderId } = input;
      if (recieverId && senderId) {
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
                    id: recieverId,
                  },
                },
              },
            ],
          },
          include: {
            messages: {
              select: {
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
