import { DataProps, DataSimpleProps } from "../interfaces";

export const isBoardFormatted = (data: DataSimpleProps) => {
  return !("sensorId" in data);
}

export const isTemperatureFormatted = (data: DataSimpleProps) => {
  return 'temperature' in data;
}

export const isPressureFormatted = (data: DataSimpleProps) => {
  return 'pressure' in data;
}

export const isActuatorFormatted = (data: DataSimpleProps) => {
  return 'isOn' in data;
}

export const getDataType = (data: DataProps) => {
  if (data.length > 0) {
    if (isBoardFormatted(data[0])) {
      return "BoardFormatted";
    }
    else if (isTemperatureFormatted(data[0])) {
      return "TemperatureFormatted";
    }
    else if (isPressureFormatted(data[0])) {
      return "PressureFormatted";
    }
    else if (isActuatorFormatted(data[0])) {
      return "ActuatorFormatted";
    }
    else {
      return "No Data Formatted";
    }
  }
}