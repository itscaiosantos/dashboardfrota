import React from 'react';
import logoImg from '../../assets/logo-impetus-symbol.png';

export function LoadingSpinner() {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="loading-logo-wrapper">
          <img src={logoImg} alt="IMPETUS" className="loading-logo" />
        </div>
        <div className="spinner"></div>
        <div className="loading-text">Carregando dados da frota...</div>
      </div>
    </div>
  );
}
