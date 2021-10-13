import { Board } from '../store/board/board-types';

export function getBoardList(): Board[] {
  const localStorage: string | null = window.localStorage.getItem('hd-board');
  return localStorage ? JSON.parse(localStorage) : null;
}

export function setBoardItem(value: Board[]): void {
  window.localStorage.setItem('hd-board', JSON.stringify(value));
}
