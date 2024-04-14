import { Actuator, GraphicProps, Pressure, Temperature } from "../../interfaces";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { isActuatorFormatted, isPressureFormatted, isTemperatureFormatted } from "../../helpers";

export const Graphic: React.FC<GraphicProps> = ({ data }) => {


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let series: any = [];
  let yAxisTitle = 'Valor';

  if (data.length > 0) {
    const firstItem = data[0];
    if (isTemperatureFormatted(firstItem)) {
      series = [
        {
          name: 'Temperatura',
          type: 'line',
          data: (data as Temperature[]).map(item => item.temperature)
        },
        {
          name: 'Humedad',
          type: 'line',
          data: (data as Temperature[]).map(item => item.humidity)
        }
      ];
      yAxisTitle = 'Temperatura / Humedad';
    } else if (isPressureFormatted(firstItem)) {
      series = [
        {
          name: 'Presión',
          type: 'line',
          data: (data as Pressure[]).map(item => item.pressure)
        },
        {
          name: 'Altitud',
          type: 'line',
          data: (data as Pressure[]).map(item => item.altitude)
        }
      ];
      yAxisTitle = 'Presión / Altitud';
    } else if (isActuatorFormatted(firstItem)) {
      series = [
        {
          name: "Encendido",
          type: "line",
          step: "left",
          data: (data as Actuator[]).map(item => item.isOn ? 1 : 0)
        },
        {
          name: "Caliente",
          type: "line",
          step: "left",
          data: (data as Actuator[]).map(item => item.isHot ? 1 : 0)
        },
        {
          name: "Frío",
          type: "line",
          step: "left",
          data: (data as Actuator[]).map(item => item.isCold ? 1 : 0)
        }
      ]
    }
    yAxisTitle = 'Estado';
  }
  const options = {
    chart: {
      animation: {
        duration: 1000,
        easing: 'linear'
      }
    },
    title: {
      text: 'Gráfico'
    },
    xAxis: {
      categories: data.map((item) => item.formattedDate),
      title: {
        text: 'Fecha'
      }
    },
    yAxis: {
      title: {
        text: yAxisTitle
      }
    },
    series: series
  };
  
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  );

}

