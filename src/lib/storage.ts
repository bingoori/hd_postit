import { Board } from '../store/board/board-types';
import { Sticky } from '../store/sticky/sticky-types';

//보드 가져오기
export function getBoardList(): Board[] {
  const localStorage: string | null = window.localStorage.getItem('hd-board');
  return localStorage ? JSON.parse(localStorage) : null;
}

//보드 생성
export function setBoardItem(value: Board): Board[] {
  const localStorage: string | null = window.localStorage.getItem('hd-board');
  let boardList: Board[] = localStorage ? JSON.parse(localStorage) : [];
  if (boardList && boardList.length > 0) {
    boardList.map((current) => (current.isToggle = false));
    boardList.push(value);
  } else {
    boardList = [value];
  }
  window.localStorage.setItem('hd-board', JSON.stringify(boardList));
  return boardList;
}

//보드 선택
export function chooseBoardItem(id: number): Board[] {
  const localStorage: string | null = window.localStorage.getItem('hd-board');
  const boardList: Board[] = localStorage ? JSON.parse(localStorage) : [];
  boardList.map((current) => {
    if (current.id === id) {
      current.isToggle = true;
    } else {
      current.isToggle = false;
    }
  });
  window.localStorage.setItem('hd-board', JSON.stringify(boardList));
  return boardList;
}

//보드 수정
export function modifyBoardItem(data: Board): Board[] {
  const localStorage: string | null = window.localStorage.getItem('hd-board');
  const boardList: Board[] = localStorage ? JSON.parse(localStorage) : [];
  boardList.map((current) => {
    if (current.id === data.id) {
      current.text = data.text;
    }
  });
  window.localStorage.setItem('hd-board', JSON.stringify(boardList));
  return boardList;
}

//보드 삭제
export function removeBoardItem(id: number): Board[] {
  const localStorage: string | null = window.localStorage.getItem('hd-board');
  let boardList: Board[] = localStorage ? JSON.parse(localStorage) : [];
  boardList = boardList.filter((current) => current.id !== id);
  boardList.map((current) => (current.isToggle = false));
  if (boardList.length > 0) {
    boardList[0].isToggle = true;
  }
  window.localStorage.setItem('hd-board', JSON.stringify(boardList));
  removeStickyList(id);
  return boardList;
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

//메모 전체 삭제
export function removeStickyList(parentId: number): void {
  const localStorage: string | null = window.localStorage.getItem('hd-sticky');
  let stickyList: Sticky[] = localStorage ? JSON.parse(localStorage) : null;
  if (stickyList && stickyList.length > 0) {
    stickyList = stickyList.filter((current) => current.parentId !== parentId);
  }
  window.localStorage.setItem('hd-sticky', JSON.stringify(stickyList));
}
