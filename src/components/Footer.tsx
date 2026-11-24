export function Footer() {
  return (
    <footer className="border-t border-[#E5DEF0] bg-[#FAF8FB] py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p className="font-display text-lg font-bold text-[#2A1F2D]">Xưởng Bao Nhà Hoàng</p>
          <p className="text-sm text-[#5E5266] mt-1">
            Bánh bao nóng – Gửi trọn vị ngon · Bao bì giấy sạch sẽ · Giao tận lớp 06:30 – 07:15 sáng.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#5E5266]">
          <a href="#thuc-don" className="hover:text-[#6E44A3] transition-colors">
            Thực đơn
          </a>
          <a href="#quy-trinh" className="hover:text-[#6E44A3] transition-colors">
            Quy trình vận hành
          </a>
          <a href="#ke-hoach" className="hover:text-[#6E44A3] transition-colors">
            Kế hoạch kinh doanh
          </a>
          <a href="#doi-ngu" className="hover:text-[#6E44A3] transition-colors">
            Đội ngũ 3 tổ
          </a>
        </div>
      </div>
    </footer>
  );
}
