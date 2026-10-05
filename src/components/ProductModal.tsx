import React, { useState } from 'react';
import { X, ShoppingBag, Check, Plus, MessageCircle } from 'lucide-react';
import { Product, StoreConfig, Language } from '../types';
import { THEMES } from '../utils/themes';

interface ProductModalProps {
  product: Product | null;
  config: StoreConfig;
  lang: Language;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onOpenCart: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  config,
  lang,
  onClose,
  onAddToCart,
  onOpenCart,
}) => {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const isAr = lang === 'ar';
  const title = isAr ? product.titleAr : product.titleEn;
  const desc = isAr ? product.descAr : product.descEn;
  const badge = isAr ? product.badgeAr : product.badgeEn;
  const theme = THEMES[config.themeId] || THEMES['emerald-dark'];

  const handleAddAndContinue = () => {
    onAddToCart(product, qty);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  const handleAddAndOpenCart = () => {
    onAddToCart(product, qty);
    onClose();
    onOpenCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div
        className="relative border rounded-2xl max-w-2xl w-full p-6 overflow-hidden shadow-2xl z-10 animate-in fade-in duration-200"
        style={{
          backgroundColor: theme.bgCard,
          borderColor: theme.border,
          color: theme.textPrimary,
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 end-4 p-1.5 rounded-lg border transition hover:opacity-80"
          style={{
            backgroundColor: theme.type === 'light' ? '#f1f5f9' : '#14181d',
            borderColor: theme.border,
            color: theme.textSecondary,
          }}
          aria-label={isAr ? 'إغلاق' : 'Close'}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Product Media */}
          <div
            className="relative aspect-square rounded-xl border overflow-hidden flex items-center justify-center bg-black/20"
            style={{ borderColor: theme.border }}
          >
            <img
              src={product.image}
              alt={title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {badge && (
              <span
                className="absolute top-3 start-3 text-xs font-semibold px-2.5 py-1 rounded border backdrop-blur-md"
                style={{
                  backgroundColor: theme.type === 'light' ? '#ffffffea' : '#000000cc',
                  color: theme.accent,
                  borderColor: theme.border,
                }}
              >
                {badge}
              </span>
            )}
          </div>

          {/* Details & Actions */}
          <div className="flex flex-col justify-between h-full space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs mb-1.5" style={{ color: theme.textMuted }}>
                <span className="font-semibold uppercase" style={{ color: theme.accent }}>
                  {product.category}
                </span>
                <span>·</span>
                <span>{isAr ? `خانة المنتج ${product.slot}` : `Slot ${product.slot}`}</span>
              </div>

              <h2 className="text-xl font-bold leading-snug" style={{ color: theme.textPrimary }}>
                {title}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-extrabold font-mono tabular-nums" style={{ color: theme.textPrimary }}>
                  {product.price * qty}
                </span>
                <span className="text-sm font-semibold" style={{ color: theme.accent }}>
                  {config.currency}
                </span>
                {product.originalPrice && (
                  <span className="text-sm line-through font-mono tabular-nums ms-2 opacity-60" style={{ color: theme.textMuted }}>
                    {product.originalPrice * qty} {config.currency}
                  </span>
                )}
              </div>

              <p className="text-xs mt-4 leading-relaxed whitespace-pre-line" style={{ color: theme.textSecondary }}>
                {desc}
              </p>
            </div>

            {/* Quantity and Action Buttons */}
            <div className="pt-4 border-t space-y-3" style={{ borderColor: theme.border }}>
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: theme.textMuted }}>
                  {isAr ? 'الكمية المطلوبة:' : 'Quantity:'}
                </span>
                <div
                  className="flex items-center gap-2 border rounded-lg p-1"
                  style={{
                    backgroundColor: theme.type === 'light' ? '#f1f5f9' : '#0e1216',
                    borderColor: theme.border,
                  }}
                >
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-7 h-7 flex items-center justify-center rounded font-bold text-xs hover:opacity-80 transition"
                    style={{
                      backgroundColor: theme.type === 'light' ? '#e2e8f0' : '#1e242b',
                      color: theme.textPrimary,
                    }}
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-sm font-bold font-mono" style={{ color: theme.textPrimary }}>
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="w-7 h-7 flex items-center justify-center rounded font-bold text-xs hover:opacity-80 transition"
                    style={{
                      backgroundColor: theme.type === 'light' ? '#e2e8f0' : '#1e242b',
                      color: theme.textPrimary,
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                <button
                  onClick={handleAddAndContinue}
                  className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs font-bold transition shadow-md active:scale-95"
                  style={{
                    backgroundColor: added ? '#10B981' : theme.accent,
                    color: '#000000',
                  }}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4 stroke-[2.5]" />
                      <span>{isAr ? 'أُضيف! جاري العودة للتسوق...' : 'Added! Continuing...'}</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                      <ShoppingBag className="w-4 h-4" />
                      <span>{isAr ? 'طلب وإضافة (تابع التسوق)' : 'Order & Continue Shop'}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleAddAndOpenCart}
                  className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs font-semibold border transition hover:opacity-90"
                  style={{
                    backgroundColor: theme.type === 'light' ? '#f1f5f9' : '#192027',
                    borderColor: theme.border,
                    color: theme.textPrimary,
                  }}
                >
                  <MessageCircle className="w-4 h-4" style={{ color: theme.accent }} />
                  <span>{isAr ? 'إضافة وعرض السلة' : 'Add & View Cart'}</span>
                </button>
              </div>

              <p className="text-[11px] text-center" style={{ color: theme.textMuted }}>
                {isAr
                  ? 'بإمكانك إضافة هذا المنتج ثم متابعة تصفح باقي المنتجات الـ 10 وإضافتها معاً.'
                  : 'Add this item then freely continue browsing the other items to order together.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
