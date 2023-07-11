import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type PostProps = {
  id: string;
  title: string;
  author: {
    id: string;
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
};

const Post = ({ post }: { post: PostProps }) => {
  const authorName = post.author ? post.author.name : "Unknown author";

  const handleClick = async () => {
    await Router.push("/p/[id]", `/p/${post.id}`);
  };

  return (
    <button
      onClick={handleClick}
      className="w-full bg-white p-8 text-left text-inherit shadow transition-shadow duration-100 ease-in hover:shadow-md"
    >
      <h2>{post.title}</h2>
      <small>By {authorName}</small>
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </button>
  );
};

export default Post;
