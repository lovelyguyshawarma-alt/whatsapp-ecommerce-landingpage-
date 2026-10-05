import React from 'react';
import { Search, ShieldCheck, Zap, Truck, MessageCircle } from 'lucide-react';
import { StoreConfig, Language } from '../types';
import { THEMES } from '../utils/themes';

interface HeroProps {
  config: StoreConfig;
  lang: Language;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  productCount: number;
}

export const Hero: React.FC<HeroProps> = ({
  config,
  lang,
  searchQuery,
  onSearchChange,
  activeCategory,
  onSelectCategory,
  productCount,
}) => {
  const isAr = lang === 'ar';
  const theme = THEMES[config.themeId] || THEMES['emerald-dark'];

  const categories = [
    { id: 'all', nameAr: 'كل المنتجات', nameEn: 'All Items' },
    { id: 'streetwear', nameAr: 'أزياء الشارع', nameEn: 'Streetwear' },
    { id: 'gaming', nameAr: 'عالم الألعاب', nameEn: 'Gaming' },
    { id: 'accessories', nameAr: 'إكسسوارات', nameEn: 'Accessories' },
    { id: 'gear', nameAr: 'معدات EDC', nameEn: 'Gear' },
  ];

  return (
    <section
      className="relative overflow-hidden border-b pt-12 pb-14 px-4 sm:px-6 transition-colors"
      style={{
        backgroundColor: theme.bgMain,
        borderColor: theme.border,
      }}
    >
      {/* Dynamic ambient aura */}
      <div
        className="absolute top-1/4 start-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ backgroundColor: theme.accent }}
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Subtle pill badge */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium mb-6 shadow-sm"
          style={{
            backgroundColor: theme.badgeBg,
            borderColor: theme.border,
            color: theme.accent,
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-ping"
            style={{ backgroundColor: theme.accent }}
          />
          <span>{isAr ? config.heroBadgeAr : config.heroBadgeEn}</span>
        </div>

        {/* Main Headline (YR Grand Theft AR GTA) */}
        <h1
          className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 leading-tight"
          style={{ color: theme.textPrimary }}
        >
          {isAr ? config.headlineAr : config.headlineEn}
        </h1>

        {/* Tagline */}
        <p
          className="text-sm sm:text-base lg:text-lg max-w-2xl mx-auto mb-8 leading-relaxed"
          style={{ color: theme.textSecondary }}
        >
          {isAr ? config.taglineAr : config.taglineEn}
        </p>

        {/* Search bar & quick filters */}
        <div className="max-w-xl mx-auto space-y-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={
                isAr
                  ? `ابحث في المنتجات الـ ${productCount} الحصرية...`
                  : `Search the ${productCount} exclusive products...`
              }
              className="w-full border rounded-xl px-4 py-3 pe-11 text-sm focus:outline-none transition shadow-inner"
              style={{
                backgroundColor: theme.type === 'light' ? '#ffffff' : theme.bgCard,
                borderColor: theme.border,
                color: theme.textPrimary,
              }}
            />
            <Search
              className="absolute top-3.5 end-3.5 w-4 h-4 pointer-events-none"
              style={{ color: theme.textMuted }}
            />
          </div>

          {/* Interactive filter tabs */}
          <div
            className="flex items-center justify-center flex-wrap gap-1.5 p-1 rounded-xl border"
            style={{
              backgroundColor: theme.type === 'light' ? '#e2e8f0' : theme.bgCard,
              borderColor: theme.border,
            }}
          >
            {categories.map((cat) => {
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg transition-all"
                  style={{
                    backgroundColor: active
                      ? theme.type === 'light'
                        ? '#ffffff'
                        : '#232b34'
                      : 'transparent',
                    color: active ? theme.textPrimary : theme.textMuted,
                    boxShadow: active ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  }}
                >
                  {isAr ? cat.nameAr : cat.nameEn}
                </button>
              );
            })}
          </div>
        </div>

        {/* Trust markers */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto mt-10 pt-8 border-t text-xs"
          style={{
            borderColor: theme.border,
            color: theme.textMuted,
          }}
        >
          <div className="flex items-center justify-center gap-2 p-2">
            <MessageCircle className="w-4 h-4 shrink-0" style={{ color: theme.accent }} />
            <span>{isAr ? 'أضف منتجات وتابع التسوق بسهولة' : 'Add items & keep shopping easily'}</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-2">
            <Truck className="w-4 h-4 shrink-0" style={{ color: theme.accent }} />
            <span>{isAr ? 'شحن وتوصيل فوري لجميع المدن' : 'Doorstep express delivery'}</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-2">
            <ShieldCheck className="w-4 h-4 shrink-0" style={{ color: theme.accent }} />
            <span>{isAr ? 'طلب جماعي موحّد عبر الواتساب' : 'Consolidated WhatsApp checkout'}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
