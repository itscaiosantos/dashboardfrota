import React from 'react';
import './chartSetup';
import { Line } from 'react-chartjs-2';
import { brl, fk } from '../../utils/formatters';
import { useTheme } from '../../context/ThemeContext';

export function MonthlyEvolutionLine({ monthlyData }) {
  const { isDark } = useTheme();
  const { labels, prev, corr, total } = monthlyData;

  const data = {
    labels,
    datasets: [
      {
        label: 'Preventiva',
        data: prev,
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.08)',
        tension: 0.4,
        fill: true,
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: '#10b981'
      },
      {
        label: 'Corretiva',
        data: corr,
        borderColor: '#f43f5e',
        backgroundColor: 'rgba(244, 63, 94, 0.06)',
        tension: 0.4,
        fill: true,
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: '#f43f5e'
      },
      {
        label: 'Total',
        data: total,
        borderColor: '#3b82f6',
        backgroundColor: 'transparent',
        tension: 0.4,
        fill: false,
        borderWidth: 2,
        borderDash: [5, 4],
        pointRadius: 4,
        pointBackgroundColor: '#3b82f6'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: {
        labels: {
          color: isDark ? '#94a3b8' : '#475569',
          font: { size: 12 },
          boxWidth: 14
        }
      },
      tooltip: {
        callbacks: {
          label: c => ` ${c.dataset.label}: ${brl(c.parsed.y)}`
        }
      }
    },
    scales: {
      x: {
        grid: { color: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)' },
        ticks: { color: isDark ? '#64748b' : '#64748b' }
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
        <div className="section-title">Evolução Mensal de Gastos</div>
        <div className="section-badge emerald">Jan–Jun 2026</div>
      </div>
      <div className="chart-wrapper" style={{ height: '230px' }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
