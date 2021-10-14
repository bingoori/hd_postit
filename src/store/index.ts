import { combineReducers } from 'redux';
import boardReducer from './board/board-reducers';
import stickyReducer from './sticky/sticky-reducers';

const rootReducer = combineReducers({
  boardReducer,
  stickyReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
