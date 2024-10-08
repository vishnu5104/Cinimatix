import { router } from "./trpc";
import { userRouter } from "./routers/user";
// add multlple routes/ user/ register etc
export const appRouter = router({
  user: userRouter,
});

export type AppRouter = typeof appRouter;
