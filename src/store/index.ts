import { combineReducers } from 'redux';
import boardReducer from './board/board-store';
import stickyReducer from './sticky/sticky-store';

const rootReducer = combineReducers({
  boardReducer,
  stickyReducer,
});
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
