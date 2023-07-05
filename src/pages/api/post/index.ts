// pages/api/post/index.ts

import { getServerSession } from "next-auth/next";
import { prisma } from "~/server/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "~/server/auth";

interface UserRequestData {
  title: string;
  content?: string;
}

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, content } = req.body as UserRequestData;

  const session = await getServerSession(req, res, authOptions);
  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: { connect: { email: session?.user?.email ?? undefined } },
    },
  });
  res.json(result);
}
