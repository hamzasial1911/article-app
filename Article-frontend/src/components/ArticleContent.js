import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchArticles, generateSummaries, embedArticlesBatch } from '../slices/articleSlice';
import ArticleItem from './ArticleItem';
import styles from '../styles/modules/app.module.css';

function ArticleContent() {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles.articlesList);
  const summaryData = useSelector((state) => state.articles.summaryData);
  const summaryStatus = useSelector((state) => state.articles.summaryStatus);
  const [selectedArticles, setSelectedArticles] = useState([]);

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  // Handle selecting/unselecting articles
  const handleSelectArticle = (isSelected, articleId) => {
    if (isSelected) {
      setSelectedArticles((prev) => [...prev, articleId]);
    } else {
      setSelectedArticles((prev) => prev.filter((id) => id !== articleId));
    }
  };

  // Handle summary generation for selected articles
  const handleGenerateSummary = () => {
    if (selectedArticles.length === 0) {
      alert('Please select at least one article to generate the summary.');
      return;
    }
    dispatch(generateSummaries(selectedArticles));
  };

  // Handle embedding for selected articles
  const handleEmbedArticles = () => {
    if (selectedArticles.length === 0) {
      alert('Please select at least one article to embed.');
      return;
    }
    dispatch(embedArticlesBatch(selectedArticles));
  };

  return (
    <div className={styles.content__wrapper}>
      {/* Bulk actions for summaries and embedding */}
      <div className={styles.bulkActions}>
        <button onClick={handleGenerateSummary} disabled={summaryStatus === 'loading'}>
          {summaryStatus === 'loading' ? 'Generating Summaries...' : 'Generate Summary for Selected'}
        </button>
        <button onClick={handleEmbedArticles} disabled={summaryStatus === 'loading'}>
          Embed Selected Articles
        </button>
      </div>

      {/* Display Articles */}
      {articles.length > 0 ? (
        articles.map((article) => (
          <ArticleItem
            key={article._id}
            article={article}
            onSelectArticle={handleSelectArticle}
          />
        ))
      ) : (
        <p className={styles.emptyText}>No Articles Available</p>
      )}

      {/* Display Summaries */}
      {summaryData.length > 0 && (
        <div className={styles.summarySection}>
          <h2>Summaries</h2>
          {summaryData.map((summary) => (
            <div key={summary.id} className={styles.summaryItem}>
              <h3>{summary.title}</h3>
              <p>{summary.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ArticleContent;
