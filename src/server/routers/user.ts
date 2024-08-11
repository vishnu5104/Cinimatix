import { z } from "zod";
import { procedure, router } from "../trpc";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const userRouter = router({
  getUsers: procedure.query(async () => {
    return await prisma.user.findMany();
  }),
  addUsers: procedure
    .input(
      z.object({
        name: z.string(),
        theme: z.string(),
        thumbnail: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      await prisma.user.create({
        data: {
          name: input.name,
          theme: input.theme,
          thumbnail: input.thumbnail,
        },
      });
    }),
  uploadFile: procedure
    .input(
      z.object({
        userId: z.number(),
        fileUrl: z.string().url(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      await prisma.file.create({
        data: {
          url: input.fileUrl,
          userId: input.userId,
        },
      });
    }),
});
