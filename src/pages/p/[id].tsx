import { type GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import Layout from "~/components/Layout";
import { type PostProps } from "~/components/Post";
import { prisma } from "~/server/db";

// pages/p/[id].tsx
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });
  return {
    props: { post },
  };
};

async function publishPost(id: string): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: "PUT",
  });
  await Router.push("/");
}

async function deletePost(id: string): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: "DELETE",
  });
  await Router.push("/");
}

const Post = ({ post }: { post: PostProps }) => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === post.author?.email;

  let title = post.title;
  if (!post.published) {
    title = `${title} (Draft)`;
  }

  return (
    <Layout>
      <div className="bg-white p-8">
        <h2>{title}</h2>
        <small>By {post?.author?.name || "Unknown author"}</small>
        <ReactMarkdown>{post.content}</ReactMarkdown>
        {!post.published && userHasValidSession && postBelongsToUser && (
          <button
            className="mt-6 rounded border-0 border-black bg-gray-200 px-4 py-2 hover:bg-gray-300"
            onClick={() => publishPost(post.id)}
          >
            Publish
          </button>
        )}
        {userHasValidSession && postBelongsToUser && (
          <button
            className="ml-4 mt-6 rounded border-0 border-black bg-gray-200 px-4 py-2 hover:bg-gray-300"
            onClick={() => deletePost(post.id)}
          >
            Delete
          </button>
        )}
      </div>
    </Layout>
  );
};

export default Post;
