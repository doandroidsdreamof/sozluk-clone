import { createTRPCRouter } from "@/server/api/trpc";
import { userRouter } from "./routers/user";
import { entryRouter } from "./routers/entry";
import { topicRouter } from "./routers/topic";
import { messageRouter } from "./routers/message";
import { favoriteRouter } from "./routers/favorite";
import { followRouter } from "./routers/follow";

export const appRouter = createTRPCRouter({
  user: userRouter,
  message: messageRouter,
  topic: topicRouter,
  entry: entryRouter,
  favorite: favoriteRouter,
  follow: followRouter,
});

export type AppRouter = typeof appRouter;
