import React from 'react';
import './chartSetup';
import { Bar } from 'react-chartjs-2';
import { brl, fk } from '../../utils/formatters';
import { useTheme } from '../../context/ThemeContext';

const SUPPLIER_COLORS = [
  'rgba(59,130,246,0.8)',
  'rgba(6,182,212,0.8)',
  'rgba(16,185,129,0.8)',
  'rgba(245,158,11,0.8)',
  'rgba(244,63,94,0.8)',
  'rgba(139,92,246,0.8)',
  'rgba(20,184,166,0.8)',
  'rgba(232,121,249,0.8)',
  'rgba(251,146,60,0.8)',
  'rgba(52,211,153,0.8)'
];

export function TopSuppliersBar({ topSuppliers }) {
  const { isDark } = useTheme();

  const labels = topSuppliers.map(([name]) =>
    name.length > 22 ? name.slice(0, 22) + '...' : name
  );
  const values = topSuppliers.map(([, val]) => val);

  const data = {
    labels,
    datasets: [
      {
        label: 'Gasto (R$)',
        data: values,
        backgroundColor: SUPPLIER_COLORS,
        borderRadius: 6,
        borderWidth: 0
      }
    ]
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: c => ` ${brl(c.parsed.x)}`
        }
      }
    },
    scales: {
      x: {
        grid: { color: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)' },
        ticks: {
          color: isDark ? '#64748b' : '#64748b',
          callback: v => 'R$' + fk(v)
        }
      },
      y: {
        grid: { display: false },
        ticks: {
          color: isDark ? '#94a3b8' : '#475569',
          font: { size: 11 }
        }
      }
    }
  };

  return (
    <div className="chart-card fade-up">
      <div className="section-header">
        <div className="section-title">Top 10 Fornecedores</div>
        <div className="section-badge violet">Por Gasto Total</div>
      </div>
      <div className="chart-wrapper" style={{ height: '300px' }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
