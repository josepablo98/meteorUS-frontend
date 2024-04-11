import { GraphicProps } from "../../interfaces";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

export const Graphic: React.FC<GraphicProps> = ({ data }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let series : any = [];
  let yAxisTitle = 'Valor';

  if (data.length > 0) {
    const firstItem = data[0];
    if ('temperature' in firstItem && 'humidity' in firstItem) {
      series = [
        {
          name: 'Temperatura',
          type: 'line',
          data: data.map(item => "temperature" in item && item.temperature)
        },
        {
          name: 'Humedad',
          type: 'line',
          data: data.map(item => "humidity" in item && item.humidity)
        }
      ];
      yAxisTitle = 'Temperatura / Humedad';
    } else if ('pressure' in firstItem && 'altitude' in firstItem) {
      series = [
        {
          name: 'Presión',
          type: 'line',
          data: data.map(item => "pressure" in item && item.pressure)
        },
        {
          name: 'Altitud',
          type: 'line',
          data: data.map(item => "altitude" in item && item.altitude)
        }
      ];
      yAxisTitle = 'Presión / Altitud';
    } else if ('isOn' in firstItem && 'isHot' in firstItem && 'isCold' in firstItem) {
      series = [
        {
          name: 'isOn',
          type: 'line',
          step: 'left',
          data: data.map(item => "isOn" in item && item.isOn ? 1 : 0)
        },
        {
          name: 'isHot',
          type: 'line',
          step: 'left',
          data: data.map(item => "isHot" in item && item.isHot ? 1 : 0)
        },
        {
          name: 'isCold',
          type: 'line',
          step: 'left',
          data: data.map(item => "isCold" in item && item.isCold ? 1 : 0)
        }
      ];
      yAxisTitle = 'Estado';
    }
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
};