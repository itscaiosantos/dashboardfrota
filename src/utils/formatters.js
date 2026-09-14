/**
 * Formats a number as Brazilian Real (BRL) currency
 * @param {number} value
 * @param {boolean} [fraction=false] - whether to include cents
 * @returns {string}
 */
export function brl(value, fraction = false) {
  if (value === null || value === undefined || isNaN(value)) return 'R$ 0';
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: fraction ? 2 : 0,
    maximumFractionDigits: fraction ? 2 : 0
  });
}

/**
 * Abbreviates large numbers (1.2M, 450K)
 * @param {number} v
 * @returns {string}
 */
export function fk(v) {
  if (v >= 1e6) return (v / 1e6).toFixed(1) + 'M';
  if (v >= 1e3) return (v / 1e3).toFixed(0) + 'K';
  return v.toFixed(0);
}

/**
 * Formats an ISO date string (YYYY-MM-DD) to Brazilian format (DD/MM/YYYY)
 * @param {string} dateStr
 * @returns {string}
 */
export function fd(dateStr) {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const [y, m, dy] = parts;
  return `${dy}/${m}/${y}`;
}
