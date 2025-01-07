import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";

const toolbarOptions = [
  [{ header: "1" }, { header: "2" }, { font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  ["link"],
  [{ align: [] }],
  ["image", "code-block"],
];

const editorFormats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "list",
  "ordered",
  "bullet",
  "align",
  "link",
  "image",
  "video",
  "color",
  "background",
];

const PostForm = ({ uiTitle, uiBtnText, isEditing }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [redirect, setRedirect] = useState(false);

  const uploadSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("imageUrl", imageUrl);

    const res = await fetch(`${import.meta.env.VITE_URL}/post/create`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    if (res.ok) {
      setRedirect(true);
    } else {
      alert("Something went wrong");
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <section className="w-full mx-auto">
      <h2 className="text-center font-blod text-2xl mb-3">{uiTitle}</h2>
      <form method="POST" onSubmit={uploadSubmit}>
        <div className="mb-4">
          <label>Enter your post title</label>
          <input
            type="text"
            className="input input-bordered w-full block"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label>Upload your post image </label>
          <input
            type="text"
            className="file-input file-input-bordered w-full "
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <div className="mb-24">
          <label>Enter your post description </label>
          <ReactQuill
            theme="snow"
            className="h-28"
            modules={{
              toolbar: toolbarOptions,
            }}
            formats={editorFormats}
            value={content}
            onChange={setContent}
          />
        </div>
        <button className="btn btn-neutral w-full">{uiBtnText}</button>
      </form>
    </section>
  );
};

export default PostForm;
