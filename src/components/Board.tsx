import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragabbleCard from "./DragabbleCard";

const Wrapper = styled.div`
  width: 300px;
  padding: 20px 10px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

interface IBoardProps {
  toDos: string[];
  boardId: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(magic) => (
          <div ref={magic.innerRef} {...magic.droppableProps}>
            {toDos.map((toDo, index) => (
              // 여기서 key에 map의 index를 주면 안된다. 일반적으로 draggableId를 key에 사용한다.
              <DragabbleCard key={toDo} index={index} toDo={toDo} />
            ))}
            {/* Draggable을 드래그할 때 Droppable가 작아지는 것을 방지함. Draggable의 형제로 렌더링한다 */}
            {magic.placeholder}
          </div>
        )}
      </Droppable>
    </Wrapper>
  );
}
export default Board;
