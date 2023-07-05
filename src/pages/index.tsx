import { type GetStaticProps } from "next";
import Layout from "~/components/Layout";
import Post, { type PostProps } from "~/components/Post";
import { prisma } from "~/server/db";

// index.tsx
export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: { feed },
    revalidate: 10,
  };
};

type Props = {
  feed: PostProps[];
};

const Blog = (props: Props) => {
  return (
    <Layout>
      <div>
        <h1 className="mb-4 text-3xl font-extrabold">Public Feed</h1>
        <main className="space-y-8">
          {props.feed.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow transition-shadow duration-100 ease-in hover:shadow-md"
            >
              <Post key={post.id} post={post} />
            </div>
          ))}
        </main>
      </div>
    </Layout>
  );
};

export default Blog;
