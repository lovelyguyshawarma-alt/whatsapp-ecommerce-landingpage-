import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, MessageCircle, Mail, AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { CartItem, StoreConfig, Language, CustomerDetails } from '../types';
import { THEMES } from '../utils/themes';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  config: StoreConfig;
  lang: Language;
  onUpdateQty: (productId: number, delta: number) => void;
  onRemoveItem: (productId: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  config,
  lang,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}) => {
  const isAr = lang === 'ar';
  const theme = THEMES[config.themeId] || THEMES['emerald-dark'];

  const [customer, setCustomer] = useState<CustomerDetails>({
    name: '',
    phone: '',
    city: '',
    address: '',
    notes: '',
  });
  const [statusNotice, setStatusNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const freeShippingThreshold = 50;
  const freeShippingLeft = Math.max(0, freeShippingThreshold - total);

  // Format WhatsApp message with multiple accumulated items
  const generateOrderMessage = () => {
    const lines: string[] = [];
    lines.push(
      isAr
        ? `مرحباً، أود إتمام الطلب التالي من *${config.storeNameAr}*:`
        : `Hello, I would like to place the following order from *${config.storeNameEn}*:`
    );
    lines.push('───────────────────────────');
    lines.push(isAr ? '📦 *تفاصيل المنتجات في السلة:*' : '📦 *Cart Items:*');

    items.forEach((item, index) => {
      const name = isAr ? item.product.titleAr : item.product.titleEn;
      const itemTotal = item.product.price * item.quantity;
      lines.push(
        `${index + 1}. ${name} (الكمية: ${item.quantity}) - ${itemTotal} ${config.currency}`
      );
    });

    lines.push('───────────────────────────');
    lines.push(
      isAr
        ? `💰 *المجموع الإجمالي (${items.reduce((s, i) => s + i.quantity, 0)} قطع):* ${total} ${config.currency}`
        : `💰 *Grand Total (${items.reduce((s, i) => s + i.quantity, 0)} items):* ${total} ${config.currency}`
    );
    lines.push('───────────────────────────');
    lines.push(isAr ? '👤 *بيانات المستلم والتوصيل:*' : '👤 *Delivery Details:*');
    lines.push(
      `${isAr ? '• الاسم:' : '• Name:'} ${customer.name.trim() || (isAr ? 'زبون متجر إميرالد' : 'Customer')}`
    );
    lines.push(
      `${isAr ? '• الهاتف:' : '• Phone:'} ${customer.phone.trim() || (isAr ? 'غير محدد' : 'Not specified')}`
    );
    if (customer.city.trim() || customer.address.trim()) {
      lines.push(
        `${isAr ? '• العنوان:' : '• Address:'} ${customer.city.trim()} ${customer.address.trim()}`
      );
    }
    if (customer.notes.trim()) {
      lines.push(
        `${isAr ? '• ملاحظات:' : '• Notes:'} ${customer.notes.trim()}`
      );
    }
    lines.push('───────────────────────────');
    lines.push(
      isAr
        ? 'يرجى تأكيد الطلب وتحديد موعد التوصيل. شكراً!'
        : 'Please confirm the order and delivery schedule. Thank you!'
    );

    return lines.join('\n');
  };

  const handleOrderWhatsApp = () => {
    if (items.length === 0) return;
    const message = generateOrderMessage();
    const cleanNumber = config.whatsappNumber.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;

    setStatusNotice(
      isAr
        ? 'تم تجهيز رسالتك بجميع المنتجات المحددة! جاري فتح تطبيق الواتساب، يُرجى الضغط على زر الإرسال.'
        : 'Order message prepared with all your selected items! Opening WhatsApp, please tap Send.'
    );

    setTimeout(() => {
      window.open(url, '_blank');
    }, 600);
  };

  const handleOrderEmail = () => {
    if (items.length === 0) return;
    const message = generateOrderMessage();
    const subject = isAr
      ? `طلب جديد #${Math.floor(1000 + Math.random() * 9000)} (${items.length} منتجات) - ${config.storeNameAr}`
      : `New Order #${Math.floor(1000 + Math.random() * 9000)} (${items.length} items) - ${config.storeNameEn}`;
    const url = `mailto:${config.emailAddress}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(message)}`;

    setStatusNotice(
      isAr
        ? 'تم تجهيز تفاصيل الطلب! جاري فتح تطبيق البريد الخاص بك لإرسال الرسالة.'
        : 'Order details ready! Opening your email client to send the order.'
    );

    setTimeout(() => {
      window.location.href = url;
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 end-0 max-w-full flex">
        <div
          className="w-screen max-w-md border-s p-6 flex flex-col shadow-2xl transition-colors"
          style={{
            backgroundColor: theme.bgCard,
            borderColor: theme.border,
            color: theme.textPrimary,
          }}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: theme.border }}>
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" style={{ color: theme.accent }} />
              <h3 className="text-base font-bold">
                {isAr ? 'سلة المشتريات والطلب' : 'Shopping & Order Cart'}
              </h3>
              <span className="text-xs font-mono" style={{ color: theme.textMuted }}>
                ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </span>
            </div>

            <div className="flex items-center gap-2">
              {items.length > 0 && (
                <button
                  onClick={onClearCart}
                  className="text-xs hover:text-red-400 transition"
                  style={{ color: theme.textMuted }}
                  title={isAr ? 'تفريغ السلة' : 'Clear cart'}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1 rounded-lg border transition hover:opacity-80"
                style={{
                  backgroundColor: theme.type === 'light' ? '#f1f5f9' : '#14181d',
                  borderColor: theme.border,
                  color: theme.textSecondary,
                }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Continue Shopping Encouragement banner */}
          <div
            className="mt-3 p-2.5 rounded-xl border flex items-center justify-between gap-2 text-xs"
            style={{
              backgroundColor: theme.type === 'light' ? '#f8fafc' : '#0a0d10',
              borderColor: theme.border,
            }}
          >
            <span style={{ color: theme.textSecondary }}>
              {isAr
                ? '💡 بإمكانك إضافة أي عدد من المنتجات الـ 10 وطلبها دفعة واحدة!'
                : '💡 Add as many items from our 10 slots and order all at once!'}
            </span>
            <button
              onClick={onClose}
              className="font-bold underline shrink-0 hover:opacity-80"
              style={{ color: theme.accent }}
            >
              {isAr ? 'تابع التسوق' : 'Shop More'}
            </button>
          </div>

          {/* Free delivery notice bar */}
          {items.length > 0 && (
            <div
              className="mt-2.5 p-2.5 rounded-xl border text-xs"
              style={{
                backgroundColor: theme.type === 'light' ? '#f1f5f9' : '#141a20',
                borderColor: theme.border,
              }}
            >
              {freeShippingLeft === 0 ? (
                <p className="font-semibold text-center" style={{ color: theme.accent }}>
                  {isAr
                    ? '🎉 تهانينا! مؤهل للشحن السريع المجاني'
                    : '🎉 Congratulations! You unlocked Free Shipping'}
                </p>
              ) : (
                <div className="space-y-1.5">
                  <div className="flex justify-between" style={{ color: theme.textMuted }}>
                    <span>
                      {isAr
                        ? `أضف بقيمة ${freeShippingLeft} ${config.currency} للشحن المجاني`
                        : `Add ${freeShippingLeft} ${config.currency} for Free Shipping`}
                    </span>
                    <span className="font-mono" style={{ color: theme.textPrimary }}>
                      {total}/{freeShippingThreshold}
                    </span>
                  </div>
                  <div
                    className="w-full h-1.5 rounded-full overflow-hidden"
                    style={{ backgroundColor: theme.type === 'light' ? '#e2e8f0' : '#1f2937' }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: theme.accent,
                        width: `${Math.min(100, (total / freeShippingThreshold) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto py-4 space-y-3 min-h-0">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6" style={{ color: theme.textMuted }}>
                <ShoppingBag className="w-12 h-12 stroke-[1.5] mb-3 opacity-40" />
                <p className="text-sm font-semibold" style={{ color: theme.textPrimary }}>
                  {isAr ? 'سلة التسوق فارغة' : 'Your cart is empty'}
                </p>
                <p className="text-xs mt-1 max-w-xs" style={{ color: theme.textMuted }}>
                  {isAr
                    ? 'اختر من المنتجات واضغط "طلب وإضافة" لتجمع مشترياتك هنا وتطلبها سوياً.'
                    : 'Select products and click "Order & Add" to collect items here and check out together.'}
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm"
                  style={{
                    backgroundColor: theme.accent,
                    color: '#000000',
                  }}
                >
                  {isAr ? 'تصفح المنتجات الآن' : 'Browse Products'}
                </button>
              </div>
            ) : (
              items.map((item) => {
                const title = isAr ? item.product.titleAr : item.product.titleEn;
                return (
                  <div
                    key={item.product.id}
                    className="flex items-center gap-3 p-3 rounded-xl border transition-colors"
                    style={{
                      backgroundColor: theme.type === 'light' ? '#f8fafc' : '#151a1f',
                      borderColor: theme.border,
                    }}
                  >
                    <img
                      src={item.product.image}
                      alt={title}
                      className="w-14 h-14 rounded-lg object-cover bg-black/20 border shrink-0"
                      style={{ borderColor: theme.border }}
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold truncate" style={{ color: theme.textPrimary }}>
                        {title}
                      </h4>
                      <div className="text-xs font-mono tabular-nums mt-0.5" style={{ color: theme.accent }}>
                        {item.product.price} {config.currency}
                      </div>
                    </div>

                    <div
                      className="flex items-center gap-1.5 px-2 py-1 rounded-lg border"
                      style={{
                        backgroundColor: theme.type === 'light' ? '#ffffff' : '#0e1215',
                        borderColor: theme.border,
                      }}
                    >
                      <button
                        onClick={() => onUpdateQty(item.product.id, -1)}
                        className="px-1 text-sm font-bold hover:opacity-80"
                        style={{ color: theme.textMuted }}
                      >
                        -
                      </button>
                      <span className="font-mono text-xs px-1 font-bold" style={{ color: theme.textPrimary }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQty(item.product.id, 1)}
                        className="px-1 text-sm font-bold hover:opacity-80"
                        style={{ color: theme.textMuted }}
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="hover:text-red-400 p-1 transition"
                      style={{ color: theme.textMuted }}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Checkout & Actions Section */}
          {items.length > 0 && (
            <div className="pt-4 border-t space-y-3" style={{ borderColor: theme.border }}>
              {/* Total Display */}
              <div className="flex justify-between items-baseline">
                <span className="text-xs" style={{ color: theme.textMuted }}>
                  {isAr ? 'المجموع النهائي للطلب:' : 'Subtotal:'}
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-extrabold font-mono tabular-nums" style={{ color: theme.textPrimary }}>
                    {total}
                  </span>
                  <span className="text-xs font-bold" style={{ color: theme.accent }}>
                    {config.currency}
                  </span>
                </div>
              </div>

              {/* Customer Inputs Form */}
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder={isAr ? 'الاسم بالكامل' : 'Full Name'}
                    value={customer.name}
                    onChange={(e) =>
                      setCustomer({ ...customer, name: e.target.value })
                    }
                    className="w-full border rounded-lg px-2.5 py-1.5 text-xs focus:outline-none"
                    style={{
                      backgroundColor: theme.type === 'light' ? '#ffffff' : '#161c22',
                      borderColor: theme.border,
                      color: theme.textPrimary,
                    }}
                  />
                  <input
                    type="tel"
                    placeholder={isAr ? 'رقم الهاتف للتوصيل' : 'Phone Number'}
                    value={customer.phone}
                    onChange={(e) =>
                      setCustomer({ ...customer, phone: e.target.value })
                    }
                    className="w-full border rounded-lg px-2.5 py-1.5 text-xs focus:outline-none"
                    style={{
                      backgroundColor: theme.type === 'light' ? '#ffffff' : '#161c22',
                      borderColor: theme.border,
                      color: theme.textPrimary,
                    }}
                  />
                </div>

                <input
                  type="text"
                  placeholder={
                    isAr ? 'المدينة والشارع والعنوان بالتفصيل' : 'City & Delivery Address'
                  }
                  value={customer.address}
                  onChange={(e) =>
                    setCustomer({ ...customer, address: e.target.value })
                  }
                  className="w-full border rounded-lg px-2.5 py-1.5 text-xs focus:outline-none"
                  style={{
                    backgroundColor: theme.type === 'light' ? '#ffffff' : '#161c22',
                    borderColor: theme.border,
                    color: theme.textPrimary,
                  }}
                />

                <input
                  type="text"
                  placeholder={isAr ? 'ملاحظات إضافية (اختياري)...' : 'Order Notes (Optional)...'}
                  value={customer.notes}
                  onChange={(e) =>
                    setCustomer({ ...customer, notes: e.target.value })
                  }
                  className="w-full border rounded-lg px-2.5 py-1.5 text-xs focus:outline-none"
                  style={{
                    backgroundColor: theme.type === 'light' ? '#ffffff' : '#161c22',
                    borderColor: theme.border,
                    color: theme.textPrimary,
                  }}
                />
              </div>

              {/* Notice Message */}
              {statusNotice && (
                <div
                  className="p-2 rounded-lg border text-xs flex items-center gap-2"
                  style={{
                    backgroundColor: theme.type === 'light' ? '#ecfdf5' : '#14231b',
                    borderColor: theme.accent,
                    color: theme.type === 'light' ? '#065f46' : theme.accent,
                  }}
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{statusNotice}</span>
                </div>
              )}

              {/* Order Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={handleOrderWhatsApp}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs transition shadow-md active:scale-95"
                  style={{
                    backgroundColor: theme.accent,
                    color: '#000000',
                  }}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isAr ? 'إرسال طلب الواتساب' : 'Send WhatsApp Order'}</span>
                </button>

                <button
                  onClick={handleOrderEmail}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-medium text-xs border transition hover:opacity-80"
                  style={{
                    backgroundColor: theme.type === 'light' ? '#ffffff' : '#192027',
                    borderColor: theme.border,
                    color: theme.textPrimary,
                  }}
                >
                  <Mail className="w-4 h-4" style={{ color: theme.textMuted }} />
                  <span>{isAr ? 'طلب بالبريد' : 'Order via Email'}</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1" style={{ color: theme.textMuted }}>
                <span>{isAr ? 'يتم فتح تطبيق الواتساب برسالتك المجهزة' : 'WhatsApp opens with your compiled items'}</span>
                <button
                  onClick={onClose}
                  className="font-bold underline hover:opacity-80"
                  style={{ color: theme.accent }}
                >
                  {isAr ? 'إضافة منتجات أخرى +' : 'Add more items +'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
