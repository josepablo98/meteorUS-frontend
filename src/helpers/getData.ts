import { DataProps, FormProps } from "../interfaces";
import { getActuator, getBoard, getPressure, getTempHum } from "./getDataFilters";


export const getData = async ({ register, boardId, filter, actuatorFilter, startDate, endDate }: FormProps) => {
  let data: DataProps = [];
  switch (register) {
    case "Registros de placas": {
      const resp = await getBoard({ data, startDate, endDate, filter, boardId });
      data = resp;
      break;
    }
    case "Registros de temperaturas y humedad": {
      const resp = await getTempHum({ data, startDate, endDate, filter, boardId });
      data = resp;
      break;
    }
    case "Registros de presion y altitud": {
      const resp = await getPressure({ data, startDate, endDate, filter, boardId });
      data = resp;
      break;
    }

    case "Registros de actuadores": {
      const resp = await getActuator({ data, startDate, endDate, filter, boardId, actuatorFilter });
      data = resp;
      break;
    }

    default:
      break;
  }
  return data;
}
