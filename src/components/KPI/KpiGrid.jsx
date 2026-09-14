import React from 'react';
import { KpiCard } from './KpiCard';
import {
  Coins,
  ClipboardList,
  Target,
  Car,
  Building2,
  TrendingUp
} from 'lucide-react';
import { brl } from '../../utils/formatters';

export function KpiGrid({ kpis }) {
  return (
    <div className="kpi-grid">
      <KpiCard
        variant="blue"
        icon={Coins}
        label="Gasto Total da Frota"
        value={brl(kpis.totalGasto)}
        subtext="Período selecionado"
      />
      <KpiCard
        variant="emerald"
        icon={ClipboardList}
        label="Total de Lançamentos"
        value={kpis.totalLancamentos.toLocaleString('pt-BR')}
        subtext="Registros no período"
      />
      <KpiCard
        variant="amber"
        icon={Target}
        label="Ticket Médio / NF"
        value={brl(kpis.ticketMedio)}
        subtext="Valor médio por lançamento"
      />
      <KpiCard
        variant="rose"
        icon={Car}
        label="Veículos Atendidos"
        value={kpis.veiculosUnicos.toLocaleString('pt-BR')}
        subtext="Placas únicas"
      />
      <KpiCard
        variant="violet"
        icon={Building2}
        label="Fornecedores Ativos"
        value={kpis.fornecedoresUnicos.toLocaleString('pt-BR')}
        subtext="Únicos no período"
      />
      <KpiCard
        variant="cyan"
        icon={TrendingUp}
        label="Gasto Médio / Veículo"
        value={brl(kpis.gastoMedioVeiculo)}
        subtext="Por placa única"
      />
    </div>
  );
}
