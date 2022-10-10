import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';
import { getMe } from './../auth/authSlice';

const initialState = {
  posts: [],
  popularPosts: [],
  loading: false,
};

export const createPost = createAsyncThunk('post/createPost', async (params, {dispatch}) => {
  try {
    const { data } = await axios.post('/post', params);
    await dispatch(getMe())
    return data;
  } catch (error) {
    console.log(error);
  }
});
export const updatePost = createAsyncThunk('post/updatePost', async (params) => {
  try {
    const { data } = await axios.put(`/post/${params.id}`, params);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const getAllPosts = createAsyncThunk('post/getAllPosts', async () => {
  try {
    const { data } = await axios.get('/post');
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const removePost = createAsyncThunk('post/removePost', async (id) => {
  try {
    const { data } = await axios.delete(`/post/${id}`, id);
    return { ...data, id };
  } catch (e) {
    console.log(e);
  }
});

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: {
    //Создание поста
    [createPost.pending]: (state) => {
      state.loading = true;
    },
    [createPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts.unshift(action.payload);
    },
    [createPost.rejected]: (state) => {
      state.loading = false;
    },
    //Изменение поста
    [updatePost.pending]: (state) => {
      state.loading = true;
    },
    [updatePost.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [updatePost.rejected]: (state) => {
      state.loading = false;
    },
    //Получение всех постов
    [getAllPosts.pending]: (state) => {
      state.loading = true;
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = action.payload.posts;
      state.popularPosts = action.payload.popularPosts;
    },
    [getAllPosts.rejected]: (state) => {
      state.loading = false;
    },
    //Удаление поста
    [removePost.pending]: (state) => {
      state.loading = true;
    },
    [removePost.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = state.posts.filter((post) => post._id !== action.payload.id);
    },
    [removePost.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default postSlice.reducer;
