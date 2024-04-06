import { ButtonProps } from "../../interfaces"

export const ButtonForm = ({ isLoading, onResetForm, onSubmit, onTableReset } : ButtonProps) => {
  return (
    <div className="row my-btn">
      <div className="col-md-2">
        <button type="submit" className="consult-btn btn btn-primary" onClick={onSubmit} disabled={isLoading}>Consultar</button>
      </div>
      <div className="col-md-2">
        <button type="reset" className="clean-btn btn btn-secondary" onClick={onResetForm}>Restablecer</button>
      </div>
      <div className="col-md-2">
        <button type="button" className="table-btn btn btn-secondary" onClick={onTableReset}>Limpiar tabla</button>
      </div>
    </div>
  )
}
