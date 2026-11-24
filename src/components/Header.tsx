import { ShoppingBag, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

export function Header({ cartCount, onOpenCart }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#thuc-don', label: 'Thực đơn' },
    { href: '#quy-trinh', label: 'Quy trình' },
    { href: '#ke-hoach', label: 'Kế hoạch' },
    { href: '#doi-ngu', label: 'Đội ngũ' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8FB]/95 backdrop-blur-md border-b border-[#E5DEF0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        <a
          href="#top"
          className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#2A1F2D] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E44A3] rounded"
        >
          Xưởng Bao Nhà Hoàng
        </a>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#5E5266]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap shrink-0 py-1 hover:text-[#6E44A3] transition-colors duration-150 border-b-2 border-transparent hover:border-[#6E44A3]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E44A3] rounded"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#6E44A3] hover:bg-[#5B358B] active:scale-[0.98] rounded-xl transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#6E44A3]"
          >
            <ShoppingBag className="w-4 h-4 shrink-0" />
            <span>Giỏ hàng</span>
            {cartCount > 0 && (
              <span className="tabular-nums bg-white/20 px-1.5 py-0.5 rounded-md text-xs font-semibold">
                {cartCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Đóng menu điều hướng' : 'Mở menu điều hướng'}
            className="md:hidden p-2 rounded-lg text-[#2A1F2D] hover:bg-[#F2EEF7] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-[#E5DEF0] bg-[#FAF8FB] px-4 py-3 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 text-sm font-medium text-[#2A1F2D] hover:bg-[#F2EEF7] rounded-lg transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
