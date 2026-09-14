import React, { useState, useMemo } from 'react';
import { Search, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Pagination } from './Pagination';
import { brl, fd } from '../../utils/formatters';

const PAGE_SIZE = 50;

export function DataTable({ data }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('data');
  const [sortDir, setSortDir] = useState(1); // 1 = asc, -1 = desc
  const [currentPage, setCurrentPage] = useState(1);

  // Search filtering
  const searchedData = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return data;
    return data.filter(
      d =>
        d.placa?.toLowerCase().includes(q) ||
        d.fornecedor?.toLowerCase().includes(q) ||
        d.descricao?.toLowerCase().includes(q) ||
        d.filial?.toLowerCase().includes(q)
    );
  }, [data, searchTerm]);

  // Sorting
  const sortedData = useMemo(() => {
    return [...searchedData].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === 'number' && typeof bv === 'number') {
        return (av - bv) * sortDir;
      }
      return String(av || '').localeCompare(String(bv || ''), 'pt-BR') * sortDir;
    });
  }, [searchedData, sortKey, sortDir]);

  // Pagination
  const total = sortedData.length;
  const totalPages = Math.ceil(total / PAGE_SIZE) || 1;
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const pageData = sortedData.slice(startIndex, startIndex + PAGE_SIZE);

  const handleSort = key => {
    if (sortKey === key) {
      setSortDir(prev => prev * -1);
    } else {
      setSortKey(key);
      setSortDir(1);
    }
    setCurrentPage(1);
  };

  const handleSearchChange = e => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const renderSortIcon = key => {
    if (sortKey !== key) {
      return <ArrowUpDown size={12} className="si" />;
    }
    return sortDir === 1 ? (
      <ArrowUp size={12} className="si active" />
    ) : (
      <ArrowDown size={12} className="si active" />
    );
  };

  return (
    <div className="table-card fade-up">
      <div className="table-header">
        <div>
          <div className="section-title">Lançamentos Detalhados</div>
          <div className="section-sub">
            Todos os registros da base de dados com busca e ordenação
          </div>
        </div>
        <div className="search-box">
          <Search size={15} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Pesquisar placa, fornecedor, descrição..."
            value={searchTerm}
            onChange={handleSearchChange}
            aria-label="Pesquisar na tabela"
          />
        </div>
      </div>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort('tipo')}>
                Tipo {renderSortIcon('tipo')}
              </th>
              <th onClick={() => handleSort('filial')}>
                Filial {renderSortIcon('filial')}
              </th>
              <th onClick={() => handleSort('fornecedor')}>
                Fornecedor {renderSortIcon('fornecedor')}
              </th>
              <th onClick={() => handleSort('placa')}>
                Placa {renderSortIcon('placa')}
              </th>
              <th>Descrição</th>
              <th onClick={() => handleSort('data')}>
                Data {renderSortIcon('data')}
              </th>
              <th onClick={() => handleSort('valor')}>
                Valor (R$) {renderSortIcon('valor')}
              </th>
            </tr>
          </thead>
          <tbody>
            {pageData.length > 0 ? (
              pageData.map((d, index) => {
                const isPrev = d.tipo?.includes('PREVENTIVA');
                return (
                  <tr key={`${d.cod || ''}-${d.nf || ''}-${index}`}>
                    <td>
                      <span className={`badge-tipo ${isPrev ? 'badge-prev' : 'badge-corr'}`}>
                        {isPrev ? 'Preventiva' : 'Corretiva'}
                      </span>
                    </td>
                    <td className="strong">{d.filial}</td>
                    <td>{d.fornecedor}</td>
                    <td className="strong placa-cell">{d.placa}</td>
                    <td className="desc-cell" title={d.descricao}>
                      {d.descricao}
                    </td>
                    <td>{fd(d.data)}</td>
                    <td className="strong text-emerald">{brl(d.valor)}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '32px' }}>
                  Nenhum registro encontrado para esta busca ou filtro.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <span className="table-info">
          Mostrando {total === 0 ? 0 : startIndex + 1}–{Math.min(startIndex + PAGE_SIZE, total)} de{' '}
          {total.toLocaleString('pt-BR')} registros
        </span>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
