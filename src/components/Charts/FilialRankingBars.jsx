import React from 'react';
import { brl } from '../../utils/formatters';

const BAR_COLORS = [
  '#3b82f6',
  '#06b6d4',
  '#10b981',
  '#f59e0b',
  '#f43f5e',
  '#8b5cf6',
  '#14b8a6',
  '#e879f9'
];

export function FilialRankingBars({ filialRanking }) {
  const { list, max } = filialRanking;

  return (
    <div className="chart-card fade-up">
      <div className="section-header">
        <div className="section-title">Gasto por Filial</div>
        <div className="section-badge amber">Ranking</div>
      </div>
      <div className="bar-list">
        {list.map(([filial, val], i) => {
          const pct = max > 0 ? ((val / max) * 100).toFixed(1) : 0;
          const color = BAR_COLORS[i % BAR_COLORS.length];

          return (
            <div className="bar-item" key={filial}>
              <div className="bar-meta">
                <span className="bar-name">{filial}</span>
                <span className="bar-val">{brl(val)}</span>
              </div>
              <div className="bar-track">
                <div
                  className="bar-fill"
                  style={{
                    width: `${pct}%`,
                    background: color
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
