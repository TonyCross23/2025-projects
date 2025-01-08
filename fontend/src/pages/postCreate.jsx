import React from "react";
import PostForm from "../components/postForm";

const PostCreate = () => {
  return (
    <div>
      <PostForm
        uiBtnText={"Upload post"}
        uiTitle={"Create post"}
        isEditing={false}
      />
    </div>
  );
};

export default PostCreate;
