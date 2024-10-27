// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { handleSummary } from '../slices/articleSlice';  // Assuming this is where the API call is
// import styles from '../styles/modules/modal.module.css';

// function ArticleModal({ open, setOpen, onSave, article }) {
//   const dispatch = useDispatch();
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [summary, setSummary] = useState('');
//   const [generatingSummary, setGeneratingSummary] = useState(false);
//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     if (article) {
//       setTitle(article.title);
//       setContent(article.content);
//       setSummary(article.summary || '');  // Handle summary if provided
//     }
//   }, [article]);

//   // Save article without closing the modal
//   const handleSave = async () => {
//     setSaving(true);
//     const updatedArticle = {
//       _id: article?._id,
//       title,
//       content,
//     };

//     // Save the article
//     onSave(updatedArticle);
//     setSaving(false);
//   };

//   // Generate summary without closing the modal
//   const handleGenerateSummary = async () => {
//     setGeneratingSummary(true);
//     try {
//       const response = await dispatch(handleSummary(article));  // Dispatch handleSummary action from Redux
//       if (response.payload && response.payload.summary) {
//         setSummary(response.payload.summary);  // Update summary in the modal
//       }
//     } catch (error) {
//       console.error('Error generating summary:', error);
//     } finally {
//       setGeneratingSummary(false);
//     }
//   };

//   if (!open) return null;

//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.container}>
//         <div className={styles.header}>
//           <h2>Edit Article</h2>
//           <div className={styles.buttonContainer}>
//             {/* Save Button */}
//             <button onClick={handleSave} disabled={saving}>
//               {saving ? 'Saving...' : 'Save'}
//             </button>
//             {/* Generate Summary Button */}
//             <button onClick={handleGenerateSummary} disabled={generatingSummary}>
//               {generatingSummary ? 'Generating Summary...' : 'Generate Summary'}
//             </button>
//             <button onClick={() => setOpen(false)}>Close</button>
//           </div>
//         </div>

//         {/* Form for editing title and content */}
//         <div className={styles.form}>
//           <label className={styles.formTitle}>
//             Title:
//             <input value={title} onChange={(e) => setTitle(e.target.value)} />
//           </label>
//           <label className={styles.formTitle}>
//             Content:
//             <textarea
//               className={styles.textarea}
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//             />
//           </label>
//         </div>

//         {/* Display summary if available */}
//         {summary && (
//           <div className={styles.summary}>
//             <h3>Summary</h3>
//             <p>{summary}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ArticleModal;




import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { handleSummary, embedArticle } from '../slices/articleSlice';  // Import the embed action
import styles from '../styles/modules/modal.module.css';

function ArticleModal({ open, setOpen, onSave, article }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [summary, setSummary] = useState('');
  const [generatingSummary, setGeneratingSummary] = useState(false);
  const [embedding, setEmbedding] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setContent(article.content);
      setSummary(article.summary || '');  // Handle summary if provided
    }
  }, [article]);

  // Save article without closing the modal
  const handleSave = async () => {
    setSaving(true);
    const updatedArticle = {
      _id: article?._id,
      title,
      content,
    };

    // Save the article
    onSave(updatedArticle);
    setSaving(false);
  };

  // Generate summary without closing the modal
  const handleGenerateSummary = async () => {
    setGeneratingSummary(true);
    try {
      const response = await dispatch(handleSummary(article));  // Dispatch handleSummary action from Redux
      if (response.payload && response.payload.summary) {
        setSummary(response.payload.summary);  // Update summary in the modal
      }
    } catch (error) {
      console.error('Error generating summary:', error);
    } finally {
      setGeneratingSummary(false);
    }
  };

  // Embed article without closing the modal
  const handleEmbed = async () => {
    setEmbedding(true);
    try {
      await dispatch(embedArticle(article._id));  // Dispatch embedArticle action
      alert('Article embedded successfully.');  // Notify user
    } catch (error) {
      console.error('Error embedding article:', error);
    } finally {
      setEmbedding(false);
    }
  };

  if (!open) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Edit Article</h2>
          <div className={styles.buttonContainer}>
            {/* Save Button */}
            <button onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : 'Save'}
            </button>
            {/* Generate Summary Button */}
            <button onClick={handleGenerateSummary} disabled={generatingSummary}>
              {generatingSummary ? 'Generating Summary...' : 'Generate Summary'}
            </button>
            {/* Embed Button */}
            <button onClick={handleEmbed} disabled={embedding}>
              {embedding ? 'Embedding...' : 'Embed Article'}
            </button>
            <button onClick={() => setOpen(false)}>Close</button>
          </div>
        </div>

        {/* Form for editing title and content */}
        <div className={styles.form}>
          <label className={styles.formTitle}>
            Title:
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
          <label className={styles.formTitle}>
            Content:
            <textarea
              className={styles.textarea}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </label>
        </div>

        {/* Display summary if available */}
        {summary && (
          <div className={styles.summary}>
            <h3>Summary</h3>
            <p>{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ArticleModal;
