import { atom } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}

export interface IToDoState {
  [key: string]: ITodo[];
}

export const LOCAL_STORAGE_TO_DOS = "local-storage-to-tos";
const localToTos = localStorage.getItem(LOCAL_STORAGE_TO_DOS);

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: localToTos
    ? JSON.parse(localToTos)
    : {
        "To Do": [],
        Doing: [],
        Done: [],
      },
});
