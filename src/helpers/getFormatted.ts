import { DataSimpleProps } from "../interfaces";


export const isTemperatureFormatted = (data: DataSimpleProps) => {
  return 'temperature' in data;
}

export const isPressureFormatted = (data: DataSimpleProps) => {
  return 'pressure' in data;
}

export const isActuatorFormatted = (data: DataSimpleProps) => {
  return 'isOn' in data;
}