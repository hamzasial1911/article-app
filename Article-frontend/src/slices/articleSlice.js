import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8080/articles';

// Fetch articles from the backend
export const fetchArticles = createAsyncThunk('articles/fetchArticles', async () => {
  const response = await axios.get(API_URL);
  return response.data.data;  // Assuming data is in response.data.data
});

// Add a new article
export const addArticle = createAsyncThunk('articles/addArticle', async (newArticle) => {
  const response = await axios.post(API_URL, newArticle);
  return response.data;  // Return the newly added article
});

// Update an existing article
export const updateArticle = createAsyncThunk(
  'articles/updateArticle',
  async (updatedArticle) => {
    try {
      const response = await axios.put(`${API_URL}/${updatedArticle._id}`, {
        title: updatedArticle.title,
        content: updatedArticle.content,
      });
      return response.data.data;  // Return the updated article
    } catch (error) {
      console.error("Error updating article:", error);
      throw error;
    }
  }
);

// Delete an article
export const deleteArticle = createAsyncThunk('articles/deleteArticle', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;  // Return the deleted article's id
});

// Summarize an article
export const handleSummary = createAsyncThunk('articles/handleSummary', async (article) => {
  try {
    const response = await axios.get(`${API_URL}/${article._id}/summarize`);
    return { _id: article._id, summary: response.data.data.summary };  // Return the summary data along with the article's id
  } catch (error) {
    console.error('Error generating summary:', error);
    throw error;
  }
});

// Generate summaries for selected articles
export const generateSummaries = createAsyncThunk(
  'articles/generateSummaries',
  async (articleIds, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/summarize`, {
        article_ids: articleIds,
      });
      return response.data.data;  // Return the summaries
    } catch (error) {
      console.error('Error generating summary:', error);
      return rejectWithValue(error.response.data);  // Handle the error in the thunk
    }
  }
);



// export default articleSlice.reducer;

export const articleSlice = createSlice({
  name: 'articles',
  initialState: {
    articlesList: [],
    summaryData: [],
    status: 'idle',
    summaryStatus: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle successful fetch
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.articlesList = action.payload;
      })

      // Handle successful add
      .addCase(addArticle.fulfilled, (state, action) => {
        state.articlesList.push(action.payload.data);  // Add the new article to the state
      })

      // Handle successful update
      .addCase(updateArticle.fulfilled, (state, action) => {
        const index = state.articlesList.findIndex((article) => article._id === action.payload._id);
        if (index >= 0) {
          state.articlesList[index] = action.payload;
        }
      })

      // Handle successful delete
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.articlesList = state.articlesList.filter((article) => article._id !== action.payload);
      })

      // Handle summary loading state
      .addCase(handleSummary.pending, (state) => {
        state.summaryLoading = true;  // Set loading state to true when summary is being fetched
      })

      // Handle successful summary
      .addCase(handleSummary.fulfilled, (state, action) => {
        const index = state.articlesList.findIndex((article) => article._id === action.payload._id);
        if (index >= 0) {
          state.articlesList[index].summary = action.payload.summary;
        }
        state.summaryLoading = false;  // Set loading state to false once the summary is fetched
      })

      // Handle summary fetch failure
      .addCase(handleSummary.rejected, (state) => {
        state.summaryLoading = false;  // Ensure loading is false even on failure
      })
      // Handle summaries
      .addCase(generateSummaries.pending, (state) => {
        state.summaryStatus = 'loading';
      })
      .addCase(generateSummaries.fulfilled, (state, action) => {
        state.summaryData = action.payload;  // Store the generated summaries
        state.summaryStatus = 'succeeded';
      })
      .addCase(generateSummaries.rejected, (state, action) => {
        state.summaryStatus = 'failed';
        state.error = action.payload;
      });
  },
});

export default articleSlice.reducer;




// Action to generate and store an embedding for a single article
export const embedArticle = createAsyncThunk('articles/embedArticle', async (id) => {
  // const response = await axios.get(`${API_URL}/${article._id}/summarize`);
  const response = await axios.post(`${API_URL}/articles/${id}/embed`);
  return response.data;
});

// Action to embed a list of selected articles
export const embedArticlesBatch = createAsyncThunk('articles/embedArticlesBatch', async (ids) => {
  const response = await axios.post(`${API_URL}/articles/embed_batch`,{
    article_ids: ids,
  });
  return response.data;
});

// Action to search for articles similar to a given query
export const searchArticles = createAsyncThunk('articles/searchArticles', async (query) => {
  const response = await axios.get(`${API_URL}/articles/search?query=${query}`);
  return response.data;
});