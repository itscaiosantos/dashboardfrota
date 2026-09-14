import React from 'react';
import './chartSetup';
import { Doughnut } from 'react-chartjs-2';
import { brl } from '../../utils/formatters';

export function DonutMaintenance({ donutData }) {
  const { preventiva, corretiva, total } = donutData;

  const data = {
    labels: ['Preventiva', 'Corretiva'],
    datasets: [
      {
        data: [preventiva, corretiva],
        backgroundColor: ['rgba(16, 185, 129, 0.85)', 'rgba(244, 63, 94, 0.85)'],
        borderColor: ['#10b981', '#f43f5e'],
        borderWidth: 2,
        hoverOffset: 8
      }
    ]
  };

  const options = {
    cutout: '70%',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: context => {
            const val = context.parsed;
            const pct = total > 0 ? ((val / total) * 100).toFixed(1) : 0;
            return ` ${brl(val)} (${pct}%)`;
          }
        }
      }
    }
  };

  const pctPrev = total > 0 ? ((preventiva / total) * 100).toFixed(1) : '0';
  const pctCorr = total > 0 ? ((corretiva / total) * 100).toFixed(1) : '0';

  return (
    <div className="chart-card fade-up">
      <div className="section-header">
        <div className="section-title">Preventiva vs. Corretiva</div>
        <div className="section-badge blue">Distribuição</div>
      </div>
      <div className="chart-wrapper donut-wrapper">
        <div className="donut-canvas-container">
          <Doughnut data={data} options={options} />
        </div>
        <div className="donut-legend">
          <div className="legend-item">
            <div className="legend-dot" style={{ background: '#10b981' }}></div>
            <span className="legend-label">Preventiva</span>
            <span className="legend-val">{brl(preventiva)}</span>
            <span className="legend-pct">{pctPrev}%</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot" style={{ background: '#f43f5e' }}></div>
            <span className="legend-label">Corretiva</span>
            <span className="legend-val">{brl(corretiva)}</span>
            <span className="legend-pct">{pctCorr}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
