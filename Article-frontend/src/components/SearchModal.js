// src/components/SearchModal.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchArticles } from "../slices/articleSlice"; // Import the searchArticles action
import styles from "../styles/modules/modal.module.css";

function SearchModal({ open, setOpen }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSearch = async () => {
    if (!query) {
      alert("Please enter a search query.");
      return;
    }

    setLoading(true);
    try {
      const response = await dispatch(searchArticles(query)); // Dispatch the search action
      if (response.payload && response.payload.data) {
        setResults(response.payload.data); // Set results from API response
      }
    } catch (error) {
      console.error("Error searching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyId = (id) => {
    navigator.clipboard
      .writeText(id)
      .then(() => {
        alert("Article ID copied to clipboard!");
      })
      .catch((error) => {
        console.error("Error copying ID:", error);
      });
  };

  if (!open) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Search Articles</h2>
          <button onClick={() => setOpen(false)}>Close</button>
        </div>
        <div className={styles.form}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter search query"
          />
          <button onClick={handleSearch} disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
        {results.length > 0 && (
  <div className={styles.results}>
    <h3>Search Results</h3>
    <ul>
      {results.map((article) => (
        <li key={article.id} className={styles.resultItem}>
          <div className={styles.row}>
            <span className={styles.label}>Article ID:</span>
            <span
              className={styles.articleId}
              onClick={() => handleCopyId(article.id)}
            >
              {article.id}
            </span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Score:</span>
            <span className={styles.articleScore}>{article.score}</span>
          </div>
        </li>
      ))}
    </ul>
  </div>
)}

      </div>
    </div>
  );
}

export default SearchModal;
