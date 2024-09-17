import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import UploudIcon from "../../assets/Upload-icon.svg";
import CancleButton from "../../assets/remove-button.svg";
import WhiteBackButton from "../../assets/white-xmark.svg";
import "./CreatePost.css";
import axios from "axios";

export default function CreatePost({ onClose, post }) {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (post) {
      axios
        .get(`http://localhost:8080/post/detail/${post._id}`)
        .then((response) => {
          const post = response.data.getData;
          setTextareaValue(post.caption || "");
          setTags(post.tag || []);
          const fetchedFiles = post.imageContent || [];
          setFiles(fetchedFiles);
          if (fetchedFiles.length > 0) {
            setSelectedFile(fetchedFiles[0]);
          }
          setIsEditing(true);
        })
        .catch((error) => {
          console.error("Error fetching post data:", error);
        });
    } else {
      setIsEditing(false);
    }
  }, [post]);

  const onDrop = (acceptedFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    if (selectedFile === null && acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
    accept: "image/*,video/*",
    disabled: isEditing,
  });

  const handleRemove = (index, event) => {
    event.stopPropagation();
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    if (selectedFile === files[index]) {
      setSelectedFile(newFiles[0] || null);
    }
  };

  const handleSelect = (file) => {
    setSelectedFile(file);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleTextareaChange = (e) => {
    setTextareaValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const createOrUpdatePostHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("caption", textareaValue);
    tags.forEach((tag) => formData.append("tag", tag));
    files.forEach((file) => {
      if (file instanceof File) {
        formData.append("imageContent", file);
      } else {
        formData.append("imageContent", file);
      }
    });

    try {
      const url = isEditing
        ? `http://localhost:8080/post/${post._id}`
        : "http://localhost:8080/post";

      const method = isEditing ? "put" : "post";

      const response = await axios({
        method,
        url,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      console.log(
        `${isEditing ? "Update" : "Post"} successful:`,
        response.data
      );
      setFiles([]);
      setSelectedFile(null);
      setInputValue("");
      setTextareaValue("");
      setTags([]);
      onClose();
    } catch (error) {
      console.error(
        `Error ${isEditing ? "updating" : "posting"}:`,
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const getFileType = (file) => {
    if (typeof file === "string") {
      return file.endsWith(".mp4") || file.endsWith(".webm") ? "video" : "image";
    } else if (file instanceof File) {
      return file.type.startsWith("image/") ? "image" : "video";
    }
    return "unknown";
  };

  return (
    <form className="create-post-form" onSubmit={createOrUpdatePostHandler}>
      <div className="create-post-content">
        <div className="create-post-content-left-side">
          <div {...getRootProps({ className: "create-post-uploud-box" })}>
            <input {...getInputProps()} />
            {files.length === 0 ? (
              <div className="pre-uploud-create-post">
                <img
                  className="pre-uploud-create-post-icon"
                  src={UploudIcon}
                  alt="Upload Icon"
                />
                <h3>Upload Your Image or Video Here!</h3>
              </div>
            ) : (
              <div className="create-post-uploaded-content">
                {selectedFile && (
                  <div className="detail-post-content">
                    {getFileType(selectedFile) === "image" ? (
                      <img
                        src={typeof selectedFile === "string" ? selectedFile : URL.createObjectURL(selectedFile)}
                        alt="detail"
                        className="detail-post-image"
                      />
                    ) : getFileType(selectedFile) === "video" ? (
                      <video
                        src={typeof selectedFile === "string" ? selectedFile : URL.createObjectURL(selectedFile)}
                        controls
                        className="detail-post-video"
                      />
                    ) : null}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="preview-create-post">
            {files.map((file, index) => (
              <div
                key={index}
                className={`post-file-preview ${file === selectedFile ? "selected" : ""}`}
                onClick={() => handleSelect(file)}
              >
                {getFileType(file) === "image" ? (
                  <img
                    src={typeof file === "string" ? file : URL.createObjectURL(new File([file], "file"))}
                    alt="preview"
                    className="file-thumbnail-create-post"
                  />
                ) : getFileType(file) === "video" ? (
                  <video
                    src={typeof file === "string" ? file : URL.createObjectURL(new File([file], "file"))}
                    controls
                    className="file-thumbnail-create-post"
                  />
                ) : null}
                {!isEditing && (
                  <button
                    onClick={(event) => handleRemove(index, event)}
                    className="remove-button-create-post"
                  >
                    <img src={CancleButton} alt="Remove" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="create-post-container-right-side">
          <div className="upper-create-post-container-right-side">
            <div className="inside-create-post-container">
              <div className="create-post-tag-maker">
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Type and press Enter"
                />

                <div className="create-post-tag-list">
                  {tags.map((tag, index) => (
                    <div className="create-post-tag" key={index}>
                      <p>{tag}</p>
                      <img
                        src={WhiteBackButton}
                        alt="Remove Tag"
                        onClick={() => handleTagRemove(tag)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="create-post-caption">
                <textarea
                  value={textareaValue}
                  onChange={handleTextareaChange}
                  placeholder="Write the caption here ..."
                ></textarea>
              </div>
            </div>

            <a
              className="back-button-create-post"
              onClick={(e) => {
                e.preventDefault();
                onClose();
              }}
            >
              <i className="fa-solid fa-xmark"></i>
            </a>
          </div>
          <div className="publish-button-create-post">
            <button type="submit" disabled={loading}>
              {loading ? "Submitting..." : isEditing ? "Update Post" : "Create Post"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
