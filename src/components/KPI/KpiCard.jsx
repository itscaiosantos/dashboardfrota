import React from 'react';

export function KpiCard({
  variant = 'blue',
  icon: Icon,
  label,
  value,
  subtext
}) {
  return (
    <div className={`kpi-card ${variant} fade-up`}>
      <div className="kpi-icon">
        {Icon && <Icon size={20} />}
      </div>
      <div className="kpi-label">{label}</div>
      <div className="kpi-value">{value}</div>
      {subtext && <div className="kpi-sub">{subtext}</div>}
    </div>
  );
}
