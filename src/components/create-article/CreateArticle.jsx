import { useState, useRef } from "react";
import ReactQuill from "react-quill";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import "./CreateArticle.css";

import UploadIcon from "../../assets/Upload-icon.svg";

export default function CreateArticle({ onClose }) {
  const [thumbnail, setThumbnail] = useState(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState(""); // State for title
  const [notification, setNotification] = useState(null); // State for notification
  const fileInputRef = useRef(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setThumbnail(file);
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

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handlePublish = async () => {
    if (!title || !content || !thumbnail) {
      setNotification({
        type: "error",
        message: "Title, content, and thumbnail are required.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", thumbnail);

    try {
      const response = await axios.post(
        "http://localhost:8080/articles",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Article created successfully:", response.data);

      setNotification({
        type: "success",
        message: "Article created successfully!",
      });

      setTitle("");
      setContent("");
      setThumbnail(null);

      onClose();
    } catch (error) {
      console.error(
        "Error creating article:",
        error.response ? error.response.data : error.message
      );
      setNotification({
        type: "error",
        message: "Failed to create article. Please try again.",
      });
    }
  };

  return (
    <div className="create-article-container">
      <div className="create-article-content">
        {notification && (
          <div
            className={`create-article-notification ${
              notification.type === "success"
                ? "notification-success"
                : "notification-error"
            }`}
          >
            {notification.message}
          </div>
        )}
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
                src={URL.createObjectURL(thumbnail)}
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
          value={title}
          onChange={handleTitleChange}
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
        <button
          className="create-article-publish-button"
          onClick={handlePublish}
        >
          Publish
        </button>
      </div>
    </div>
  );
}
