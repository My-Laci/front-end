import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import { useDropzone } from "react-dropzone";
import "react-quill/dist/quill.snow.css";
import "./CreateArticle.css";

import UploudIcon from "../../assets/Upload-icon.svg";

export default function CreateArticle() {
  const [thumbnail, setThumbnail] = useState(null);
  const [content, setContent] = useState("");
  const fileInputRef = useRef(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setThumbnail(URL.createObjectURL(file));
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  const handleDeleteThumbnail = (e) => {
    e.stopPropagation(); // Prevent the click event from propagating to parent elements
    setThumbnail(null);
    fileInputRef.current.value = null;
  };

  return (
    <div className="create-article-container">
      <div className="create-article-content">
        <div className="create-article-thumbnail-space" {...getRootProps()}>
          <button className="create-article-back-button">
            <i class="fa-solid fa-xmark"></i>
          </button>
          <input
            {...getInputProps()}
            ref={fileInputRef}
            style={{ display: "none" }}
          />
          {thumbnail ? (
            <div className="create-article-thumbnail-container">
              <img
                src={thumbnail}
                alt="Thumbnail"
                className="create-article-thumbnail"
              />
              <button onClick={handleDeleteThumbnail}>Remove Thumbnail</button>
            </div>
          ) : (
            <div className="create-article-upload-icon">
              <img src={UploudIcon} alt="" />
              <h3>Upload Your Thumbnail Here!</h3>
            </div>
          )}
        </div>
        <input
          type="text"
          className="create-article-title-input"
          placeholder="Write your title here..."
        />
        <ReactQuill
          className="create-article-textarea"
          value={content}
          onChange={setContent}
          placeholder="Write your article here..."
          modules={{
            toolbar: [
              [{ list: "ordered" }, { list: "bullet" }],
              ["bold", "italic", "underline"],
            ],
          }}
        />
        <div className="publish-button-create-article">
            <button>Publish</button>
          </div>
      </div>
    </div>
  );
}
