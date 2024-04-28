import { ActuatorFilter, DataProps, Filter } from "./types";


export interface GetDataProps {
  boardId: number;
  startDate: Date | null;
  endDate: Date | null;
  filter: Filter;
  data: DataProps;
  isFormButtons: boolean;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  actuatorFilter?: ActuatorFilter;
  numberPage?: number;
  isGraphicFetching?: boolean; 
}

export interface Board {
  id: number;
  boardId: number;
  groupId: number;
  timest: number;
}

export interface BoardFormatted {
  id: number;
  boardId: number;
  groupId: number;
  timest: number;
  formattedDate: string;
}

export interface Temperature {
  id: number;
  temperature: number;
  groupId: number;
  humidity: number;
  timest: number;
  boardId: number;
  sensorId: string;
}

export interface TemperatureFormatted {
  id: number;
  temperature: number;
  groupId: number;
  humidity: number;
  timest: number;
  boardId: number;
  sensorId: string;
  formattedDate: string;
}

export interface Pressure {
  id: number;
  pressure: number;
  groupId: number;
  altitude: number;
  timest: number;
  boardId: number;
  sensorId: string;
}

export interface PressureFormatted {
  id: number;
  pressure: number;
  groupId: number;
  altitude: number;
  timest: number;
  boardId: number;
  sensorId: string;
  formattedDate: string;
}

export interface Actuator {
  id: number;
  groupId: number;
  isOn: boolean;
  isHot: boolean;
  isCold: boolean;
  timest: number;
  boardId: number;
  sensorId: string;
}

export interface ActuatorFormatted {
  id: number;
  groupId: number;
  isOn: boolean;
  isHot: boolean;
  isCold: boolean;
  timest: number;
  boardId: number;
  sensorId: string;
  formattedDate: string;
}

