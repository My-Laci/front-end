// import React from "react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar.jsx";
import Sidebar from "../../components/sidebar/sidebar.jsx";
import SearchResults from "../../components/search-result/search-result.jsx";
import "./search-result-page.css";
import Suggestion from "../../components/suggestion/suggestion.jsx";

export default function SearchResultPage() {
  const [searchParams] = useSearchParams(); // Hook to get query params
  const [results, setResults] = useState({
    articles: [],
    posts: [],
    users: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = searchParams.get("q");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8080/search?q=${query}`
        );
        setResults(response.data); // Assuming the API returns an object with articles, posts, and users arrays
      } catch (err) {
        setError("Failed to fetch search results.");
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  return (
    <div className="searchpage-container">
      <div className="searchpage-content">
        <div className="content">
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {!loading && !error && <SearchResults results={results} />}
        </div>
      </div>
      {/* <Suggestion /> */}
    </div>
  );
}
