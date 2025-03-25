import { useState, useEffect, useRef } from "react";
import { TbLocationQuestion } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const underlineRef = useRef(null);
  const postsRef = useRef(null);
  const newPostRef = useRef(null);
  const [underlineStyle, setUnderlineStyle] = useState({});

  useEffect(() => {
    let activeRef;
    if (location.pathname === "/") {
      activeRef = postsRef.current;
    } else if (location.pathname === "/new-post") {
      activeRef = newPostRef.current;
    }

    if (activeRef) {
      const rect = activeRef.getBoundingClientRect();
      const parentRect = activeRef.parentElement.getBoundingClientRect();
      setUnderlineStyle({
        width: `${rect.width}px`,
        transform: `translateX(${rect.left - parentRect.left}px)`,
      });
    }
  }, [location.pathname]);

  return (
    <header className="w-full py-2 flex justify-center">
      <nav className="relative flex gap-5 font-semibold text-lg">
        <Link
          to="/"
          ref={postsRef}
          className={`relative ${
            location.pathname == "/" ? "text-black" : "text-neutral-700"
          } hover:text-black`}
        >
          Posts
        </Link>
        <Link
          to="/new-post"
          ref={newPostRef}
          className={`relative ${
            location.pathname == "/new-post" ? "text-black" : "text-neutral-700"
          } hover:text-black`}
        >
          New Post
        </Link>
        <div
          ref={underlineRef}
          className="absolute bottom-0 left-0 h-[2px] bg-blue-300 transition-all duration-300"
          style={underlineStyle}
        ></div>
      </nav>
    </header>
  );
};
export default Header;
