import React from "react";
import { Link } from "react-router-dom";

const PostDetails = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Post Details</h1>
          <p className="">
            <small className="text-muted">2024-12-31T16:45:10.789Z</small>
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
        src="https://via.placeholder.com/150?text=enhancing"
        alt="post title"
        className="w-full h-96 object-cover my-4"
      />
      <p className="text-gray-800 font-normal">
        Tips to protect your data online.Tips to protect your data online.Tips
        to protect your data online.Tips to protect your data online.Tips to
        protect your data online.Tips to protect your data online.Tips to
        protect your data online.Tips to protect your data online.Tips to
        protect your data online.Tips to protect your data online.Tips to
        protect your data online.Tips to protect your data online.Tips to
        protect your data online.
      </p>
    </div>
  );
};

export default PostDetails;
