import { prisma } from "~/server/db";
import type { NextApiRequest, NextApiResponse } from "next";

// PUT /api/publish/:id
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const postId = req.query.id as string;
  const post = await prisma.post.update({
    where: { id: postId },
    data: { published: true },
  });
  res.json(post);
}
