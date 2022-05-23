import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { LOCAL_STORAGE_TO_DOS, toDoState } from "./atoms";
import Board, { IAreaProps } from "./components/Board";

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;
const DropArea = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#dfe6e9"
      : props.isDraggingFromThis
      ? "#b2bec3"
      : "transparent"};
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;
const Wastebasket = styled.div`
  position: absolute;
  z-index: 999;
  bottom: 100px;
  right: 100px;
  font-size: 30px;
  font-weight: 600;
  border: 1px solid red;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    // draggableId: 드래그 되었던 Draggable의 id
    // type: 드래그 되었던 Draggable의 type
    // source: Draggable이 시작된 위치
    // destination: Draggable이 끝난 위치
    const { destination, draggableId, source } = info;
    console.log(info);
    if (!destination) return;
    if (destination.droppableId === "deleteZone") {
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        sourceBoard.splice(source.index, 1);
        const newToDos = {
          ...allBoards,
          [source.droppableId]: sourceBoard,
        };
        localStorage.setItem(LOCAL_STORAGE_TO_DOS, JSON.stringify(newToDos));
        return newToDos;
      });
    } else {
      if (destination.droppableId === source.droppableId) {
        // same board movement.
        setToDos((allBoards) => {
          const boardCopy = [...allBoards[source.droppableId]];
          const taskObj = boardCopy[source.index];
          boardCopy.splice(source.index, 1);
          boardCopy.splice(destination.index, 0, taskObj);
          const newToDos = {
            ...allBoards,
            [source.droppableId]: boardCopy,
          };
          localStorage.setItem(LOCAL_STORAGE_TO_DOS, JSON.stringify(newToDos));
          return newToDos;
        });
      }
      if (destination.droppableId !== source.droppableId) {
        // cross board movement
        setToDos((allBoards) => {
          const sourceBoard = [...allBoards[source.droppableId]];
          const taskObj = sourceBoard[source.index];
          const destinationBoard = [...allBoards[destination.droppableId]];
          sourceBoard.splice(source.index, 1);
          destinationBoard.splice(destination.index, 0, taskObj);
          const newToDos = {
            ...allBoards,
            [source.droppableId]: sourceBoard,
            [destination.droppableId]: destinationBoard,
          };
          localStorage.setItem(LOCAL_STORAGE_TO_DOS, JSON.stringify(newToDos));
          return newToDos;
        });
      }
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
        <Wastebasket>
          <Droppable droppableId="deleteZone">
            {(magic, info) => (
              <DropArea
                isDraggingOver={info.isDraggingOver}
                isDraggingFromThis={Boolean(info.draggingFromThisWith)}
                ref={magic.innerRef}
                {...magic.droppableProps}
              >
                휴지통
                {magic.placeholder}
              </DropArea>
            )}
          </Droppable>
        </Wastebasket>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
