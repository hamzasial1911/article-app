// src/App.js
import React from 'react';
import { Toaster } from 'react-hot-toast';
import ArticleContent from './components/ArticleContent';
import ArticleHeader from './components/ArticleHeader';
import styles from './styles/modules/app.module.css';

function App() {
  return (
    <>
      <div className="container">
        <div className={styles.app__wrapper}>
          <ArticleHeader />
          <ArticleContent />
        </div>
      </div>
      <Toaster position="bottom-right" toastOptions={{ style: { fontSize: '1.4rem' } }} />
    </>
  );
}

export default App;
