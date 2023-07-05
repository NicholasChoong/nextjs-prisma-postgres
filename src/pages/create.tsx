// pages/create.tsx

import { useState, type SyntheticEvent } from "react";
import Layout from "~/components/Layout";
import Router from "next/router";

const Draft = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submitData = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, content };
      await fetch("/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/drafts");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center bg-white p-12">
        <form onSubmit={submitData}>
          <h1>New Draft</h1>
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
            className="mx-0 my-2 w-full rounded border-2 border-solid border-gray-300 p-2"
          />
          <textarea
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            rows={8}
            value={content}
            className="mx-0 my-2 w-full rounded border-2 border-solid border-black/20 p-2"
          />
          <button
            className="enabled border-0 bg-black px-8 py-4 text-white disabled:bg-gray-300 disabled:text-black"
            disabled={!content || !title}
            type="submit"
            value="Create"
          >
            Create
          </button>
          <button className="ml-4" onClick={() => Router.push("/")}>
            or Cancel
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Draft;
