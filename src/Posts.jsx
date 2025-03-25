import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PostsContext } from "./PostsContext";
import { api } from "./axios";
import { FaTrash, FaEdit } from "react-icons/fa";

const Posts = () => {
  const navigate = useNavigate();
  const { posts, setPosts, formData, setFormData } = useContext(PostsContext);

  const handleEdit = (id) => {
    posts.map((post) => {
      try {
        if (post.id === id) {
          setFormData({ title: post.title, content: post.content });
          navigate("/new-post");
        }
      } catch (err) {
        console.log("Error: ", err.message);
      }
    });
  };

  const handleDelete = async (id) => {
    const filteredPost = posts.filter((post) => post.id !== id);
    try {
      await api.delete(`/${id}`);
      setPosts(filteredPost);
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  return (
    <section className="p-3">
      <h1 className="text-center text-3xl font-bold">My Posts</h1>
      <div className="flex flex-col gap-y-5 px-2">
        {posts.map((post) => (
          <div
            key={post.id}
            className="w-full bg-neutral-200 rounded-md shadow-lg mt-5 flex flex-col items-center py-5 px-3"
          >
            <h2 className="text-2xl font-bold font-serif">{post.title}</h2>
            <p className="mt-4 text-base font-mono">{post.content}</p>
            <div
              onClick={() => handleEdit(post.id)}
              className="mt-7 flex gap-4 self-end mr-4"
            >
              <button className="shadow-xl cursor-pointer bg-white p-2 flex justify-center items-center rounded-full transition-all duration-300 active:animate-bounce hover:scale-90">
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
        ))}
      </div>
    </section>
  );
};

export default Posts;
