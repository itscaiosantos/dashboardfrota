import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';

export function FilterBar({
  filters,
  onFilterChange,
  onReset,
  uniqueMeses,
  uniqueFiliais,
  filteredCount
}) {
  const hasActiveFilters = Boolean(filters.mes || filters.filial || filters.tipo);

  return (
    <div className="filters-bar">
      <div className="filters-inner">
        <div className="filter-label-group">
          <Filter size={14} className="text-cyan" />
          <span className="filter-label">Filtros</span>
        </div>

        <select
          id="filtMes"
          value={filters.mes}
          onChange={e => onFilterChange('mes', e.target.value)}
          aria-label="Filtrar por Mês"
        >
          <option value="">Todos os Meses</option>
          {uniqueMeses.map(m => (
            <option key={m.id} value={m.id}>
              {m.label}
            </option>
          ))}
        </select>

        <select
          id="filtFilial"
          value={filters.filial}
          onChange={e => onFilterChange('filial', e.target.value)}
          aria-label="Filtrar por Filial"
        >
          <option value="">Todas as Filiais</option>
          {uniqueFiliais.map(f => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>

        <select
          id="filtTipo"
          value={filters.tipo}
          onChange={e => onFilterChange('tipo', e.target.value)}
          aria-label="Filtrar por Tipo de Manutenção"
        >
          <option value="">Todos os Tipos</option>
          <option value="PREV">Preventiva</option>
          <option value="CORR">Corretiva</option>
        </select>

        {hasActiveFilters && (
          <button
            className="btn-reset"
            onClick={onReset}
            title="Limpar todos os filtros"
          >
            <RotateCcw size={13} />
            <span>Limpar</span>
          </button>
        )}

        <div className="filter-count">
          <span>{filteredCount.toLocaleString('pt-BR')}</span> registros
        </div>
      </div>
    </div>
  );
}
