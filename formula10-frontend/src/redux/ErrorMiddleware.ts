import { showError } from './slices/ErrorSlice';
import { AppDispatch } from './Store';

const errorMiddleware = (store: { dispatch: AppDispatch }) => (next: (arg0: any) => any) => (action: any) => {
  if (action.type.endsWith('rejected')) {
    const error = action.payload;
    store.dispatch(showError(error));
  }
  return next(action);
};

export default errorMiddleware;