import { FormComponentProps } from "../interfaces"
import { InputForm } from "./form/";
import { SelectForm } from "./form/";
import { ButtonForm } from "./form/";

export const Form = ({ data, errors, getFieldProps, setFieldValue, isLoading, onResetForm, onSubmit, onTableReset, onToggleGraphic, touched, values, isBoardId, isDate }: FormComponentProps) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <InputForm getFieldProps={getFieldProps} errors={errors} touched={touched} isBoardId={isBoardId} isDate={isDate} />

      <SelectForm getFieldProps={getFieldProps} setFieldValue={setFieldValue} errors={errors} touched={touched} register={values.register} />

      <ButtonForm isLoading={isLoading} data={data} onResetForm={onResetForm} onSubmit={onSubmit} onToggleGraphic={onToggleGraphic} onTableReset={onTableReset} />

    </form>
  )
}
