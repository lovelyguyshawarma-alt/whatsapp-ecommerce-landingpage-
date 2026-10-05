import React from 'react';
import { Lock, MessageCircle, Mail, ShieldCheck } from 'lucide-react';
import { StoreConfig, Language } from '../types';
import { THEMES } from '../utils/themes';

interface FooterProps {
  config: StoreConfig;
  lang: Language;
  onOpenSettings: () => void;
}

export const Footer: React.FC<FooterProps> = ({ config, lang, onOpenSettings }) => {
  const isAr = lang === 'ar';
  const theme = THEMES[config.themeId] || THEMES['emerald-dark'];

  return (
    <footer
      className="mt-auto border-t py-10 px-4 sm:px-6 text-xs transition-colors"
      style={{
        backgroundColor: theme.type === 'light' ? '#f1f5f9' : '#07090b',
        borderColor: theme.border,
        color: theme.textMuted,
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Rights */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-start">
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: theme.accent }}
            />
            <span className="font-bold tracking-tight" style={{ color: theme.textPrimary }}>
              {isAr ? config.storeNameAr : config.storeNameEn}
            </span>
          </div>
          <span className="hidden sm:inline opacity-30">|</span>
          <span style={{ color: theme.textMuted }}>
            © 2026 {config.headlineAr}. {isAr ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </span>

          {/* Discreet admin lock button (hidden in plain sight, with shortcut hint) */}
          <button
            onClick={onOpenSettings}
            className="transition p-1 rounded hover:opacity-100 opacity-40"
            style={{ color: theme.textMuted }}
            title={isAr ? 'لوحة تحكم المتجر (Ctrl + Shift + E)' : 'Store Settings (Ctrl + Shift + E)'}
            aria-label={isAr ? 'لوحة تحكم المتجر' : 'Store Settings'}
          >
            <Lock className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Contact links */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          <a
            href={`https://wa.me/${config.whatsappNumber.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 transition hover:opacity-80"
            style={{ color: theme.textSecondary }}
          >
            <MessageCircle className="w-4 h-4" style={{ color: theme.accent }} />
            <span className="font-mono dir-ltr">{config.whatsappNumber}</span>
          </a>

          <a
            href={`mailto:${config.emailAddress}`}
            className="flex items-center gap-1.5 transition hover:opacity-80"
            style={{ color: theme.textSecondary }}
          >
            <Mail className="w-4 h-4" style={{ color: theme.textMuted }} />
            <span className="font-mono">{config.emailAddress}</span>
          </a>

          <div className="flex items-center gap-1.5" style={{ color: theme.textMuted }}>
            <ShieldCheck className="w-4 h-4" style={{ color: theme.accent }} />
            <span>{isAr ? 'دفع عند الاستلام' : 'Cash on Delivery'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
