import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

import UploudIcon from "../../assets/Upload-icon.svg";
import CancleButton from "../../assets/remove-button.svg";
import BackButton from "../../assets/xmark.svg";
import WhiteBackButton from "../../assets/white-xmark.svg";

import "./CreatePost.css";

export default function CreatePost() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

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

  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="create-post-container">
      <div className="create-post-content">
        <div className="create-post-content-left-side">
          <div {...getRootProps({ className: "create-post-uploud-box" })}>
            <input {...getInputProps()} />
            {files.length === 0 ? (
              <div className="pre-uploud-create-post">
                <img
                  className="pre-uploud-create-post-icon"
                  src={UploudIcon}
                  alt=""
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

              <div className="create-post-caption">
                <textarea
                  name=""
                  id=""
                  placeholder="Write the caption here ..."
                ></textarea>
              </div>
            </div>
            <a className="back-buton-create-post" href="#">
              <i class="fa-solid fa-xmark"></i>
            </a>
          </div>
          <div className="publish-button-create-post">
            <button>Publish</button>
          </div>
        </div>
      </div>
    </div>
  );
}
