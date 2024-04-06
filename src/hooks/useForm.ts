import { useState } from 'react';

export const useForm = <E>(initialForm: E) => {







  const [formState, setFormState] = useState(initialForm);













  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value } = event.target;

    setFormState({

      ...formState,

      [name]: value

    });

  }




  const onInputSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

    const { name, value } = event.target;

    setFormState({

      ...formState,

      [name]: value

    });

  }




  const onDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value } = event.target;

    const dateValue = new Date(value);

    const dateFormatted = dateValue.toISOString().split('T')[0];

    setFormState({

      ...formState,

      [name]: dateFormatted

    });

  }




  const onResetForm = () => {

    setFormState(initialForm);

  }




  return {

    ...formState,

    formState,

    onInputChange,

    onInputSelectChange,

    onDateChange,

    onResetForm,

  }

}