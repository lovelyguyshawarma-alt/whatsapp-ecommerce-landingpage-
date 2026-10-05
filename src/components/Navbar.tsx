import React from 'react';
import { ShoppingBag, Globe } from 'lucide-react';
import { StoreConfig, Language } from '../types';
import { ThemeId, THEMES } from '../utils/themes';
import { ThemeSwitcher } from './ThemeSwitcher';

interface NavbarProps {
  config: StoreConfig;
  lang: Language;
  onToggleLang: () => void;
  cartCount: number;
  onOpenCart: () => void;
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  onSelectTheme: (themeId: ThemeId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  config,
  lang,
  onToggleLang,
  cartCount,
  onOpenCart,
  activeCategory,
  onSelectCategory,
  onSelectTheme,
}) => {
  const isAr = lang === 'ar';
  const theme = THEMES[config.themeId] || THEMES['emerald-dark'];

  const categories = [
    { id: 'all', nameAr: 'الكل', nameEn: 'All' },
    { id: 'streetwear', nameAr: 'الملابس', nameEn: 'Streetwear' },
    { id: 'gaming', nameAr: 'الألعاب', nameEn: 'Gaming' },
    { id: 'accessories', nameAr: 'الإكسسوارات', nameEn: 'Accessories' },
    { id: 'gear', nameAr: 'المعدات', nameEn: 'Gear' },
  ];

  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-md border-b transition-colors"
      style={{
        backgroundColor: theme.type === 'light' ? 'rgba(255, 255, 255, 0.92)' : `${theme.bgHeader}ea`,
        borderColor: theme.border,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand title, single line */}
        <a href="#" className="flex items-center gap-2.5 shrink-0 group">
          {config.logoType === 'image' && config.logoUrl ? (
            <img
              src={config.logoUrl}
              alt={config.storeNameEn}
              className="h-8 max-w-[130px] object-contain rounded"
            />
          ) : (
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  backgroundColor: theme.accent,
                  boxShadow: `0 0 10px ${theme.accent}`,
                }}
              />
              <span
                className="text-base sm:text-lg font-bold tracking-tight whitespace-nowrap transition-colors"
                style={{ color: theme.textPrimary }}
              >
                {isAr ? config.storeNameAr : config.storeNameEn}
              </span>
            </div>
          )}
        </a>

        {/* Zone 2: Navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {categories.map((cat) => {
            const active = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="transition-colors whitespace-nowrap"
                style={{
                  color: active ? theme.textPrimary : theme.textMuted,
                  fontWeight: active ? '700' : '500',
                  borderBottom: active ? `2px solid ${theme.accent}` : '2px solid transparent',
                  paddingBottom: '2px',
                }}
              >
                {isAr ? cat.nameAr : cat.nameEn}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions (Theme Palette, Language Switcher, Cart) */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Theme Palette Switcher */}
          <ThemeSwitcher
            currentThemeId={config.themeId}
            onSelectTheme={onSelectTheme}
            lang={lang}
          />

          {/* Language Toggle */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition"
            style={{
              backgroundColor: theme.type === 'light' ? '#f1f5f9' : '#14181d',
              borderColor: theme.border,
              color: theme.textPrimary,
            }}
            title={isAr ? 'Switch to English' : 'التحويل إلى العربية'}
          >
            <Globe className="w-3.5 h-3.5" style={{ color: theme.accent }} />
            <span className="uppercase">{isAr ? 'EN' : 'عربي'}</span>
          </button>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-3.5 py-1.5 rounded-lg border transition group"
            style={{
              backgroundColor: theme.type === 'light' ? '#f1f5f9' : '#14181d',
              borderColor: theme.border,
              color: theme.textPrimary,
            }}
            aria-label={isAr ? 'عرض سلة المشتريات' : 'View shopping cart'}
          >
            <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" style={{ color: theme.accent }} />
            <span className="text-xs font-semibold hidden sm:inline">
              {isAr ? 'السلة' : 'Cart'}
            </span>
            <span
              className="px-1.5 py-0.2 min-w-[20px] text-center text-xs font-bold rounded-full font-mono transition-transform duration-200"
              style={{
                backgroundColor: theme.accent,
                color: '#000000',
              }}
            >
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
