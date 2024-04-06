export interface FormProps {
  boardId: number;
  startDate: string;
  endDate: string;
  register: Register;
  filter: Filter;
  actuatorFilter: ActuatorFilter;
}

export interface FormComponentProps extends FormProps {
  isLoading: boolean;
  onSubmit: (event: React.FormEvent) => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onInputSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onResetForm: () => void;
  onTableReset: () => void;
}

export interface InputFormProps {
  boardId: number;
  isBoardId: boolean;
  startDate: string;
  endDate: string;
  isDate: boolean;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SelectFormProps {
  filter: Filter;
  actuatorFilter: ActuatorFilter;
  register: Register;
  onInputSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface ButtonProps {
  isLoading: boolean;
  onResetForm: () => void;
  onTableReset: () => void;
  onSubmit: (event: React.FormEvent) => void;
}

export interface TableProps {
  data: DataProps;
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

export interface ColumnProps {
  title: string;
  key: string;
}

export type DataProps = BoardFormatted[] | TemperatureFormatted[] | PressureFormatted[] | ActuatorFormatted[];

export type DataSimpleProps = BoardFormatted | TemperatureFormatted | PressureFormatted | ActuatorFormatted;

export type EndPoint = "board" | "temphum" | "pressure" | "actuator";

export type Register = "Registros de placas" | "Registros de temperaturas y humedad" | "Registros de presion y altitud" | "Registros de actuadores" | "-";

export type Filter = "Mostrar todo" | "Mostrar por boardId" | "Mostrar por fecha" | "Mostrar por boardId y fecha";

export type ActuatorFilter = "Mostrar todo" | "Mostrar por calor" | "Mostrar por frio";