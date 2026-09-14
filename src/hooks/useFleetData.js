import { useState, useEffect, useMemo } from 'react';
import { brl } from '../utils/formatters';

export function useFleetData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters state
  const [filters, setFilters] = useState({
    mes: '',
    filial: '',
    tipo: ''
  });

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const res = await fetch('/dados_frota.json');
        if (!res.ok) throw new Error('Falha ao carregar dados da frota');
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setTimeout(() => setLoading(false), 400);
      }
    }
    loadData();
  }, []);

  // Filter options
  const uniqueFiliais = useMemo(() => {
    return [...new Set(data.map(d => d.filial))].filter(Boolean).sort();
  }, [data]);

  const uniqueMeses = useMemo(() => {
    const months = [
      { id: '2026-01', label: 'Janeiro 2026' },
      { id: '2026-02', label: 'Fevereiro 2026' },
      { id: '2026-03', label: 'Março 2026' },
      { id: '2026-04', label: 'Abril 2026' },
      { id: '2026-05', label: 'Maio 2026' },
      { id: '2026-06', label: 'Junho 2026' }
    ];
    return months;
  }, []);

  // Filtered dataset
  const filteredData = useMemo(() => {
    return data.filter(d => {
      if (filters.mes && d.anoMes !== filters.mes) return false;
      if (filters.filial && d.filial !== filters.filial) return false;
      if (filters.tipo === 'PREV' && !d.tipo.includes('PREVENTIVA')) return false;
      if (filters.tipo === 'CORR' && !d.tipo.includes('CORRETIVA')) return false;
      return true;
    });
  }, [data, filters]);

  // KPI Metrics
  const kpis = useMemo(() => {
    const totalGasto = filteredData.reduce((s, d) => s + d.valor, 0);
    const totalLancamentos = filteredData.length;
    const veiculosUnicos = new Set(filteredData.map(d => d.placa)).size;
    const fornecedoresUnicos = new Set(filteredData.map(d => d.fornecedor)).size;
    const ticketMedio = totalLancamentos > 0 ? totalGasto / totalLancamentos : 0;
    const gastoMedioVeiculo = veiculosUnicos > 0 ? totalGasto / veiculosUnicos : 0;

    return {
      totalGasto,
      totalLancamentos,
      veiculosUnicos,
      fornecedoresUnicos,
      ticketMedio,
      gastoMedioVeiculo
    };
  }, [filteredData]);

  // Insights
  const insight = useMemo(() => {
    const co = filteredData
      .filter(d => d.tipo.includes('CORRETIVA'))
      .reduce((s, d) => s + d.valor, 0);
    const pr = filteredData
      .filter(d => d.tipo.includes('PREVENTIVA'))
      .reduce((s, d) => s + d.valor, 0);
    const tt = co + pr;
    const pc = tt > 0 ? ((co / tt) * 100).toFixed(1) : '0';
    const pp = tt > 0 ? ((pr / tt) * 100).toFixed(1) : '0';

    const fm = {};
    filteredData.forEach(d => {
      fm[d.filial] = (fm[d.filial] || 0) + d.valor;
    });
    const topFilial = Object.entries(fm).sort((a, b) => b[1] - a[1])[0];

    const fom = {};
    filteredData.forEach(d => {
      fom[d.fornecedor] = (fom[d.fornecedor] || 0) + d.valor;
    });
    const topForn = Object.entries(fom).sort((a, b) => b[1] - a[1])[0];

    const vm = {};
    filteredData.forEach(d => {
      vm[d.placa] = (vm[d.placa] || 0) + d.valor;
    });
    const topVeic = Object.entries(vm).sort((a, b) => b[1] - a[1])[0];

    return {
      percentCorretiva: pc,
      percentPreventiva: pp,
      isCorretivaMajor: parseFloat(pc) > 50,
      topFilial,
      topForn,
      topVeic
    };
  }, [filteredData]);

  // Donut data (Preventiva vs Corretiva)
  const donutData = useMemo(() => {
    const pr = filteredData
      .filter(d => d.tipo.includes('PREVENTIVA'))
      .reduce((s, d) => s + d.valor, 0);
    const co = filteredData
      .filter(d => d.tipo.includes('CORRETIVA'))
      .reduce((s, d) => s + d.valor, 0);
    const total = pr + co;
    return {
      preventiva: pr,
      corretiva: co,
      total
    };
  }, [filteredData]);

  // Monthly Line evolution
  const monthlyData = useMemo(() => {
    const ms = ['2026-01', '2026-02', '2026-03', '2026-04', '2026-05', '2026-06'];
    const labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
    const prev = ms.map(m =>
      filteredData
        .filter(d => d.anoMes === m && d.tipo.includes('PREVENTIVA'))
        .reduce((s, d) => s + d.valor, 0)
    );
    const corr = ms.map(m =>
      filteredData
        .filter(d => d.anoMes === m && d.tipo.includes('CORRETIVA'))
        .reduce((s, d) => s + d.valor, 0)
    );
    const total = ms.map((_, i) => prev[i] + corr[i]);

    return { labels, prev, corr, total };
  }, [filteredData]);

  // Filial ranking
  const filialRanking = useMemo(() => {
    const map = {};
    filteredData.forEach(d => {
      map[d.filial] = (map[d.filial] || 0) + d.valor;
    });
    const sorted = Object.entries(map).sort((a, b) => b[1] - a[1]);
    const max = sorted[0]?.[1] || 1;
    return { list: sorted, max };
  }, [filteredData]);

  // Top 10 Suppliers
  const topSuppliers = useMemo(() => {
    const map = {};
    filteredData.forEach(d => {
      map[d.fornecedor] = (map[d.fornecedor] || 0) + d.valor;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 10);
  }, [filteredData]);

  // Top 10 Vehicles
  const topVehicles = useMemo(() => {
    const map = {};
    filteredData.forEach(d => {
      map[d.placa] = (map[d.placa] || 0) + d.valor;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 10);
  }, [filteredData]);

  const updateFilter = (key, val) => {
    setFilters(prev => ({ ...prev, [key]: val }));
  };

  const resetFilters = () => {
    setFilters({ mes: '', filial: '', tipo: '' });
  };

  return {
    data,
    filteredData,
    loading,
    error,
    filters,
    updateFilter,
    resetFilters,
    uniqueFiliais,
    uniqueMeses,
    kpis,
    insight,
    donutData,
    monthlyData,
    filialRanking,
    topSuppliers,
    topVehicles,
    totalRecords: data.length
  };
}
