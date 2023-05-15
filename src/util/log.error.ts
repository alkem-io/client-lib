import { AlkemioClientError } from '../types';

export const logError = (error: AlkemioClientError) => {
  if (error.response?.errors) {
    error.response.errors.map(err => console.error(err.message));
  } else if (error.message) {
    console.error(error.message);
  }
};
