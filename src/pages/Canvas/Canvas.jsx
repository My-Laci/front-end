import CreatePost from "../../components/create-post/CreatePost";
import CreateArticle from "../../components/create-article/CreateArticle";
import React, { useState } from "react";

import "./Canvas.css";

export default function Canvas() {
  return (
    <div className="canvas-container">
      {/* <CreatePost /> */}
      <CreateArticle />
    </div>
  );
}
