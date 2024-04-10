import { isActuatorFormatted, isPressureFormatted, isTemperatureFormatted } from "../../helpers";
import "../../styles";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TableRow = ({ data }: { data: any }) => {
  const columns = [
    { title: 'ID', key: 'id' },
    { title: 'Board ID', key: 'boardId' },
    { title: 'Date', key: 'formattedDate' },
    ...isTemperatureFormatted(data) ? [
      { title: 'Temperature', key: 'temperature' },
      { title: 'Humidity', key: 'humidity' },
      { title: 'Sensor ID', key: 'sensorId' },
    ] : [],
    ...isPressureFormatted(data) ? [
      { title: 'Pressure', key: 'pressure' },
      { title: 'Altitude', key: 'altitude' },
      { title: 'Sensor ID', key: 'sensorId' },
    ] : [],
    ...isActuatorFormatted(data) ? [
      { title: 'Is On', key: 'isOn' },
      { title: 'Is Hot', key: 'isHot' },
      { title: 'Is Cold', key: 'isCold' },
      { title: 'Sensor ID', key: 'sensorId' },
    ] : [],
  ];

  return (
    <tr>
      {columns.map((column) => (
        <td key={column.key}>{String(data[column.key])}</td>
      ))}
    </tr>
  )
}