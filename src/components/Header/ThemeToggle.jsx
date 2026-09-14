import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      id="themeToggle"
      onClick={toggleTheme}
      title={isDark ? 'Mudar para Modo Claro' : 'Mudar para Modo Escuro'}
      className="theme-toggle-btn"
      aria-label="Alternar tema"
    >
      {isDark ? (
        <>
          <Sun size={15} className="theme-icon text-amber" />
          <span className="theme-label">Modo Claro</span>
        </>
      ) : (
        <>
          <Moon size={15} className="theme-icon text-blue" />
          <span className="theme-label">Modo Escuro</span>
        </>
      )}
    </button>
  );
}
