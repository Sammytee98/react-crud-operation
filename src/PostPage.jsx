import { useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { api } from "./axios";
import { PostsContext } from "./PostsContext";
import { FaStepBackward, FaTrash, FaEdit } from "react-icons/fa";

const PostPage = () => {
  const { posts, setPosts, setFormData } = useContext(PostsContext);
  const { postId } = useParams();
  const navigate = useNavigate();
  const post = posts.find((p) => p.id === postId);

  const handleEdit = (id) => {
    const postToEdit = posts.find((p) => p.id === id);
    if (!postToEdit) return console.log("Post not Found");

    navigate("/new-post", { state: { post: postToEdit } });
  };

  const handleDelete = async (id) => {
    const filteredPost = posts.filter((post) => post.id !== id);
    try {
      await api.delete(`/${id}`);
      setPosts(filteredPost);
      navigate("/");
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  return (
    <article className="w-full flex justify-center px-5">
      <div className="w-4/5 mt-10">
        <Link
          to="/"
          className="flex gap-x-[2px] items-center text-neutral-700 hover:text-black duration-300"
        >
          <FaStepBackward size={15} />
          <span className="text-lg font-semibold font-mono">Back</span>
        </Link>

        <div className="bg-neutral-200 rounded-md shadow-lg mt-5 flex flex-col py-5 px-4">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold font-serif">{post.title}</h2>
            <p className="text-lg font-mono">{post.content}</p>
          </div>
          <div className="mt-7 flex gap-4 self-end mr-4">
            <button
              onClick={() => handleEdit(post.id)}
              className="shadow-xl cursor-pointer bg-white p-2 flex justify-center items-center rounded-full transition-all duration-300 active:animate-bounce hover:scale-90"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => handleDelete(post.id)}
              className="shadow-xl cursor-pointer bg-white p-2 flex justify-center items-center rounded-full transition-all duration-300 active:animate-bounce hover:scale-90"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostPage;
