import { ArrowRight, Clock, PackageCheck } from 'lucide-react';
import { useState } from 'react';

interface HeroSectionProps {
  onQuickPreOrder: () => void;
}

export function HeroSection({ onQuickPreOrder }: HeroSectionProps) {
  const [heroImgError, setHeroImgError] = useState(false);

  const highlights = [
    {
      value: '06:30 – 07:15',
      label: 'Giờ vàng giao tận bàn & lớp học',
    },
    {
      value: '40 – 60 phần',
      label: 'Sản lượng hấp nóng mỗi buổi sáng',
    },
    {
      value: '10k – 22k',
      label: 'Mức giá thân thiện cho học sinh, thầy cô',
    },
    {
      value: '100% Nhà làm',
      label: 'Nguyên liệu sạch · Đóng túi giấy tiện mang',
    },
  ];

  return (
    <section id="top" className="pt-8 pb-12 sm:pt-12 sm:pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-center bg-white border border-[#E5DEF0] rounded-3xl p-6 sm:p-10 shadow-sm">
            <p className="text-xs sm:text-sm font-medium text-[#6E44A3] mb-3">
              Bữa sáng học đường sạch sẽ · Giao tận lớp trước trống vào học
            </p>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-[#2A1F2D] leading-[1.15] text-balance mb-5">
              Bánh bao nóng hổi, mềm xốp chuẩn vị nhà làm mỗi sáng.
            </h1>

            <p className="text-base sm:text-lg text-[#5E5266] leading-relaxed max-w-2xl mb-7">
              Không cần chen chúc xếp hàng ở căng-tin hay mua đồ vỉa hè khói bụi. Xưởng Bao Nhà Hoàng giữ nóng liên tục bằng tủ hấp mini và thùng giữ nhiệt, phục vụ đủ 3 dòng <strong className="font-semibold text-[#2A1F2D]">Không nhân – Nhân mặn – Nhân ngọt</strong> gọn gàng trong túi giấy sạch sẽ.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <a
                href="#thuc-don"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm sm:text-base font-semibold text-white bg-[#6E44A3] hover:bg-[#5B358B] active:scale-[0.98] rounded-xl transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#6E44A3]"
              >
                <span>Xem thực đơn & Đặt bánh</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </a>

              <button
                type="button"
                onClick={onQuickPreOrder}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm sm:text-base font-semibold text-[#2A1F2D] bg-[#F2EEF7] hover:bg-[#E7E0F2] rounded-xl transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E44A3]"
              >
                <Clock className="w-4 h-4 text-[#6E44A3] shrink-0" />
                <span>Mở giỏ đặt trước</span>
              </button>
            </div>

            <div className="pt-5 border-t border-[#E5DEF0] flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-[#635869]">
              <span className="inline-flex items-center gap-1.5">
                <PackageCheck className="w-4 h-4 text-[#6E44A3]" />
                Kèm khăn giấy & tương ớt
              </span>
              <span aria-hidden="true">·</span>
              <span>Đặt trước tối hôm trước giảm ngay 5% đơn từ 3 bánh</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="h-full min-h-[340px] lg:min-h-0 rounded-3xl overflow-hidden border border-[#E5DEF0] bg-[#F2EEF7] shadow-sm">
              {!heroImgError ? (
                <img
                  src="/assets/aistudio/1795532299163_133491019155833510_2698777658770525967_707bbe56596c6cb27f3815ef6fe8882e_f154b0d4.jpg"
                  alt="Poster Xưởng Bao Nhà Hoàng mềm mịn thơm ngon chuẩn vị nhà làm với xửng hấp tre và 3 dòng nhân"
                  referrerPolicy="no-referrer"
                  onError={() => setHeroImgError(true)}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#F2EEF7] to-[#FAF8FB]">
                  <p className="font-display text-xl font-bold text-[#2A1F2D]">Xưởng Bao Nhà Hoàng</p>
                  <p className="text-sm text-[#635869] mt-2">Mềm mịn · Thơm ngon · Chuẩn vị nhà làm</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {highlights.map((item) => (
            <div
              key={item.value}
              className="bg-white border border-[#E5DEF0] rounded-2xl p-5 flex flex-col justify-between"
            >
              <div className="font-display text-xl sm:text-2xl font-bold text-[#6E44A3] tabular-nums">
                {item.value}
              </div>
              <p className="text-xs sm:text-sm text-[#5E5266] mt-1.5 leading-snug">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
