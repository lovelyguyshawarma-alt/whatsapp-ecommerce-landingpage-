import React, { useState, useRef, useEffect } from 'react';
import { Palette, Check, Sparkles, Moon, Sun } from 'lucide-react';
import { ThemeId, THEMES } from '../utils/themes';
import { Language } from '../types';

interface ThemeSwitcherProps {
  currentThemeId: ThemeId;
  onSelectTheme: (themeId: ThemeId) => void;
  lang: Language;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  currentThemeId,
  onSelectTheme,
  lang,
}) => {
  const isAr = lang === 'ar';
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentTheme = THEMES[currentThemeId] || THEMES['emerald-dark'];

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getThemeIcon = (type: string) => {
    if (type === 'light') return <Sun className="w-3.5 h-3.5" />;
    if (type === 'motivative') return <Sparkles className="w-3.5 h-3.5" />;
    return <Moon className="w-3.5 h-3.5" />;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition"
        style={{
          backgroundColor: currentTheme.type === 'light' ? '#f1f5f9' : '#14181d',
          borderColor: currentTheme.border,
          color: currentTheme.textPrimary,
        }}
        title={isAr ? 'تغيير ألوان وثيم المتجر' : 'Change Theme Colors'}
      >
        <span
          className="w-2.5 h-2.5 rounded-full shrink-0"
          style={{ backgroundColor: currentTheme.accent }}
        />
        <Palette className="w-3.5 h-3.5" style={{ color: currentTheme.accent }} />
        <span className="hidden lg:inline text-[11px] truncate max-w-[85px]">
          {isAr ? currentTheme.nameAr : currentTheme.nameEn}
        </span>
      </button>

      {isOpen && (
        <div
          className="absolute end-0 mt-2 w-64 rounded-2xl border shadow-2xl p-2 z-50 animate-in fade-in duration-150"
          style={{
            backgroundColor: currentTheme.type === 'light' ? '#ffffff' : '#111519',
            borderColor: currentTheme.border,
          }}
        >
          <div className="px-2.5 py-1.5 border-b mb-1.5" style={{ borderColor: currentTheme.border }}>
            <p className="text-[11px] font-bold" style={{ color: currentTheme.textPrimary }}>
              {isAr ? 'اختر مظهر وألوان المتجر (5 خيارات)' : 'Select Theme Colors (5 Options)'}
            </p>
            <p className="text-[10px]" style={{ color: currentTheme.textMuted }}>
              {isAr ? '3 داكن، 1 فاتح، 1 طاقة تحفيزية' : '3 Dark, 1 Light, 1 Motivative'}
            </p>
          </div>

          <div className="space-y-1">
            {Object.values(THEMES).map((theme) => {
              const isSelected = theme.id === currentThemeId;
              return (
                <button
                  key={theme.id}
                  onClick={() => {
                    onSelectTheme(theme.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition text-start ${
                    isSelected ? 'font-bold' : 'hover:bg-neutral-800/40'
                  }`}
                  style={{
                    backgroundColor: isSelected
                      ? theme.type === 'light'
                        ? '#e2e8f0'
                        : '#1e242b'
                      : 'transparent',
                    color: currentTheme.textPrimary,
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-3 h-3 rounded-full border border-black/20 shrink-0"
                      style={{ backgroundColor: theme.accent }}
                    />
                    <div className="flex flex-col">
                      <span className="flex items-center gap-1.5 text-xs">
                        {isAr ? theme.nameAr : theme.nameEn}
                      </span>
                      <span className="text-[9px] uppercase tracking-wider opacity-70">
                        {theme.type === 'dark' ? (isAr ? 'داكن' : 'Dark') : theme.type === 'light' ? (isAr ? 'فاتح' : 'Light') : (isAr ? 'تحفيزي' : 'Full Color')}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {getThemeIcon(theme.type)}
                    {isSelected && <Check className="w-3.5 h-3.5" style={{ color: theme.accent }} />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
