import React, { useEffect, useRef } from 'react';
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend } from 'chart.js';
import { formatDataForChart } from '../../helpers';
import { GraphicProps } from '../../interfaces';

// Registra los elementos necesarios
Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

export const Graphic: React.FC<GraphicProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const formattedData = formatDataForChart(data);
      const chart = new Chart(canvasRef.current, {
        type: 'line',
        data: formattedData,
        options: {
          responsive: true,
          animations: {
            radius: {
              duration: 400,
              easing: 'linear',
              loop: (context) => context.active
            },
          },
          interaction: {
            intersect: false,
          },
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: 'Gráfico',
            }
          },
        },
      });

      return () => {
        chart.destroy();
      };
    }
  }, [data]);

  return <canvas ref={canvasRef} />;
};