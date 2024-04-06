import "./styles.css";
import { useEffect, useState } from "react";
import { useForm } from "./hooks/useForm";
import { ActuatorFormatted, BoardFormatted, DataProps, FormProps, PressureFormatted, TemperatureFormatted } from "./interfaces";
import { getBoard, getTempHum, getActuator, getPressure } from "./helpers";



export const App = () => {

  const initialForm: FormProps = {
    register: "-",
    filter: "Mostrar todo",
    boardId: 0,
    startDate: "",
    endDate: "",
    actuatorFilter: "Mostrar todo"
  }

  const { onInputChange, onDateChange, onInputSelectChange, onResetForm, formState } = useForm<FormProps>(initialForm);

  const { boardId, filter, actuatorFilter, register, endDate, startDate } = formState;

  const [data, setData] = useState<DataProps>([])
  const [isInitDate, setIsInitDate] = useState(false);
  const [isEndDate, setIsEndDate] = useState(false);
  const [isBoardId, setIsBoardId] = useState(false);

  const [isLoading, setIsLoading] = useState(false);



  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setIsLoading(true);

    switch (register) {
      case "Registros de placas":
        getBoard({ boardId, data, endDate, filter, startDate })
          .then((result) => {
            setData(result as BoardFormatted[] | BoardFormatted)
          })
          .catch((error) => console.error(error))
        break;
      case "Registros de temperaturas y humedad":
        getTempHum({ boardId, data, endDate, filter, startDate })
          .then((result) => {
            setData(result as TemperatureFormatted[])
          })
          .catch((error) => console.error(error))
        break;
      case "Registros de presion y altitud":
        getPressure({ boardId, data, endDate, filter, startDate })
          .then((result) => {
            setData(result as PressureFormatted[])
          })
          .catch((error) => console.error(error))
        break;
      case "Registros de actuadores":
        getActuator({ boardId, data, endDate, filter, startDate, actuatorFilter })
          .then((result) => {
            setData(result as ActuatorFormatted[])
          })
          .catch((error) => console.error(error))
        break;
    }

    setIsLoading(false);

  }
  useEffect(() => {
    console.table(data)
  }, [data])


  useEffect(() => {
    switch (filter) {
      case "Mostrar todo":
        setIsInitDate(true);
        setIsEndDate(true);
        setIsBoardId(true);
        break;
      case "Mostrar por boardId":
        setIsInitDate(true);
        setIsEndDate(true);
        setIsBoardId(false);
        break;
      case "Mostrar por fecha":
        setIsInitDate(false);
        setIsEndDate(false);
        setIsBoardId(true);
        break;
      case "Mostrar por boardId y fecha":
        setIsInitDate(false);
        setIsEndDate(false);
        setIsBoardId(false);
        break;
    }
  }, [filter])


  return (
    <div className="app container">
      <h1 className="text-center mt-4">MeteorUS</h1>
      <h3 className="text-center mt-2">Una aplicacion para consultar valores meteorológicos</h3>
      <form>
        <div className="row">
          <div className="form-group col-md-4">
            <label>BoardId:</label>
            <input
              type="number"
              value={boardId}
              name="boardId"
              placeholder="BoardId"
              className="form-control"
              onChange={onInputChange}
              disabled={isBoardId}
            />
          </div>

          <div className="form-group col-md-4">
            <label>Fecha de inicio:</label>
            <input
              type="date"
              name="startDate"
              className="form-control"
              onChange={onDateChange}
              value={startDate.toString()}
              disabled={isInitDate}
            />
          </div>

          <div className="form-group col-md-4">
            <label>Fecha de fin:</label>
            <input
              type="date"
              name="endDate"
              className="form-control"
              onChange={onDateChange}
              value={endDate.toString()}
              disabled={isEndDate}
            />
          </div>
        </div>

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
            register !== "-" && (
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

        <div className="row">
          <div className="col-md-2">
            <button type="submit" className="consult-btn btn btn-primary" onClick={onSubmit} disabled={isLoading}>Consultar</button>
          </div>
          <div className="col-md-2">
            <button type="reset" className="clean-btn btn btn-secondary" onClick={onResetForm}>Restablecer</button>
          </div>
        </div>
      </form>
    </div>
  )
}