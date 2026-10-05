import React, { useState, useEffect } from 'react';
import { defaultStoreConfig, default10Products } from './data/defaultProducts';
import { Product, StoreConfig, CartItem, Language } from './types';
import { ThemeId, THEMES } from './utils/themes';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { SettingsModal } from './components/SettingsModal';
import { Footer } from './components/Footer';
import { ShoppingBag, ArrowRight, ArrowLeft, Check, Sparkles } from 'lucide-react';

export default function App() {
  // Store Config & Products State with LocalStorage Persistence
  const [config, setConfig] = useState<StoreConfig>(() => {
    try {
      const saved = localStorage.getItem('emerald_config_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.themeId) parsed.themeId = 'emerald-dark';
        return parsed;
      }
      return defaultStoreConfig;
    } catch {
      return defaultStoreConfig;
    }
  });

  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('emerald_products_v1');
      return saved ? JSON.parse(saved) : default10Products;
    } catch {
      return default10Products;
    }
  });

  // Active theme helper
  const currentTheme = THEMES[config.themeId] || THEMES['emerald-dark'];

  // Language State (default is AR as requested)
  const [lang, setLang] = useState<Language>('ar');

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('emerald_cart_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI States
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [lastAddedProduct, setLastAddedProduct] = useState<Product | null>(null);

  // Sync HTML lang and dir attributes
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  // Persist config and products
  useEffect(() => {
    try {
      localStorage.setItem('emerald_config_v1', JSON.stringify(config));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }, [config]);

  useEffect(() => {
    try {
      localStorage.setItem('emerald_products_v1', JSON.stringify(products));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('emerald_cart_v1', JSON.stringify(cart));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }, [cart]);

  // Keyboard shortcut (Ctrl + Shift + E or Cmd + Shift + E) & Hash Listener (#settings, #admin)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'E' || e.key === 'e')) {
        e.preventDefault();
        setIsSettingsOpen((prev) => !prev);
      }
    };

    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#settings' || hash === '#admin') {
        setIsSettingsOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('hashchange', handleHashChange);

    // Initial check
    if (window.location.hash === '#settings' || window.location.hash === '#admin') {
      setIsSettingsOpen(true);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Theme change handler
  const handleSelectTheme = (themeId: ThemeId) => {
    const targetTheme = THEMES[themeId];
    if (targetTheme) {
      setConfig((prev) => ({
        ...prev,
        themeId,
        accentColor: targetTheme.accent,
      }));
    }
  };

  // Cart Operations: When user orders, it adds to cart and allows continuing shopping for other items!
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const idx = prev.findIndex((item) => item.product.id === product.id);
      if (idx > -1) {
        const next = [...prev];
        next[idx] = {
          ...next[idx],
          quantity: next[idx].quantity + quantity,
        };
        return next;
      }
      return [...prev, { product, quantity }];
    });

    setLastAddedProduct(product);
    setTimeout(() => {
      setLastAddedProduct((current) => (current?.id === product.id ? null : current));
    }, 4500);
  };

  const handleUpdateQty = (productId: number, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Filter products by category and search query
  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      p.titleAr.toLowerCase().includes(q) ||
      p.titleEn.toLowerCase().includes(q) ||
      p.descAr.toLowerCase().includes(q) ||
      p.descEn.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      className="min-h-screen flex flex-col transition-colors selection:bg-[#25D366] selection:text-black"
      style={{
        backgroundColor: currentTheme.bgMain,
        color: currentTheme.textPrimary,
      }}
    >
      {/* Top Announcement Bar */}
      <div
        className="border-b px-4 py-2 text-xs text-center flex items-center justify-center gap-2"
        style={{
          backgroundColor: currentTheme.type === 'light' ? '#f1f5f9' : '#0e1216',
          borderColor: currentTheme.border,
          color: currentTheme.textSecondary,
        }}
      >
        <span
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ backgroundColor: currentTheme.accent }}
        />
        <span>{lang === 'ar' ? config.bannerTextAr : config.bannerTextEn}</span>
      </div>

      {/* Main Top Navigation */}
      <Navbar
        config={config}
        lang={lang}
        onToggleLang={() => setLang((l) => (l === 'ar' ? 'en' : 'ar'))}
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        onSelectTheme={handleSelectTheme}
      />

      {/* Hero Section */}
      <Hero
        config={config}
        lang={lang}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        productCount={products.length}
      />

      {/* Main Storefront Product Grid Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 flex-1 w-full">
        {/* Section Header */}
        <div
          className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b gap-3"
          style={{ borderColor: currentTheme.border }}
        >
          <div>
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2" style={{ color: currentTheme.textPrimary }}>
              <span>{lang === 'ar' ? 'المنتجات الحصرية' : 'Exclusive Drops'}</span>
              <span
                className="text-xs font-mono px-2.5 py-0.5 rounded-full border font-bold"
                style={{
                  backgroundColor: currentTheme.badgeBg,
                  borderColor: currentTheme.border,
                  color: currentTheme.accent,
                }}
              >
                {filteredProducts.length} {lang === 'ar' ? 'منتجات' : 'items'}
              </span>
            </h2>
            <p className="text-xs mt-1" style={{ color: currentTheme.textMuted }}>
              {lang === 'ar'
                ? 'اضغط على "طلب وإضافة" لإضافة أي منتج ومتابعة تصفح باقي المنتجات بحرية'
                : 'Click "Order & Add" to put items in cart and freely keep shopping for more'}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs" style={{ color: currentTheme.textMuted }}>
            <span>{lang === 'ar' ? 'العملة:' : 'Currency:'}</span>
            <span
              className="px-2.5 py-1 rounded border font-bold font-mono"
              style={{
                backgroundColor: currentTheme.type === 'light' ? '#ffffff' : currentTheme.bgCard,
                borderColor: currentTheme.border,
                color: currentTheme.accent,
              }}
            >
              {config.currency}
            </span>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center space-y-3" style={{ color: currentTheme.textMuted }}>
            <p className="text-sm font-semibold" style={{ color: currentTheme.textPrimary }}>
              {lang === 'ar' ? 'لم يتم العثور على نتائج تطابق بحثك' : 'No products matched your search'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="text-xs font-bold underline"
              style={{ color: currentTheme.accent }}
            >
              {lang === 'ar' ? 'عرض جميع المنتجات' : 'Show all products'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                config={config}
                lang={lang}
                onAddToCart={(p) => handleAddToCart(p, 1)}
                onOpenDetails={setSelectedProduct}
              />
            ))}
          </div>
        )}
      </main>

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        config={config}
        lang={lang}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p, q) => handleAddToCart(p, q)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        config={config}
        lang={lang}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Private Settings Dashboard Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => {
          setIsSettingsOpen(false);
          if (window.location.hash === '#settings' || window.location.hash === '#admin') {
            history.pushState('', document.title, window.location.pathname + window.location.search);
          }
        }}
        config={config}
        products={products}
        lang={lang}
        onSaveConfig={setConfig}
        onSaveProducts={setProducts}
        onResetDefaults={() => {
          setConfig(defaultStoreConfig);
          setProducts(default10Products);
          localStorage.removeItem('emerald_config_v1');
          localStorage.removeItem('emerald_products_v1');
        }}
      />

      {/* Floating Interactive "Item Added! Keep Shopping" Notification */}
      {lastAddedProduct && (
        <div
          className="fixed bottom-6 start-4 end-4 sm:start-auto sm:end-6 sm:max-w-md z-50 p-3.5 rounded-2xl border shadow-2xl flex items-center justify-between gap-3 animate-in slide-in-from-bottom-5 duration-200"
          style={{
            backgroundColor: currentTheme.type === 'light' ? '#ffffff' : '#14181d',
            borderColor: currentTheme.accent,
            boxShadow: `0 10px 30px ${currentTheme.glow}`,
          }}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: currentTheme.accent, color: '#000000' }}
            >
              <Check className="w-4 h-4 stroke-[3]" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold truncate" style={{ color: currentTheme.textPrimary }}>
                {lang === 'ar' ? lastAddedProduct.titleAr : lastAddedProduct.titleEn}
              </p>
              <p className="text-[11px]" style={{ color: currentTheme.accent }}>
                {lang === 'ar' ? '✓ تم الإضافة للسلة! تابع التسوق' : '✓ Added to cart! Keep shopping'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setLastAddedProduct(null);
              setIsCartOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition active:scale-95"
            style={{
              backgroundColor: currentTheme.accent,
              color: '#000000',
            }}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>
              {lang === 'ar' ? `السلة (${cartTotalCount})` : `Cart (${cartTotalCount})`}
            </span>
          </button>
        </div>
      )}

      {/* Footer with Discreet Settings Trigger */}
      <Footer
        config={config}
        lang={lang}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />
    </div>
  );
}
