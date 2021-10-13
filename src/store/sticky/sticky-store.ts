// Action Type
const ADD_STICKY = 'sticky/ADD_STICKY' as const;
const REMOVE_STICKY = 'sticky/REMOVE_STICKY' as const;

// Action Creators
export const addSticky = (text: string) => ({ type: ADD_STICKY, payload: text });
export const removeSticky = (id: number) => ({ type: REMOVE_STICKY, payload: id });

type StickyAction = ReturnType<typeof addSticky> | ReturnType<typeof removeSticky>;

export type Item = { id: number; text: string; isToggle: boolean };
export type List = Item[];
export const initialState: List = [];
// ------------------------------------
// Reducer
export default function stickyReducer(state: List = initialState, action: StickyAction): List {
  switch (action.type) {
    case ADD_STICKY: {
      return state;
    }
    case REMOVE_STICKY: {
      return state;
    }
    default:
      return state;
  }
}
