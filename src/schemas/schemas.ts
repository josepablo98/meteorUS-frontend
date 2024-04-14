import * as Yup from 'yup';
import { SchemaProps } from '../interfaces';

export const formSchema = ({ isBoardIdAvailable, isDateAvailable, isFilterAvailable, isActuatorFilterAvailable }: SchemaProps) => Yup.object().shape({
  boardId: isBoardIdAvailable
    ? Yup.number().nullable()
    : Yup.number().required('El boardId es requerido').positive('El boardId debe ser un número positivo').integer('El boardId debe ser un número entero'),
  startDate: isDateAvailable
    ? Yup.date().nullable()
    : Yup.date().required('La fecha de inicio es requerida'),
  endDate: isDateAvailable
    ? Yup.date().nullable()
    : Yup.date().required('La fecha de fin es requerida').min(Yup.ref('startDate'), 'La fecha de fin debe ser mayor a la fecha de inicio'),
  register: Yup.string()
    .required('El registro es requerido')
    .oneOf(['Registros de placas', 'Registros de temperaturas y humedad', 'Registros de presion y altitud', 'Registros de actuadores'], 'El registro es inválido'),
  filter: isFilterAvailable
    ? Yup.string().required('El filtro es requerido').oneOf(['Mostrar todo', 'Mostrar por boardId', 'Mostrar por fecha', 'Mostrar por boardId y fecha'], 'El filtro es inválido')
    : Yup.string().nullable(),
  actuatorFilter: isActuatorFilterAvailable
    ? Yup.string().required('El filtro de actuadores es requerido').oneOf(['Mostrar todo', 'Mostrar por calor', 'Mostrar por frio'], 'El filtro de actuadores es inválido')
    : Yup.string().nullable()
});