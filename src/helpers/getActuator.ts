import Swal from 'sweetalert2';
import { Actuator, GetDataProps } from '../interfaces';
import { fetchApiAll, fetchApiByBoardId } from '../api';

export const getActuator = async ({ boardId, data, endDate, filter, startDate, actuatorFilter }: GetDataProps) => {
  switch (filter) {
    case "Mostrar todo": {
      try {
        const res = await fetchApiAll<Actuator[]>("actuator");
        const dataFormatted = res.map((actuator) => {
          const formattedDate = new Date(actuator.timest).toISOString().split("T")[0];
          return { ...actuator, formattedDate };
        })
        switch (actuatorFilter) {
          case "Mostrar todo": {
            data = dataFormatted;
            break;
          }
          case "Mostrar por calor": {
            const filterData = dataFormatted.filter((actuator) => actuator.isHot);
            if (filterData.length === 0) {
              Swal.fire("Error", "No se encontró ningún registro en la tabla Actuator activado por el calor", "error");
              break;
            }
            data = filterData;
            break;
          }
          case "Mostrar por frio": {
            const filterData = dataFormatted.filter((actuator) => actuator.isCold);
            if (filterData.length === 0) {
              Swal.fire("Error", "No se encontró ningún registro en la tabla Actuator activado por el frio", "error");
              break;
            }
            data = filterData;
            break;
          }
        }
      } catch {
        Swal.fire("Error", "No se encontró ningún registro en la tabla Actuator", "error");
      }
      break;
    }
    case "Mostrar por boardId": {
      try {
        const res = await fetchApiByBoardId<Actuator[]>("actuator", boardId);
        const dataFormatted = res.map((actuator) => {
          const formattedDate = new Date(actuator.timest).toISOString().split("T")[0];
          return { ...actuator, formattedDate };
        })
        switch (actuatorFilter) {
          case "Mostrar todo": {
            data = dataFormatted;
            break;
          }
          case "Mostrar por calor": {
            const filterData = dataFormatted.filter((actuator) => actuator.isHot);
            if (filterData.length === 0) {
              Swal.fire("Error", "No se encontró ningún registro en la tabla Actuator activado por el calor", "error");
              break;
            }
            data = filterData;
            break;
          }
          case "Mostrar por frio": {
            const filterData = dataFormatted.filter((actuator) => actuator.isCold);
            if (filterData.length === 0) {
              Swal.fire("Error", "No se encontró ningún registro en la tabla Actuator activado por el frio", "error");
              break;
            }
            data = filterData;
            break;
          }
        }
      } catch {
        Swal.fire("Error", "No se encontró ningún registro con el boardId: " + boardId, "error");
      }
      break;
    }
    case "Mostrar por fecha": {
      try {
        const res = await fetchApiAll<Actuator[]>("actuator");
        const filterData = res.filter((actuator) => {
          const formattedDate = new Date(actuator.timest).toISOString().split("T")[0];
          return formattedDate >= startDate && formattedDate <= endDate;
        })
        if (filterData.length === 0) {
          Swal.fire("Error", "No se encontró ningún registro con fecha de inicio: " + startDate + " y fecha de fin: " + endDate, "error");
          break;
        }
        const dataFormatted = filterData.map((actuator) => {
          const formattedDate = new Date(actuator.timest).toISOString().split("T")[0];
          return { ...actuator, formattedDate };
        })
        switch (actuatorFilter) {
          case "Mostrar todo": {
            data = dataFormatted;
            break;
          }
          case "Mostrar por calor": {
            const filterData = dataFormatted.filter((actuator) => actuator.isHot);
            if (filterData.length === 0) {
              Swal.fire("Error", "No se encontró ningún registro en la tabla Actuator activado por el calor", "error");
              break;
            }
            data = filterData;
            break;
          }
          case "Mostrar por frio": {
            const filterData = dataFormatted.filter((actuator) => actuator.isCold);
            if (filterData.length === 0) {
              Swal.fire("Error", "No se encontró ningún registro en la tabla Actuator activado por el frio", "error");
              break;
            }
            data = filterData;
            break;
          }
        }
      } catch {
        Swal.fire("Error", "No se encontró ningún registro en la tabla Actuator", "error");
      }
      break;
    }
    case "Mostrar por boardId y fecha": {
      try {
        const res = await fetchApiByBoardId<Actuator[]>("actuator", boardId);
        const filterData = res.filter((actuator) => {
          const formattedDate = new Date(actuator.timest).toISOString().split("T")[0];
          return formattedDate >= startDate && formattedDate <= endDate;
        })
        if (filterData.length === 0) {
          Swal.fire("Error", "No se encontró ningún registro con fecha de inicio: " + startDate + " y fecha de fin: " + endDate, "error");
          break;
        }
        const dataFormatted = filterData.map((actuator) => {
          const formattedDate = new Date(actuator.timest).toISOString().split("T")[0];
          return { ...actuator, formattedDate };
        })
        switch (actuatorFilter) {
          case "Mostrar todo": {
            data = dataFormatted;
            break;
          }
          case "Mostrar por calor": {
            const filterData = dataFormatted.filter((actuator) => actuator.isHot);
            if (filterData.length === 0) {
              Swal.fire("Error", "No se encontró ningún registro en la tabla Actuator activado por el calor", "error");
              break;
            }
            data = filterData;
            break;
          }
          case "Mostrar por frio": {
            const filterData = dataFormatted.filter((actuator) => actuator.isCold);
            if (filterData.length === 0) {
              Swal.fire("Error", "No se encontró ningún registro en la tabla Actuator activado por el frio", "error");
              break;
            }
            data = filterData;
            break;
          }
        }
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