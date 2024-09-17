import { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import "./CreateArticle.css";
import UploadIcon from "../../assets/Upload-icon.svg";

export default function CreateArticle({ onClose, article }) {
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState(""); // Untuk gambar yang sudah ada
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [notification, setNotification] = useState(null);
  const fileInputRef = useRef(null);

  // Mengambil detail artikel jika sedang mengedit
  useEffect(() => {
    if (article && article._id) {
      const fetchArticle = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/articles/${article._id}`
          );
          const { title, content, image } = response.data;
          setTitle(title);
          setContent(content);
          if (image) {
            setThumbnailUrl(image); // Setel URL untuk gambar yang ada
          }
        } catch (error) {
          console.error("Error fetching article:", error);
        }
      };
      fetchArticle();
    }
  }, [article]);

  // Fungsi saat file didrop atau diunggah
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setThumbnail(file);
      setThumbnailUrl(""); // Kosongkan URL jika thumbnail baru diunggah
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  // Hapus thumbnail
  const handleDeleteThumbnail = (e) => {
    e.stopPropagation();
    setThumbnail(null);
    setThumbnailUrl(""); // Hapus file dan URL
    fileInputRef.current.value = null;
  };

  // Kembali ke halaman sebelumnya
  const handleBackButtonClick = (e) => {
    e.stopPropagation();
    onClose();
  };

  // Menangani perubahan pada input judul
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // Fungsi untuk mempublish atau mengupdate artikel
  const handlePublish = async () => {
    if (!title || !content) {
      setNotification({
        type: "error",
        message: "Title and content are required.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (thumbnail) {
      formData.append("image", thumbnail);
    }

    // Cek data yang dikirim
    for (let [key, value] of formData.entries()) {
      console.log(("Ini data yang kau update"),key, value);
    }

    try {
      const url =
        article && article._id
          ? `http://localhost:8080/articles/${article._id}`
          : "http://localhost:8080/articles";

      const method = article && article._id ? "put" : "post";

      const response = await axios({
        method,
        url,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response from server:", response.data);

      setNotification({
        type: "success",
        message: `Article ${
          article && article._id ? "updated" : "created"
        } successfully!`,
      });

      setTitle("");
      setContent("");
      setThumbnail(null);
      setThumbnailUrl("");
      onClose();
    } catch (error) {
      console.error(
        `Error ${article && article._id ? "updating" : "creating"} article:`,
        error.response ? error.response.data : error.message
      );
      setNotification({
        type: "error",
        message: `Failed to ${
          article && article._id ? "update" : "create"
        } article. Please try again.`,
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
          ) : thumbnailUrl ? (
            <div className="create-article-thumbnail-container">
              <img
                src={thumbnailUrl}
                alt="Thumbnail"
                className="create-article-thumbnail"
              />
              <button onClick={handleDeleteThumbnail}>Remove Thumbnail</button>
            </div>
          ) : (
            <div className="create-article-upload-icon">
              <img src={UploadIcon} alt="Upload Icon" />
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
          {article && article._id ? "Update" : "Publish"}
        </button>
      </div>
    </div>
  );
}
