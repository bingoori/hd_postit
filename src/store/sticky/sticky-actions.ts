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

export const addSticky = (data: Sticky) => ({ type: ADD_STICKY, data });
export const getSticky = (id: number) => ({ type: GET_STICKY, id });
export const modifyStickyTitle = (id: number, text: string) => ({ type: MODIFY_STICKY_TITLE, id, text });
export const modifyStickyContents = (id: number, text: string) => ({ type: MODIFY_STICKY_CONTENTS, id, text });
export const hideStickyContents = (id: number) => ({ type: HIDE_STICKY_CONTENTS, id });
export const moveSticky = (id: number, x: number, y: number) => ({ type: MOVE_STICKY, id, x, y });
export const resizeSticky = (id: number, width: number, height: number) => ({ type: RESIZE_STICKY, id, width, height });
export const removeSticky = (id: number) => ({ type: REMOVE_STICKY, id });

export type StickyAction =
  | ReturnType<typeof addSticky>
  | ReturnType<typeof getSticky>
  | ReturnType<typeof modifyStickyTitle>
  | ReturnType<typeof modifyStickyContents>
  | ReturnType<typeof hideStickyContents>
  | ReturnType<typeof moveSticky>
  | ReturnType<typeof resizeSticky>
  | ReturnType<typeof removeSticky>;
