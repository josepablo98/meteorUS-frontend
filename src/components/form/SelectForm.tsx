  import { SelectFormProps } from "../../interfaces"

  export const SelectForm = ({ errors, getFieldProps, touched, register }: SelectFormProps) => {

    const fieldPropsRegister = getFieldProps("register");
    const fieldPropsFilter = getFieldProps("filter");
    const fieldPropsActuatorFilter = getFieldProps("actuatorFilter");

    return (
      <div className="row">
        <div className="col-md-4">
          <label>Registros:</label>
          <select className="form-control" name={fieldPropsRegister.name} onChange={fieldPropsRegister.onChange} value={String(fieldPropsRegister.value)}>
            <option>-</option>
            <option>Registros de placas</option>
            <option>Registros de temperaturas y humedad</option>
            <option>Registros de presion y altitud</option>
            <option>Registros de actuadores</option>
          </select>
          {(touched.register && errors.register) && <span>{errors.register}</span>}
        </div>
        {
          (register !== "-" && register !== "Registros de placas") && (
            <div className="col-md-4">
              <label>Filtros:</label>
              <select className="form-control" name={fieldPropsFilter.name} onChange={fieldPropsFilter.onChange} value={String(fieldPropsFilter.value)}>
                <option>-</option>
                <option>Mostrar todo</option>
                <option>Mostrar por boardId</option>
                <option>Mostrar por fecha</option>
                <option>Mostrar por boardId y fecha</option>
              </select>
              {(touched.filter && errors.filter) && <span>{errors.filter}</span>}
            </div>
          )
        }
        {
          register === "Registros de placas" && (
            <div className="col-md-4">
              <label>Filtros:</label>
              <select className="form-control" name={fieldPropsFilter.name} onChange={fieldPropsFilter.onChange} value={String(fieldPropsFilter.value)}>
                <option>-</option>
                <option>Mostrar todo</option>
                <option>Mostrar por boardId</option>
                <option>Mostrar por fecha</option>
              </select>
              {(touched.filter && errors.filter) && <span>{errors.filter}</span>}
            </div>
          )
        }
        {
          register === "Registros de actuadores" && (
            <div className="col-md-4">
              <label>Filtros de actuadores:</label>
              <select className="form-control" name={fieldPropsActuatorFilter.name} onChange={fieldPropsActuatorFilter.onChange} value={String(fieldPropsActuatorFilter.value)}>
                <option>-</option>
                <option>Mostrar todo</option>
                <option>Mostrar por calor</option>
                <option>Mostrar por frio</option>
              </select>
              {(touched.actuatorFilter && errors.actuatorFilter) && <span>{errors.actuatorFilter}</span>}
            </div>
          )
        }

      </div>
    )
  }
