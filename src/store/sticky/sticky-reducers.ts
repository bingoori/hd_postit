import { getStickyList, setStickyItem, modifyStickyItem, removeStickyItem } from '../../lib/storage';
import { Sticky } from './sticky-types';

import {
  ADD_STICKY,
  GET_STICKY,
  MODIFY_STICKY_TITLE,
  MODIFY_STICKY_CONTENTS,
  HIDE_STICKY_CONTENTS,
  MOVE_STICKY,
  RESIZE_STICKY,
  REMOVE_STICKY,
} from './sticky-constants';

export interface AddStickyAction {
  type: typeof ADD_STICKY;
  data: Sticky;
}
export interface GetStickyAction {
  type: typeof GET_STICKY;
  id: number;
}
export interface ModifyStickyTitleAction {
  type: typeof MODIFY_STICKY_TITLE;
  id: number;
  text: string;
}
export interface ModifyStickyContentsAction {
  type: typeof MODIFY_STICKY_CONTENTS;
  id: number;
  text: string;
}
export interface HideStickyContentsAction {
  type: typeof HIDE_STICKY_CONTENTS;
  id: number;
}
export interface MoveStickyAction {
  type: typeof MOVE_STICKY;
  id: number;
  x: number;
  y: number;
}
export interface ResizeStickyAction {
  type: typeof RESIZE_STICKY;
  id: number;
  width: number;
  height: number;
}
export interface RemoveStickyAction {
  type: typeof REMOVE_STICKY;
  id: number;
}

type StickyAction =
  | AddStickyAction
  | GetStickyAction
  | ModifyStickyTitleAction
  | ModifyStickyContentsAction
  | HideStickyContentsAction
  | MoveStickyAction
  | ResizeStickyAction
  | RemoveStickyAction;

export const initialState: Sticky[] = [];

export default function stickyReducer(state: Sticky[] = initialState, action: StickyAction): Sticky[] {
  switch (action.type) {
    case ADD_STICKY: {
      if (!state) {
        state = [];
      }
      action.data.id = state.length > 0 ? state[state.length - 1].id + 1 : 1;
      state.push(action.data);
      setStickyItem(action.data);
      return [...state];
    }
    case GET_STICKY: {
      const stickyList = getStickyList();
      state = stickyList ? stickyList.filter((current) => current.parentId === action.id) : [];
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
