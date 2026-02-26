import axios from 'axios';
import { fetchBook } from 'redux/books/asyncActions/fetchBook';
import type { BookByAPI } from 'types';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchBook', () => {
  it('should fetchBook with resolved response', async () => {
    const mockBook: BookByAPI = {
      title: 'Test title API',
      author: 'Test author API',
      year: 1233,
    };

    const dispatch = jest.fn();
    const getState = jest.fn();
    const thunk = fetchBook();

    mockedAxios.get.mockResolvedValue({ data: mockBook });

    await thunk(dispatch, getState, undefined);

    const { calls } = dispatch.mock;
    const [start, end] = calls;

    expect(dispatch).toHaveBeenCalledTimes(2);

    expect(start[0].type).toBe(fetchBook.pending.type);

    expect(end[0].type).toBe(fetchBook.fulfilled.type);
    expect(end[0].payload).toEqual(mockBook);
  });

  it('should fetchBook with rejected response', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Network error'));

    const dispatch = jest.fn();
    const getState = jest.fn();

    await fetchBook()(dispatch, getState, undefined);

    expect(dispatch.mock.calls[0][0].type).toBe(fetchBook.pending.type);
    expect(dispatch.mock.calls[2][0].type).toBe(fetchBook.rejected.type);
    expect(dispatch.mock.calls[2][0].payload).toBe('Network error');
  });
});
