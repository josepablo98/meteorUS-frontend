import { useState } from 'react';
import * as Yup from 'yup';
import { ErrorProps, Selects } from '../interfaces';

export const useForm = <E extends object>(initialForm: E, validationSchema?: Yup.ObjectSchema<E extends object ? E : object>) => {
  const [formState, setFormState] = useState(initialForm);
  const [errors, setErrors] = useState<ErrorProps[]>([]);

  const onInputChange = async (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    let newValue: string | number | Selects = value;

    // Convertir fecha si el tipo de campo es 'date'
    if (event.target.type === 'date') {
      const dateValue = new Date(value);
      // Verificar si la fecha es válida antes de convertirla
      if (!isNaN(dateValue.getTime())) {
        newValue = dateValue.toISOString().split('T')[0];
      }
    }

    setFormState(previousState => ({
      ...previousState,
      [name]: name.includes('Date') ? value : value.trim(), // Mantener las fechas como cadenas de caracteres
    }));

    if (validationSchema) {
      try {
        await validationSchema.validateAt(name, { [name]: newValue });
        setErrors(errors.filter(error => error.error !== name)); // Remove existing error for this field
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          setErrors(prevErrors => {
            // Check if error already exists for this field
            if (!prevErrors.find(err => err.error === name)) {
              return [...prevErrors, { error: name, message: error.message }]; // Add new error to the list
            }
            return prevErrors;
          });
        }
      }
    }
  }

  const onResetForm = () => {
    setFormState(initialForm);
    setErrors([]); // Reset to empty array
  }

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    errors,
  }
}
