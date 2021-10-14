import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Close, Flex } from 'theme-ui';
import { RootState } from '../../store';
import { addBoardAsync, chooseBoardAsync, getBoardAsync, removeBoardAsync } from '../../store/board/board-actions';

const BoardList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBoardAsync().request(undefined, undefined));
  }, [dispatch]);

  const boardList = useSelector((state: RootState) => state.boardReducer);

  return (
    <Box sx={{ width: '20%', minWidth: '214px', backgroundColor: 'lightgrey', p: 3, '.list': { fontWeight: 'bold' } }}>
      {boardList &&
        boardList.map((current, index) => (
          <Flex key={`board-${index}`}>
            <Box
              sx={{ width: '100%', minWidth: '160px', cursor: 'pointer', backgroundColor: current.isToggle ? 'grey' : '' }}
              onClick={() => {
                dispatch(chooseBoardAsync.request(current.id));
              }}
            >
              {current.text}
            </Box>
            <Close sx={{ minWidth: '30px', cursor: 'pointer' }} onClick={() => dispatch(removeBoardAsync.request(current.id))} />
          </Flex>
        ))}
      <Box
        className="list"
        sx={{ textAlign: 'center', cursor: 'pointer' }}
        onClick={() =>
          dispatch(
            addBoardAsync.request({
              id: boardList.length > 0 ? boardList[boardList.length - 1].id + 1 : 1,
              text: 'NEW BOARD',
              isToggle: true,
            }),
          )
        }
      >
        +
      </Box>
    </Box>
  );
};

export default BoardList;
