import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BookByAPI } from 'types';

export const fetchBook = createAsyncThunk<BookByAPI>(
  'books/fetchBook',
  async () => {
    const res = await axios.get<BookByAPI>('http://localhost:4000/random-book');
    const bookFromAPI = res.data;

    return bookFromAPI;
  }
);
