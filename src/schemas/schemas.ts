import * as Yup from 'yup';
import { SchemaProps } from '../interfaces';

export const formSchema = ({isBoardId, isDate} : SchemaProps) => Yup.object().shape({
  boardId: isBoardId
    ? Yup.number().nullable()
    : Yup.number().required('El boardId es requerido').positive('El boardId debe ser un número positivo').integer('El boardId debe ser un número entero'),
  startDate: isDate
    ? Yup.date().nullable()
    : Yup.date().required('La fecha de inicio es requerida'),
  endDate: isDate
    ? Yup.date().nullable()
    : Yup.date().required('La fecha de fin es requerida').min(Yup.ref('startDate'), 'La fecha de fin debe ser mayor a la fecha de inicio')
});