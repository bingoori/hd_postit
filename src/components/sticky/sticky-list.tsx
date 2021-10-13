import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Text, Input } from 'theme-ui';
import { RootState } from '../../store';
import { modifyBoard } from '../../store/board/board-store';

const StickyList = () => {
  const dispatch = useDispatch();
  const boardList = useSelector((state: RootState) => state.boardReducer);
  const stickyList = useSelector((state: RootState) => state.stickyReducer);
  const [selectBoard, setSelectBoard] = useState(boardList.find((current) => current.isToggle));
  const [titleFlag, setTitleFlag] = useState(false);
  useEffect(() => {
    setSelectBoard(boardList.find((current) => current.isToggle));
  }, [boardList]);
  console.log('boardList in Sticky ::: ', boardList);
  console.log('stickyList in Sticky ::: ', stickyList);

  const modifyTitle = (boardId?: number, text?: string) => {
    dispatch(modifyBoard({ id: boardId as number, text: text as string, isToggle: true }));
    setTitleFlag(false);
  };

  return (
    <Box sx={{ width: '80%', height: '100%' }}>
      <Box sx={{ m: 3 }}>
        {titleFlag ? (
          <Input
            name="title"
            defaultValue={selectBoard?.text}
            onBlur={(event) => modifyTitle(selectBoard?.id, event.target.value)}
            autoFocus
          />
        ) : (
          <Text sx={{ cursor: 'pointer' }} onClick={() => setTitleFlag(true)}>
            {selectBoard?.text}
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default StickyList;
