import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { api } from "./axios";
import { PostsContext } from "./PostsContext";
import Header from "./Header";
import Posts from "./Posts";
import NewPost from "./NewPost";

function App() {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get();
        const posts = await res.data.reverse();
        setPosts(posts);
      } catch (err) {
        console.log("Error:", err.message);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Router>
      <main className="w-full min-h-svh">
        <Header />
        <PostsContext.Provider
          value={{ posts, setPosts, formData, setFormData }}
        >
          <article className="flex justify-center">
            <Routes>
              <Route path="/" element={<Posts />} />
              <Route path="/new-post" element={<NewPost />} />
            </Routes>
          </article>
        </PostsContext.Provider>
      </main>
    </Router>
  );
}

export default App;
