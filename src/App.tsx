import "./styles.css";
import { useEffect, useState } from "react";
import { ActuatorFormatted, BoardFormatted, DataProps, FormProps, PressureFormatted, TemperatureFormatted } from "./interfaces";
import { getBoard, getTempHum, getActuator, getPressure } from "./helpers";
import { Form } from "./components/Form";
import { Table } from "./components/Table";
import Swal from "sweetalert2";
import { formSchema } from "./schemas";
import { Graphic } from "./components/Graphic";
import { useFormik } from "formik";



export const App = () => {

  const initialForm: FormProps = {
    register: "-",
    filter: "-",
    boardId: 1,
    startDate: null,
    endDate: null,
    actuatorFilter: "-"
  }

  const [data, setData] = useState<DataProps>([])
  const [isLoading, setIsLoading] = useState(false);
  const [isGraphic, setIsGraphic] = useState(false);
  const [isDate, setIsDate] = useState(false);
  const [isBoardId, setIsBoardId] = useState(false);
  

  const { values, handleSubmit, handleReset, errors, touched, getFieldProps } = useFormik({
    initialValues: initialForm,
    validationSchema: formSchema({isBoardId, isDate}),
    onSubmit: (values: FormProps) => {
      handleSubmitFunction(values);
    },
    validateOnBlur: true,
  })


  useEffect(() => {

    if (values.register === "-") {
      setIsDate(true);
      setIsBoardId(true);
      return;
    }

    switch (values.filter) {
      case "Mostrar todo":
        setIsDate(true);
        setIsBoardId(true);
        break;
      case "Mostrar por boardId":
        setIsDate(true);
        setIsBoardId(false);
        break;
      case "Mostrar por fecha":
        setIsDate(false);
        setIsBoardId(true);
        break;
      case "Mostrar por boardId y fecha":
        if (values.register !== "Registros de placas") {
          setIsDate(false);
          setIsBoardId(false);
        } else {
          setIsBoardId(true);
          setIsDate(true);
        }
        break;
    }
  }, [values.register, values.filter])
  const onTableReset = () => {
    setData([]);
  }

  const onToggleGraphic = () => {
    setIsGraphic(!isGraphic);
  }

  const handleSubmitFunction = (values : FormProps) => {
    

    setIsLoading(true);
    const { boardId, endDate, filter, startDate, actuatorFilter } = values;

    switch (values.register) {
      
      case "Registros de placas":
        getBoard({ boardId, data, endDate, filter, startDate })
          .then((result) => {
            setData(result as BoardFormatted[])
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
      case "-":
          Swal.fire("Error", "Por favor, seleccione un tipo de registro", "info");
    }

    setIsLoading(false);

  }

  return (
    <div className="app container">
      <img src="./meteorUS_Logo.png"/>
      <h3 className="text-center mt-2">Una aplicacion para consultar valores meteorológicos</h3>
      <Form
        values={values}
        isLoading={isLoading}
        onSubmit={handleSubmit}
        errors={errors}
        touched={touched}
        getFieldProps={getFieldProps}
        onResetForm={handleReset}
        data={data}
        onTableReset={onTableReset}
        onToggleGraphic={onToggleGraphic}
        isBoardId={isBoardId}
        isDate={isDate}
      />
      {
        (data.length > 0 && !isGraphic) && (
          <Table data={data} /> 
        )
      }
      {
        (data.length > 0 && isGraphic) && (
          <Graphic data={data}/>
        )
      }
    </div>
  )
}