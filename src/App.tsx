import "./styles";
import { useCallback, useEffect, useState } from "react";
import { ActuatorFilter, ActuatorFormatted, BoardFormatted, DataProps, Filter, FormProps, FormTableProps, PressureFormatted, Register, TemperatureFormatted } from "./interfaces";
import { getBoard, getTempHum, getActuator, getPressure } from "./helpers";
import { Form } from "./components/form/Form";
import { Table } from "./components";
import { formSchema, formTableSchema } from "./schemas";
import { Graphic } from "./components";
import { useFormik } from "formik";
import mqtt from "mqtt";
import { getSameJson } from "./helpers/getSameJson";
import { TableForm } from "./components/table/TableForm";
import { LIMIT } from "./api";

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

  const initialTableForm : FormTableProps = {
    numberPage: 1
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
  const [page, setPage] = useState(1);

  const { values, handleSubmit, handleReset, errors, touched, getFieldProps, setFieldValue } = useFormik({
    initialValues: initialForm,
    validationSchema: formSchema({ isBoardIdAvailable, isDateAvailable, isFilterAvailable, isActuatorFilterAvailable }),
    onSubmit: (values: FormProps) => {
      handleSubmitFunction(values, page);
    },
    validateOnBlur: true,
  })

  const { handleSubmit:handleTableSubmit, errors:errorsTable, touched:touchedTable, values:valuesTable, getFieldProps:getFieldTableProps } = useFormik({
    initialValues: initialTableForm,
    validationSchema: formTableSchema,
    onSubmit: (valuesTable: FormTableProps) => {
      setPage(valuesTable.numberPage);
    },
    validateOnBlur: true
  })

  useEffect(() => {
    if (values.register !== "Registros de actuadores" && values.actuatorFilter !== "-") {
      setFieldValue("actuatorFilter", "-");
    }
  }, [values.register, values.actuatorFilter, setFieldValue])


  useEffect(() => {
    if (values.register === "-" && values.filter !== "-") {
      setFieldValue("filter", "-");
    }
  }, [setFieldValue, values.filter, values.register])


  useEffect(() => {
    setIsFilterAvailable(values.register !== "-")
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

  useEffect(() => {
    if (finalRegisterValue === "Registros de placas" && isGraphic) {
      setIsGraphic(false);
    }
  }, [finalRegisterValue, isGraphic])

  useEffect(() => {
    if ((finalActuatorFilterValue === "Mostrar por calor" || finalActuatorFilterValue === "Mostrar por frio") && isGraphic) {
      setIsGraphic(false);
    }
  }, [finalActuatorFilterValue, isGraphic])

  useEffect(() => {
    setPage(1);
  }, [finalRegisterValue, finalFilterValue, finalActuatorFilterValue])
  

  

  const handleMessage = useCallback((topic: string, message: Buffer): void => {
    let newData = JSON.parse(message.toString());
    newData = { ...newData, formattedDate: new Date(newData.timest).toLocaleDateString("es-ES") };

    // Verifica si newData ya existe en el estado data
    const dataExists = data.some(item => JSON.stringify(item) === JSON.stringify(newData));

    // Si newData ya existe, no hagas nada
    if (dataExists) return;

    delete newData.ok;

    const sameJson = getSameJson(data[0], newData);

    // Si newData no existe, añádelo al estado
    if (data.length > 0 && data.length < LIMIT) {
      if (finalFilterValue === "Mostrar todo" && finalActuatorFilterValue !== "Mostrar por calor" && finalActuatorFilterValue !== "Mostrar por frio") {
        switch (topic) {
          case "boards": {
            sameJson && setData(prev => [...prev, newData]);
            break;
          }
          case "temphums": {
            sameJson && setData(prev => [...prev, newData]);
            break;
          }
          case "pressures": {
            sameJson && setData(prev => [...prev, newData]);
            break;
          }
          case "actuators": {
            sameJson && setData(prev => [...prev, newData]);
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
  }, [data, handleMessage]);


  const onTableReset = () => {
    setData([]);
  }

  const onToggleGraphic = () => {
    setIsGraphic(!isGraphic);
  }

  const handleSubmitFunction = (values: FormProps, page: number) => {


    setIsLoading(true);
    const { boardId, endDate, filter, startDate, actuatorFilter } = values;

    switch (values.register) {

      case "Registros de placas":
        getBoard({ boardId, data, endDate, filter, startDate, numberPage: page, setPage})
          .then((result) => {
            setData(result as BoardFormatted[])
          })
          .catch((error) => console.error(error))
        break;
      case "Registros de temperaturas y humedad":
        getTempHum({ boardId, data, endDate, filter, startDate, numberPage: page, setPage})
          .then((result) => {
            setData(result as TemperatureFormatted[])
          })
          .catch((error) => console.error(error))
        break;
      case "Registros de presion y altitud":
        getPressure({ boardId, data, endDate, filter, startDate, numberPage: page, setPage})
          .then((result) => {
            setData(result as PressureFormatted[])
          })
          .catch((error) => console.error(error))
        break;
      case "Registros de actuadores":
        getActuator({ boardId, data, endDate, filter, startDate, actuatorFilter, numberPage: page, setPage})
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
    handleSubmitFunction(values, page);
  }, [page])

  const onNextPreviousPage = (count: number) => {
    if (data.length > 0) {
      setPage(prev => Math.max(1, prev + count));
    } 
  }

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
        finalActuatorFilterValue={finalActuatorFilterValue}
      />
      {
        (data.length > 0 && !isGraphic) && (
          <>
            <Table data={data} />
            <TableForm
              errors={errorsTable}
              numberPage={page}
              onSubmit={handleTableSubmit}
              touched={touchedTable}
              values={valuesTable}
              getFieldProps={getFieldTableProps}
              onNextPreviousPage={onNextPreviousPage}
            />
          </>
        )
      }
      {
        (data.length > 0 && isGraphic) && (
          <Graphic data={data} />
        )
      }
    </div>
  )
}