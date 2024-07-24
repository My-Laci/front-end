import "./aside.css";

export default function Aside() {
  return (
    <div className="aside">
      <div className="post-container">
        <div className="create-post-text">Create a story</div>
        <div className="post-field">
          {/* <input type="post-story" placeholder="Post your story" /> */}
          <textarea
            name="post-story"
            id="post-box"
            cols="30"
            rows="10"
          ></textarea>
        </div>
      </div>
    </div>
  );
}
