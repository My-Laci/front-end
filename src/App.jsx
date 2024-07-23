import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/sidebar";
import PostContent from "./components/post-content";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Sidebar />
        <div className="content">
          <PostContent />
          {/* <AccountInfo /> */}
        </div>
        {/* <Aside />x */}
      </div>
    </>
  );
}

export default App;
