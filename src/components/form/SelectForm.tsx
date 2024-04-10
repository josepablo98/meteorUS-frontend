import { useEffect } from "react";
import { SelectFormProps } from "../../interfaces"
import { ErrorForm } from "./ErrorForm";

export const SelectForm = ({ errors, getFieldProps, setFieldValue, touched, register, filter }: SelectFormProps) => {

  const fieldPropsRegister = getFieldProps("register");
  const fieldPropsFilter = getFieldProps("filter");
  const fieldPropsActuatorFilter = getFieldProps("actuatorFilter");
  useEffect(() => {
    if (register === "Registros de placas" && filter === "Mostrar por boardId y fecha") {
      setFieldValue("filter", "-");
    }
  }, [register, filter, setFieldValue]);


  return (
    <div className="row">
      <div className="col-md-4">
        <label>Registros:</label>
        <select className="form-control" name={fieldPropsRegister.name} onChange={fieldPropsRegister.onChange} value={String(fieldPropsRegister.value)} style={{ borderColor: (errors.register && touched.register) ? "red" : "", borderWidth: (errors.register && touched.register) ? "2px" : "" }} onBlur={fieldPropsRegister.onBlur}>
          <option>-</option>
          <option>Registros de placas</option>
          <option>Registros de temperaturas y humedad</option>
          <option>Registros de presion y altitud</option>
          <option>Registros de actuadores</option>
        </select>
        {(touched.register && errors.register) && <ErrorForm error={errors.register}/>}
      </div>
      {
        (register !== "-" && register !== "Registros de placas") && (
          <div className="col-md-4">
            <label>Filtros:</label>
            <select className="form-control" name={fieldPropsFilter.name} onChange={fieldPropsFilter.onChange} value={String(fieldPropsFilter.value)} style={{ borderColor: (errors.register && touched.register) ? "red" : "", borderWidth: (errors.register && touched.register) ? "2px" : "" }} onBlur={fieldPropsFilter.onBlur}>
              <option>-</option>
              <option>Mostrar todo</option>
              <option>Mostrar por boardId</option>
              <option>Mostrar por fecha</option>
              <option>Mostrar por boardId y fecha</option>
            </select>
            {(touched.filter && errors.filter) && <ErrorForm error={errors.filter}/>}
          </div>
        )
      }
      {
        register === "Registros de placas" && (
          <div className="col-md-4">
            <label>Filtros:</label>
            <select className="form-control" name={fieldPropsFilter.name} onChange={fieldPropsFilter.onChange} value={String(fieldPropsFilter.value)} style={{ borderColor: (errors.register && touched.filter) ? "red" : "", borderWidth: (errors.register && touched.register) ? "2px" : ""}} onBlur={fieldPropsFilter.onBlur}>
              <option>-</option>
              <option>Mostrar todo</option>
              <option>Mostrar por boardId</option>
              <option>Mostrar por fecha</option>
            </select>
            {(touched.filter && errors.filter) && <ErrorForm error={errors.filter}/>}
          </div>
        )
      }
      {
        register === "Registros de actuadores" && (
          <div className="col-md-4">
            <label>Filtros de actuadores:</label>
            <select className="form-control" name={fieldPropsActuatorFilter.name} onChange={fieldPropsActuatorFilter.onChange} value={String(fieldPropsActuatorFilter.value)} style={{ borderColor: (errors.register && touched.register) ? "red" : "", borderWidth: (errors.register && touched.register) ? "2px" : "" }} onBlur={fieldPropsActuatorFilter.onBlur}>
              <option>-</option>
              <option>Mostrar todo</option>
              <option>Mostrar por calor</option>
              <option>Mostrar por frio</option>
            </select>
            {(touched.actuatorFilter && errors.actuatorFilter) && <ErrorForm error={errors.actuatorFilter}/>}
          </div>
        )
      }

    </div>
  )
}
