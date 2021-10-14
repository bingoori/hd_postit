import { createAsyncAction } from 'typesafe-actions';
import { Board } from './board-types';
import {
  ADD_BOARD_CALL,
  ADD_BOARD,
  GET_BOARD_CALL,
  GET_BOARD,
  CHOOSE_BOARD_CALL,
  CHOOSE_BOARD,
  MODIFY_BOARD_CALL,
  MODIFY_BOARD,
  REMOVE_BOARD_CALL,
  REMOVE_BOARD,
} from './board-constants';

export const addBoard = (data: Board[]) => ({ type: ADD_BOARD, data });
export const getBoard = (data: Board[]) => ({ type: GET_BOARD, data });
export const chooseBoard = (data: Board[]) => ({ type: CHOOSE_BOARD, data });
export const modifyBoard = (data: Board[]) => ({ type: MODIFY_BOARD, data });
export const removeBoard = (data: Board[]) => ({ type: REMOVE_BOARD, data });
interface AddBoardAction {
  type: typeof ADD_BOARD;
  data: Board[];
}
interface GetBoardAction {
  type: typeof GET_BOARD;
  data: Board[];
}
interface ChooseBoardAction {
  type: typeof CHOOSE_BOARD;
  data: Board[];
}
interface ModifyBoardAction {
  type: typeof MODIFY_BOARD;
  data: Board[];
}
interface RemoveBoardAction {
  type: typeof REMOVE_BOARD;
  data: Board[];
}

export type BoardAction = AddBoardAction | GetBoardAction | ChooseBoardAction | ModifyBoardAction | RemoveBoardAction;

export const getBoardAsync = createAsyncAction(GET_BOARD_CALL, GET_BOARD, GET_BOARD);
export const addBoardAsync = createAsyncAction(ADD_BOARD_CALL, ADD_BOARD, ADD_BOARD)<Board, Board, Board>();
export const chooseBoardAsync = createAsyncAction(CHOOSE_BOARD_CALL, CHOOSE_BOARD, CHOOSE_BOARD)<number, Board, Board>();
export const modifyBoardAsync = createAsyncAction(MODIFY_BOARD_CALL, MODIFY_BOARD, MODIFY_BOARD)<Board, Board, Board>();
export const removeBoardAsync = createAsyncAction(REMOVE_BOARD_CALL, REMOVE_BOARD, REMOVE_BOARD)<number, number, number>();
