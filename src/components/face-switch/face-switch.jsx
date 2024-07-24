import React, { useState } from "react";
import "./face-switch.css";

const FaceSwitch = ({ onSwitch }) => {
  const [selected, setSelected] = useState("posts");

  const handleSwitch = (type) => {
    setSelected(type);
    onSwitch(type);
  };

  return (
    <div className="switch-container">
      <div
        className={`switch-option ${selected === "posts" ? "active" : ""}`}
        onClick={() => handleSwitch("posts")}
      >
        Posts
      </div>
      <div
        className={`switch-option ${selected === "articles" ? "active" : ""}`}
        onClick={() => handleSwitch("articles")}
      >
        Articles
      </div>
    </div>
  );
};

export default FaceSwitch;
