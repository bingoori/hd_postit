import { getStickyList, setStickyItem, modifyStickyItem, removeStickyItem } from '../../lib/storage';
import { Sticky } from './sticky-types';
// Action Type
const ADD_STICKY = 'sticky/ADD_STICKY' as const;
const GET_STICKY = 'sticky/GET_STICKY' as const;
const MODIFY_STICKY_TITLE = 'sticky/MODIFY_STICKY_TITLE' as const;
const MODIFY_STICKY_CONTENTS = 'sticky/MODIFY_STICKY_CONTENTS' as const;
const HIDE_STICKY_CONTENTS = 'sticky/HIDE_STICKY_CONTENTS' as const;
const MOVE_STICKY = 'sticky/MOVE_STICKY' as const;
const RESIZE_STICKY = 'sticky/RESIZE_STICKY' as const;
const REMOVE_STICKY = 'sticky/REMOVE_STICKY' as const;

// Action Creators
export const addSticky = (data: Sticky) => ({ type: ADD_STICKY, payload: data });
export const getSticky = (id: number) => ({ type: GET_STICKY, payload: id });
export const modifyStickyTitle = (id: number, text: string) => ({ type: MODIFY_STICKY_TITLE, id, text });
export const modifyStickyContents = (id: number, text: string) => ({ type: MODIFY_STICKY_CONTENTS, id, text });
export const hideStickyContents = (id: number) => ({ type: HIDE_STICKY_CONTENTS, id });
export const moveSticky = (id: number, x: number, y: number) => ({ type: MOVE_STICKY, id, x, y });
export const resizeSticky = (id: number, width: number, height: number) => ({ type: RESIZE_STICKY, id, width, height });
export const removeSticky = (id: number) => ({ type: REMOVE_STICKY, id });

type StickyAction =
  | ReturnType<typeof addSticky>
  | ReturnType<typeof getSticky>
  | ReturnType<typeof modifyStickyTitle>
  | ReturnType<typeof modifyStickyContents>
  | ReturnType<typeof hideStickyContents>
  | ReturnType<typeof moveSticky>
  | ReturnType<typeof resizeSticky>
  | ReturnType<typeof removeSticky>;

export const initialState: Sticky[] = [];

export default function stickyReducer(state: Sticky[] = initialState, action: StickyAction): Sticky[] {
  switch (action.type) {
    case ADD_STICKY: {
      if (!state) {
        state = [];
      }
      action.payload.id = state.length > 0 ? state[state.length - 1].id + 1 : 1;
      state.push(action.payload);
      setStickyItem(action.payload);
      return [...state];
    }
    case GET_STICKY: {
      const stickyList = getStickyList();
      state = stickyList ? stickyList.filter((current) => current.parentId === action.payload) : [];
      return state;
    }
    case MODIFY_STICKY_TITLE: {
      const findState = state.filter((current) => {
        return current.id === action.id;
      })[0];
      findState.title = action.text;
      modifyStickyItem(action.id, findState);
      return [...state];
    }
    case MODIFY_STICKY_CONTENTS: {
      const findState = state.filter((current) => {
        return current.id === action.id;
      })[0];
      findState.contents = action.text;
      modifyStickyItem(action.id, findState);
      return [...state];
    }
    case HIDE_STICKY_CONTENTS: {
      const findState = state.filter((current) => {
        return current.id === action.id;
      })[0];
      findState.isShow = !findState.isShow;
      modifyStickyItem(action.id, findState);
      return [...state];
    }
    case MOVE_STICKY: {
      const findState = state.filter((current) => {
        return current.id === action.id;
      })[0];
      findState.x = action.x;
      findState.y = action.y;
      modifyStickyItem(action.id, findState);
      return [...state];
    }
    case RESIZE_STICKY: {
      const findState = state.filter((current) => {
        return current.id === action.id;
      })[0];
      findState.width = action.width;
      findState.height = action.height;
      modifyStickyItem(action.id, findState);
      return [...state];
    }
    case REMOVE_STICKY: {
      removeStickyItem(action.id);
      return state.filter((current) => current.id !== action.id);
    }

    default:
      return state;
  }
}
