import { call, put, all, debounce } from 'redux-saga/effects';
import { ADD_BOARD_CALL, CHOOSE_BOARD_CALL, GET_BOARD_CALL, MODIFY_BOARD_CALL, REMOVE_BOARD_CALL } from '../store/board/board-constants';
import {
  getBoard,
  addBoardAsync,
  addBoard,
  chooseBoardAsync,
  chooseBoard,
  modifyBoardAsync,
  modifyBoard,
  removeBoardAsync,
  removeBoard,
} from '../store/board/board-actions';
import { chooseBoardItem, getBoardList, modifyBoardItem, removeBoardItem, setBoardItem } from '../lib/storage';
import { Board } from '../store/board/board-types';

function* getBoardCall() {
  try {
    const response: Board[] = yield call(getBoardList);
    yield put(getBoard(response));
  } catch (error) {
    yield put(getBoard([]));
  }
}

function* addBoardCall(action: ReturnType<typeof addBoardAsync.request>) {
  try {
    yield put(addBoard(setBoardItem(action.payload)));
  } catch (error) {
    alert(error);
  }
}

function* chooseBoardCall(action: ReturnType<typeof chooseBoardAsync.request>) {
  try {
    yield put(chooseBoard(chooseBoardItem(action.payload)));
  } catch (error) {
    alert(error);
  }
}

function* modifyBoardCall(action: ReturnType<typeof modifyBoardAsync.request>) {
  try {
    yield put(modifyBoard(modifyBoardItem(action.payload)));
  } catch (error) {
    alert(error);
  }
}

function* removeBoardCall(action: ReturnType<typeof removeBoardAsync.request>) {
  try {
    yield put(removeBoard(removeBoardItem(action.payload)));
  } catch (error) {
    alert(error);
  }
}

export default function* rootSaga() {
  yield all([
    debounce(500, GET_BOARD_CALL, getBoardCall),
    debounce(500, ADD_BOARD_CALL, addBoardCall),
    debounce(500, CHOOSE_BOARD_CALL, chooseBoardCall),
    debounce(500, MODIFY_BOARD_CALL, modifyBoardCall),
    debounce(500, REMOVE_BOARD_CALL, removeBoardCall),
  ]);
}
