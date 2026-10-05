import React, { useState } from 'react';
import {
  X,
  Upload,
  Image as ImageIcon,
  Save,
  Download,
  RotateCcw,
  Sliders,
  Package,
  Phone,
  FileCode,
  Check,
  Eye,
  FileJson,
} from 'lucide-react';
import { Product, StoreConfig, Language } from '../types';
import { generateExportHtml, downloadFile } from '../utils/exportGenerator';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: StoreConfig;
  products: Product[];
  lang: Language;
  onSaveConfig: (newConfig: StoreConfig) => void;
  onSaveProducts: (newProducts: Product[]) => void;
  onResetDefaults: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  config,
  products,
  lang,
  onSaveConfig,
  onSaveProducts,
  onResetDefaults,
}) => {
  const isAr = lang === 'ar';
  const [activeTab, setActiveTab] = useState<'logo_identity' | 'products' | 'contacts' | 'export'>('logo_identity');
  const [activeSlot, setActiveSlot] = useState<number>(1);
  const [formConfig, setFormConfig] = useState<StoreConfig>({ ...config });
  const [formProducts, setFormProducts] = useState<Product[]>(JSON.parse(JSON.stringify(products)));
  const [savedNotice, setSavedNotice] = useState(false);

  if (!isOpen) return null;

  // Selected product slot
  const selectedProduct = formProducts.find((p) => p.slot === activeSlot) || formProducts[0];

  // Handle Logo file upload (base64 Data URL)
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormConfig({
            ...formConfig,
            logoUrl: event.target.result as string,
            logoType: 'image',
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Product image file upload (base64 Data URL)
  const handleProductImageUpload = (slot: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const updated = formProducts.map((p) =>
            p.slot === slot ? { ...p, image: event.target?.result as string } : p
          );
          setFormProducts(updated);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Update a single product field
  const updateProductField = <K extends keyof Product>(slot: number, key: K, value: Product[K]) => {
    const updated = formProducts.map((p) => (p.slot === slot ? { ...p, [key]: value } : p));
    setFormProducts(updated);
  };

  // Save all changes
  const handleSave = () => {
    onSaveConfig(formConfig);
    onSaveProducts(formProducts);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  // Export functions
  const handleExportPublicWebsite = () => {
    const html = generateExportHtml(formProducts, formConfig, true);
    downloadFile(html, 'index.html');
  };

  const handleExportEditorShop = () => {
    const html = generateExportHtml(formProducts, formConfig, false);
    downloadFile(html, 'shop-editor.html');
  };

  const handleExportJson = () => {
    const backup = {
      config: formConfig,
      products: formProducts,
      exportedAt: new Date().toISOString(),
    };
    const jsonStr = JSON.stringify(backup, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `emerald-store-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target?.result as string);
          if (data.config && data.products) {
            setFormConfig(data.config);
            setFormProducts(data.products);
            alert(isAr ? 'تم استيراد البيانات بنجاح! اضغط على حفظ التغييرات.' : 'Data imported successfully! Click Save changes.');
          }
        } catch {
          alert(isAr ? 'الملف غير صالح' : 'Invalid JSON file');
        }
      };
      reader.readAsText(file);
    }
  };

  // Summary stats
  const totalCatalogValue = formProducts.reduce((sum, p) => sum + p.price, 0);
  const activeCount = formProducts.filter((p) => p.inStock).length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />

      {/* Main Settings Modal Box */}
      <div className="relative bg-[#0d1013] border border-neutral-800 rounded-2xl max-w-5xl w-full h-[90vh] flex flex-col overflow-hidden shadow-2xl z-10 text-neutral-200">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-[#101418]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#14231b] text-[#25D366] border border-[#25D366]/30">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">
                  {isAr ? 'لوحة تحكم وإعدادات المتجر' : 'Store Admin Dashboard'}
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-[#25D366] border border-neutral-700">
                  Ctrl+Shift+E
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                {isAr
                  ? 'تحكم كامل في الشعار، النصوص، المنتجات الـ 10، وتصدير الموقع'
                  : 'Manage store logo, headline, 10 product slots, and export clean index.html'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {savedNotice && (
              <span className="flex items-center gap-1 text-xs text-[#25D366] font-semibold animate-pulse">
                <Check className="w-4 h-4" />
                {isAr ? 'تم الحفظ!' : 'Saved!'}
              </span>
            )}

            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#1eb956] text-neutral-950 font-bold text-xs transition shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>{isAr ? 'حفظ التغييرات' : 'Save Changes'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition"
              aria-label={isAr ? 'إغلاق' : 'Close'}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dashboard Tabs & Quick Metrics Bar */}
        <div className="px-6 py-2.5 border-b border-neutral-800/80 bg-[#0e1215] flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Tabs */}
          <div className="flex items-center gap-1 bg-neutral-900/90 p-1 rounded-xl border border-neutral-800">
            <button
              onClick={() => setActiveTab('logo_identity')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
                activeTab === 'logo_identity'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5 text-[#25D366]" />
              <span>{isAr ? 'الشعار والهوية' : 'Logo & Identity'}</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
                activeTab === 'products'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Package className="w-3.5 h-3.5 text-[#25D366]" />
              <span>{isAr ? 'المنتجات الـ 10' : '10 Product Slots'}</span>
            </button>

            <button
              onClick={() => setActiveTab('contacts')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
                activeTab === 'contacts'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Phone className="w-3.5 h-3.5 text-[#25D366]" />
              <span>{isAr ? 'الاتصال والطلبات' : 'Contacts & Orders'}</span>
            </button>

            <button
              onClick={() => setActiveTab('export')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
                activeTab === 'export'
                  ? 'bg-[#1b2b21] text-[#25D366] border border-[#25D366]/40'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <FileCode className="w-3.5 h-3.5 text-[#25D366]" />
              <span>{isAr ? 'تصدير الموقع (Export)' : 'Export Website'}</span>
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="hidden sm:flex items-center gap-4 text-neutral-400 font-mono">
            <span>
              {isAr ? 'المنتجات النشطة:' : 'Active Slots:'}{' '}
              <strong className="text-white">{activeCount}/10</strong>
            </span>
            <span aria-hidden="true">·</span>
            <span>
              {isAr ? 'إجمالي قيمة الكتالوج:' : 'Catalog Total:'}{' '}
              <strong className="text-[#25D366]">{totalCatalogValue} {formConfig.currency}</strong>
            </span>
          </div>
        </div>

        {/* Tab Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: LOGO & IDENTITY */}
          {activeTab === 'logo_identity' && (
            <div className="space-y-6 max-w-3xl">
              {/* Logo Editor Card */}
              <div className="bg-[#12161a] border border-neutral-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-[#25D366]" />
                    <h3 className="text-sm font-bold text-white">
                      {isAr ? 'تغيير الشعار (Logo Settings)' : 'Logo Settings'}
                    </h3>
                  </div>
                  <span className="text-xs text-neutral-400">
                    {isAr ? 'يتم حفظ وتضمين الصورة مباشرة' : 'Direct file upload (Base64 embedded)'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                  {/* Current Logo Preview */}
                  <div className="bg-[#0b0e11] border border-neutral-800 rounded-xl p-4 flex flex-col items-center justify-center min-h-[140px] text-center">
                    {formConfig.logoType === 'image' && formConfig.logoUrl ? (
                      <div className="space-y-2">
                        <img
                          src={formConfig.logoUrl}
                          alt="Logo Preview"
                          className="max-h-16 max-w-[200px] object-contain mx-auto rounded"
                        />
                        <button
                          onClick={() => setFormConfig({ ...formConfig, logoUrl: '', logoType: 'text' })}
                          className="text-[11px] text-red-400 hover:underline block mx-auto"
                        >
                          {isAr ? 'إزالة الشعار والعودة للاسم النصي' : 'Remove image logo'}
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <div className="flex items-center justify-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#25D366]"></span>
                          <span className="text-base font-bold text-white">
                            {formConfig.storeNameAr}
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-500">
                          {isAr ? 'الشعار النصي الافتراضي نشط' : 'Default text wordmark active'}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Upload & Options */}
                  <div className="space-y-3">
                    <label className="block text-xs font-semibold text-neutral-300">
                      {isAr ? 'تحميل ملف صورة الشعار من جهازك:' : 'Upload logo image file:'}
                    </label>
                    <label className="flex items-center justify-center gap-2 px-4 py-3 bg-[#181f25] hover:bg-[#1f2830] border border-neutral-700/80 border-dashed rounded-xl cursor-pointer transition text-xs font-medium text-white">
                      <Upload className="w-4 h-4 text-[#25D366]" />
                      <span>{isAr ? 'اختيار صورة (PNG, JPG, SVG, WebP)' : 'Choose Image File'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                    </label>

                    <div className="pt-2">
                      <label className="block text-[11px] text-neutral-400 mb-1">
                        {isAr ? 'أو أدخل رابط صورة الشعار مباشرة:' : 'Or enter logo image URL:'}
                      </label>
                      <input
                        type="url"
                        value={formConfig.logoUrl}
                        onChange={(e) =>
                          setFormConfig({
                            ...formConfig,
                            logoUrl: e.target.value,
                            logoType: e.target.value ? 'image' : 'text',
                          })
                        }
                        placeholder="https://example.com/logo.png"
                        className="w-full bg-[#181f25] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#25D366]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Store Titles & Headline Card */}
              <div className="bg-[#12161a] border border-neutral-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-neutral-800">
                  <Sliders className="w-4 h-4 text-[#25D366]" />
                  <h3 className="text-sm font-bold text-white">
                    {isAr ? 'العناوين والنصوص الرئيسية للمتجر' : 'Headlines & Store Copy'}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Headline (Requested: YR Grand Theft AR GTA) */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      {isAr ? 'العنوان الرئيسي للهيرو (Headline):' : 'Main Hero Headline:'}
                    </label>
                    <input
                      type="text"
                      value={formConfig.headlineAr}
                      onChange={(e) =>
                        setFormConfig({
                          ...formConfig,
                          headlineAr: e.target.value,
                          headlineEn: e.target.value,
                        })
                      }
                      className="w-full bg-[#181f25] border border-neutral-800 rounded-lg px-3 py-2 text-sm font-bold text-white focus:outline-none focus:border-[#25D366]"
                    />
                  </div>

                  {/* Store Name AR & EN */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      {isAr ? 'اسم المتجر (بالعربية):' : 'Store Name (Arabic):'}
                    </label>
                    <input
                      type="text"
                      value={formConfig.storeNameAr}
                      onChange={(e) =>
                        setFormConfig({ ...formConfig, storeNameAr: e.target.value })
                      }
                      className="w-full bg-[#181f25] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#25D366]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      {isAr ? 'اسم المتجر (بالإنجليزية):' : 'Store Name (English):'}
                    </label>
                    <input
                      type="text"
                      value={formConfig.storeNameEn}
                      onChange={(e) =>
                        setFormConfig({ ...formConfig, storeNameEn: e.target.value })
                      }
                      className="w-full bg-[#181f25] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#25D366]"
                    />
                  </div>

                  {/* Tagline / Hero Description */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      {isAr ? 'الوصف الترويجي في الواجهة (بالعربية):' : 'Hero Tagline (Arabic):'}
                    </label>
                    <input
                      type="text"
                      value={formConfig.taglineAr}
                      onChange={(e) =>
                        setFormConfig({ ...formConfig, taglineAr: e.target.value })
                      }
                      className="w-full bg-[#181f25] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#25D366]"
                    />
                  </div>

                  {/* Top Announcement Bar */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      {isAr ? 'شريط الإعلانات أعلى الصفحة:' : 'Top Announcement Banner:'}
                    </label>
                    <input
                      type="text"
                      value={formConfig.bannerTextAr}
                      onChange={(e) =>
                        setFormConfig({ ...formConfig, bannerTextAr: e.target.value })
                      }
                      className="w-full bg-[#181f25] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#25D366]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 10 PRODUCT SLOTS */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              {/* Slot Selector Grid */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-white flex items-center gap-2">
                    <Package className="w-4 h-4 text-[#25D366]" />
                    <span>{isAr ? 'اختر خانة المنتج لتعديلها (1 إلى 10):' : 'Select Product Slot (1 to 10):'}</span>
                  </label>
                  <span className="text-xs text-neutral-400">
                    {isAr ? `تعديل خانة رقم ${activeSlot}` : `Editing Slot ${activeSlot}`}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-2">
                  {formProducts.map((p) => {
                    const isSelected = p.slot === activeSlot;
                    return (
                      <button
                        key={p.slot}
                        onClick={() => setActiveSlot(p.slot)}
                        className={`p-2 rounded-xl border text-center transition flex flex-col items-center gap-1.5 ${
                          isSelected
                            ? 'bg-[#18261e] border-[#25D366] text-white shadow-md'
                            : 'bg-[#12161a] border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-white'
                        }`}
                      >
                        <span className="text-[10px] font-mono font-bold">Slot {p.slot}</span>
                        <img
                          src={p.image}
                          alt={`Slot ${p.slot}`}
                          className="w-8 h-8 rounded object-cover bg-neutral-900 border border-neutral-800"
                        />
                        <span className="text-[11px] font-bold font-mono text-[#25D366]">
                          {p.price}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Detailed Editor for Active Slot */}
              {selectedProduct && (
                <div className="bg-[#12161a] border border-neutral-800 rounded-2xl p-5 space-y-5">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-neutral-800 gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[#25D366] text-neutral-950 text-xs font-mono font-bold">
                        Slot {selectedProduct.slot}
                      </span>
                      <h3 className="text-sm font-bold text-white">
                        {isAr ? selectedProduct.titleAr : selectedProduct.titleEn}
                      </h3>
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedProduct.inStock}
                          onChange={(e) =>
                            updateProductField(selectedProduct.slot, 'inStock', e.target.checked)
                          }
                          className="rounded bg-neutral-800 border-neutral-700 text-[#25D366] focus:ring-0"
                        />
                        <span>{isAr ? 'متوفر في المخزون' : 'In Stock'}</span>
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left: Product Image & Upload */}
                    <div className="space-y-3">
                      <label className="block text-xs font-semibold text-neutral-300">
                        {isAr ? 'صورة المنتج في هذه الخانة:' : 'Product Photo:'}
                      </label>
                      <div className="relative aspect-[4/3] rounded-xl bg-neutral-950 border border-neutral-800 overflow-hidden flex items-center justify-center">
                        <img
                          src={selectedProduct.image}
                          alt="Product preview"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <label className="flex items-center justify-center gap-2 px-3 py-2.5 bg-[#181f25] hover:bg-[#1f2830] border border-neutral-700/80 border-dashed rounded-xl cursor-pointer transition text-xs font-medium text-white">
                        <Upload className="w-4 h-4 text-[#25D366]" />
                        <span>{isAr ? 'رفع صورة جديدة من جهازك' : 'Upload Image File'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleProductImageUpload(selectedProduct.slot, e)}
                          className="hidden"
                        />
                      </label>

                      <input
                        type="url"
                        value={selectedProduct.image.startsWith('data:') ? '' : selectedProduct.image}
                        onChange={(e) =>
                          updateProductField(selectedProduct.slot, 'image', e.target.value)
                        }
                        placeholder={isAr ? 'أو ضع رابط صورة مباشر...' : 'Or enter direct image URL...'}
                        className="w-full bg-[#181f25] border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#25D366]"
                      />
                    </div>

                    {/* Middle & Right: Product Details Form */}
                    <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Arabic Title */}
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-neutral-300 mb-1">
                          {isAr ? 'اسم المنتج (بالعربية):' : 'Title (Arabic):'}
                        </label>
                        <input
                          type="text"
                          value={selectedProduct.titleAr}
                          onChange={(e) =>
                            updateProductField(selectedProduct.slot, 'titleAr', e.target.value)
                          }
                          className="w-full bg-[#181f25] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#25D366]"
                        />
                      </div>

                      {/* English Title */}
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-neutral-300 mb-1">
                          {isAr ? 'اسم المنتج (بالإنجليزية):' : 'Title (English):'}
                        </label>
                        <input
                          type="text"
                          value={selectedProduct.titleEn}
                          onChange={(e) =>
                            updateProductField(selectedProduct.slot, 'titleEn', e.target.value)
                          }
                          className="w-full bg-[#181f25] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#25D366]"
                        />
                      </div>

                      {/* Price */}
                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1">
                          {isAr ? `السعر (${formConfig.currency}):` : `Price (${formConfig.currency}):`}
                        </label>
                        <input
                          type="number"
                          value={selectedProduct.price}
                          onChange={(e) =>
                            updateProductField(selectedProduct.slot, 'price', Number(e.target.value))
                          }
                          className="w-full bg-[#181f25] border border-neutral-800 rounded-lg px-3 py-2 text-xs font-mono font-bold text-white focus:outline-none focus:border-[#25D366]"
                        />
                      </div>

                      {/* Original Price */}
                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1">
                          {isAr ? 'السعر الأصلي قبل الخصم (اختياري):' : 'Original Price (Optional):'}
                        </label>
                        <input
                          type="number"
                          value={selectedProduct.originalPrice || ''}
                          onChange={(e) =>
                            updateProductField(
                              selectedProduct.slot,
                              'originalPrice',
                              e.target.value ? Number(e.target.value) : undefined
                            )
                          }
                          className="w-full bg-[#181f25] border border-neutral-800 rounded-lg px-3 py-2 text-xs font-mono text-neutral-300 focus:outline-none focus:border-[#25D366]"
                        />
                      </div>

                      {/* Category */}
                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1">
                          {isAr ? 'التصنيف:' : 'Category:'}
                        </label>
                        <select
                          value={selectedProduct.category}
                          onChange={(e) =>
                            updateProductField(
                              selectedProduct.slot,
                              'category',
                              e.target.value as Product['category']
                            )
                          }
                          className="w-full bg-[#181f25] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#25D366]"
                        >
                          <option value="streetwear">{isAr ? 'أزياء الشارع (Streetwear)' : 'Streetwear'}</option>
                          <option value="gaming">{isAr ? 'ألعاب وكونسول (Gaming)' : 'Gaming'}</option>
                          <option value="accessories">{isAr ? 'إكسسوارات (Accessories)' : 'Accessories'}</option>
                          <option value="gear">{isAr ? 'معدات EDC (Gear)' : 'Gear'}</option>
                        </select>
                      </div>

                      {/* Badge Tag */}
                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1">
                          {isAr ? 'شارة المنتج (مثال: الأكثر طلباً):' : 'Badge Tag (e.g. Best Seller):'}
                        </label>
                        <input
                          type="text"
                          value={selectedProduct.badgeAr || ''}
                          onChange={(e) =>
                            updateProductField(selectedProduct.slot, 'badgeAr', e.target.value)
                          }
                          className="w-full bg-[#181f25] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#25D366]"
                        />
                      </div>

                      {/* Arabic Description */}
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-neutral-300 mb-1">
                          {isAr ? 'الوصف الكامل (بالعربية):' : 'Description (Arabic):'}
                        </label>
                        <textarea
                          rows={2}
                          value={selectedProduct.descAr}
                          onChange={(e) =>
                            updateProductField(selectedProduct.slot, 'descAr', e.target.value)
                          }
                          className="w-full bg-[#181f25] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#25D366]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CONTACTS & ORDERING */}
          {activeTab === 'contacts' && (
            <div className="space-y-6 max-w-3xl">
              <div className="bg-[#12161a] border border-neutral-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-neutral-800">
                  <Phone className="w-4 h-4 text-[#25D366]" />
                  <h3 className="text-sm font-bold text-white">
                    {isAr ? 'معلومات الواتساب والبريد لاستقبال الطلبات' : 'Order Receiving Contacts'}
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      {isAr
                        ? 'رقم الواتساب مع مقدمة الدولة (مثال: 962791234567+):'
                        : 'WhatsApp Number (with country code, e.g. +962791234567):'}
                    </label>
                    <input
                      type="tel"
                      value={formConfig.whatsappNumber}
                      onChange={(e) =>
                        setFormConfig({ ...formConfig, whatsappNumber: e.target.value })
                      }
                      className="w-full bg-[#181f25] border border-neutral-800 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#25D366] dir-ltr text-start"
                    />
                    <p className="text-[11px] text-neutral-400 mt-1">
                      {isAr
                        ? 'عندما يضغط الزبون على "طلب عبر واتساب"، ستصلك الرسالة مباشرة على هذا الرقم.'
                        : 'When a customer taps "Order on WhatsApp", orders will directly open a chat with this number.'}
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      {isAr ? 'البريد الإلكتروني لاستقبال الطلبات:' : 'Email Address for Orders:'}
                    </label>
                    <input
                      type="email"
                      value={formConfig.emailAddress}
                      onChange={(e) =>
                        setFormConfig({ ...formConfig, emailAddress: e.target.value })
                      }
                      className="w-full bg-[#181f25] border border-neutral-800 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#25D366] dir-ltr text-start"
                    />
                  </div>

                  <div className="pt-2">
                    <label className="block text-xs font-semibold text-neutral-300 mb-2">
                      {isAr ? 'مظهر وألوان المتجر (5 خيارات ثيمات متقدمة):' : 'Store Theme & Colors (5 Options):'}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {/* Dark 1 */}
                      <button
                        type="button"
                        onClick={() =>
                          setFormConfig({
                            ...formConfig,
                            themeId: 'emerald-dark',
                            accentColor: '#25D366',
                          })
                        }
                        className={`p-3 rounded-xl border text-start flex items-center justify-between transition ${
                          formConfig.themeId === 'emerald-dark'
                            ? 'bg-[#18261e] border-[#25D366] text-white shadow-md'
                            : 'bg-[#14181d] border-neutral-800 text-neutral-400 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-3.5 h-3.5 rounded-full bg-[#25D366]" />
                          <div>
                            <p className="text-xs font-bold text-white">إميرالد داكن (الأصلي)</p>
                            <p className="text-[10px] text-neutral-400">داكن 1 · WhatsApp Dark</p>
                          </div>
                        </div>
                        {formConfig.themeId === 'emerald-dark' && <Check className="w-4 h-4 text-[#25D366]" />}
                      </button>

                      {/* Dark 2 */}
                      <button
                        type="button"
                        onClick={() =>
                          setFormConfig({
                            ...formConfig,
                            themeId: 'amber-dark',
                            accentColor: '#F59E0B',
                          })
                        }
                        className={`p-3 rounded-xl border text-start flex items-center justify-between transition ${
                          formConfig.themeId === 'amber-dark'
                            ? 'bg-[#291f13] border-[#F59E0B] text-white shadow-md'
                            : 'bg-[#14181d] border-neutral-800 text-neutral-400 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-3.5 h-3.5 rounded-full bg-[#F59E0B]" />
                          <div>
                            <p className="text-xs font-bold text-white">سايبر جولد GTA</p>
                            <p className="text-[10px] text-neutral-400">داكن 2 · Cyber Amber</p>
                          </div>
                        </div>
                        {formConfig.themeId === 'amber-dark' && <Check className="w-4 h-4 text-[#F59E0B]" />}
                      </button>

                      {/* Dark 3 */}
                      <button
                        type="button"
                        onClick={() =>
                          setFormConfig({
                            ...formConfig,
                            themeId: 'cyan-dark',
                            accentColor: '#00F0FF',
                          })
                        }
                        className={`p-3 rounded-xl border text-start flex items-center justify-between transition ${
                          formConfig.themeId === 'cyan-dark'
                            ? 'bg-[#112430] border-[#00F0FF] text-white shadow-md'
                            : 'bg-[#14181d] border-neutral-800 text-neutral-400 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-3.5 h-3.5 rounded-full bg-[#00F0FF]" />
                          <div>
                            <p className="text-xs font-bold text-white">نيون سايان داكن</p>
                            <p className="text-[10px] text-neutral-400">داكن 3 · Neon Cyan Pulse</p>
                          </div>
                        </div>
                        {formConfig.themeId === 'cyan-dark' && <Check className="w-4 h-4 text-[#00F0FF]" />}
                      </button>

                      {/* Light Option */}
                      <button
                        type="button"
                        onClick={() =>
                          setFormConfig({
                            ...formConfig,
                            themeId: 'clean-light',
                            accentColor: '#059669',
                          })
                        }
                        className={`p-3 rounded-xl border text-start flex items-center justify-between transition ${
                          formConfig.themeId === 'clean-light'
                            ? 'bg-neutral-100 border-[#059669] text-neutral-900 shadow-md'
                            : 'bg-[#14181d] border-neutral-800 text-neutral-400 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-3.5 h-3.5 rounded-full bg-[#059669]" />
                          <div>
                            <p className={`text-xs font-bold ${formConfig.themeId === 'clean-light' ? 'text-neutral-950' : 'text-white'}`}>أبيض استوديو نقي</p>
                            <p className="text-[10px] text-neutral-400">فاتح · Clean Studio Light</p>
                          </div>
                        </div>
                        {formConfig.themeId === 'clean-light' && <Check className="w-4 h-4 text-[#059669]" />}
                      </button>

                      {/* Motivative Full Color Option */}
                      <button
                        type="button"
                        onClick={() =>
                          setFormConfig({
                            ...formConfig,
                            themeId: 'hyper-motivative',
                            accentColor: '#FF007A',
                          })
                        }
                        className={`p-3 rounded-xl border text-start flex items-center justify-between transition ${
                          formConfig.themeId === 'hyper-motivative'
                            ? 'bg-[#2b1046] border-[#FF007A] text-white shadow-md'
                            : 'bg-[#14181d] border-neutral-800 text-neutral-400 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-r from-[#FF007A] to-[#7928CA]" />
                          <div>
                            <p className="text-xs font-bold text-white">طاقة تحفيزية متوهجة</p>
                            <p className="text-[10px] text-neutral-400">تحفيزي ملون · Hyper Motivative</p>
                          </div>
                        </div>
                        {formConfig.themeId === 'hyper-motivative' && <Check className="w-4 h-4 text-[#FF007A]" />}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        {isAr ? 'رمز العملة (الافتراضي: د.أ):' : 'Currency Symbol:'}
                      </label>
                      <input
                        type="text"
                        value={formConfig.currency}
                        onChange={(e) =>
                          setFormConfig({ ...formConfig, currency: e.target.value })
                        }
                        className="w-full bg-[#181f25] border border-neutral-800 rounded-lg px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-[#25D366]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        {isAr ? 'تخصيص يدوي للون التمييز (Hex Color):' : 'Custom Accent Color (Hex):'}
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={formConfig.accentColor}
                          onChange={(e) =>
                            setFormConfig({ ...formConfig, accentColor: e.target.value })
                          }
                          className="w-9 h-9 rounded-lg bg-transparent cursor-pointer border border-neutral-700"
                        />
                        <input
                          type="text"
                          value={formConfig.accentColor}
                          onChange={(e) =>
                            setFormConfig({ ...formConfig, accentColor: e.target.value })
                          }
                          className="flex-1 bg-[#181f25] border border-neutral-800 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#25D366]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: EXPORT & BACKUP CENTER */}
          {activeTab === 'export' && (
            <div className="space-y-6 max-w-3xl">
              <div className="bg-[#12161a] border border-neutral-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-neutral-800">
                  <Download className="w-4 h-4 text-[#25D366]" />
                  <h3 className="text-sm font-bold text-white">
                    {isAr ? 'تصدير موقع المتجر للاستضافة (Export)' : 'Export Website for Hosting'}
                  </h3>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed">
                  {isAr
                    ? 'يقوم زر التصدير بإنشاء ملف HTML كامل ومستقل يحتوي على منتجاتك، صورك المرفوعة، معلومات الواتساب، والعملة. قم برفعه إلى مجلد الاستضافة لديك (مثل public_html).'
                    : 'Export a complete, self-contained standalone HTML file with all your products, uploaded photos embedded, contacts, and WhatsApp ordering ready for public hosting.'}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {/* Public Export (Removes Editor) */}
                  <div className="bg-[#0b0e11] border border-neutral-800 rounded-xl p-4 space-y-3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-white font-bold text-xs mb-1">
                        <FileCode className="w-4 h-4 text-[#25D366]" />
                        <span>{isAr ? 'تصدير الموقع العام (index.html)' : 'Export Public (index.html)'}</span>
                      </div>
                      <p className="text-[11px] text-neutral-400">
                        {isAr
                          ? 'يزيل أدوات ولوحة التحكم لضمان الأمان، جاهز للرفع على الاستضافة للزوار والزبائن.'
                          : 'Strips out all editor controls for security; safe for public customers.'}
                      </p>
                    </div>

                    <button
                      onClick={handleExportPublicWebsite}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#1eb956] text-neutral-950 font-bold text-xs transition shadow-md"
                    >
                      <Download className="w-4 h-4" />
                      <span>{isAr ? 'تحميل index.html للموقع' : 'Download index.html'}</span>
                    </button>
                  </div>

                  {/* Editor Shop Export (Preserves editor) */}
                  <div className="bg-[#0b0e11] border border-neutral-800 rounded-xl p-4 space-y-3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-white font-bold text-xs mb-1">
                        <Sliders className="w-4 h-4 text-emerald-400" />
                        <span>{isAr ? 'تصدير نسخة التعديل (shop-editor.html)' : 'Export Editor (shop-editor.html)'}</span>
                      </div>
                      <p className="text-[11px] text-neutral-400">
                        {isAr
                          ? 'يحتفظ بلوحة التحكم المخفية لتتمكن من التعديل مستقبلاً على جهازك عبر Ctrl+Shift+E.'
                          : 'Retains hidden admin editor so you can edit locally on your computer.'}
                      </p>
                    </div>

                    <button
                      onClick={handleExportEditorShop}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs transition"
                    >
                      <Download className="w-4 h-4" />
                      <span>{isAr ? 'تحميل shop-editor.html' : 'Download shop-editor.html'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* JSON Backup & Restore & Reset Card */}
              <div className="bg-[#12161a] border border-neutral-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-neutral-800">
                  <FileJson className="w-4 h-4 text-neutral-400" />
                  <h3 className="text-sm font-bold text-white">
                    {isAr ? 'النسخ الاحتياطي وإعادة الضبط' : 'Backup & Reset'}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleExportJson}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-200 text-xs font-medium transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{isAr ? 'تصدير نسخة احتياطية JSON' : 'Export JSON Backup'}</span>
                  </button>

                  <label className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-200 text-xs font-medium cursor-pointer transition">
                    <Upload className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>{isAr ? 'استيراد ملف JSON' : 'Import JSON Backup'}</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportJson}
                      className="hidden"
                    />
                  </label>

                  <button
                    onClick={() => {
                      if (
                        confirm(
                          isAr
                            ? 'هل أنت متأكد من استعادة المنتجات والإعدادات الافتراضية الـ 10 الأصلية؟'
                            : 'Are you sure you want to restore default 10 sample products and config?'
                        )
                      ) {
                        onResetDefaults();
                        onClose();
                      }
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-950/40 border border-red-900/60 hover:bg-red-900/50 text-red-300 text-xs font-medium transition ms-auto"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{isAr ? 'استعادة الافتراضي' : 'Reset to Defaults'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3 border-t border-neutral-800 bg-[#101418] flex items-center justify-between">
          <span className="text-[11px] text-neutral-500">
            {isAr
              ? 'اختصار لوحة المفاتيح لفتح هذه اللوحة في أي وقت: Ctrl + Shift + E'
              : 'Keyboard shortcut to reopen this panel anytime: Ctrl + Shift + E'}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold transition"
            >
              {isAr ? 'إغلاق' : 'Close'}
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-[#25D366] hover:bg-[#1eb956] text-neutral-950 text-xs font-bold transition shadow-md"
            >
              {isAr ? 'حفظ الآن' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
