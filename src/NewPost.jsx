import { api } from "./axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostsContext } from "./PostsContext";

const NewPost = () => {
  const navigate = useNavigate();
  const { posts, setPosts, formData, setFormData } = useContext(PostsContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newPost = await api.post("/", formData);
      const postData = await newPost.data;
      setPosts([postData, ...posts]);
      setFormData({ title: "", content: "" });
      navigate("/");
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-3/5 md:w-3/6 self-center">
      <h2 className="mt-8 text-2xl font-bold font-serif">Create New Post</h2>
      <div className="w-full flex flex-col relative mt-6">
        <label className="font-bold text-lg font-mono" htmlFor="title">
          Title:
        </label>
        <input
          onChange={handleChange}
          name="title"
          type="text"
          id="title"
          value={formData.title}
          className="bg-neutral-200 ring-2 ring-neutral-300 shadow-lg p-2 rounded-lg"
        />
      </div>
      <div className="w-full flex flex-col relative mt-6">
        <label className="font-bold text-lg font-mono" htmlFor="content">
          Content:
        </label>
        <textarea
          onChange={handleChange}
          name="content"
          id="content"
          value={formData.content}
          cols="30"
          rows="10"
          className="bg-neutral-200 ring-2 ring-neutral-300 shadow-lg p-2 rounded-lg resize-none"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-5 mt-8 text-white bg-blue-400 active:bg-blue-600 rounded-lg font-mono font-bold text-lg"
      >
        Create Post
      </button>
    </form>
  );
};

export default NewPost;
