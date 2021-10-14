import { Board } from './board-types';
import { ADD_BOARD, GET_BOARD, CHOOSE_BOARD, MODIFY_BOARD, REMOVE_BOARD } from './board-constants';

export const addBoard = () => ({ type: ADD_BOARD });
export const getBoard = () => ({ type: GET_BOARD });
export const chooseBoard = (id: number) => ({ type: CHOOSE_BOARD, id });
export const modifyBoard = (data: Board) => ({ type: MODIFY_BOARD, data });
export const removeBoard = (id: number) => ({ type: REMOVE_BOARD, id });

export type BoardAction =
  | ReturnType<typeof addBoard>
  | ReturnType<typeof getBoard>
  | ReturnType<typeof chooseBoard>
  | ReturnType<typeof modifyBoard>
  | ReturnType<typeof removeBoard>;
