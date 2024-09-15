import { useState } from "react";
import { useDropzone } from "react-dropzone";
import UploudIcon from "../../assets/Upload-icon.svg";
import CancleButton from "../../assets/remove-button.svg";
import WhiteBackButton from "../../assets/white-xmark.svg";
import "./CreatePost.css";
import axios from "axios";

export default function CreatePost({ onClose }) {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [tags, setTags] = useState([]);

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
  });

  const handleRemove = (index, event) => {
    event.stopPropagation();
    const newFiles = files.filter((file, i) => i !== index);
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
      // Check if the tag already exists to avoid duplicates
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const createPostHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("caption", textareaValue);
    tags.forEach((tag) => formData.append("tag", tag));

    files.forEach((file) => formData.append("imageContent", file));

    try {
      const response = await axios.post(
        "http://localhost:8080/post",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log("Post successful:", response.data);
      // Clear form state
      setFiles([]);
      setSelectedFile(null);
      setInputValue("");
      setTextareaValue("");
      setTags([]);
      onClose();
    } catch (error) {
      console.error(
        "Error posting:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <form className="create-post-form" onSubmit={createPostHandler}>
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
                    {selectedFile.type.startsWith("image/") ? (
                      <img
                        src={URL.createObjectURL(selectedFile)}
                        alt="detail"
                        className="detail-post-image"
                      />
                    ) : (
                      <video
                        src={URL.createObjectURL(selectedFile)}
                        controls
                        className="detail-post-video"
                      />
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="preview-create-post">
            {files.map((file, index) => (
              <div
                key={index}
                className={`post-file-preview ${
                  file === selectedFile ? "selected" : ""
                }`}
                onClick={() => handleSelect(file)}
              >
                {file.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="file-thumbnail-create-post"
                  />
                ) : (
                  <video
                    src={URL.createObjectURL(file)}
                    controls
                    className="file-thumbnail-create-post"
                  />
                )}
                <button
                  onClick={(event) => handleRemove(index, event)}
                  className="remove-button-create-post"
                >
                  <img src={CancleButton} alt="" />
                </button>
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
                        alt=""
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
            <button type="submit">Publish</button>
          </div>
        </div>
      </div>
    </form>
  );
}
