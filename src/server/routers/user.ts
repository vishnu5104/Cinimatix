import { z } from "zod";
import { procedure, router } from "../trpc";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const userRouter = router({
  getUsers: procedure.query(async () => {
    return await prisma.user.findMany();
  }),

  getPosts: procedure.query(async () => {
    return await prisma.post.findMany();
  }),

  addPost: procedure
    .input(
      z.object({
        walletAddress: z.string(),
        userId: z.string(),
        title: z.string(),
        theme: z.string(),
        thumbnail: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.post.create({
        data: {
          walletAddress: input.walletAddress,
          userId: input.userId,
          title: input.title,
          theme: input.theme,
          thumbnail: input.thumbnail,
        },
      });
    }),

  addUser: procedure
    .input(
      z.object({
        name: z.string(),
        theme: z.string(),
        thumbnail: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.user.create({
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
        // verificationResult: z.boolean(), // Added this to pass the verification result
      })
    )
    .mutation(async ({ input }) => {
      // Check if user has already voted for this file

      // if (!input.verificationResult) {
      //   throw new Error("Verification failed, vote not added.");
      // }

      await prisma.vote.findFirst({
        where: {
          fileId: input.fileId,
          userId: input.userId,
        },
      });

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
