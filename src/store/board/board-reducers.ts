import { Board } from './board-types';
import { ADD_BOARD, GET_BOARD, CHOOSE_BOARD, MODIFY_BOARD, REMOVE_BOARD } from './board-constants';
import { BoardAction } from './board-actions';

export const initialState: Board[] = [];

const boardReducer = (state: Board[] = initialState, action: BoardAction) => {
  switch (action.type) {
    case ADD_BOARD: {
      return [...action.data];
    }
    case GET_BOARD: {
      return [...action.data];
    }
    case CHOOSE_BOARD: {
      return [...action.data];
    }
    case MODIFY_BOARD: {
      return [...action.data];
    }
    case REMOVE_BOARD: {
      return [...action.data];
    }
    default:
      return state;
  }
};

export default boardReducer;
