import React from "react";
import { fakeData } from "../utils/fakeData";
import { Link } from "react-router-dom";

const PostItem = () => {
  return (
    <div>
      {fakeData.map((post) => (
        <Link to={`/post/${post.id}`} className="card my-4" key={post.id}>
          <div className="card-body">
            <h2 className="card-title font-medium uppercase">{post.title}</h2>
            <p className="card-text">
              <small className="text-muted">
                {new Date(post.time).toLocaleString()}
              </small>
            </p>
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-72 object-cover"
            />
            <p className="card-text font-normal text-gray-500">
              {post.description.split(" ").slice(0, 30).join(" ")}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostItem;
