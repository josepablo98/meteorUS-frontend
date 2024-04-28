import { fetchApiAll, fetchApiOneBoard } from "../api";
import { Board, GetDataProps } from "../interfaces";
import Swal from "sweetalert2"


export const getBoard = async ({ boardId, data, endDate, filter, startDate, numberPage, setPage, isFormButtons }: GetDataProps) => {

  switch (filter) {

    case "Mostrar todo": {
      try {
        const res = await fetchApiAll<Board[]>("board", setPage, numberPage);
        const dataFormatted = res.map((board) => {
          const formattedDate = new Date(board.timest).toLocaleDateString("es-ES");
          return { ...board, formattedDate };
        })
        data = dataFormatted;
      } catch {
        !isFormButtons && Swal.fire("Error", "No se encontró ningún registro en la tabla Board", "error");
        return [];
      }
      break;
    }
    case "Mostrar por boardId": {
      try {
        const res = await fetchApiOneBoard<Board>(boardId);
        const formattedDate = new Date(res.timest).toLocaleDateString("es-ES");
        Swal.fire("Éxito", "Se encontró un registro con el boardId: " + boardId + " con fecha de creacion: " + formattedDate, "success");
      } catch {
        Swal.fire("Error", "No se encontró ningún registro con el boardId: " + boardId, "error");
      }
      break;
    }
    case "Mostrar por fecha": {
      try {
        const res = await fetchApiAll<Board[]>("board", setPage, numberPage);
        const filterData = res.filter((board) => {
          const formattedDate = new Date(board.timest).toISOString().split("T")[0];  
          return formattedDate >= String(startDate) && formattedDate <= String(endDate);
        })
        if (filterData.length === 0) {
          !isFormButtons && Swal.fire("Error", "No se encontró ningún registro con fecha de inicio: " + new Date(startDate!).toLocaleDateString("es-ES") + " y fecha de fin: " + new Date(endDate!).toLocaleDateString("es-ES"), "error");
          return [];
        }

        const formattedData = filterData.map((board) => {
          const formattedDate = new Date(board.timest).toLocaleDateString("es-ES");
          return { ...board, formattedDate };
        })

        data = formattedData;
      } catch {
        !isFormButtons && Swal.fire("Error", "No se encontró ningún registro en la tabla Board", "error");
        return [];
      }
      break;
    }
    default:
      break;
  }
  return data;
}