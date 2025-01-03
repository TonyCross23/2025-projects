import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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

const PostForm = ({ uiTitle, uiBtnText }) => {
  return (
    <section className="w-2/3 mx-auto">
      <h2 className="text-center font-blod text-2xl mb-3">{uiTitle}</h2>
      <form>
        <div className="mb-4">
          <label>Enter your post title</label>
          <input type="text" className="input input-bordered w-full block" />
        </div>
        <div className="mb-4">
          <label>Upload your post image </label>
          <input
            type="file"
            className="file-input file-input-bordered w-full "
          />
        </div>
        <div className="mb-20">
          <label>Enter your post description </label>
          <ReactQuill
            theme="snow"
            className="h-28"
            modules={{
              toolbar: toolbarOptions,
            }}
            formats={editorFormats}
          />
        </div>
        <button className="btn btn-neutral w-full">{uiBtnText}</button>
      </form>
    </section>
  );
};

export default PostForm;
