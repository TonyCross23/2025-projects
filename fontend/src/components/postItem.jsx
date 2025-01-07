import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PostItem = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const res = await fetch(`${import.meta.env.VITE_URL}/posts`);
    const posts = await res.json();
    setPosts(posts);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <Link to={`/post/${post._id}`} key={post._id}>
          <div className="my-6 p-2 bg-slate-50 rounded-sm dark:bg-gray-800">
            <h2 className=" font-medium text-3xl uppercase">{post.title}</h2>
            <p>
              <span>{post.author.username}</span> |{" "}
              <span className="text-muted">
                {new Date(post.createdAt).toLocaleString()}
              </span>
            </p>
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-72 object-cover my-3"
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostItem;
