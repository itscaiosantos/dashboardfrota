import React from 'react';
import './chartSetup';
import { Bar } from 'react-chartjs-2';
import { brl, fk } from '../../utils/formatters';
import { useTheme } from '../../context/ThemeContext';

export function TopVehiclesBar({ topVehicles }) {
  const { isDark } = useTheme();

  const labels = topVehicles.map(([placa]) => placa);
  const values = topVehicles.map(([, val]) => val);

  const data = {
    labels,
    datasets: [
      {
        label: 'Gasto (R$)',
        data: values,
        backgroundColor: 'rgba(59, 130, 246, 0.75)',
        borderColor: '#3b82f6',
        borderWidth: 1.5,
        borderRadius: 6
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: c => ` ${brl(c.parsed.y)}`
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: isDark ? '#94a3b8' : '#475569',
          font: { size: 12, weight: '600' }
        }
      },
      y: {
        grid: { color: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)' },
        ticks: {
          color: isDark ? '#64748b' : '#64748b',
          callback: v => 'R$' + fk(v)
        }
      }
    }
  };

  return (
    <div className="chart-card fade-up">
      <div className="section-header">
        <div className="section-title">Top 10 Veículos (Placas) por Gasto</div>
        <div className="section-badge rose">Maiores custos</div>
      </div>
      <div className="chart-wrapper" style={{ height: '260px' }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
