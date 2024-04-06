import { fetchApiAll, fetchApiByBoardId } from "../api";
import { GetDataProps, Temperature } from "../interfaces";
import Swal from "sweetalert2";

export const getTempHum = async ({ boardId, data, endDate, filter, startDate } : GetDataProps) => {
  switch(filter) {
    case "Mostrar todo": {
      try {
        const res = await fetchApiAll<Temperature[]>("temphum");
        const dataFormatted = res.map((tempHum) => {
          const formattedDate = new Date(tempHum.timest).toISOString().split("T")[0];
          return { ...tempHum, formattedDate };
        })
        data = dataFormatted;
      } catch {
        Swal.fire("Error", "No se encontró ningún registro en la tabla Temperature/Humidity", "error");
      }
      break;
    }
    case "Mostrar por boardId": {
      try {
        const res = await fetchApiByBoardId<Temperature[]>("temphum", boardId);
        const formattedData = res.map((tempHum) => {
          const formattedDate = new Date(tempHum.timest).toISOString().split("T")[0];
          return { ...tempHum, formattedDate };
        })
        data = formattedData;
      } catch {
        Swal.fire("Error", "No se encontró ningún registro con el boardId: " + boardId, "error");
      }
      break;
    }
    case "Mostrar por fecha": {
      try {
        const res = await fetchApiAll<Temperature[]>("temphum");
        const filterData = res.filter((tempHum) => {
          const formattedDate = new Date(tempHum.timest).toISOString().split("T")[0];
          return formattedDate >= startDate && formattedDate <= endDate;
        })
        if(filterData.length === 0) {
          Swal.fire("Error", "No se encontró ningún registro con fecha de inicio: " + startDate + " y fecha de fin: " + endDate, "error");
          break;
        }
        const formattedData = filterData.map((tempHum) => {
          const formattedDate = new Date(tempHum.timest).toISOString().split("T")[0];
          return { ...tempHum, formattedDate };
        })
        data = formattedData;
      } catch {
        Swal.fire("Error", "No se encontró ningún registro en la tabla Temperature/Humidity", "error");
      }
      break;
    }
    case "Mostrar por boardId y fecha": {
      try {
        const res = await fetchApiByBoardId<Temperature[]>("temphum", boardId);
        const filterData = res.filter((tempHum) => {
          const formattedDate = new Date(tempHum.timest).toISOString().split("T")[0];
          return formattedDate >= startDate && formattedDate <= endDate;
        })
        if(filterData.length === 0) {
          Swal.fire("Error", "No se encontró ningún registro con fecha de inicio: " + startDate + " y fecha de fin: " + endDate, "error");
          break;
        }
        const formattedData = filterData.map((tempHum) => {
          const formattedDate = new Date(tempHum.timest).toISOString().split("T")[0];
          return { ...tempHum, formattedDate };
        })
        data = formattedData;
      } catch {
        Swal.fire("Error", "No se encontró ningún registro con el boardId: " + boardId, "error");
      }
      break;
    }
  }
  return data;
}