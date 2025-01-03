import React from "react";
import { fakeData } from "../utils/fakeData";
import { Link } from "react-router-dom";

const PostItem = () => {
  return (
    <div>
      {fakeData.map((post) => (
        <Link to={`/post/${post.id}`} key={post.id}>
          <div className="my-6 p-2 bg-slate-50 rounded-sm">
            <h2 className=" font-medium uppercase">{post.title}</h2>
            <p>
              <small className="text-muted">
                {new Date(post.time).toLocaleString()}
              </small>
            </p>
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-72 object-cover my-3"
            />
            <p className="font-normal text-gray-500">
              {post.description.split(" ").slice(0, 30).join(" ")}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostItem;
