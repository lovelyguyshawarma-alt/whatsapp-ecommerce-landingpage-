import { Product, StoreConfig } from '../types';

// Helper to generate crisp themed SVG illustrations as base64 data URLs
function createSvgDataUrl(svgString: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
}

export const defaultStoreConfig: StoreConfig = {
  storeNameAr: 'إميرالد كوميرس',
  storeNameEn: 'Emerald Commerce',
  headlineAr: 'YR Grand Theft AR GTA',
  headlineEn: 'YR Grand Theft AR GTA',
  taglineAr: 'المتجر الحصري لإصدارات الألعاب ومعدات الشارع الفاخرة المعتمدة',
  taglineEn: 'Exclusive street-culture drops, elite gaming mods & tactical accessories',
  logoUrl: '',
  logoType: 'text',
  logoText: 'EMERALD',
  whatsappNumber: '+962791234567',
  emailAddress: 'lovelyguyshawarma@gmail.com',
  currency: 'د.أ',
  accentColor: '#25D366',
  themeId: 'emerald-dark',
  bannerTextAr: '⚡ شحن سريع ومجاني للطلبات فوق 50 د.أ | اطلب الآن عبر الواتساب مباشرة',
  bannerTextEn: '⚡ Free express delivery on orders over 50 د.أ | Order directly on WhatsApp',
  heroBadgeAr: 'إصدار محدود حصري 2026',
  heroBadgeEn: 'Exclusive Limited Drop 2026',
};

// SVG Assets for the 10 slots
const hoodieSvg = createSvgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
  <defs>
    <radialGradient id="bgH" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#14211a" />
      <stop offset="100%" stop-color="#090d0b" />
    </radialGradient>
    <linearGradient id="emH" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#25D366" />
      <stop offset="100%" stop-color="#0f8a3d" />
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#bgH)" />
  <circle cx="200" cy="150" r="110" fill="#25D366" opacity="0.06" filter="blur(20px)" />
  <!-- Hoodie Shape -->
  <path d="M120 100 L160 55 L240 55 L280 100 L320 140 L285 165 L270 140 L270 260 L130 260 L130 140 L115 165 L80 140 Z" fill="#181e22" stroke="#252f36" stroke-width="2" />
  <!-- Hood inside -->
  <path d="M160 55 C160 90 240 90 240 55 Z" fill="#101417" stroke="#25D366" stroke-width="1.5" />
  <!-- Drawstrings -->
  <path d="M185 85 L185 135" stroke="#25D366" stroke-width="2.5" stroke-linecap="round" />
  <path d="M215 85 L215 130" stroke="#25D366" stroke-width="2.5" stroke-linecap="round" />
  <!-- Pocket -->
  <path d="M150 190 L250 190 L240 235 L160 235 Z" fill="#111619" stroke="#252f36" stroke-width="1.5" />
  <!-- YR GTA Graphic on chest -->
  <rect x="175" y="115" width="50" height="35" rx="4" fill="#0d1113" stroke="url(#emH)" stroke-width="1.5" />
  <text x="200" y="137" fill="#25D366" font-family="monospace" font-size="12" font-weight="900" text-anchor="middle" letter-spacing="2">YR GTA</text>
  <!-- Ribbed Hem -->
  <rect x="130" y="250" width="140" height="10" fill="#141a1e" />
</svg>
`);

const controllerSvg = createSvgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
  <defs>
    <radialGradient id="bgC" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#111f18" />
      <stop offset="100%" stop-color="#080c0a" />
    </radialGradient>
    <linearGradient id="emC" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#25D366" />
      <stop offset="100%" stop-color="#14833c" />
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#bgC)" />
  <!-- Controller Body -->
  <path d="M110 115 C130 90 270 90 290 115 C315 145 325 220 285 240 C255 255 235 210 200 210 C165 210 145 255 115 240 C75 220 85 145 110 115 Z" fill="#171b1e" stroke="#242b30" stroke-width="2" />
  <!-- Grip Accents -->
  <path d="M88 170 C90 220 115 235 125 230" stroke="#25D366" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.8" />
  <path d="M312 170 C310 220 285 235 275 230" stroke="#25D366" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.8" />
  <!-- Thumbsticks -->
  <circle cx="155" cy="180" r="22" fill="#20262b" stroke="#2d373f" stroke-width="2" />
  <circle cx="155" cy="180" r="14" fill="#13171a" stroke="#25D366" stroke-width="1.5" />
  <circle cx="230" cy="145" r="22" fill="#20262b" stroke="#2d373f" stroke-width="2" />
  <circle cx="230" cy="145" r="14" fill="#13171a" stroke="#25D366" stroke-width="1.5" />
  <!-- D-Pad -->
  <path d="M140 135 H150 V125 H160 V135 H170 V145 H160 V155 H150 V145 H140 Z" fill="#2a333a" stroke="#37434c" stroke-width="1" />
  <!-- ABXY Buttons with emerald glow -->
  <circle cx="255" cy="120" r="6" fill="#1b2226" stroke="#25D366" stroke-width="1.5" />
  <circle cx="275" cy="135" r="6" fill="#1b2226" stroke="#25D366" stroke-width="1.5" />
  <circle cx="235" cy="135" r="6" fill="#1b2226" stroke="#25D366" stroke-width="1.5" />
  <circle cx="255" cy="150" r="6" fill="#1b2226" stroke="#25D366" stroke-width="1.5" />
  <!-- Logo / LED -->
  <circle cx="200" cy="125" r="10" fill="#25D366" opacity="0.9" />
  <text x="200" y="129" fill="#080c0a" font-family="sans-serif" font-size="9" font-weight="900" text-anchor="middle">YR</text>
</svg>
`);

const watchSvg = createSvgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
  <defs>
    <radialGradient id="bgW" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#15261d" />
      <stop offset="100%" stop-color="#080c09" />
    </radialGradient>
  </defs>
  <rect width="400" height="300" fill="url(#bgW)" />
  <!-- Strap Top & Bottom -->
  <rect x="175" y="25" width="50" height="70" rx="4" fill="#181e22" stroke="#262f36" stroke-width="1.5" />
  <rect x="175" y="205" width="50" height="70" rx="4" fill="#181e22" stroke="#262f36" stroke-width="1.5" />
  <!-- Watch Case Outer -->
  <circle cx="200" cy="150" r="74" fill="#1d2328" stroke="#2d373f" stroke-width="3" />
  <!-- Bezel with emerald accents -->
  <circle cx="200" cy="150" r="66" fill="#111619" stroke="#25D366" stroke-width="2" />
  <!-- Sunburst Dial -->
  <circle cx="200" cy="150" r="58" fill="#0c1214" />
  <!-- Subdials -->
  <circle cx="185" cy="140" r="12" fill="#151b1f" stroke="#25D366" stroke-width="1" opacity="0.8" />
  <circle cx="215" cy="140" r="12" fill="#151b1f" stroke="#25D366" stroke-width="1" opacity="0.8" />
  <circle cx="200" cy="168" r="12" fill="#151b1f" stroke="#25D366" stroke-width="1" opacity="0.8" />
  <!-- Hour Markers -->
  <line x1="200" y1="98" x2="200" y2="106" stroke="#25D366" stroke-width="2.5" />
  <line x1="200" y1="194" x2="200" y2="202" stroke="#25D366" stroke-width="2.5" />
  <line x1="148" y1="150" x2="156" y2="150" stroke="#25D366" stroke-width="2.5" />
  <line x1="244" y1="150" x2="252" y2="150" stroke="#25D366" stroke-width="2.5" />
  <!-- Hands -->
  <line x1="200" y1="150" x2="225" y2="135" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" />
  <line x1="200" y1="150" x2="180" y2="120" stroke="#ffffff" stroke-width="2" stroke-linecap="round" />
  <line x1="200" y1="150" x2="200" y2="108" stroke="#25D366" stroke-width="1.5" stroke-linecap="round" />
  <circle cx="200" cy="150" r="3" fill="#25D366" />
  <!-- Crown & Pushers -->
  <rect x="272" y="145" width="8" height="10" rx="2" fill="#323e47" />
  <rect x="268" y="128" width="6" height="8" rx="2" fill="#323e47" />
  <rect x="268" y="164" width="6" height="8" rx="2" fill="#323e47" />
</svg>
`);

const sneakersSvg = createSvgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
  <defs>
    <radialGradient id="bgS" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#13241b" />
      <stop offset="100%" stop-color="#080c09" />
    </radialGradient>
  </defs>
  <rect width="400" height="300" fill="url(#bgS)" />
  <!-- Sneaker Silhouette High-Top -->
  <path d="M100 190 L110 110 C110 100 120 95 135 95 L175 105 L230 160 L310 185 C325 190 330 205 320 220 L300 235 L90 235 C80 235 75 220 85 210 Z" fill="#1b2126" stroke="#2a343c" stroke-width="2" />
  <!-- Sole with Emerald Line -->
  <path d="M85 230 L315 230 C325 230 325 245 315 250 L85 250 C75 245 75 230 85 230 Z" fill="#0d1113" stroke="#1f272e" stroke-width="1.5" />
  <line x1="90" y1="235" x2="310" y2="235" stroke="#25D366" stroke-width="3" />
  <!-- Emerald Swoosh / Cyber Stripe -->
  <path d="M130 155 C160 150 200 165 260 195 L275 190 C220 155 170 140 130 155 Z" fill="#25D366" />
  <!-- Collar & Tongue -->
  <path d="M125 95 L145 75 L170 85 L155 105 Z" fill="#242c33" stroke="#25D366" stroke-width="1" />
  <!-- Laces -->
  <line x1="145" y1="120" x2="165" y2="115" stroke="#25D366" stroke-width="2.5" />
  <line x1="155" y1="135" x2="180" y2="130" stroke="#25D366" stroke-width="2.5" />
  <line x1="170" y1="150" x2="195" y2="145" stroke="#25D366" stroke-width="2.5" />
</svg>
`);

const bagSvg = createSvgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
  <defs>
    <radialGradient id="bgB" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#15241c" />
      <stop offset="100%" stop-color="#080c09" />
    </radialGradient>
  </defs>
  <rect width="400" height="300" fill="url(#bgB)" />
  <!-- Crossbody Strap -->
  <path d="M80 60 L320 240" stroke="#1f262b" stroke-width="24" stroke-linecap="round" />
  <path d="M80 60 L320 240" stroke="#25D366" stroke-width="2" stroke-dasharray="6,6" opacity="0.7" />
  <!-- Sling Bag Body -->
  <rect x="140" y="90" width="130" height="150" rx="14" fill="#161c20" stroke="#27323a" stroke-width="2" transform="rotate(-10 205 165)" />
  <!-- Front Zipper Pocket with Emerald Accent -->
  <path d="M150 140 L250 125" stroke="#25D366" stroke-width="3" stroke-linecap="round" />
  <rect x="175" y="160" width="55" height="30" rx="4" fill="#0f1417" stroke="#202930" stroke-width="1.5" transform="rotate(-10 202 175)" />
  <!-- Tactical MOLLE Webbing -->
  <line x1="160" y1="195" x2="235" y2="182" stroke="#2d3842" stroke-width="4" stroke-dasharray="10,6" />
  <!-- Release Buckle -->
  <rect x="235" y="195" width="22" height="14" rx="2" fill="#25D366" />
</svg>
`);

const headsetSvg = createSvgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
  <defs>
    <radialGradient id="bgHS" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#14241b" />
      <stop offset="100%" stop-color="#080c09" />
    </radialGradient>
  </defs>
  <rect width="400" height="300" fill="url(#bgHS)" />
  <!-- Headband Arc -->
  <path d="M120 180 C110 80 290 80 280 180" fill="none" stroke="#222b31" stroke-width="18" stroke-linecap="round" />
  <path d="M120 180 C110 80 290 80 280 180" fill="none" stroke="#25D366" stroke-width="2" stroke-linecap="round" opacity="0.9" />
  <!-- Left Ear Cup -->
  <rect x="100" y="150" width="36" height="65" rx="14" fill="#181f24" stroke="#2e3a43" stroke-width="2" />
  <circle cx="118" cy="182" r="12" fill="#0d1114" stroke="#25D366" stroke-width="1.5" />
  <!-- Right Ear Cup -->
  <rect x="264" y="150" width="36" height="65" rx="14" fill="#181f24" stroke="#2e3a43" stroke-width="2" />
  <circle cx="282" cy="182" r="12" fill="#0d1114" stroke="#25D366" stroke-width="1.5" />
  <!-- Microphone Boom -->
  <path d="M118 190 C118 240 180 245 200 235" fill="none" stroke="#2b363f" stroke-width="4" stroke-linecap="round" />
  <circle cx="205" cy="235" r="6" fill="#25D366" />
</svg>
`);

const multiToolSvg = createSvgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
  <defs>
    <radialGradient id="bgMT" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#15261d" />
      <stop offset="100%" stop-color="#080c09" />
    </radialGradient>
  </defs>
  <rect width="400" height="300" fill="url(#bgMT)" />
  <!-- Multi-tool Chassis -->
  <rect x="140" y="80" width="45" height="150" rx="8" fill="#212a30" stroke="#33404a" stroke-width="2" />
  <rect x="215" y="80" width="45" height="150" rx="8" fill="#212a30" stroke="#33404a" stroke-width="2" />
  <!-- Pivot screws -->
  <circle cx="162" cy="100" r="6" fill="#111618" stroke="#25D366" stroke-width="1.5" />
  <circle cx="237" cy="100" r="6" fill="#111618" stroke="#25D366" stroke-width="1.5" />
  <!-- Plier Jaws Top Open -->
  <path d="M162 95 L190 35 L200 35 L175 95 Z" fill="#3c4c57" stroke="#506473" stroke-width="1.5" />
  <path d="M237 95 L210 35 L200 35 L225 95 Z" fill="#3c4c57" stroke="#506473" stroke-width="1.5" />
  <!-- Serrated Blade Accent -->
  <path d="M125 120 L135 120 L138 200 L125 180 Z" fill="#465764" stroke="#25D366" stroke-width="1" />
  <!-- Pocket Clip -->
  <rect x="245" y="125" width="8" height="70" rx="3" fill="#25D366" />
</svg>
`);

const glassesSvg = createSvgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
  <defs>
    <radialGradient id="bgG" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#14251b" />
      <stop offset="100%" stop-color="#080c09" />
    </radialGradient>
    <linearGradient id="lensGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#25D366" stop-opacity="0.85" />
      <stop offset="100%" stop-color="#0b1711" stop-opacity="0.95" />
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#bgG)" />
  <!-- Brow Bar -->
  <line x1="120" y1="110" x2="280" y2="110" stroke="#37444e" stroke-width="3" stroke-linecap="round" />
  <!-- Nose Bridge -->
  <path d="M185 125 C195 120 205 120 215 125" fill="none" stroke="#25D366" stroke-width="2.5" />
  <!-- Left Teardrop Lens -->
  <path d="M110 120 C145 115 185 120 185 140 C185 175 140 195 120 185 C100 170 95 135 110 120 Z" fill="url(#lensGrad)" stroke="#3e4d58" stroke-width="2" />
  <!-- Right Teardrop Lens -->
  <path d="M290 120 C255 115 215 120 215 140 C215 175 260 195 280 185 C300 170 305 135 290 120 Z" fill="url(#lensGrad)" stroke="#3e4d58" stroke-width="2" />
  <!-- Temples -->
  <line x1="98" y1="125" x2="60" y2="150" stroke="#2d373f" stroke-width="3" stroke-linecap="round" />
  <line x1="302" y1="125" x2="340" y2="150" stroke="#2d373f" stroke-width="3" stroke-linecap="round" />
</svg>
`);

const teeSvg = createSvgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
  <defs>
    <radialGradient id="bgT" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#14211a" />
      <stop offset="100%" stop-color="#090d0b" />
    </radialGradient>
  </defs>
  <rect width="400" height="300" fill="url(#bgT)" />
  <!-- Tee Shape -->
  <path d="M140 70 L170 55 C190 70 210 70 230 55 L260 70 L315 110 L285 145 L265 130 L265 255 L135 255 L135 130 L115 145 L85 110 Z" fill="#192025" stroke="#28333b" stroke-width="2" />
  <!-- Crewneck collar with emerald piping -->
  <path d="M170 55 C190 70 210 70 230 55" fill="none" stroke="#25D366" stroke-width="2" />
  <!-- Graphic Chest Print -->
  <rect x="165" y="115" width="70" height="70" rx="6" fill="#101416" stroke="#25D366" stroke-width="1.5" />
  <text x="200" y="145" fill="#25D366" font-family="sans-serif" font-weight="900" font-size="14" text-anchor="middle">GTA</text>
  <text x="200" y="165" fill="#ffffff" font-family="monospace" font-size="9" text-anchor="middle" letter-spacing="1">AR EDITION</text>
</svg>
`);

const keyboardSvg = createSvgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
  <defs>
    <radialGradient id="bgKB" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#15271d" />
      <stop offset="100%" stop-color="#080c09" />
    </radialGradient>
  </defs>
  <rect width="400" height="300" fill="url(#bgKB)" />
  <!-- Keyboard Base -->
  <rect x="70" y="90" width="260" height="130" rx="8" fill="#171e23" stroke="#2b3740" stroke-width="2" />
  <!-- Key Grid 4 rows -->
  <!-- Row 1 -->
  <g fill="#212a31" stroke="#25D366" stroke-width="0.8">
    <rect x="85" y="105" width="20" height="18" rx="2" fill="#25D366" stroke="#ffffff" />
    <rect x="110" y="105" width="16" height="18" rx="2" />
    <rect x="130" y="105" width="16" height="18" rx="2" />
    <rect x="150" y="105" width="16" height="18" rx="2" />
    <rect x="170" y="105" width="16" height="18" rx="2" />
    <rect x="190" y="105" width="16" height="18" rx="2" />
    <rect x="210" y="105" width="16" height="18" rx="2" />
    <rect x="230" y="105" width="16" height="18" rx="2" />
    <rect x="250" y="105" width="16" height="18" rx="2" />
    <rect x="270" y="105" width="16" height="18" rx="2" />
    <rect x="290" y="105" width="24" height="18" rx="2" />
  </g>
  <!-- Row 2 -->
  <g fill="#212a31" stroke="#25D366" stroke-width="0.8">
    <rect x="85" y="128" width="24" height="18" rx="2" />
    <rect x="114" y="128" width="16" height="18" rx="2" />
    <rect x="134" y="128" width="16" height="18" rx="2" />
    <rect x="154" y="128" width="16" height="18" rx="2" />
    <rect x="174" y="128" width="16" height="18" rx="2" />
    <rect x="194" y="128" width="16" height="18" rx="2" />
    <rect x="214" y="128" width="16" height="18" rx="2" />
    <rect x="234" y="128" width="16" height="18" rx="2" />
    <rect x="254" y="128" width="16" height="18" rx="2" />
    <rect x="274" y="128" width="40" height="18" rx="2" fill="#25D366" stroke="#ffffff" />
  </g>
  <!-- Row 3 Spacebar -->
  <g fill="#212a31" stroke="#25D366" stroke-width="0.8">
    <rect x="85" y="151" width="30" height="18" rx="2" />
    <rect x="120" y="151" width="16" height="18" rx="2" />
    <rect x="140" y="151" width="16" height="18" rx="2" />
    <rect x="160" y="151" width="16" height="18" rx="2" />
    <rect x="180" y="151" width="16" height="18" rx="2" />
    <rect x="200" y="151" width="16" height="18" rx="2" />
    <rect x="220" y="151" width="16" height="18" rx="2" />
    <rect x="240" y="151" width="16" height="18" rx="2" />
    <rect x="260" y="151" width="24" height="18" rx="2" />
    <rect x="290" y="151" width="24" height="18" rx="2" />
  </g>
  <g fill="#212a31" stroke="#25D366" stroke-width="0.8">
    <rect x="85" y="174" width="28" height="20" rx="2" />
    <rect x="118" y="174" width="24" height="20" rx="2" />
    <rect x="147" y="174" width="90" height="20" rx="2" fill="#131a1e" stroke="#25D366" stroke-width="1.5" />
    <rect x="242" y="174" width="20" height="20" rx="2" />
    <rect x="267" y="174" width="20" height="20" rx="2" />
    <rect x="292" y="174" width="22" height="20" rx="2" fill="#25D366" stroke="#ffffff" />
  </g>
  <!-- Rotary Knob -->
  <circle cx="304" cy="98" r="7" fill="#25D366" stroke="#ffffff" stroke-width="1" />
</svg>
`);

export const default10Products: Product[] = [
  {
    id: 1,
    slot: 1,
    titleAr: 'هودي واي آر جي تي إيه الإصدار الأسود الفاخر',
    titleEn: 'YR Grand Theft GTA Heavyweight Hoodie',
    price: 45,
    originalPrice: 58,
    category: 'streetwear',
    badgeAr: 'الأكثر طلباً',
    badgeEn: 'Best Seller',
    descAr: 'هودي ثقيل قطن 100% 460GSM مع تطريز شعار YR GTA الزمردي الأيقوني وجيب أمريكي مزدوج. مناسب لجميع فصول السنة مع راحة فائقة وتصميم ملائم لثقافة الشارع.',
    descEn: 'Heavyweight 460GSM 100% organic French terry cotton with metallic emerald embroidered signature YR GTA graphics and dual kangaroo pouch.',
    image: hoodieSvg,
    inStock: true,
    featured: true,
  },
  {
    id: 2,
    slot: 2,
    titleAr: 'يد تحكم إيليت لاسلكية مود إميرالد الأخضر',
    titleEn: 'Pro Elite Wireless Controller (Emerald Mod)',
    price: 65,
    originalPrice: 80,
    category: 'gaming',
    badgeAr: 'إصدار محدود',
    badgeEn: 'Limited Drop',
    descAr: 'يد تحكم احترافية مخصصة بمفاتيح خلفية ميكانيكية، قبضة مانعة للانزلاق مع إضاءة زمردية هادئة وبطارية تدوم 40 ساعة متوافقة مع الـ PC والكونسول.',
    descEn: 'Custom pro gaming controller featuring hall-effect magnetic triggers, tactile mechanical microswitches, emerald ambient grip glow, and 40h wireless battery life.',
    image: controllerSvg,
    inStock: true,
    featured: true,
  },
  {
    id: 3,
    slot: 3,
    titleAr: 'ساعة تكتيكية كرونوغراف ألياف الكربون YR',
    titleEn: 'YR Chronograph Tactical Carbon Watch',
    price: 85,
    originalPrice: 110,
    category: 'accessories',
    badgeAr: 'فخامة حصرية',
    badgeEn: 'Luxury Tier',
    descAr: 'ساعة يد رياضية مقاومة للماء حتى عمق 100 متر مع ميناء زمردي متلألئ وإطار سيراميك تاكيميتر وسوار أسود مريح عالي التحمل.',
    descEn: 'Brushed carbon-titanium composite chronograph with sunburst emerald dial, tachymeter ceramic bezel, sapphire crystal, and 100M water resistance.',
    image: watchSvg,
    inStock: true,
    featured: true,
  },
  {
    id: 4,
    slot: 4,
    titleAr: 'سنيكرز سايبر فانتوم الرياضي عالي الساق',
    titleEn: 'Cyber Phantom High-Top Streetwear Sneakers',
    price: 70,
    originalPrice: 95,
    category: 'streetwear',
    badgeAr: 'إصدار جديد',
    badgeEn: 'New Release',
    descAr: 'حذاء رياضي عصري يجمع بين نعل امتصاص الصدمات المطاطي ولمسات جلدية ناعمة باللون الأخضر الزمردي لراحة تدوم طوال اليوم وأناقة مميزة.',
    descEn: 'Architectural high-top sneaker with nitrogen-infused midsole, technical ballistic nylon upper, and signature emerald speed-line lateral branding.',
    image: sneakersSvg,
    inStock: true,
    featured: true,
  },
  {
    id: 5,
    slot: 5,
    titleAr: 'حقيبة كتف تكتيكية كروس بودي مقاومة للماء',
    titleEn: 'Tactical Stealth Crossbody Sling Bag',
    price: 32,
    originalPrice: 42,
    category: 'gear',
    badgeAr: 'عملي ومقاوم',
    badgeEn: 'Weatherproof',
    descAr: 'حقيبة كروس بودي خفيفة الوزن مزودة بسحابات مضادة للماء وجيوب متعددة مع نظام قفل سريع وحزام قابل للتعديل تناسب الإكسسوارات والهواتف.',
    descEn: 'Cordura 1000D water-repellent tactical crossbody sling with Fidlock magnetic buckle, concealed passport pocket, and modular webbing system.',
    image: bagSvg,
    inStock: true,
    featured: false,
  },
  {
    id: 6,
    slot: 6,
    titleAr: 'سماعة رأس لاسلكية احترافية مع صوت محيطي 7.1',
    titleEn: 'Studio Acoustics 7.1 Wireless Headset',
    price: 58,
    originalPrice: 75,
    category: 'gaming',
    badgeAr: 'صوت محيطي',
    badgeEn: 'Spatial Audio',
    descAr: 'سماعة عازلة للضوضاء النشطة مع ميكروفون نقي جداً للبث والألعاب، ووسادات أذن ميموري فوم مريحة للاستخدام المطول.',
    descEn: 'Low-latency 2.4GHz wireless studio headset featuring 50mm neodymium acoustic drivers, ENC detachable broadcast mic, and memory foam plush cups.',
    image: headsetSvg,
    inStock: true,
    featured: false,
  },
  {
    id: 7,
    slot: 7,
    titleAr: 'أداة تيتانيوم جيب متعددة الوظائف EDC',
    titleEn: 'Titanium EDC Precision Multi-Tool',
    price: 24,
    originalPrice: 30,
    category: 'gear',
    badgeAr: 'أداء صلب',
    badgeEn: 'Titanium Build',
    descAr: 'أداة جيب مدمجة 14 في 1 مصنوعة من سبائك التيتانيوم القوية والمقاومة للصدأ، تشتمل على مفكات، شفرة آمنة، وفتاحة معدنية.',
    descEn: 'Grade 5 titanium 14-in-1 pocket tool featuring locking pliers, wire cutters, metric ruler, and precision bottle opener with deep-carry pocket clip.',
    image: multiToolSvg,
    inStock: true,
    featured: false,
  },
  {
    id: 8,
    slot: 8,
    titleAr: 'نظارة شمسية أفياتور مستقطبة بعدسات إميرالد',
    titleEn: 'Polarized Dark Emerald Aviator Sunglasses',
    price: 28,
    originalPrice: 38,
    category: 'accessories',
    badgeAr: 'حماية UV400',
    badgeEn: 'Polarized UV400',
    descAr: 'إطار معدني متين وخفيف الوزن مع عدسات شمسية مستقطبة تحجب الأشعة فوق البنفسجية 100% بلون أخضر زمردي داكن وتفاصيل محفورة بالليزر.',
    descEn: 'Ultralight stainless steel aviator frame with polarized UV400 dark emerald gradient lenses and hypoallergenic silicone nose pads.',
    image: glassesSvg,
    inStock: true,
    featured: false,
  },
  {
    id: 9,
    slot: 9,
    titleAr: 'تيشيرت أوفرسايز رسمة حصرية بغسيل حمضي',
    titleEn: 'Oversized Vintage Acid-Wash GTA Graphic Tee',
    price: 22,
    originalPrice: 28,
    category: 'streetwear',
    badgeAr: 'ستايل عصري',
    badgeEn: 'Vintage Wash',
    descAr: 'تيشيرت بقصة فضفاضة مريحة قماش قطني معالج بغسيل حمضي رترو مع طباعة شاشة يدوية تدوم طويلاً لا تتأثر بالغسيل.',
    descEn: 'Vintage charcoal acid-wash 260GSM cotton jersey tee with dropped shoulders, raw-cut silhouette, and emerald typographic screen print.',
    image: teeSvg,
    inStock: true,
    featured: false,
  },
  {
    id: 10,
    slot: 10,
    titleAr: 'كيبورد ميكانيكي 75% سويتشات صامتة وإضاءة RGB',
    titleEn: 'Emerald Night Mechanical 75% Gaming Keyboard',
    price: 78,
    originalPrice: 98,
    category: 'gaming',
    badgeAr: 'ميكانيكي احترافي',
    badgeEn: 'Hot-Swap 75%',
    descAr: 'لوحة مفاتيح ميكانيكية تدعم التبديل السريع للسويتشات (Hot-swap) مع مفتاح تحكم صوتي معدني وعزل صوتي مزدوج وإضاءة خافتة أنيقة.',
    descEn: 'Gasket-mounted 75% hot-swappable mechanical keyboard with pre-lubed linear switches, aluminum rotary volume knob, and emerald underglow PCB.',
    image: keyboardSvg,
    inStock: true,
    featured: false,
  },
];
