import { Board } from '../store/board/board-types';
import { Sticky } from '../store/sticky/sticky-types';

//보드 가져오기
export function getBoardList(): Board[] {
  const localStorage: string | null = window.localStorage.getItem('hd-board');
  return localStorage ? JSON.parse(localStorage) : null;
}

//보드 생성
export function setBoardItem(value: Board[]): void {
  window.localStorage.setItem('hd-board', JSON.stringify(value));
}

//메모 가져오기
export function getStickyList(): Sticky[] {
  const localStorage: string | null = window.localStorage.getItem('hd-sticky');
  return localStorage ? JSON.parse(localStorage) : null;
}

//메모 생성
export function setStickyItem(value: Sticky): void {
  const localStorage: string | null = window.localStorage.getItem('hd-sticky');
  let stickyList: Sticky[] = localStorage ? JSON.parse(localStorage) : null;
  if (stickyList && stickyList.length > 0) {
    stickyList.push(value);
  } else {
    stickyList = [value];
  }
  window.localStorage.setItem('hd-sticky', JSON.stringify(stickyList));
}

//메모 수정 -- 전달받은 메모로 리스트에서 삭제 한 후 다시 담는다.
export function modifyStickyItem(id: number, sticky: Sticky): void {
  const localStorage: string | null = window.localStorage.getItem('hd-sticky');
  let stickyList: Sticky[] = localStorage ? JSON.parse(localStorage) : null;
  if (stickyList && stickyList.length > 0) {
    stickyList = stickyList.filter((current) => current.id !== sticky.id);
    stickyList.push(sticky);
  }
  window.localStorage.setItem('hd-sticky', JSON.stringify(stickyList));
}

//메모 삭제
export function removeStickyItem(id: number): void {
  const localStorage: string | null = window.localStorage.getItem('hd-sticky');
  let stickyList: Sticky[] = localStorage ? JSON.parse(localStorage) : null;
  if (stickyList && stickyList.length > 0) {
    stickyList = stickyList.filter((current) => current.id !== id);
  }
  window.localStorage.setItem('hd-sticky', JSON.stringify(stickyList));
}
