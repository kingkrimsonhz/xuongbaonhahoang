import { AlertTriangle, BookOpen, Calculator, Maximize2, ShieldCheck, TrendingUp, X } from 'lucide-react';
import { useState } from 'react';
import { RISK_MATRIX } from '../data/bakeryData';
import { formatVnd } from './MenuSection';

type PlanTab = 'idea-goals' | 'market-usp' | 'strategy-finance' | 'risks';

export function BusinessPlanSection() {
  const [activeTab, setActiveTab] = useState<PlanTab>('idea-goals');
  const [infographicError, setInfographicError] = useState(false);
  const [zoomOpen, setZoomOpen] = useState(false);

  // Interactive financial control calculator (Step 4)
  const [ingredientCost, setIngredientCost] = useState(249000);
  const [packagingExtraCost, setPackagingExtraCost] = useState(51000);
  const [batchQuantity, setBatchQuantity] = useState(50);
  const [avgSellPrice, setAvgSellPrice] = useState(15000);
  const [soldQuantity, setSoldQuantity] = useState(48);

  const totalCost = ingredientCost + packagingExtraCost;
  const unitCost = batchQuantity > 0 ? Math.round(totalCost / batchQuantity) : 0;
  const revenue = avgSellPrice * soldQuantity;
  const profit = revenue - totalCost;
  const breakEvenQty = avgSellPrice > 0 ? Math.ceil(totalCost / avgSellPrice) : 0;

  const tabs: { id: PlanTab; label: string }[] = [
    { id: 'idea-goals', label: 'Bước 1–2: Ý tưởng & Mục tiêu' },
    { id: 'market-usp', label: 'Bước 3: Khách hàng & Lợi thế' },
    { id: 'strategy-finance', label: 'Bước 4: Chiến lược & Tài chính' },
    { id: 'risks', label: 'Bước 5: Quản trị Rủi ro' },
  ];

  return (
    <section id="ke-hoach" className="py-12 sm:py-16 border-t border-[#E5DEF0] bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-8">
          <p className="text-xs sm:text-sm font-medium text-[#6E44A3] mb-2">
            Bản kế hoạch kinh doanh chi tiết
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#2A1F2D] tracking-tight text-balance">
            Mô hình vận hành & hạch toán minh bạch của Xưởng Bao Nhà Hoàng
          </h2>
        </div>

        <div className="mb-8 bg-[#FAF8FB] border border-[#E5DEF0] rounded-3xl p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <p className="font-display text-base sm:text-lg font-bold text-[#2A1F2D]">
                Sơ đồ tổng quan 5 bước · Xưởng Bao Nhà Hoàng
              </p>
              <p className="text-xs sm:text-sm text-[#5E5266]">
                Bánh bao nóng – Gửi trọn vị ngon · Ngon, Nhanh, Sạch, Đủ Chất
              </p>
            </div>
            <button
              type="button"
              onClick={() => setZoomOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#6E44A3] bg-white border border-[#E5DEF0] hover:bg-[#F2EEF7] rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Phóng to sơ đồ</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setZoomOpen(true)}
            className="w-full block rounded-2xl overflow-hidden border border-[#E5DEF0] bg-white cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E44A3]"
          >
            {!infographicError ? (
              <img
                src="/assets/aistudio/hoang_5ba85815.jpg"
                alt="Sơ đồ bản kế hoạch kinh doanh 5 bước của Xưởng Bao Nhà Hoàng"
                referrerPolicy="no-referrer"
                onError={() => setInfographicError(true)}
                className="w-full max-h-[540px] object-contain mx-auto"
              />
            ) : (
              <div className="py-12 px-6 text-center text-sm text-[#5E5266]">
                Sơ đồ 5 bước vận hành Xưởng Bao Nhà Hoàng
              </div>
            )}
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#F2EEF7] rounded-2xl w-fit max-w-full mb-8">
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E44A3] ${
                  active
                    ? 'bg-white text-[#6E44A3] shadow-sm'
                    : 'text-[#5E5266] hover:text-[#2A1F2D]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {activeTab === 'idea-goals' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-[#FAF8FB] border border-[#E5DEF0] rounded-3xl p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#6E44A3]">
                <BookOpen className="w-4 h-4" />
                <span>Bước 1: Xác định ý tưởng & tiêu chuẩn sản phẩm</span>
              </div>
              <p className="text-sm sm:text-base text-[#5E5266] leading-relaxed">
                Xuất phát từ thực tế học sinh và giáo viên thường xuyên bận rộn buổi sáng, không kịp ngồi quán nhưng vẫn cần bữa sáng nhanh gọn, sạch sẽ và đủ chất trước giờ vào lớp.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white border border-[#E5DEF0] rounded-2xl p-4">
                  <p className="font-display font-bold text-[#2A1F2D] mb-1">Dòng không nhân</p>
                  <p className="text-xs sm:text-sm text-[#5E5266]">
                    Nhẹ bụng, giá rẻ 10.000đ, phục vụ siêu tốc trong giờ cao điểm.
                  </p>
                </div>
                <div className="bg-white border border-[#E5DEF0] rounded-2xl p-4">
                  <p className="font-display font-bold text-[#2A1F2D] mb-1">Nhân mặn thịt bằm</p>
                  <p className="text-xs sm:text-sm text-[#5E5266]">
                    Thịt bằm nấm mèo đậm đà, đạm cao, chắc bụng cho cả buổi học.
                  </p>
                </div>
                <div className="bg-white border border-[#E5DEF0] rounded-2xl p-4">
                  <p className="font-display font-bold text-[#2A1F2D] mb-1">Nhân ngọt khoai môn</p>
                  <p className="text-xs sm:text-sm text-[#5E5266]">
                    Vị thanh nhẹ, dễ ăn, hợp khẩu vị số đông, kích thích mua thêm.
                  </p>
                </div>
              </div>

              <p className="text-sm text-[#5E5266] leading-relaxed pt-2 border-t border-[#E5DEF0]">
                <strong className="font-semibold text-[#2A1F2D]">Nguồn gốc & Bao bì:</strong> Chế biến tại nhà từ nguồn nguyên liệu sạch, đảm bảo vệ sinh an toàn thực phẩm; đóng gói bằng bao bì giấy thân thiện môi trường, gọn nhẹ tiện mang theo.
              </p>
            </div>

            <div className="lg:col-span-5 bg-[#FAF8FB] border border-[#E5DEF0] rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-5">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-[#6E44A3] mb-4">
                  <TrendingUp className="w-4 h-4" />
                  <span>Bước 2: Mục tiêu kinh doanh</span>
                </div>

                <div className="space-y-4">
                  <div className="bg-white border border-[#E5DEF0] rounded-2xl p-5">
                    <p className="text-xs font-semibold text-[#6E44A3] mb-1">Mục tiêu ngắn hạn</p>
                    <p className="font-display text-2xl font-bold text-[#2A1F2D] tabular-nums">
                      40 – 60 phần / sáng
                    </p>
                    <p className="text-sm text-[#5E5266] mt-1 tabular-nums">
                      Tương đương 150 – 250 phần/tuần · Doanh số 3 – 5 triệu đồng/tuần.
                    </p>
                  </div>

                  <div className="bg-white border border-[#E5DEF0] rounded-2xl p-5">
                    <p className="text-xs font-semibold text-[#6E44A3] mb-1">Mục tiêu mở rộng</p>
                    <p className="text-sm text-[#5E5266] leading-relaxed">
                      Mở rộng từ phạm vi lớp học sang các lớp lân cận, toàn trường và đội ngũ giáo viên – CBNV; phát triển đặt trước từ tối hôm trước và các gói combo ưu đãi theo nhóm.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'market-usp' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-[#FAF8FB] border border-[#E5DEF0] rounded-3xl p-6 space-y-4">
              <h3 className="font-display text-lg font-bold text-[#2A1F2D]">
                1. Khách hàng mục tiêu
              </h3>
              <div className="bg-white border border-[#E5DEF0] rounded-2xl p-4">
                <p className="font-semibold text-sm text-[#2A1F2D] mb-1">Học sinh (15 – 19 tuổi)</p>
                <p className="text-sm text-[#5E5266] leading-relaxed">
                  Nhu cầu ăn sáng cao, thích sự nhanh chóng, giá vừa túi tiền (10k–20k) và muốn thay đổi khẩu vị mỗi ngày.
                </p>
              </div>
              <div className="bg-white border border-[#E5DEF0] rounded-2xl p-4">
                <p className="font-semibold text-sm text-[#2A1F2D] mb-1">Giáo viên & CBNV</p>
                <p className="text-sm text-[#5E5266] leading-relaxed">
                  Đề cao sự tiện lợi, vệ sinh an toàn thực phẩm tuyệt đối và không có thời gian xếp hàng chờ bên ngoài.
                </p>
              </div>
            </div>

            <div className="bg-[#FAF8FB] border border-[#E5DEF0] rounded-3xl p-6 space-y-4">
              <h3 className="font-display text-lg font-bold text-[#2A1F2D]">
                2. Thị trường & Đối thủ
              </h3>
              <p className="text-sm text-[#5E5266] leading-relaxed">
                <strong className="text-[#2A1F2D]">Khuôn viên trường học:</strong> Nhu cầu đều đặn mỗi ngày đi học, giờ vàng tập trung <strong className="tabular-nums text-[#6E44A3]">06:30 – 07:15</strong>.
              </p>
              <div className="bg-white border border-[#E5DEF0] rounded-2xl p-4 space-y-2 text-sm text-[#5E5266]">
                <p>
                  <strong className="text-[#2A1F2D]">Xe bánh mì, xôi vỉa hè:</strong> Tiềm ẩn khói bụi cổng trường, khó kiểm soát vệ sinh.
                </p>
                <p>
                  <strong className="text-[#2A1F2D]">Căng-tin trường:</strong> Thường quá tải giờ cao điểm, xếp hàng lâu dễ muộn tiết.
                </p>
              </div>
            </div>

            <div className="bg-[#FAF8FB] border border-[#E5DEF0] rounded-3xl p-6 space-y-4">
              <h3 className="font-display text-lg font-bold text-[#2A1F2D]">
                3. Lợi thế cạnh tranh (USP) & Vốn
              </h3>
              <ul className="space-y-2.5 text-sm text-[#5E5266]">
                <li>• Giao tận bàn/tận lớp trước trống vào học, không phải đi xa hay xếp hàng.</li>
                <li>• Giữ nóng liên tục bằng thùng giữ nhiệt và tủ hấp mini chuyên dụng.</li>
                <li>• Vận hành tinh gọn bởi 10 thành viên, không tốn chi phí thuê mặt bằng.</li>
              </ul>
              <div className="bg-white border border-[#E5DEF0] rounded-2xl p-4">
                <p className="text-xs font-semibold text-[#6E44A3] mb-1">Vốn khởi động dự kiến</p>
                <p className="text-sm text-[#2A1F2D] leading-relaxed">
                  Nguyên liệu ban đầu <strong className="tabular-nums">249.000đ</strong> + bao bì, gia vị, vật tư kèm khoản vốn dự phòng xoay vòng các buổi tiếp theo.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'strategy-finance' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 bg-[#FAF8FB] border border-[#E5DEF0] rounded-3xl p-6 space-y-4">
              <h3 className="font-display text-lg font-bold text-[#2A1F2D]">
                Chiến lược tiếp thị & Quản lý vốn
              </h3>
              <div className="space-y-3 text-sm text-[#5E5266]">
                <div className="bg-white border border-[#E5DEF0] rounded-2xl p-4">
                  <p className="font-semibold text-[#2A1F2D] mb-1">Đặt trước (Pre-order) tại lớp & toàn trường</p>
                  <p>
                    Đăng bài nhóm lớp từ tối hôm trước kèm ưu đãi nhẹ đặt sớm; nhờ bạn bè lan tỏa qua CLB, treo poster rõ món – giá – giờ bán và khuyến khích mua combo chung.
                  </p>
                </div>
                <div className="bg-white border border-[#E5DEF0] rounded-2xl p-4">
                  <p className="font-semibold text-[#2A1F2D] mb-1">Tách bạch Vốn gốc & Doanh thu</p>
                  <p>
                    Giữ riêng hoàn toàn vốn nhập nguyên liệu ban đầu và doanh thu thu về để xoay vòng bền vững, tránh thâm hụt giữa chừng.
                  </p>
                </div>
              </div>

              <div className="bg-[#F2EEF7] rounded-2xl p-4 text-xs sm:text-sm text-[#2A1F2D] space-y-1.5 font-mono">
                <p>Giá vốn 1 bánh = Tổng chi phí : Sản lượng</p>
                <p>Doanh thu = Giá bán × Số lượng bán</p>
                <p>Lợi nhuận = Doanh thu - Tổng chi phí</p>
                <p>Điểm hòa vốn = Tổng chi phí : Giá bán</p>
              </div>
            </div>

            <div className="lg:col-span-7 bg-[#FAF8FB] border border-[#E5DEF0] rounded-3xl p-6 space-y-5">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#6E44A3]">
                  <Calculator className="w-4 h-4" />
                  <span>Bảng tính thử Hòa vốn & Lợi nhuận buổi sáng</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIngredientCost(249000);
                    setPackagingExtraCost(51000);
                    setBatchQuantity(50);
                    setAvgSellPrice(15000);
                    setSoldQuantity(48);
                  }}
                  className="text-xs font-semibold text-[#6E44A3] hover:underline cursor-pointer"
                >
                  Đặt lại mặc định
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block bg-white border border-[#E5DEF0] rounded-2xl p-3.5">
                  <span className="text-xs font-medium text-[#635869] block mb-1">
                    Tiền nguyên liệu (đ)
                  </span>
                  <input
                    type="number"
                    min={0}
                    step={5000}
                    value={ingredientCost}
                    onChange={(e) => setIngredientCost(Math.max(0, Number(e.target.value)))}
                    className="w-full font-mono text-base font-semibold text-[#2A1F2D] focus:outline-none tabular-nums"
                  />
                </label>

                <label className="block bg-white border border-[#E5DEF0] rounded-2xl p-3.5">
                  <span className="text-xs font-medium text-[#635869] block mb-1">
                    Bao bì giấy, gia vị, vật tư (đ)
                  </span>
                  <input
                    type="number"
                    min={0}
                    step={5000}
                    value={packagingExtraCost}
                    onChange={(e) => setPackagingExtraCost(Math.max(0, Number(e.target.value)))}
                    className="w-full font-mono text-base font-semibold text-[#2A1F2D] focus:outline-none tabular-nums"
                  />
                </label>

                <label className="block bg-white border border-[#E5DEF0] rounded-2xl p-3.5">
                  <span className="text-xs font-medium text-[#635869] block mb-1">
                    Sản lượng làm ra (cái)
                  </span>
                  <input
                    type="number"
                    min={1}
                    max={500}
                    value={batchQuantity}
                    onChange={(e) => setBatchQuantity(Math.max(1, Number(e.target.value)))}
                    className="w-full font-mono text-base font-semibold text-[#2A1F2D] focus:outline-none tabular-nums"
                  />
                </label>

                <label className="block bg-white border border-[#E5DEF0] rounded-2xl p-3.5">
                  <span className="text-xs font-medium text-[#635869] block mb-1">
                    Giá bán bình quân / bánh (đ)
                  </span>
                  <input
                    type="number"
                    min={1000}
                    step={1000}
                    value={avgSellPrice}
                    onChange={(e) => setAvgSellPrice(Math.max(1000, Number(e.target.value)))}
                    className="w-full font-mono text-base font-semibold text-[#2A1F2D] focus:outline-none tabular-nums"
                  />
                </label>
              </div>

              <div className="bg-white border border-[#E5DEF0] rounded-2xl p-4">
                <div className="flex items-center justify-between text-xs sm:text-sm mb-2">
                  <span className="font-medium text-[#5E5266]">Số lượng bán thực tế trong buổi</span>
                  <span className="font-mono font-bold text-[#6E44A3] tabular-nums">
                    {soldQuantity} / {batchQuantity} bánh
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={batchQuantity}
                  value={Math.min(soldQuantity, batchQuantity)}
                  onChange={(e) => setSoldQuantity(Number(e.target.value))}
                  aria-label="Số lượng bánh bán được"
                  className="w-full accent-[#6E44A3] cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white border border-[#E5DEF0] rounded-2xl p-3.5">
                  <p className="text-xs text-[#635869]">Giá vốn 1 bánh</p>
                  <p className="font-mono text-base sm:text-lg font-bold text-[#2A1F2D] tabular-nums mt-0.5">
                    {formatVnd(unitCost)}
                  </p>
                </div>
                <div className="bg-white border border-[#E5DEF0] rounded-2xl p-3.5">
                  <p className="text-xs text-[#635869]">Điểm hòa vốn</p>
                  <p className="font-mono text-base sm:text-lg font-bold text-[#6E44A3] tabular-nums mt-0.5">
                    {breakEvenQty} bánh
                  </p>
                </div>
                <div className="bg-white border border-[#E5DEF0] rounded-2xl p-3.5">
                  <p className="text-xs text-[#635869]">Doanh thu</p>
                  <p className="font-mono text-base sm:text-lg font-bold text-[#2A1F2D] tabular-nums mt-0.5">
                    {formatVnd(revenue)}
                  </p>
                </div>
                <div className="bg-white border border-[#E5DEF0] rounded-2xl p-3.5">
                  <p className="text-xs text-[#635869]">Lợi nhuận ròng</p>
                  <p
                    className={`font-mono text-base sm:text-lg font-bold tabular-nums mt-0.5 ${
                      profit >= 0 ? 'text-[#2E7D5B]' : 'text-[#C23B5A]'
                    }`}
                  >
                    {profit >= 0 ? `+${formatVnd(profit)}` : formatVnd(profit)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'risks' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {RISK_MATRIX.map((item) => (
              <div
                key={item.risk}
                className="bg-[#FAF8FB] border border-[#E5DEF0] rounded-3xl p-6 space-y-3"
              >
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="w-5 h-5 text-[#B4435C] shrink-0 mt-0.5" />
                  <h3 className="font-display text-lg font-bold text-[#2A1F2D]">{item.risk}</h3>
                </div>
                <p className="text-sm text-[#5E5266] leading-relaxed">{item.impact}</p>
                <div className="bg-white border border-[#E5DEF0] rounded-2xl p-4 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#2E7D5B] shrink-0 mt-0.5" />
                  <p className="text-sm text-[#2A1F2D] leading-relaxed">
                    <strong className="font-semibold">Biện pháp xử lý:</strong> {item.mitigation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {zoomOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#2A1F2D]/70 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Phóng to sơ đồ kế hoạch kinh doanh Xưởng Bao Nhà Hoàng"
          onClick={() => setZoomOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full bg-white rounded-3xl p-3 sm:p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setZoomOpen(false)}
              aria-label="Đóng xem phóng to"
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/95 hover:bg-white text-[#2A1F2D] border border-[#E5DEF0] flex items-center justify-center shadow-sm cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src="/assets/aistudio/hoang_5ba85815.jpg"
              alt="Sơ đồ bản kế hoạch kinh doanh 5 bước của Xưởng Bao Nhà Hoàng"
              referrerPolicy="no-referrer"
              className="w-full max-h-[85vh] object-contain rounded-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}
