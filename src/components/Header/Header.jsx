import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import { Database, Calendar } from 'lucide-react';
import logoImg from '../../assets/logo-impetus.png';

export function Header({ totalRecords }) {
  return (
    <header className="main-header">
      <div className="header-inner">
        <div className="header-brand">
          <div className="header-logo-container" title="IMPETUS Engenharia">
            <img src={logoImg} alt="IMPETUS Engenharia" className="header-logo-img" />
          </div>
          <div className="header-text-group">
            <div className="header-title">IMPETUS Frota</div>
            <div className="header-sub">Dashboard de Despesas &middot; Jan&ndash;Jun 2026</div>
          </div>
        </div>

        <div className="header-badge-group">
          <div className="header-badge">
            <Database size={13} />
            <span>DADOS REAIS &middot; {totalRecords.toLocaleString('pt-BR')} LANÇAMENTOS</span>
          </div>
          <div className="header-credits">
            Dashboard criado por Caio Santos &middot; Planilha por Alessandro Ferreira
          </div>
        </div>

        <div className="header-actions">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
