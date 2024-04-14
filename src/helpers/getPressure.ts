import Swal from "sweetalert2";
import { GetDataProps, Pressure } from "../interfaces";
import { fetchApiAll, fetchApiByBoardId } from "../api";



export const getPressure = async ({ boardId, data, endDate, filter, startDate, numberPage, setPage, isGraphicFetching } : GetDataProps) => {
  switch(filter) {
    case "Mostrar todo": {
      try {
        const res = isGraphicFetching ? await fetchApiAll<Pressure[]>("pressure") : await fetchApiAll<Pressure[]>("pressure", setPage, numberPage);
        const dataFormatted = res.map((pressure) => {
          const formattedDate = new Date(pressure.timest).toLocaleDateString("es-ES");
          return { ...pressure, formattedDate };
        })
        data = dataFormatted;
      } catch {
        Swal.fire("Error", "No se encontró ningún registro en la tabla Pressure/Altitude o no hay más páginas disponibles", "error");
        return [];
      }
      break;
    }
    case "Mostrar por boardId": {
      try {
        const res = isGraphicFetching ? await fetchApiByBoardId<Pressure[]>("pressure", boardId) : await fetchApiByBoardId<Pressure[]>("pressure", boardId, setPage, numberPage);
        const dataFormatted = res.map((pressure) => {
          const formattedDate = new Date(pressure.timest).toLocaleDateString("es-ES");
          return { ...pressure, formattedDate };
        })
        data = dataFormatted;
      } catch {
        Swal.fire("Error", "No se encontró ningún registro con el boardId: " + boardId + " o no hay más páginas disponibles", "error");
        return [];
      }
      break;
    }
    case "Mostrar por fecha": {
      try {
        const res = isGraphicFetching ? await fetchApiAll<Pressure[]>("pressure") : await fetchApiAll<Pressure[]>("pressure", setPage, numberPage);
        const filterData = res.filter((pressure) => {
          const formattedDate = new Date(pressure.timest).toISOString().split("T")[0];
          return formattedDate >= String(startDate) && formattedDate <= String(endDate);
        })
        if(filterData.length === 0) {
          Swal.fire("Error", "No se encontró ningún registro con fecha de inicio: " + new Date(startDate!).toLocaleDateString("es-ES") + " y fecha de fin: " + new Date(endDate!).toLocaleDateString("es-ES") + " o no hay más páginas disponibles", "error");
          return [];
        }
        const dataFormatted = filterData.map((pressure) => {
          const formattedDate = new Date(pressure.timest).toLocaleDateString("es-ES");
          return { ...pressure, formattedDate };
        })
        data = dataFormatted;
      } catch {
        Swal.fire("Error", "No se encontró ningún registro en la tabla Pressure/Altitude o no hay más páginas disponibles", "error");
        return [];
      }
      break;
    }
    case "Mostrar por boardId y fecha": {
      try {
        const res = isGraphicFetching ? await fetchApiByBoardId<Pressure[]>("pressure", boardId) : await fetchApiByBoardId<Pressure[]>("pressure", boardId, setPage, numberPage);
        const filterData = res.filter((pressure) => {
          const formattedDate = new Date(pressure.timest).toISOString().split("T")[0];
          return formattedDate >= String(startDate) && formattedDate <= String(endDate);
        })
        if(filterData.length === 0) {
          Swal.fire("Error", "No se encontró ningún registro con fecha de inicio: " + new Date(startDate!).toLocaleDateString("es-ES") + " y fecha de fin: " + new Date(endDate!).toLocaleDateString("es-ES") + " o no hay más páginas disponibles", "error");
          return [];
        }
        const dataFormatted = filterData.map((pressure) => {
          const formattedDate = new Date(pressure.timest).toLocaleDateString("es-ES");
          return { ...pressure, formattedDate };
        })
        data = dataFormatted;
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