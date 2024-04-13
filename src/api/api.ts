import { EndPoint } from "../interfaces";

const BASE_URL = "http://localhost:80/meteorUS";
export const LIMIT = 20;
let oldPage = 1;

export const fetchApiAll = async<T,> (endpoint: EndPoint, setPage?: React.Dispatch<React.SetStateAction<number>>, page?: number): Promise<T> => {
  const resp = page ? await fetch(`${BASE_URL}/${endpoint}?limit=${LIMIT}&offset=${(page - 1) * LIMIT}`) : await fetch(`${BASE_URL}/${endpoint}`);
  if (!resp.ok && page === oldPage + 1) {
    setPage && setPage(oldPage);
  }
  page && (oldPage = page);
  const data = await resp.json();
  return data;
}

export const fetchApiByBoardId = async<T,> (endpoint: EndPoint, boardId: number, setPage?: React.Dispatch<React.SetStateAction<number>>, page?: number): Promise<T> => {
  const resp = page ? await fetch(`${BASE_URL}/${endpoint}/${boardId}?limit=${LIMIT}&offset=${(page - 1) * LIMIT}`) : await fetch(`${BASE_URL}/${endpoint}/${boardId}`);
  if (!resp.ok && page === oldPage + 1) {
    setPage && setPage(oldPage);
  }
  page && (oldPage = page);
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