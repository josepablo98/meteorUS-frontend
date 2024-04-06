export interface FormProps {
  boardId: number;
  startDate: string;
  endDate: string;
  register: Register;
  filter: Filter;
  actuatorFilter: ActuatorFilter;
}

export interface GetDataProps {
  boardId: number;
  startDate: string;
  endDate: string;
  filter: Filter;
  data: DataProps;
  actuatorFilter?: ActuatorFilter;
}

export interface Board {
  id: number;
  boardId: number;
  timest: number;
}

export interface BoardFormatted {
  id: number;
  boardId: number;
  timest: number;
  formattedDate: string;
}

export interface Temperature {
  id: number;
  temperature: number;
  humidity: number;
  timest: number;
  boardId: number;
  sensorId: string;
}

export interface TemperatureFormatted {
  id: number;
  temperature: number;
  humidity: number;
  timest: number;
  boardId: number;
  sensorId: string;
  formattedDate: string;
}

export interface Pressure {
  id: number;
  pressure: number;
  altitude: number;
  timest: number;
  boardId: number;
  sensorId: string;
}

export interface PressureFormatted {
  id: number;
  pressure: number;
  altitude: number;
  timest: number;
  boardId: number;
  sensorId: string;
  formattedDate: string;
}

export interface Actuator {
  id: number;
  isOn: boolean;
  isHot: boolean;
  isCold: boolean;
  timest: number;
  boardId: number;
  sensorId: string;
}

export interface ActuatorFormatted {
  id: number;
  isOn: boolean;
  isHot: boolean;
  isCold: boolean;
  timest: number;
  boardId: number;
  sensorId: string;
  formattedDate: string;
}

export type DataProps = BoardFormatted | BoardFormatted[] | TemperatureFormatted[] | PressureFormatted[] | ActuatorFormatted[];

export type EndPoint = "board" | "temphum" | "pressure" | "actuator";

export type Register = "Registros de placas" | "Registros de temperaturas y humedad" | "Registros de presion y altitud" | "Registros de actuadores" | "-";

export type Filter = "Mostrar todo" | "Mostrar por boardId" | "Mostrar por fecha" | "Mostrar por boardId y fecha";

export type ActuatorFilter = "Mostrar todo" | "Mostrar por calor" | "Mostrar por frio";