import { FormTableComponentProps } from "../../interfaces"
import { ErrorForm } from "../form";

export const TableForm = ({ errors, numberPage, onSubmit, touched, values, getFieldProps, onNextPreviousPage } : FormTableComponentProps) => {

  const pageFieldProps = getFieldProps('numberPage');

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button type="button" onClick={() => onNextPreviousPage(-1)}>Página anterior</button>
        <input
          type="number"
          name={pageFieldProps.name}
          value={numberPage}
          onChange={pageFieldProps.onChange}
          onBlur={pageFieldProps.onBlur}
          placeholder="Número de página"
          style={{ borderColor: (errors.numberPage && touched.numberPage) ? 'red' : '', borderWidth: (errors.numberPage) ? '2px' : '' }}
        />
        {(touched.numberPage && errors.numberPage) && <ErrorForm error={errors.numberPage}/>}
        <button type="button" onClick={() => onNextPreviousPage(1)}>Página siguiente</button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button type="submit" onClick={() => onSubmit()}>Buscar Página</button>
      </div>
    </form>
  )
}
