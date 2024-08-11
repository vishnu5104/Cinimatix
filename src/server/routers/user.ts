import { z } from "zod";
import { procedure, router } from "../trpc";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const userRouter = router({
  getUsers: procedure.query(async () => {
    return await prisma.user.findMany();
  }),

  addUser: procedure
    .input(
      z.object({
        name: z.string(),
        theme: z.string(),
        thumbnailId: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.user.create({
        data: {
          name: input.name,
          theme: input.theme,
          thumbnail: input.thumbnailId
            ? {
                connect: { id: input.thumbnailId },
              }
            : undefined,
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
    .mutation(async ({ input }) => {
      return await prisma.file.create({
        data: {
          url: input.fileUrl,
          userId: input.userId,
        },
      });
    }),

  getFiles: procedure.query(async () => {
    return await prisma.file.findMany();
  }),

  vote: procedure
    .input(
      z.object({
        fileId: z.number(),
        userId: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      // Check if user has already voted for this file
      await prisma.vote.findFirst({
        where: {
          fileId: input.fileId,
          userId: input.userId,
        },
      });

      // if (existingVote) {
      //   throw new Error("User has already voted for this file.");
      // }

      // Create a new vote
      return await prisma.vote.create({
        data: {
          fileId: input.fileId,
          userId: input.userId,
        },
      });
    }),

  getVotes: procedure.input(z.number()).query(async ({ input }) => {
    return await prisma.vote.count({
      where: {
        fileId: input,
      },
    });
  }),
});
