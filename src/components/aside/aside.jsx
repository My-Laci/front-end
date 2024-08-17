import "./aside.css";

export default function Aside() {
  return (
    <div className="aside">
      <div className="aside-post-container">
        <div className="aside-create-post-text">Create a story</div>
        <div className="aside-post-field">
          {/* <input type="post-story" placeholder="Post your story" /> */}
          {/* <textarea
            name="post-story"
            id="post-box"
            cols="30"
            rows="10"
          ></textarea> */}
          <button onClick={() => {}}>Create a Post</button>
          <button onClick={() => {}}>Create an Article</button>
        </div>
      </div>
    </div>
  );
}
