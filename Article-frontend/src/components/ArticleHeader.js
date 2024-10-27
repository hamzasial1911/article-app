import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addArticle } from "../slices/articleSlice";
import ArticleModal from "./ArticleModal";
import SearchModal from "./SearchModal"; // Import the SearchModal
import styles from "../styles/modules/app.module.css";

function ArticleHeader() {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false); // State for search modal
  const dispatch = useDispatch();

  const handleAddArticle = (article) => {
    dispatch(addArticle(article));
  };

  return (
    <div className={styles.header}>
      <h1>Article Management</h1>
      <button onClick={() => setModalOpen(true)}>Add Article</button>
      <button onClick={() => setSearchModalOpen(true)}>Search Articles</button> {/* Button to open search modal */}
      <ArticleModal
        open={modalOpen}
        setOpen={setModalOpen}
        onSave={handleAddArticle}
      />
      <SearchModal open={searchModalOpen} setOpen={setSearchModalOpen} /> {/* Render search modal */}
    </div>
  );
}

export default ArticleHeader;
