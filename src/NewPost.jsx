import { api } from "./axios";
import { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { PostsContext } from "./PostsContext";

const NewPost = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { posts, setPosts, formData, setFormData } = useContext(PostsContext);

  const [editMode, setEditMode] = useState(false);
  const [editPostId, setEditPostID] = useState(null);

  useEffect(() => {
    if (location.state && location.state.post) {
      setEditMode(true);
      setEditPostID(location.state.post.id);
      setFormData({
        title: location.state.post.title,
        content: location.state.post.content,
      });
    } else {
      setEditMode(false);
      setEditPostID(null);
      setFormData({ title: "", content: "" });
    }
  }, [location.state, setFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editMode && editPostId) {
        const updatedPost = await api.put(`/${editPostId}`, formData);
        const updatedPostData = await updatedPost.data;

        setPosts((prev) =>
          prev.map((p) => (p.id === editPostId ? updatedPostData : p))
        );
      } else {
        const newPost = await api.post("/", formData);
        const postData = await newPost.data;
        setPosts([postData, ...posts]);
      }
      setFormData({ title: "", content: "" });
      setEditMode(false);
      setEditPostID(null);
      navigate("/");
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-3/5 md:w-3/6 self-center">
      <h2 className="mt-8 text-2xl font-bold font-serif">
        {editMode ? "Edit Post" : "Create New Post"}
      </h2>
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
        className="w-full py-2 px-5 my-8 text-white bg-blue-400 active:bg-blue-600 rounded-lg font-mono font-bold text-lg"
      >
        {editMode ? "Update Post" : "Create Post"}
      </button>
    </form>
  );
};

export default NewPost;
