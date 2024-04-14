import { fetchApiAll, fetchApiByBoardId } from "../api";
import { GetDataProps, Temperature } from "../interfaces";
import Swal from "sweetalert2";

export const getTempHum = async ({ boardId, data, endDate, filter, startDate, numberPage, setPage, isGraphicFetching } : GetDataProps) => {
  switch(filter) {
    case "Mostrar todo": {
      try {
        const res = isGraphicFetching ? await fetchApiAll<Temperature[]>("temphum") : await fetchApiAll<Temperature[]>("temphum", setPage, numberPage);
        const dataFormatted = res.map((tempHum) => {
          const formattedDate = new Date(tempHum.timest).toLocaleDateString("es-ES");
          return { ...tempHum, formattedDate };
        })
        data = dataFormatted;
      } catch {
        Swal.fire("Error", "No se encontró ningún registro en la tabla Temperature/Humidity o no hay más páginas disponibles", "error");
        return [];
      }
      break;
    }
    case "Mostrar por boardId": {
      try {
        const res = isGraphicFetching ? await fetchApiByBoardId<Temperature[]>("temphum", boardId) : await fetchApiByBoardId<Temperature[]>("temphum", boardId, setPage, numberPage);
        const formattedData = res.map((tempHum) => {
          const formattedDate = new Date(tempHum.timest).toLocaleDateString("es-ES");
          return { ...tempHum, formattedDate };
        })
        data = formattedData;
      } catch {
        Swal.fire("Error", "No se encontró ningún registro con el boardId: " + boardId + " o no hay más páginas disponibles", "error");
        return [];
      }
      break;
    }
    case "Mostrar por fecha": {
      try {
        const res = isGraphicFetching ? await fetchApiAll<Temperature[]>("temphum") : await fetchApiAll<Temperature[]>("temphum", setPage, numberPage);
        const filterData = res.filter((tempHum) => {
          const formattedDate = new Date(tempHum.timest).toISOString().split("T")[0];
          return formattedDate >= String(startDate) && formattedDate <= String(endDate);
        })
        if(filterData.length === 0) {
          Swal.fire("Error", "No se encontró ningún registro con fecha de inicio: " + new Date(startDate!).toLocaleDateString("es-ES") + " y fecha de fin: " + new Date(endDate!).toLocaleDateString("es-ES") + " o no hay más páginas disponibles", "error");
          return [];
        }
        const formattedData = filterData.map((tempHum) => {
          const formattedDate = new Date(tempHum.timest).toLocaleDateString("es-ES");
          return { ...tempHum, formattedDate };
        })
        data = formattedData;
      } catch {
        Swal.fire("Error", "No se encontró ningún registro en la tabla Temperature/Humidity o no hay más páginas disponibles", "error");
        return [];
      }
      break;
    }
    case "Mostrar por boardId y fecha": {
      try {
        const res = isGraphicFetching ? await fetchApiByBoardId<Temperature[]>("temphum", boardId) : await fetchApiByBoardId<Temperature[]>("temphum", boardId, setPage, numberPage);
        const filterData = res.filter((tempHum) => {
          const formattedDate = new Date(tempHum.timest).toISOString().split("T")[0];
          return formattedDate >= String(startDate) && formattedDate <= String(endDate);
        })
        if(filterData.length === 0) {
          Swal.fire("Error", "No se encontró ningún registro con fecha de inicio: " + new Date(startDate!).toLocaleDateString("es-ES") + " y fecha de fin: " + new Date(endDate!).toLocaleDateString("es-ES") + " o no hay más páginas disponibles", "error");
          return [];
        }
        const formattedData = filterData.map((tempHum) => {
          const formattedDate = new Date(tempHum.timest).toLocaleDateString("es-ES");
          return { ...tempHum, formattedDate };
        })
        data = formattedData;
      } catch {
        Swal.fire("Error", "No se encontró ningún registro con el boardId: " + boardId + " o no hay más páginas disponibles", "error");
        return [];
      }
      break;
    }
    default:
      break;
  }
  return data;
}