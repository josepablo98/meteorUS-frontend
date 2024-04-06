import { fetchApiAll, fetchApiByBoardId } from "../api";
import { Board, GetDataProps } from "../interfaces";
import Swal from "sweetalert2"


export const getBoard = async ({ boardId, data, endDate, filter, startDate }: GetDataProps) => {

  switch (filter) {

    case "Mostrar todo": {
      try {
        const res = await fetchApiAll<Board[]>("board");
        const dataFormatted = res.map((board) => {
          const formattedDate = new Date(board.timest).toISOString().split("T")[0];
          return { ...board, formattedDate };
        })
        data = dataFormatted;
      } catch {
        Swal.fire("Error", "No se encontró ningún registro en la tabla Board", "error");
      }
      break;
    }
    case "Mostrar por boardId": {
      try {
        const res = await fetchApiByBoardId<Board>("board", boardId);
        const formattedDate = new Date(res.timest).toISOString().split("T")[0];
        Swal.fire("Éxito", "Se encontró un registro con el boardId: " + boardId + " con fecha de creacion: " + formattedDate, "success");
      } catch {
        Swal.fire("Error", "No se encontró ningún registro con el boardId: " + boardId, "error");
      }
      break;
    }
    case "Mostrar por fecha": {
      try {
        const res = await fetchApiAll<Board[]>("board");
        const filterData = res.filter((board) => {
          const formattedDate = new Date(board.timest).toISOString().split("T")[0];
          return formattedDate >= startDate && formattedDate <= endDate;
        })
        if (filterData.length === 0) {
          Swal.fire("Error", "No se encontró ningún registro con fecha de inicio: " + startDate + " y fecha de fin: " + endDate, "error");
          break;
        }

        const formattedData = filterData.map((board) => {
          const formattedDate = new Date(board.timest).toISOString().split("T")[0];
          return { ...board, formattedDate };
        })

        data = formattedData;
      } catch {
        Swal.fire("Error", "No se encontró ningún registro en la tabla Board", "error");
      }
      break;
    }
    default:
      break;
  }
  return data;
}