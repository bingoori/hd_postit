import { combineReducers } from 'redux';
import boardReducer from './board/board-reducers';
import stickyReducer from './sticky/sticky-reducers';

const rootReducer = combineReducers({
  boardReducer,
  stickyReducer,
});
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
