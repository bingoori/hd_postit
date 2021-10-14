import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Text, Input, Textarea } from 'theme-ui';
import { RootState } from '../../store';
import { modifyBoardAsync } from '../../store/board/board-actions';
import { Board } from '../../store/board/board-types';
import {
  addSticky,
  getSticky,
  modifyStickyTitle,
  modifyStickyContents,
  hideStickyContents,
  moveSticky,
  resizeSticky,
  removeSticky,
} from '../../store/sticky/sticky-actions';
import { Sticky } from '../../store/sticky/sticky-types';

let nX = 0;
let nY = 0;
let write = false;
const StickyList = () => {
  const dispatch = useDispatch();
  const boardList = useSelector((state: RootState) => state.boardReducer);
  const stickyList = useSelector((state: RootState) => state.stickyReducer);
  const [selectBoard, setSelectBoard] = useState<Board>();
  const [titleFlag, setTitleFlag] = useState(false);
  const [stickyTitleFlag, setStickyTitleFlag] = useState({ id: -1, flag: false });

  useEffect(() => {
    const load = async () => {
      const result = await findBoard();
      setSelectBoard(result);
      dispatch(getSticky(result ? result.id : -1));
    };
    load();

    // 새 메모 띄우기(컨트롤 + 알트 + n)
    function onKeyDown(event: KeyboardEvent) {
      if (event.ctrlKey && event.altKey && event.code === 'KeyN') {
        if (write) {
          return false;
        }
        if (boardList.length > 0) {
          write = true;
          const el = document.querySelector('.palette')!;
          const newId = dispatch(
            addSticky({
              parentId: findBoard()?.id,
              id: -1,
              title: 'NEW STICKY',
              contents: '',
              x: el.clientHeight / 2,
              y: el.clientWidth / 2,
              width: 200,
              height: 200,
              isShow: true,
            }),
          ).data.id;
          setStickyTitleFlag({ id: newId, flag: true });
          setTimeout(() => {
            write = false;
          }, 500);
        }
      }
    }
    document.addEventListener('keydown', onKeyDown);
  }, [dispatch, boardList]);

  const findBoard = () => boardList.find((current) => current.isToggle);

  //메모 추가
  const addStickyMemo = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, data: Sticky) => {
    if ((event.target as Element).className.includes('palette')) {
      dispatch(addSticky(data));
    }
  };

  //상단 보드 제목수정
  const modifyBoardTitle = (boardId?: number, title?: string) => {
    dispatch(modifyBoardAsync.request({ id: boardId as number, text: title as string, isToggle: true }));
    setTitleFlag(false);
  };

  //메모 제목수정
  const updateStickyTitle = (stickyId: number, title: string) => {
    dispatch(modifyStickyTitle(stickyId, title));
    setStickyTitleFlag({ id: -1, flag: false });
  };

  //메모 삭제
  const deleteSticky = (id: number) => {
    if (confirm('정말 삭제하시겠습니까')) {
      dispatch(removeSticky(id));
    }
  };

  //메모 이동
  const dragSticky = (event: React.DragEvent<HTMLDivElement>, id: number) => {
    document.querySelectorAll<HTMLElement>(`.sticky`)!.forEach((item) => {
      item.style.zIndex = `0`;
    });
    const el = document.querySelector<HTMLElement>(`.sticky-${id}`)!;
    el.style.zIndex = `1`;
    dispatch(moveSticky(id, event.clientX, event.clientY));
  };

  //메모 크기 조정
  const changeSizeSticky = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number) => {
    if (event.type === 'mousedown') {
      nX = event.clientX;
      nY = event.clientY;
    } else {
      const el = document.querySelector<HTMLElement>(`.sticky-${id}`)!;
      const calWidth = el.clientWidth + (event.clientX - nX);
      const calHeight = el.clientHeight + (event.clientY - nY);
      el.style.width = calWidth + 'px';
      el.style.height = calHeight + 'px';
      dispatch(resizeSticky(id, calWidth, calHeight));
    }
  };

  return (
    <Box
      sx={{
        width: '80%',
        height: '100%',
      }}
    >
      <Box
        sx={{
          m: 3,
          'input:focus': {
            outline: 'none',
          },
        }}
      >
        {titleFlag ? (
          <Input
            name="title"
            defaultValue={selectBoard?.text}
            onBlur={(event) => modifyBoardTitle(selectBoard?.id, event.target.value)}
            autoFocus
          />
        ) : (
          <Text sx={{ cursor: 'pointer' }} onClick={() => setTitleFlag(true)}>
            {selectBoard?.text}
          </Text>
        )}
      </Box>
      <Box
        sx={{ height: '100%' }}
        className="palette"
        onDoubleClick={(event) =>
          addStickyMemo(event, {
            parentId: selectBoard?.id,
            id: -1,
            title: 'NEW STICKY',
            contents: '',
            x: event.clientX,
            y: event.clientY,
            width: 200,
            height: 200,
            isShow: true,
          })
        }
      >
        {stickyList &&
          stickyList.map((current, index) => (
            <Box
              key={`sticky-${index}`}
              className={`sticky-${current.id} sticky`}
              sx={{
                position: 'absolute',
                display: 'block',
                top: current.y,
                left: current.x,
                width: `${current.width}px`,
                height: `${current.isShow ? `${current.height}px` : '35px'}`,
                backgroundColor: 'yellow',
                border: '1px solid lightgrey',
                borderRadius: '10px',
              }}
            >
              <Box
                sx={{
                  m: 1,
                }}
                draggable={!stickyTitleFlag.flag}
                onDragEnd={(event) => dragSticky(event, current.id)}
              >
                {stickyTitleFlag.flag && stickyTitleFlag.id === current.id ? (
                  <Input
                    name="stickyTitle"
                    defaultValue={current.title}
                    onBlur={(event) => {
                      updateStickyTitle(current.id, event.target.value);
                    }}
                    autoFocus
                  />
                ) : (
                  <Text onClick={() => setStickyTitleFlag({ id: current.id, flag: true })}>{current.title}</Text>
                )}
                <Box sx={{ float: 'right', '.button': { color: 'black', cursor: 'pointer' } }}>
                  <button className="button" onClick={() => dispatch(hideStickyContents(current.id))}>
                    -
                  </button>
                  <button className="button" onClick={() => deleteSticky(current.id)}>
                    x
                  </button>
                </Box>
              </Box>
              {current.isShow && (
                <Box
                  sx={{
                    height: '100%',
                    'textarea:focus': {
                      outline: 'none',
                    },
                  }}
                >
                  <Textarea
                    sx={{ height: '86%', border: 'none', resize: 'none' }}
                    onBlur={(event) => dispatch(modifyStickyContents(current.id, event.target.value))}
                    defaultValue={`${current.contents}`}
                  />
                  <Text
                    sx={{ position: 'absolute', right: 0, bottom: 0 }}
                    draggable
                    onDragEnd={(event) => changeSizeSticky(event, current.id)}
                    onMouseDown={(event) => changeSizeSticky(event, current.id)}
                  >
                    ┘
                  </Text>
                </Box>
              )}
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default StickyList;
