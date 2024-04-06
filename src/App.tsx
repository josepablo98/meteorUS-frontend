import "./styles.css";
import { useEffect, useState } from "react";
import { useForm } from "./hooks/useForm";
import { ActuatorFormatted, BoardFormatted, DataProps, FormProps, PressureFormatted, TemperatureFormatted } from "./interfaces";
import { getBoard, getTempHum, getActuator, getPressure } from "./helpers";
import { Form } from "./components/Form";



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

  const { register, actuatorFilter, boardId, endDate, filter, startDate } = formState;

  const [data, setData] = useState<DataProps>([])
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


  return (
    <div className="app container">
      <h1 className="text-center mt-4">MeteorUS</h1>
      <h3 className="text-center mt-2">Una aplicacion para consultar valores meteorológicos</h3>
      <Form
        actuatorFilter={actuatorFilter}
        boardId={boardId}
        endDate={endDate}
        filter={filter}
        isLoading={isLoading}
        onDateChange={onDateChange}
        onInputChange={onInputChange}
        onInputSelectChange={onInputSelectChange}
        onResetForm={onResetForm}
        onSubmit={onSubmit}
        register={register}
        startDate={startDate}
      />
    </div>
  )
}