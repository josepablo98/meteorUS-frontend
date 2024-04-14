import Swal from 'sweetalert2';
import { Actuator, GetDataProps } from '../interfaces';
import { fetchApiAll, fetchApiByBoardId } from '../api';

export const getActuator = async ({ boardId, data, endDate, filter, startDate, actuatorFilter, numberPage, setPage, isGraphicFetching }: GetDataProps) => {
  switch (filter) {
    case "Mostrar todo": {
      try {
        const res = isGraphicFetching ? await fetchApiAll<Actuator[]>("actuator") : await fetchApiAll<Actuator[]>("actuator", setPage, numberPage);
        const dataFormatted = res.map((actuator) => {
          const formattedDate = new Date(actuator.timest).toLocaleDateString("es-ES");
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
              Swal.fire("Error", "No se encontró ningún registro en la tabla Actuator activado por el calor o no hay más páginas disponibles", "error");
              return [];
            }
            data = filterData;
            break;
          }
          case "Mostrar por frio": {
            const filterData = dataFormatted.filter((actuator) => actuator.isCold);
            if (filterData.length === 0) {
              Swal.fire("Error", "No se encontró ningún registro en la tabla Actuator activado por el frio o no hay más páginas disponibles", "error");
              return [];
            }
            data = filterData;
            break;
          }
          default:
            break;
        }
      } catch {
        Swal.fire("Error", "No se encontró ningún registro en la tabla Actuator o no hay más páginas disponibles", "error");
        return [];
      }
      break;
    }
    case "Mostrar por boardId": {
      try {
        const res = isGraphicFetching ? await fetchApiByBoardId<Actuator[]>("actuator", boardId) : await fetchApiByBoardId<Actuator[]>("actuator", boardId, setPage, numberPage);
        const dataFormatted = res.map((actuator) => {
          const formattedDate = new Date(actuator.timest).toLocaleDateString("es-ES");
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
              Swal.fire("Error", "No se encontró ningún registro en la tabla Actuator activado por el calor o no hay más páginas disponibles", "error");
              return [];
            }
            data = filterData;
            break;
          }
          case "Mostrar por frio": {
            const filterData = dataFormatted.filter((actuator) => actuator.isCold);
            if (filterData.length === 0) {
              Swal.fire("Error", "No se encontró ningún registro en la tabla Actuator activado por el frio o no hay más páginas disponibles", "error");
              return [];
            }
            data = filterData;
            break;
          }
          default:
            break;
        }
      } catch {
        Swal.fire("Error", "No se encontró ningún registro con el boardId: " + boardId + " o no hay más páginas disponibles", "error");
        return [];
      }
      break;
    }
    case "Mostrar por fecha": {
      try {
        const res = isGraphicFetching ? await fetchApiAll<Actuator[]>("actuator") : await fetchApiAll<Actuator[]>("actuator", setPage, numberPage);
        const filterData = res.filter((actuator) => {
          const formattedDate = new Date(actuator.timest).toISOString().split("T")[0];
          return formattedDate >= String(startDate) && formattedDate <= String(endDate);
        })
        if (filterData.length === 0) {
          Swal.fire("Error", "No se encontró ningún registro con fecha de inicio: " + new Date(startDate!).toLocaleDateString("es-ES") + " y fecha de fin: " + new Date(endDate!).toLocaleDateString("es-ES") + " o no hay más páginas disponibles", "error");
          return [];
        }
        const dataFormatted = filterData.map((actuator) => {
          const formattedDate = new Date(actuator.timest).toLocaleDateString("es-ES");
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
              Swal.fire("Error", "No se encontró ningún registro en la tabla Actuator activado por el calor o no hay más páginas disponibles", "error");
              return [];
            }
            data = filterData;
            break;
          }
          case "Mostrar por frio": {
            const filterData = dataFormatted.filter((actuator) => actuator.isCold);
            if (filterData.length === 0) {
              Swal.fire("Error", "No se encontró ningún registro en la tabla Actuator activado por el frio o no hay más páginas disponibles", "error");
              return [];
            }
            data = filterData;
            break;
          }
          default:
            break;
        }
      } catch {
        Swal.fire("Error", "No se encontró ningún registro en la tabla Actuator o no hay más páginas disponibles", "error");
        return [];
      }
      break;
    }
    case "Mostrar por boardId y fecha": {
      try {
        const res = isGraphicFetching ? await fetchApiByBoardId<Actuator[]>("actuator", boardId) : await fetchApiByBoardId<Actuator[]>("actuator", boardId, setPage, numberPage);
        const filterData = res.filter((actuator) => {
          const formattedDate = new Date(actuator.timest).toISOString().split("T")[0];
          return formattedDate >= String(startDate) && formattedDate <= String(endDate);
        })
        if (filterData.length === 0) {
          Swal.fire("Error", "No se encontró ningún registro con fecha de inicio: " + new Date(startDate!).toLocaleDateString("es-ES") + " y fecha de fin: " + new Date(endDate!).toLocaleDateString("es-ES") + " o no hay más páginas disponibles", "error");
          return [];
        }
        const dataFormatted = filterData.map((actuator) => {
          const formattedDate = new Date(actuator.timest).toLocaleDateString("es-ES");
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
              Swal.fire("Error", "No se encontró ningún registro en la tabla Actuator activado por el calor o no hay más páginas disponibles", "error");
              return [];
            }
            data = filterData;
            break;
          }
          case "Mostrar por frio": {
            const filterData = dataFormatted.filter((actuator) => actuator.isCold);
            if (filterData.length === 0) {
              Swal.fire("Error", "No se encontró ningún registro en la tabla Actuator activado por el frio o no hay más páginas disponibles", "error");
              return [];
            }
            data = filterData;
            break;
          }
          default:
            break;
        }
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