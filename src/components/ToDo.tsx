import React from "react";
import { useSetRecoilState } from "recoil";
import { Categories, IToDo, LOCAL_TO_DO_STATE_KEY, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      let newState = [];
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      if (name === "Delete") {
        newState = oldToDos.filter(
          (toDo) => toDo.id !== oldToDos[targetIndex].id
        );
      } else {
        const newToDo = { text, id, category: name as IToDo["category"] };
        newState = [
          ...oldToDos.slice(0, targetIndex),
          newToDo,
          ...oldToDos.slice(targetIndex + 1),
        ];
      }
      localStorage.setItem(LOCAL_TO_DO_STATE_KEY, JSON.stringify(newState));
      return newState;
    });
  };
  return (
    <li>
      <span>{text}</span>
      {category !== Categories.DOING && (
        <button
          style={{ marginLeft: "8px" }}
          name={Categories.DOING}
          onClick={onClick}
        >
          Doing
        </button>
      )}
      {category !== Categories.TO_DO && (
        <button
          style={{ marginLeft: "8px" }}
          name={Categories.TO_DO}
          onClick={onClick}
        >
          To Do
        </button>
      )}
      {category !== Categories.DONE && (
        <button
          style={{ marginLeft: "8px" }}
          name={Categories.DONE}
          onClick={onClick}
        >
          Done
        </button>
      )}
      <button style={{ marginLeft: "8px" }} name="Delete" onClick={onClick}>
        Delete
      </button>
    </li>
  );
}

export default ToDo;
