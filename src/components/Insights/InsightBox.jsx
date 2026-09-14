import React from 'react';
import { Lightbulb } from 'lucide-react';
import { brl } from '../../utils/formatters';

export function InsightBox({ insight }) {
  const {
    percentCorretiva,
    percentPreventiva,
    isCorretivaMajor,
    topFilial,
    topForn,
    topVeic
  } = insight;

  return (
    <div className="insight-box fade-up">
      <div className="insight-icon">
        <Lightbulb size={24} className="text-cyan animate-pulse" />
      </div>
      <div className="insight-text">
        <span>
          Gasto com Manutenção Corretiva <strong>({percentCorretiva}%)</strong>{' '}
          {isCorretivaMajor ? 'supera' : 'fica abaixo de'} Preventiva{' '}
          <strong>({percentPreventiva}%)</strong>
          {isCorretivaMajor && ' — sinal de manutenção reativa'}.
        </span>
        {topFilial && (
          <span>
            {' '}Filial líder em despesas: <strong>{topFilial[0]}</strong> ({brl(topFilial[1])}).
          </span>
        )}
        {topForn && (
          <span>
            {' '}Fornecedor com maior faturamento: <strong>{topForn[0]}</strong> ({brl(topForn[1])}).
          </span>
        )}
        {topVeic && (
          <span>
            {' '}Veículo com maior custo acumulado: <strong>{topVeic[0]}</strong> ({brl(topVeic[1])}).
          </span>
        )}
      </div>
    </div>
  );
}
