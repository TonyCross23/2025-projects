import React, { useEffect, useState } from "react";
import { use } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

const PostDetails = () => {
  const params = useParams();
  const [post, setPost] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  const getpost = async () => {
    const res = await fetch(`${import.meta.env.VITE_URL}/post/${params.id}`);
    const post = await res.json();
    setPost(post);
  };

  useEffect((_) => {
    getpost();
  }, []);

  const backbtn = () => {
    navigate(-1);
  };

  const deleteHandle = async (e) => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_URL}/post/${params.id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (res.ok) {
      setRedirect(true);
    } else {
      alert("Something went wrong");
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div>
      <button onClick={backbtn}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="30"
          height="30"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5" />
          <path d="M12 5l-7 7 7 7" />
        </svg>
      </button>
      <div>
        <div>
          <h1 className="font-bold text-xl my-4">{post.title}</h1>
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
          <Link
            to={`/post/edit/${post._id}`}
            className="btn btn-outline btn-primary"
          >
            Edit
          </Link>
          <button onClick={deleteHandle} className="btn btn-outline btn-error">
            Delete
          </button>
        </div>
      </div>
      <img
        src={post.imageUrl}
        alt={post.title}
        className="w-2/3 h-2/4 object-cover my-4 mx-auto"
      />
      <p
        className="text-gray-800 font-normal"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></p>
    </div>
  );
};

export default PostDetails;
