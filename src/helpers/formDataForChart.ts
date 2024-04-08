import { ChartData } from "chart.js";
import { DataProps, DataSimpleProps } from "../interfaces";

export function formatDataForChart(data: DataProps): ChartData {
  const labels = data.map((item: DataSimpleProps) => item.formattedDate);
  const datasets = [
    {
      label: 'Graphic',
      data: data.map((item: DataSimpleProps) => {
        if ('temperature' in item) {
          return item.temperature;
        } else if ('pressure' in item) {
          return item.pressure;
        } else if ('isOn' in item) {
          return item.isOn ? 1 : 0;
        } else {
          return 0; // default value
        }
      }),
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }
  ];

  return { labels, datasets };
}