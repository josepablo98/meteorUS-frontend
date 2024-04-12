import { isActuatorFormatted, isPressureFormatted, isTemperatureFormatted } from "../../helpers";
import { TableProps } from "../../interfaces";
import { TableRow } from "./TableRow";


export const Table = ({ data }: TableProps) => {
  const columns = [
    { title: 'ID', key: 'id' },
    { title: 'Board ID', key: 'boardId' },
    { title: 'Date', key: 'formattedDate' },
    { title: 'Group ID', key: 'groupId' },
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
        {data.map((item, index) => (
          <TableRow key={index} data={item} />
        ))}
      </tbody>
    </table>
  )
}