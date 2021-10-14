import { getBoardList, setBoardItem } from '../../lib/storage';
import { Board } from './board-types';

import { ADD_BOARD, GET_BOARD, CHOOSE_BOARD, MODIFY_BOARD, REMOVE_BOARD } from './board-constants';

export interface AddBoardAction {
  type: typeof ADD_BOARD;
}
export interface GetBoardAction {
  type: typeof GET_BOARD;
}
export interface ChooseBoardAction {
  type: typeof CHOOSE_BOARD;
  id: number;
}
export interface ModifyBoardAction {
  type: typeof MODIFY_BOARD;
  data: Board;
}
export interface RemoveBoardAction {
  type: typeof REMOVE_BOARD;
  id: number;
}
type BoardAction = AddBoardAction | GetBoardAction | ChooseBoardAction | ModifyBoardAction | RemoveBoardAction;

export const initialState: Board[] = [];

export default function boardReducer(state: Board[] = initialState, action: BoardAction) {
  switch (action.type) {
    case ADD_BOARD: {
      if (!state) {
        state = [];
      }
      state.map((current) => (current.isToggle = false));
      state.push({ id: state.length > 0 ? state[state.length - 1].id + 1 : 1, text: 'NEW BOARD', isToggle: true });
      setBoardItem(state);
      return [...state];
    }
    case GET_BOARD: {
      state = getBoardList();
      return state;
    }
    case CHOOSE_BOARD: {
      state.map((current) => {
        if (current.id === action.id) {
          current.isToggle = true;
        } else {
          current.isToggle = false;
        }
      });
      setBoardItem(state);
      return [...state];
    }
    case MODIFY_BOARD: {
      state.map((current) => {
        if (current.id === action.data.id) {
          current.text = action.data.text;
        }
      });
      setBoardItem(state);
      return [...state];
    }
    case REMOVE_BOARD: {
      state = state.filter((item) => item.id !== action.id);
      if (state.length > 0) {
        state[0].isToggle = true;
      }
      setBoardItem(state);
      return state;
    }
    default:
      return state;
  }
}
