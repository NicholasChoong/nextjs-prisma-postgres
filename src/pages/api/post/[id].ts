import { prisma } from "~/server/db";
import type { NextApiRequest, NextApiResponse } from "next";

// DELETE /api/post/:id
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const postId = req.query.id as string;
  if (req.method === "DELETE") {
    const post = await prisma.post.delete({
      where: { id: postId },
    });
    res.json(post);
  } else {
    throw new Error(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
