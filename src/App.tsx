import "./styles";
import { useCallback, useEffect, useState } from "react";
import { ActuatorFilter, ActuatorFormatted, BoardFormatted, DataProps, Filter, FormProps, PressureFormatted, Register, TemperatureFormatted } from "./interfaces";
import { getBoard, getTempHum, getActuator, getPressure } from "./helpers";
import { Form } from "./components/form/Form";
import { Table } from "./components";
import { formSchema } from "./schemas";
import { Graphic } from "./components";
import { useFormik } from "formik";
import mqtt from "mqtt";

const MQTT_SERVER = "broker.hivemq.com";
const MQTT_PORT = 8884;

const client = mqtt.connect(`wss://${MQTT_SERVER}:${MQTT_PORT}/mqtt`).setMaxListeners(100);

export const App = () => {

  const initialForm: FormProps = {
    register: "-",
    filter: "-",
    boardId: 1,
    startDate: null,
    endDate: null,
    actuatorFilter: "-"
  }

  const [data, setData] = useState<DataProps>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGraphic, setIsGraphic] = useState(false);
  const [isDateAvailable, setIsDateAvailable] = useState(false);
  const [isBoardIdAvailable, setIsBoardIdAvailable] = useState(false);
  const [isFilterAvailable, setIsFilterAvailable] = useState(false);
  const [isActuatorFilterAvailable, setIsActuatorFilterAvailable] = useState(false);
  const [finalFilterValue, setFinalFilterValue] = useState<Filter>("-");
  const [finalRegisterValue, setFinalRegisterValue] = useState<Register>("-");
  const [finalActuatorFilterValue, setFinalActuatorFilterValue] = useState<ActuatorFilter>("-");

  const { values, handleSubmit, handleReset, errors, touched, getFieldProps, setFieldValue } = useFormik({
    initialValues: initialForm,
    validationSchema: formSchema({ isBoardIdAvailable, isDateAvailable, isFilterAvailable, isActuatorFilterAvailable }),
    onSubmit: (values: FormProps) => {
      handleSubmitFunction(values);
    },
    validateOnBlur: true,
  })

  useEffect(() => {
    setIsFilterAvailable(values.register !== "-")
  }, [values.register])

  useEffect(() => {
    setIsActuatorFilterAvailable(values.register === "Registros de actuadores")
  }, [values.register])


  useEffect(() => {

    if (values.register === "-") {
      setIsDateAvailable(true);
      setIsBoardIdAvailable(true);
      return;
    }

    switch (values.filter) {
      case "Mostrar todo":
        setIsDateAvailable(true);
        setIsBoardIdAvailable(true);
        break;
      case "Mostrar por boardId":
        setIsDateAvailable(true);
        setIsBoardIdAvailable(false);
        break;
      case "Mostrar por fecha":
        setIsDateAvailable(false);
        setIsBoardIdAvailable(true);
        break;
      case "Mostrar por boardId y fecha":
        if (values.register !== "Registros de placas") {
          setIsDateAvailable(false);
          setIsBoardIdAvailable(false);
        } else {
          setIsBoardIdAvailable(true);
          setIsDateAvailable(true);
        }
        break;
      case "-":
        setIsDateAvailable(true);
        setIsBoardIdAvailable(true);
        break;
    }
  }, [values.register, values.filter])
  const onTableReset = () => {
    setData([]);
  }

  const onToggleGraphic = () => {
    setIsGraphic(!isGraphic);
  }

  const handleSubmitFunction = (values: FormProps) => {


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
      default:
        break;
    }
    setFinalFilterValue(values.filter);

    setFinalRegisterValue(values.register);

    setFinalActuatorFilterValue(values.actuatorFilter);
    

    setIsLoading(false);

  }

  useEffect(() => {
    if (finalRegisterValue === "Registros de placas" && isGraphic) {
      setIsGraphic(false);
    }
  }, [finalRegisterValue, isGraphic])
  

  const handleMessage = useCallback((topic: string, message: Buffer): void => {
    let newData = JSON.parse(message.toString());
    newData = { ...newData, formattedDate: new Date(newData.timest).toLocaleDateString("es-ES") };

    // Verifica si newData ya existe en el estado data
    const dataExists = data.some(item => JSON.stringify(item) === JSON.stringify(newData));

    // Si newData ya existe, no hagas nada
    if (dataExists) return;

    // Si newData no existe, añádelo al estado
    if (data.length > 0) {
      if (finalFilterValue === "Mostrar todo" && finalActuatorFilterValue !== "Mostrar por calor" && finalActuatorFilterValue !== "Mostrar por frio") {
        switch (topic) {
          case "boards": {
            if (!("sensorId" in data[0])) {
              setData(prev => [...prev, newData]);
            }
            break;
          }
          case "temphums": {
            if ("temperature" in data[0]) {
              setData(prev => [...prev, newData]);
            }
            break;
          }
          case "pressures": {
            if ("pressure" in data[0]) {
              setData(prev => [...prev, newData]);
            }
            break;
          }
          case "actuators": {
            if ('isOn' in data[0]) {
              setData(prev => [...prev, newData]);
            }
            break;
          }
        }
      }
    }

  }, [data, finalActuatorFilterValue, finalFilterValue]);

  useEffect(() => {
    client.on("connect", () => {
      client.subscribe("boards");
      client.subscribe("temphums");
      client.subscribe("pressures");
      client.subscribe("actuators");
    });



    client.on("message", handleMessage);

    // Limpiar el evento al desmontar el componente
    return () => {
      client.off("message", handleMessage);
    };
  }, [data, handleMessage]); // Dependencias vacías para que se ejecute solo al montar y desmontar

  return (
    <div className="app container">
      <img src="./meteorUS_Logo.png" />
      <h3 className="text-center mt-2">Una aplicacion para consultar valores meteorológicos</h3>

      <Form
        values={values}
        isLoading={isLoading}
        onSubmit={handleSubmit}
        errors={errors}
        touched={touched}
        getFieldProps={getFieldProps}
        setFieldValue={setFieldValue}
        onResetForm={handleReset}
        data={data}
        onTableReset={onTableReset}
        onToggleGraphic={onToggleGraphic}
        isBoardId={isBoardIdAvailable}
        isDate={isDateAvailable}
      />
      {
        (data.length > 0 && !isGraphic) && (
          <Table data={data} />
        )
      }
      {
        (data.length > 0 && isGraphic) && (
          <Graphic data={data} filterActuatorData={finalActuatorFilterValue}/>
        )
      }
    </div>
  )
}