import { useEffect, useState } from "react";
import { FormComponentProps } from "../interfaces"
import { InputForm } from "./form/InputForm";
import { SelectForm } from "./form/SelectForm";
import { ButtonForm } from "./form/ButtonForm";

export const Form = ({ actuatorFilter, boardId, endDate, filter, onSubmit, register, startDate, isLoading, onDateChange, onInputChange, onInputSelectChange, onResetForm }: FormComponentProps) => {

  const [isDate, setIsDate] = useState(false);
  const [isBoardId, setIsBoardId] = useState(false);

  useEffect(() => {
    switch (filter) {
      case "Mostrar todo":
        setIsDate(true);
        setIsBoardId(true);
        break;
      case "Mostrar por boardId":
        setIsDate(true);
        setIsBoardId(false);
        break;
      case "Mostrar por fecha":
        setIsDate(false);
        setIsBoardId(true);
        break;
      case "Mostrar por boardId y fecha":
        setIsDate(false);
        setIsBoardId(false);
        break;
    }
  }, [filter])

  return (
    <form>
      <InputForm boardId={boardId} endDate={endDate} isBoardId={isBoardId} isDate={isDate} onDateChange={onDateChange} onInputChange={onInputChange} startDate={startDate} />

      <SelectForm actuatorFilter={actuatorFilter} filter={filter} onInputSelectChange={onInputSelectChange} register={register} />

      <ButtonForm isLoading={isLoading} onResetForm={onResetForm} onSubmit={onSubmit} />

    </form>
  )
}
