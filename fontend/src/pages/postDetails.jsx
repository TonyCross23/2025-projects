import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const PostDetails = () => {
  const params = useParams();
  const [post, setPost] = useState([]);

  const getpost = async () => {
    const res = await fetch(`${import.meta.env.VITE_URL}/post/${params.id}`);
    const post = await res.json();
    setPost(post);
  };

  useEffect((_) => {
    getpost();
  }, []);

  //const { title, imageUrl, content, createdAt, _id, author } = post;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">{post.title}</h1>
          <p className="">
            <span className="text-muted">
              {post.author?.username ?? "Unknown User"}
            </span>{" "}
            |
            <span className="text-muted">
              {new Date(post.createdAt).toLocaleString()}
            </span>
          </p>
        </div>
        <div className="my-2 flex gap-2">
          <Link to={`/post/edit/1`} className="btn btn-outline btn-primary">
            Edit
          </Link>
          <button className="btn btn-outline btn-error">Delete</button>
        </div>
      </div>
      <img
        src={post.imageUrl}
        alt={post.title}
        className="w-2/3 object-cover my-4 mx-auto"
      />
      <p
        className="text-gray-800 font-normal"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></p>
    </div>
  );
};

export default PostDetails;
