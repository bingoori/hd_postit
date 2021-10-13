import { Flex } from 'theme-ui';
import BoardList from '../components/board/board-list';
import StickyList from '../components/sticky/sticky-list';

const Board = () => {
  return (
    <Flex
      sx={{
        width: '100%',
        height: '100%',
      }}
    >
      <BoardList />
      <StickyList />
    </Flex>
  );
};

export default Board;
