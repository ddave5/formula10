import eventBus from './eventBus';
import { store } from '../redux/Store';
import { showError } from '../redux/slices/ErrorSlice';

// Előfizetés a globális hibákra
eventBus.on('error', (message: string) => {
  store.dispatch(showError(message));  // Dispatch az errorReducer-hez
});
