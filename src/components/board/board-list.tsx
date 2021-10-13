import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Close, Flex } from 'theme-ui';
import { RootState } from '../../store';
import { addBoard, chooseBoard, getBoard, removeBoard } from '../../store/board/board-store';

const BoardList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBoard());
  }, [dispatch]);
  const boardList = useSelector((state: RootState) => state.boardReducer);
  return (
    <Box sx={{ width: '20%', backgroundColor: 'lightgrey', p: 3, '.list': { fontWeight: 'bold' } }}>
      {boardList &&
        boardList.map((current, index) => (
          <Flex key={`board-${index}`}>
            <Box
              sx={{ width: '100%', cursor: 'pointer', backgroundColor: current.isToggle ? 'grey' : '' }}
              onClick={() => dispatch(chooseBoard(current.id))}
            >
              {current.text}
            </Box>
            <Close sx={{ minWidth: '30px', cursor: 'pointer' }} onClick={() => dispatch(removeBoard(current.id))} />
          </Flex>
        ))}
      <Box className="list" sx={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => dispatch(addBoard())}>
        +
      </Box>
    </Box>
  );
};

export default BoardList;
