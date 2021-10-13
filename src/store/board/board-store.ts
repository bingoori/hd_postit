import { getBoardList, setBoardItem } from '../../lib/storage';
import { Board } from './board-types';
// Action Type
const ADD_BOARD = 'board/ADD_BOARD' as const;
const GET_BOARD = 'board/GET_BOARD' as const;
const CHOOSE_BOARD = 'board/CHOOSE_BOARD' as const;
const MODIFY_BOARD = 'board/MODIFY_BOARD' as const;
const REMOVE_BOARD = 'board/REMOVE_BOARD' as const;

// Action Creators
export const addBoard = () => ({ type: ADD_BOARD });
export const getBoard = () => ({ type: GET_BOARD });
export const chooseBoard = (id: number) => ({ type: CHOOSE_BOARD, payload: id });
export const modifyBoard = (data: Board) => ({ type: MODIFY_BOARD, payload: data });
export const removeBoard = (id: number) => ({ type: REMOVE_BOARD, payload: id });

// 액션 객체 타입 설정
// ReturnType --> 타입스크립트의 특정함수의 반환 타입을 추출해내는 제네릭 타입으로
// 이를 통해 interface 중복작성을 피할 수 있다.
type BoardAction =
  | ReturnType<typeof addBoard>
  | ReturnType<typeof getBoard>
  | ReturnType<typeof chooseBoard>
  | ReturnType<typeof modifyBoard>
  | ReturnType<typeof removeBoard>;
//---- 리듀서에 전달 할 state에 대한 처리 ----
export const initialState: Board[] = [];
// ------------------------------------
// Reducer
export default function boardReducer(state: Board[] = initialState, action: BoardAction): Board[] {
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
        if (current.id === action.payload) {
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
        if (current.id === action.payload.id) {
          current.text = action.payload.text;
        }
      });
      setBoardItem(state);
      return [...state];
    }
    case REMOVE_BOARD: {
      state = state.filter((item) => item.id !== action.payload);
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
