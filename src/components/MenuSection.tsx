import { Plus, Search, Utensils, X, Check } from 'lucide-react';
import { useMemo, useState } from 'react';
import { BUN_MENU, BunProduct, MENU_CATEGORIES, MenuCategory } from '../data/bakeryData';

interface MenuSectionProps {
  onAddToCart: (product: BunProduct, withChiliSauce: boolean) => void;
}

export function formatVnd(amount: number): string {
  return `${amount.toLocaleString('vi-VN')}đ`;
}

export function MenuSection({ onAddToCart }: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<BunProduct | null>(null);
  const [modalSauce, setModalSauce] = useState(true);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return BUN_MENU.filter((item) => {
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchQuery =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.shortNote.toLowerCase().includes(query) ||
        item.ingredients.some((ing) => ing.toLowerCase().includes(query));
      return matchCategory && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  const handleQuickAdd = (product: BunProduct) => {
    onAddToCart(product, product.hasSauceOption);
    setJustAddedId(product.id);
    window.setTimeout(() => {
      setJustAddedId((curr) => (curr === product.id ? null : curr));
    }, 1100);
  };

  const openDetails = (product: BunProduct) => {
    setSelectedProduct(product);
    setModalSauce(product.hasSauceOption);
  };

  return (
    <section id="thuc-don" className="py-12 sm:py-16 border-t border-[#E5DEF0] bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-xs sm:text-sm font-medium text-[#6E44A3] mb-2">
              Thực đơn đa dạng mỗi ngày
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#2A1F2D] tracking-tight text-balance">
              Chọn vị bánh bạn thích cho sáng mai
            </h2>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#7D7185] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm nhân thịt, khoai môn, combo..."
              aria-label="Tìm kiếm món bánh bao"
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#FAF8FB] border border-[#E5DEF0] rounded-xl text-[#2A1F2D] placeholder:text-[#8B7E94] focus:outline-none focus:ring-2 focus:ring-[#6E44A3] focus:bg-white transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#F2EEF7] rounded-2xl w-fit max-w-full mb-8">
          {MENU_CATEGORIES.map((category) => {
            const active = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E44A3] ${
                  active
                    ? 'bg-white text-[#6E44A3] shadow-sm'
                    : 'text-[#5E5266] hover:text-[#2A1F2D]'
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-[#FAF8FB] border border-[#E5DEF0] rounded-2xl p-10 text-center">
            <p className="font-display text-lg font-semibold text-[#2A1F2D]">
              Chưa tìm thấy món phù hợp
            </p>
            <p className="text-sm text-[#635869] mt-1 mb-4">
              Thử đổi từ khóa hoặc chọn xem tất cả các dòng bánh bao nhé.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-sm font-semibold text-white bg-[#6E44A3] hover:bg-[#5B358B] rounded-xl transition-colors cursor-pointer"
            >
              Hiển thị tất cả món
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredProducts.map((product) => {
              const isJustAdded = justAddedId === product.id;
              const imgFailed = failedImages[product.id];

              return (
                <article
                  key={product.id}
                  className="group bg-[#FAF8FB] border border-[#E5DEF0] rounded-3xl overflow-hidden flex flex-col transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <button
                    type="button"
                    onClick={() => openDetails(product)}
                    className="relative aspect-[4/3] w-full overflow-hidden bg-[#F2EEF7] text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#6E44A3]"
                  >
                    {!imgFailed ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        onError={() => setFailedImages((prev) => ({ ...prev, [product.id]: true }))}
                        className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#F2EEF7] to-[#FAF8FB]">
                        <Utensils className="w-8 h-8 text-[#6E44A3] mb-2" />
                        <span className="text-sm font-medium text-[#2A1F2D]">{product.name}</span>
                      </div>
                    )}
                  </button>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 text-xs text-[#635869] mb-1.5">
                        <span className="truncate">{product.categoryLabel}</span>
                        {product.highlightTag && (
                          <span className="font-semibold text-[#B4435C] shrink-0">
                            {product.highlightTag}
                          </span>
                        )}
                      </div>

                      <h3 className="font-display text-lg font-bold text-[#2A1F2D] leading-snug mb-1.5">
                        <button
                          type="button"
                          onClick={() => openDetails(product)}
                          className="text-left hover:text-[#6E44A3] transition-colors cursor-pointer"
                        >
                          {product.name}
                        </button>
                      </h3>

                      <p className="text-sm text-[#5E5266] leading-relaxed mb-4">
                        {product.shortNote}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#E5DEF0] flex items-center justify-between gap-3">
                      <div className="flex items-baseline gap-2 tabular-nums">
                        <span className="font-display text-xl font-bold text-[#2A1F2D]">
                          {formatVnd(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-[#8B7E94] line-through">
                            {formatVnd(product.originalPrice)}
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleQuickAdd(product)}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E44A3] ${
                          isJustAdded
                            ? 'bg-[#2E7D5B] text-white'
                            : 'bg-[#6E44A3] hover:bg-[#5B358B] text-white active:scale-[0.97]'
                        }`}
                      >
                        {isJustAdded ? (
                          <>
                            <Check className="w-4 h-4 shrink-0" />
                            <span>Đã thêm</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4 shrink-0" />
                            <span>Thêm vào giỏ</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 bg-[#2A1F2D]/50 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-modal-title"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white border border-[#E5DEF0] rounded-3xl max-w-2xl w-full overflow-hidden shadow-xl max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] w-full bg-[#F2EEF7] shrink-0">
              {!failedImages[selectedProduct.id] ? (
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Utensils className="w-10 h-10 text-[#6E44A3]" />
                </div>
              )}
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                aria-label="Đóng chi tiết món"
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#2A1F2D] flex items-center justify-center shadow-sm cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div>
                <p className="text-xs font-medium text-[#6E44A3] mb-1">
                  {selectedProduct.categoryLabel}
                </p>
                <div className="flex items-start justify-between gap-4">
                  <h3
                    id="product-modal-title"
                    className="font-display text-2xl font-bold text-[#2A1F2D]"
                  >
                    {selectedProduct.name}
                  </h3>
                  <span className="font-display text-2xl font-bold text-[#6E44A3] tabular-nums shrink-0">
                    {formatVnd(selectedProduct.price)}
                  </span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-[#5E5266] leading-relaxed">
                {selectedProduct.description}
              </p>

              <div className="bg-[#FAF8FB] border border-[#E5DEF0] rounded-2xl p-4 space-y-2">
                <p className="text-xs font-semibold text-[#2A1F2D]">Thành phần & Quy chuẩn</p>
                <p className="text-sm text-[#5E5266]">
                  {selectedProduct.ingredients.join(' · ')}
                </p>
                <p className="text-xs text-[#6E44A3] font-medium pt-1">
                  {selectedProduct.nutritionNote}
                </p>
              </div>

              {selectedProduct.hasSauceOption && (
                <div className="flex items-center justify-between gap-4 pt-1">
                  <span className="text-sm font-medium text-[#2A1F2D]">
                    Tùy chọn gia vị kèm theo
                  </span>
                  <div className="flex items-center gap-1 p-1 bg-[#F2EEF7] rounded-xl">
                    <button
                      type="button"
                      onClick={() => setModalSauce(true)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                        modalSauce ? 'bg-white text-[#6E44A3] shadow-xs' : 'text-[#5E5266]'
                      }`}
                    >
                      Kèm tương ớt
                    </button>
                    <button
                      type="button"
                      onClick={() => setModalSauce(false)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                        !modalSauce ? 'bg-white text-[#6E44A3] shadow-xs' : 'text-[#5E5266]'
                      }`}
                    >
                      Không tương ớt
                    </button>
                  </div>
                </div>
              )}

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="px-4 py-2.5 text-sm font-semibold text-[#5E5266] hover:text-[#2A1F2D] rounded-xl cursor-pointer"
                >
                  Đóng
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onAddToCart(selectedProduct, modalSauce);
                    setSelectedProduct(null);
                  }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-[#6E44A3] hover:bg-[#5B358B] rounded-xl transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Thêm vào giỏ · {formatVnd(selectedProduct.price)}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
