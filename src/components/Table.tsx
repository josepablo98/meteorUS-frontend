import { isActuatorFormatted, isPressureFormatted, isTemperatureFormatted } from "../helpers";
import { TableProps } from "../interfaces"
import "../table.css";


export const Table = ({ data }: TableProps) => {
  const columns = [
    { title: 'ID', key: 'id' },
    { title: 'Board ID', key: 'boardId' },
    { title: 'Formatted Date', key: 'formattedDate' },
    ...isTemperatureFormatted(data[0]) ? [
      { title: 'Temperature', key: 'temperature' },
      { title: 'Humidity', key: 'humidity' },
      { title: 'Sensor ID', key: 'sensorId' },
    ] : [],
    ...isPressureFormatted(data[0]) ? [
      { title: 'Pressure', key: 'pressure' },
      { title: 'Altitude', key: 'altitude' },
      { title: 'Sensor ID', key: 'sensorId' },
    ] : [],
    ...isActuatorFormatted(data[0]) ? [
      { title: 'Is On', key: 'isOn' },
      { title: 'Is Hot', key: 'isHot' },
      { title: 'Is Cold', key: 'isCold' },
      { title: 'Sensor ID', key: 'sensorId' },
    ] : [],
  ];

  return (
    <table className="content-table">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {columns.map((column) => (
              <td key={column.key}>{String(item[column.key as keyof typeof item])}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}