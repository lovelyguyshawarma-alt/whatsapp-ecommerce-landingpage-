export type ThemeId =
  | 'emerald-dark'
  | 'amber-dark'
  | 'cyan-dark'
  | 'clean-light'
  | 'hyper-motivative';

export interface ThemeConfig {
  id: ThemeId;
  nameAr: string;
  nameEn: string;
  type: 'dark' | 'light' | 'motivative';
  accent: string;
  accentHover: string;
  bgMain: string;
  bgCard: string;
  bgCardHover: string;
  bgHeader: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  glow: string;
  badgeBg: string;
}

export const THEMES: Record<ThemeId, ThemeConfig> = {
  // Dark Option 1: Emerald WhatsApp
  'emerald-dark': {
    id: 'emerald-dark',
    nameAr: 'إميرالد داكن (الأصلي)',
    nameEn: 'Emerald Dark (WhatsApp)',
    type: 'dark',
    accent: '#25D366',
    accentHover: '#1eb956',
    bgMain: '#0a0c0e',
    bgCard: '#111519',
    bgCardHover: '#171d22',
    bgHeader: '#0a0c0e',
    border: '#1f272e',
    textPrimary: '#ffffff',
    textSecondary: '#d1d5db',
    textMuted: '#9ca3af',
    glow: 'rgba(37, 211, 102, 0.25)',
    badgeBg: '#131f18',
  },

  // Dark Option 2: Cyber Gold GTA
  'amber-dark': {
    id: 'amber-dark',
    nameAr: 'سايبر جولد GTA داكن',
    nameEn: 'Cyber Gold GTA Dark',
    type: 'dark',
    accent: '#F59E0B',
    accentHover: '#d97706',
    bgMain: '#0c0d10',
    bgCard: '#14151b',
    bgCardHover: '#1c1e27',
    bgHeader: '#0c0d10',
    border: '#2a2720',
    textPrimary: '#ffffff',
    textSecondary: '#f3f4f6',
    textMuted: '#a3a3a3',
    glow: 'rgba(245, 158, 11, 0.25)',
    badgeBg: '#231d10',
  },

  // Dark Option 3: Neon Cyan Pulse
  'cyan-dark': {
    id: 'cyan-dark',
    nameAr: 'نيون سايان داكن',
    nameEn: 'Neon Cyan Pulse Dark',
    type: 'dark',
    accent: '#00F0FF',
    accentHover: '#00c7d4',
    bgMain: '#070b10',
    bgCard: '#0d1520',
    bgCardHover: '#131e2d',
    bgHeader: '#070b10',
    border: '#172738',
    textPrimary: '#ffffff',
    textSecondary: '#e0f2fe',
    textMuted: '#94a3b8',
    glow: 'rgba(0, 240, 255, 0.28)',
    badgeBg: '#091f2c',
  },

  // Light Option: Clean Studio Light
  'clean-light': {
    id: 'clean-light',
    nameAr: 'أبيض استوديو نقي (Light)',
    nameEn: 'Clean Studio Light',
    type: 'light',
    accent: '#059669',
    accentHover: '#047857',
    bgMain: '#f8fafc',
    bgCard: '#ffffff',
    bgCardHover: '#f1f5f9',
    bgHeader: '#ffffff',
    border: '#e2e8f0',
    textPrimary: '#0f172a',
    textSecondary: '#334155',
    textMuted: '#64748b',
    glow: 'rgba(5, 150, 105, 0.2)',
    badgeBg: '#ecfdf5',
  },

  // Full Color Motivative Option: Hyper Energy Aurora
  'hyper-motivative': {
    id: 'hyper-motivative',
    nameAr: 'طاقة تحفيزية متوهجة (Full Color)',
    nameEn: 'Hyper Energy Motivative',
    type: 'motivative',
    accent: '#FF007A',
    accentHover: '#e0006c',
    bgMain: '#0d0722',
    bgCard: '#170f38',
    bgCardHover: '#231652',
    bgHeader: '#0d0722',
    border: '#3b1d75',
    textPrimary: '#ffffff',
    textSecondary: '#fdf4ff',
    textMuted: '#d8b4fe',
    glow: 'rgba(255, 0, 122, 0.35)',
    badgeBg: '#2d0f48',
  },
};
