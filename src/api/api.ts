import { EndPoint } from "../interfaces";

const BASE_URL = "http://localhost:80/meteorUS";

export const fetchApiAll = async<T,> (endpoint: EndPoint): Promise<T> => {
  const resp = await fetch(`${BASE_URL}/${endpoint}`);
  const data = await resp.json();
  return data;
}

export const fetchApiByBoardId = async<T,> (endpoint: EndPoint, boardId: number): Promise<T> => {
  const resp = await fetch(`${BASE_URL}/${endpoint}/${boardId}`);
  const data = await resp.json();
  return data;
}

export const fetchApiOneBoard = async<T,> (boardId: number) : Promise<T> => {
  const endpoint : EndPoint = "board";
  const resp = await fetch(`${BASE_URL}/${endpoint}/${boardId}`);
  const data = await resp.json();
  if (data.ok === false) {
    throw new Error(data.msg);
  }
  return data;
}