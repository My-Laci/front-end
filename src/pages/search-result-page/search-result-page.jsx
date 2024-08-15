// import React from "react";
import Navbar from "../../components/navbar/Navbar.jsx";
import Sidebar from "../../components/sidebar/sidebar.jsx";
import SearchContent from "../../components/search-result/search-result.jsx";
import "./search-result-page.css";
import Suggestion from "../../components/suggestion/suggestion.jsx";

export default function SearchResultPage() {
  return (
    <>
      <body>
        <Navbar />
        <div className="container">
          <Sidebar />
          <div className="content">
            <SearchContent />
          </div>
          <Suggestion />
        </div>
      </body>
    </>
  );
}
