import React from 'react';
import { useFleetData } from './hooks/useFleetData';
import { Header } from './components/Header/Header';
import { FilterBar } from './components/Filters/FilterBar';
import { KpiGrid } from './components/KPI/KpiGrid';
import { InsightBox } from './components/Insights/InsightBox';
import { DonutMaintenance } from './components/Charts/DonutMaintenance';
import { MonthlyEvolutionLine } from './components/Charts/MonthlyEvolutionLine';
import { FilialRankingBars } from './components/Charts/FilialRankingBars';
import { TopSuppliersBar } from './components/Charts/TopSuppliersBar';
import { TopVehiclesBar } from './components/Charts/TopVehiclesBar';
import { DataTable } from './components/Table/DataTable';
import { LoadingSpinner } from './components/Loading/LoadingSpinner';
import './App.css';

export function App() {
  const {
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
    totalRecords
  } = useFleetData();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: 'var(--accent-rose)' }}>
        <h2>Erro ao carregar dados: {error}</h2>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Header totalRecords={totalRecords} />

      <FilterBar
        filters={filters}
        onFilterChange={updateFilter}
        onReset={resetFilters}
        uniqueMeses={uniqueMeses}
        uniqueFiliais={uniqueFiliais}
        filteredCount={filteredData.length}
      />

      <main className="main-content">
        <KpiGrid kpis={kpis} />

        <InsightBox insight={insight} />

        <div className="two-col">
          <DonutMaintenance donutData={donutData} />
          <MonthlyEvolutionLine monthlyData={monthlyData} />
        </div>

        <div className="two-col">
          <FilialRankingBars filialRanking={filialRanking} />
          <TopSuppliersBar topSuppliers={topSuppliers} />
        </div>

        <TopVehiclesBar topVehicles={topVehicles} />

        <DataTable data={filteredData} />
      </main>
    </div>
  );
}

export default App;
