import React from "react";
import PostForm from "../components/postForm";

const EditPage = () => {
  return (
    <div>
      <PostForm
        uiBtnText={"Update post"}
        uiTitle={"Edit post"}
        isEditing={true}
      />
    </div>
  );
};

export default EditPage;
