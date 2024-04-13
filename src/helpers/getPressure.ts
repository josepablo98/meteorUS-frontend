import Swal from "sweetalert2";
import { GetDataProps, Pressure } from "../interfaces";
import { fetchApiAll, fetchApiByBoardId } from "../api";



export const getPressure = async ({ boardId, data, endDate, filter, startDate, numberPage, setPage } : GetDataProps) => {
  switch(filter) {
    case "Mostrar todo": {
      try {
        const res = await fetchApiAll<Pressure[]>("pressure", setPage, numberPage);
        const dataFormatted = res.map((pressure) => {
          const formattedDate = new Date(pressure.timest).toLocaleDateString("es-ES");
          return { ...pressure, formattedDate };
        })
        data = dataFormatted;
      } catch {
        Swal.fire("Error", "No se encontró ningún registro en la tabla Pressure", "error");
      }
      break;
    }
    case "Mostrar por boardId": {
      try {
        const res = await fetchApiByBoardId<Pressure[]>("pressure", boardId, setPage, numberPage);
        const dataFormatted = res.map((pressure) => {
          const formattedDate = new Date(pressure.timest).toLocaleDateString("es-ES");
          return { ...pressure, formattedDate };
        })
        data = dataFormatted;
      } catch {
        Swal.fire("Error", "No se encontró ningún registro con el boardId: " + boardId, "error");
      }
      break;
    }
    case "Mostrar por fecha": {
      try {
        const res = await fetchApiAll<Pressure[]>("pressure", setPage, numberPage);
        const filterData = res.filter((pressure) => {
          const formattedDate = new Date(pressure.timest).toISOString().split("T")[0];
          return formattedDate >= String(startDate) && formattedDate <= String(endDate);
        })
        if(filterData.length === 0) {
          Swal.fire("Error", "No se encontró ningún registro con fecha de inicio: " + startDate + " y fecha de fin: " + endDate, "error");
          break;
        }
        const dataFormatted = filterData.map((pressure) => {
          const formattedDate = new Date(pressure.timest).toLocaleDateString("es-ES");
          return { ...pressure, formattedDate };
        })
        data = dataFormatted;
      } catch {
        Swal.fire("Error", "No se encontró ningún registro en la tabla Pressure", "error");
      }
      break;
    }
    case "Mostrar por boardId y fecha": {
      try {
        const res = await fetchApiByBoardId<Pressure[]>("pressure", boardId, setPage, numberPage);
        const filterData = res.filter((pressure) => {
          const formattedDate = new Date(pressure.timest).toISOString().split("T")[0];
          return formattedDate >= String(startDate) && formattedDate <= String(endDate);
        })
        if(filterData.length === 0) {
          Swal.fire("Error", "No se encontró ningún registro con fecha de inicio: " + startDate + " y fecha de fin: " + endDate, "error");
          break;
        }
        const dataFormatted = filterData.map((pressure) => {
          const formattedDate = new Date(pressure.timest).toLocaleDateString("es-ES");
          return { ...pressure, formattedDate };
        })
        data = dataFormatted;
      } catch {
        Swal.fire("Error", "No se encontró ningún registro con el boardId: " + boardId, "error");
      }
      break;
    }
    default:
      break;
  }
  return data;
}