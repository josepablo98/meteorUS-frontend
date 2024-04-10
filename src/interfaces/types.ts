import { ActuatorFormatted, BoardFormatted, PressureFormatted, TemperatureFormatted } from "./data";

export type DataProps = BoardFormatted[] | TemperatureFormatted[] | PressureFormatted[] | ActuatorFormatted[];

export type DataSimpleProps = BoardFormatted | TemperatureFormatted | PressureFormatted | ActuatorFormatted;

export type EndPoint = "board" | "temphum" | "pressure" | "actuator";


export type Register = "Registros de placas" | "Registros de temperaturas y humedad" | "Registros de presion y altitud" | "Registros de actuadores" | "-";

export type Filter = "Mostrar todo" | "Mostrar por boardId" | "Mostrar por fecha" | "Mostrar por boardId y fecha" | "-";

export type ActuatorFilter = "Mostrar todo" | "Mostrar por calor" | "Mostrar por frio" | "-";


export type Selects = Register | Filter | ActuatorFilter;