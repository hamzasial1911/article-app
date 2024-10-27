import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteArticle, updateArticle, handleSummary } from '../slices/articleSlice';
import ArticleModal from './ArticleModal';
import styles from '../styles/modules/articleItem.module.css';

function ArticleItem({ article, onSelectArticle }) {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [summaryModalOpen, setSummaryModalOpen] = useState(false);

  
  // Handle article deletion
  const handleDelete = () => {
    dispatch(deleteArticle(article._id));
  };

  // Handle article update
  const handleUpdate = (updatedArticle) => {
    dispatch(updateArticle(updatedArticle));
    setModalOpen(false);  // Close update modal
  };

  // Handle summary generation
  const handleSummaryClick = async () => {
    dispatch(handleSummary(article));  // Assuming handleSummary dispatches an action to generate the summary
    setSummaryModalOpen(true);  // Open summary modal
  };

  return (
    <div className={styles.item}>
      <div className={styles.header}>
      <input 
          type="checkbox" 
          onChange={(e) => onSelectArticle(e.target.checked, article._id)} 
        />
        <h3 className={styles.title}>{article.title}</h3>
        <div className={styles.actions}>
          {/* Summary Button */}
          <button onClick={handleSummaryClick}>Summary</button>
          {/* Update Button */}
          <button onClick={() => setModalOpen(true)}>Update</button>
          {/* Delete Button */}
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
      <p>{article.content}</p>

      {/* Update Modal */}
      {modalOpen && (
        <ArticleModal
          open={modalOpen}
          setOpen={setModalOpen}
          onSave={handleUpdate}
          article={article} // Pass full article for update
        />
      )}

      {/* Summary Modal - If implemented as a separate modal */}
      {summaryModalOpen && (
        <ArticleModal
          open={summaryModalOpen}
          setOpen={setSummaryModalOpen}
          article={article} // Pass full article for summary
          summaryOnly={true}  // Optional prop to indicate this is a summary modal
        />
      )}
    </div>
  );
}

export default ArticleItem;