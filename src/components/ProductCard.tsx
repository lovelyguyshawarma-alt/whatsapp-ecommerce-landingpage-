import React, { useState } from 'react';
import { ShoppingBag, Check, Plus, ExternalLink } from 'lucide-react';
import { Product, StoreConfig, Language } from '../types';
import { THEMES } from '../utils/themes';

interface ProductCardProps {
  product: Product;
  config: StoreConfig;
  lang: Language;
  onAddToCart: (product: Product) => void;
  onOpenDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  config,
  lang,
  onAddToCart,
  onOpenDetails,
}) => {
  const isAr = lang === 'ar';
  const title = isAr ? product.titleAr : product.titleEn;
  const desc = isAr ? product.descAr : product.descEn;
  const badge = isAr ? product.badgeAr : product.badgeEn;
  const theme = THEMES[config.themeId] || THEMES['emerald-dark'];

  const [justAdded, setJustAdded] = useState(false);

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  const handleOrderClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <article
      className="group rounded-2xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
      style={{
        backgroundColor: theme.bgCard,
        borderColor: theme.border,
        borderWidth: '1px',
        borderStyle: 'solid',
      }}
    >
      {/* Visual Slot - 65-75% visual lead */}
      <div
        onClick={() => onOpenDetails(product)}
        className="relative aspect-[4/3] overflow-hidden cursor-pointer flex items-center justify-center bg-black/20"
      >
        <img
          src={product.image}
          alt={title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
          {discountPercent ? (
            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-red-600/90 text-white font-mono shadow-sm">
              -{discountPercent}%
            </span>
          ) : (
            <span
              className="text-[10px] font-mono px-1.5 py-0.5 rounded border"
              style={{
                backgroundColor: theme.type === 'light' ? '#ffffff' : '#000000cc',
                color: theme.textMuted,
                borderColor: theme.border,
              }}
            >
              Slot {product.slot}
            </span>
          )}

          {badge && (
            <span
              className="text-[11px] font-semibold px-2 py-0.5 rounded border shadow-sm"
              style={{
                backgroundColor: theme.type === 'light' ? '#ffffff' : '#000000cc',
                color: theme.accent,
                borderColor: theme.border,
              }}
            >
              {badge}
            </span>
          )}
        </div>

        {/* Quick view overlay icon */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span
            className="px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 shadow-lg backdrop-blur-md"
            style={{
              backgroundColor: theme.type === 'light' ? '#ffffffea' : '#111519ea',
              color: theme.textPrimary,
              borderColor: theme.border,
            }}
          >
            <ExternalLink className="w-3.5 h-3.5" style={{ color: theme.accent }} />
            <span>{isAr ? 'عرض التفاصيل' : 'Quick View'}</span>
          </span>
        </div>
      </div>

      {/* Info & Purchase Area */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-3">
        <div>
          {/* Metadata: Category & Slot */}
          <div className="flex items-center gap-2 text-xs mb-1" style={{ color: theme.textMuted }}>
            <span className="uppercase tracking-wider font-semibold text-[11px]" style={{ color: theme.accent }}>
              {product.category}
            </span>
            <span aria-hidden="true">·</span>
            <span>{isAr ? `خانة ${product.slot}` : `Slot ${product.slot}`}</span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onOpenDetails(product)}
            className="text-sm font-bold line-clamp-1 cursor-pointer transition-colors"
            style={{ color: theme.textPrimary }}
          >
            {title}
          </h3>

          {/* Quiet description */}
          <p
            className="text-xs line-clamp-2 mt-1 leading-relaxed"
            style={{ color: theme.textMuted }}
          >
            {desc}
          </p>
        </div>

        {/* Bottom Price & Direct Actions */}
        <div
          className="pt-3 flex items-center justify-between gap-2 border-t"
          style={{ borderColor: theme.border }}
        >
          {/* Tabular Price */}
          <div className="flex items-baseline gap-1.5">
            <span
              className="text-base font-bold font-mono tabular-nums"
              style={{ color: theme.textPrimary }}
            >
              {product.price}
            </span>
            <span className="text-xs font-semibold" style={{ color: theme.accent }}>
              {config.currency}
            </span>
            {product.originalPrice && (
              <span
                className="text-xs line-through font-mono tabular-nums ms-1 opacity-60"
                style={{ color: theme.textMuted }}
              >
                {product.originalPrice}
              </span>
            )}
          </div>

          {/* Primary Action Button: "Order" which adds to cart & keeps shopping */}
          <button
            onClick={handleOrderClick}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 whitespace-nowrap"
            style={{
              backgroundColor: justAdded ? '#10B981' : theme.accent,
              color: '#000000',
            }}
            title={
              isAr
                ? 'أضف هذا المنتج للسلة وتابع التسوق لإضافة منتجات أخرى'
                : 'Add to cart and continue shopping for other items'
            }
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>{isAr ? 'أُضيف! تابع التسوق' : 'Added! Keep Shopping'}</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{isAr ? 'طلب وإضافة' : 'Order & Add'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
