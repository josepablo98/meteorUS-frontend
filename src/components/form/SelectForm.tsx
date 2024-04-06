import { SelectFormProps } from "../../interfaces"

export const SelectForm = ({ filter, actuatorFilter, register, onInputSelectChange }: SelectFormProps) => {
  return (
    <div className="row">
      <div className="col-md-4">
        <label>Registros:</label>
        <select className="form-control" name="register" onChange={onInputSelectChange} value={register}>
          <option>-</option>
          <option>Registros de placas</option>
          <option>Registros de temperaturas y humedad</option>
          <option>Registros de presion y altitud</option>
          <option>Registros de actuadores</option>
        </select>
      </div>
      {
        (register !== "-" && register !== "Registros de placas") && (
          <div className="col-md-4">
            <label>Filtros:</label>
            <select className="form-control" name="filter" onChange={onInputSelectChange} value={filter}>
              <option>Mostrar todo</option>
              <option>Mostrar por boardId</option>
              <option>Mostrar por fecha</option>
              <option>Mostrar por boardId y fecha</option>
            </select>
          </div>
        )
      }
      {
        register === "Registros de placas" && (
          <div className="col-md-4">
            <label>Filtros:</label>
            <select className="form-control" name="filter" onChange={onInputSelectChange} value={filter}>
              <option>Mostrar todo</option>
              <option>Mostrar por boardId</option>
              <option>Mostrar por fecha</option>
            </select>
          </div>
        )
      }
      {
        register === "Registros de actuadores" && (
          <div className="col-md-4">
            <label>Filtros de actuadores:</label>
            <select className="form-control" name="actuatorFilter" onChange={onInputSelectChange} value={actuatorFilter}>
              <option>Mostrar todo</option>
              <option>Mostrar por calor</option>
              <option>Mostrar por frio</option>
            </select>
          </div>
        )
      }

    </div>
  )
}
