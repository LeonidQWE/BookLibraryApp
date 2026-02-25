import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setError } from 'redux/error/errorSlice';
import { BookByAPI } from 'types';

export const fetchBook = createAsyncThunk<BookByAPI>(
  'books/fetchBook',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get<BookByAPI>(
        'http://localhost:4000/random-book-delayed'
      );
      const bookFromAPI = res.data;

      return bookFromAPI;
    } catch (error) {
      thunkAPI.dispatch(setError(error.message));
      throw error;
    }
  }
);
