import { FormComponentProps } from "../interfaces"
import { InputForm } from "./form/InputForm";
import { SelectForm } from "./form/SelectForm";
import { ButtonForm } from "./form/ButtonForm";

export const Form = ({ data, errors, getFieldProps, isLoading, onResetForm, onSubmit, onTableReset, onToggleGraphic, touched, values, isBoardId, isDate }: FormComponentProps) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <InputForm getFieldProps={getFieldProps} errors={errors} touched={touched} isBoardId={isBoardId} isDate={isDate} />

      <SelectForm getFieldProps={getFieldProps} errors={errors} touched={touched} register={values.register} />

      <ButtonForm isLoading={isLoading} data={data} onResetForm={onResetForm} onSubmit={onSubmit} onToggleGraphic={onToggleGraphic} onTableReset={onTableReset} />

    </form>
  )
}
