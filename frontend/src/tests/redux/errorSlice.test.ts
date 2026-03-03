import {
  cleanError,
  errorReducer,
  selectError,
  setError,
} from 'redux/error/errorSlice';
import { RootState } from 'redux/store';

describe('errorSlice', () => {
  it('should return value from state object', () => {
    const state: Pick<RootState, 'error'> = {
      error: 'Error message',
    };

    const result = selectError(state);

    expect(result).toBe('Error message');
  });

  it('should return default value when passed an empty action', () => {
    const result = errorReducer(undefined, { type: '' });

    expect(result).toBe('');
  });

  it('should add error message with "setError" action', () => {
    const action = {
      type: setError.type,
      payload: 'Test error message',
    };

    const result = errorReducer('', action);

    expect(result).toBe('Test error message');
  });

  it('should clean error with "cleanError" action', () => {
    const action = {
      type: cleanError.type,
    };

    const result = errorReducer('Test error', action);

    expect(result).toBe('');
  });
});
