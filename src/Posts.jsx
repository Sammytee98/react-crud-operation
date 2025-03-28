import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { PostsContext } from "./PostsContext";

const Posts = () => {
  const { posts } = useContext(PostsContext);

  return (
    <section className="p-3">
      <h1 className="text-center text-3xl font-bold">My Posts</h1>
      <div className="flex flex-col gap-y-5 px-2">
        {posts.map((post) => (
          <div
            key={post.id}
            className="w-full bg-neutral-200 rounded-md shadow-lg mt-5 flex flex-col py-5 px-4"
          >
            <Link
              to={`/postpage/${post.id}`}
              className="text-2xl font-bold font-serif hover:text-blue-500 duration-300"
            >
              {post.title}
            </Link>
            <p className="mt-4 text-base font-mono">{`${post.content.slice(
              0,
              40
            )}...`}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Posts;
