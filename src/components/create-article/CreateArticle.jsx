import { useState, useRef } from "react";
import ReactQuill from "react-quill";
import { useDropzone } from "react-dropzone";
import "react-quill/dist/quill.snow.css";
import "./CreateArticle.css";

import UploadIcon from "../../assets/Upload-icon.svg";

export default function CreateArticle({ onClose }) {
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
    e.stopPropagation(); 
    setThumbnail(null); 
    fileInputRef.current.value = null; 
  };

  const handleBackButtonClick = (e) => {
    e.stopPropagation(); 
    onClose(); 
  };

  return (
    <div className="create-article-container">
      <div className="create-article-content">
        <div className="create-article-thumbnail-space" {...getRootProps()}>
          <button
            className="create-article-back-button"
            onClick={handleBackButtonClick}
          >
            <i className="fa-solid fa-xmark"></i>
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
              <img src={UploadIcon} alt="" />
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
        <button className="create-article-publish-button">Publish</button>
      </div>
    </div>
  );
}
