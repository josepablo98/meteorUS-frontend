import { isBoardFormatted } from "../../helpers"
import { ButtonProps } from "../../interfaces"

export const ButtonForm = ({ data, isLoading, onResetForm, onSubmit, onTableReset, onToggleGraphic, finalActuatorFilterValue, } : ButtonProps) => {
  return (
    <div className="row my-btn">
      <div className="col-md-2">
        <button type="submit" className="consult-btn btn btn-primary" onClick={() => onSubmit()} disabled={isLoading}>Consultar</button>
      </div>
      <div className="col-md-2">
        <button type="reset" className="clean-btn btn btn-danger" onClick={onResetForm}>Restablecer</button>
      </div>
      <div className="col-md-2">
        <button type="button" className="table-btn btn btn-danger" onClick={onTableReset}>Limpiar tabla</button>
      </div>
      {
        (data.length > 0 && !isBoardFormatted(data[0]) && finalActuatorFilterValue !== "Mostrar por calor" && finalActuatorFilterValue !== "Mostrar por frio") &&
        <div className="col-md-2">
          <button type="button" className="graphic-btn btn btn-success" onClick={onToggleGraphic}>Alternar entre tabla y gráfica</button>
        </div>
      }
    </div>
  )
}
