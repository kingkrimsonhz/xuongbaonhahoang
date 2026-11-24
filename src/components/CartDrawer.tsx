import { Check, CheckCircle2, Copy, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { BunProduct } from '../data/bakeryData';
import { formatVnd } from './MenuSection';

export interface CartItem {
  key: string;
  product: BunProduct;
  withChiliSauce: boolean;
  quantity: number;
}

export interface SubmittedOrder {
  id: string;
  createdAt: string;
  customerName: string;
  role: 'Học sinh' | 'Giáo viên / CBNV';
  classOrRoom: string;
  phone: string;
  orderMode: 'preorder' | 'morning';
  deliveryWindow: string;
  paymentMethod: 'cash' | 'transfer';
  note: string;
  items: { name: string; quantity: number; price: number; withChiliSauce: boolean }[];
  subtotal: number;
  discount: number;
  total: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQty: (key: string, delta: number) => void;
  onRemoveItem: (key: string) => void;
  onClearCart: () => void;
  recentOrders: SubmittedOrder[];
  onOrderSubmitted: (order: SubmittedOrder) => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  recentOrders,
  onOrderSubmitted,
}: CartDrawerProps) {
  const [drawerTab, setDrawerTab] = useState<'cart' | 'history'>('cart');
  const [customerName, setCustomerName] = useState('');
  const [role, setRole] = useState<'Học sinh' | 'Giáo viên / CBNV'>('Học sinh');
  const [classOrRoom, setClassOrRoom] = useState('');
  const [phone, setPhone] = useState('');
  const [orderMode, setOrderMode] = useState<'preorder' | 'morning'>('preorder');
  const [deliveryWindow, setDeliveryWindow] = useState('06:45 – 07:00');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'transfer'>('cash');
  const [note, setNote] = useState('');
  const [formError, setFormError] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<SubmittedOrder | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const preorderDiscount =
    orderMode === 'preorder' && totalCount >= 3 ? Math.round(subtotal * 0.05) : 0;
  const finalTotal = subtotal - preorderDiscount;

  const buildZaloSummary = (order: SubmittedOrder) => {
    const lines = [
      `ĐƠN ĐẶT XƯỞNG BAO NHÀ HOÀNG (${order.id})`,
      `Khách: ${order.customerName} (${order.role}) - Lớp/Phòng: ${order.classOrRoom}`,
      `SĐT/Zalo: ${order.phone}`,
      `Hình thức: ${order.orderMode === 'preorder' ? 'Đặt trước tối hôm trước' : 'Giao sáng nay'} (${order.deliveryWindow})`,
      `Thanh toán: ${order.paymentMethod === 'cash' ? 'Tiền mặt khi nhận' : 'Chuyển khoản QR'}`,
      '--- Chi tiết món ---',
      ...order.items.map(
        (it) =>
          `- ${it.quantity}x ${it.name}${it.withChiliSauce ? ' (kèm tương ớt)' : ' (không tương ớt)'}: ${formatVnd(it.price * it.quantity)}`,
      ),
      ...(order.discount > 0 ? [`Ưu đãi đặt sớm (-5%): -${formatVnd(order.discount)}`] : []),
      `Tổng thanh toán: ${formatVnd(order.total)}`,
      ...(order.note ? [`Ghi chú: ${order.note}`] : []),
    ];
    return lines.join('\n');
  };

  const handleCopyZalo = async (order: SubmittedOrder) => {
    try {
      await navigator.clipboard.writeText(buildZaloSummary(order));
      setCopiedId(order.id);
      window.setTimeout(() => setCopiedId(null), 1800);
    } catch {
      // Fallback ignored if clipboard blocked
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    if (!customerName.trim() || !classOrRoom.trim() || !phone.trim()) {
      setFormError('Vui lòng điền đầy đủ Họ tên, Lớp/Phòng và Số Zalo để tổ giao bánh liên hệ.');
      return;
    }

    setFormError('');
    const newOrder: SubmittedOrder = {
      id: `BBH-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      customerName: customerName.trim(),
      role,
      classOrRoom: classOrRoom.trim(),
      phone: phone.trim(),
      orderMode,
      deliveryWindow,
      paymentMethod,
      note: note.trim(),
      items: cartItems.map((it) => ({
        name: it.product.name,
        quantity: it.quantity,
        price: it.product.price,
        withChiliSauce: it.withChiliSauce,
      })),
      subtotal,
      discount: preorderDiscount,
      total: finalTotal,
    };

    onOrderSubmitted(newOrder);
    onClearCart();
    setConfirmedOrder(newOrder);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#2A1F2D]/50 backdrop-blur-xs flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Giỏ hàng và đặt bánh trực tuyến"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[#FAF8FB] h-full shadow-2xl border-l border-[#E5DEF0] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 bg-white border-b border-[#E5DEF0] flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#6E44A3]" />
            <h2 className="font-display text-lg font-bold text-[#2A1F2D]">
              Đặt bánh trực tuyến
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng giỏ hàng"
            className="p-2 rounded-xl text-[#5E5266] hover:bg-[#F2EEF7] hover:text-[#2A1F2D] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-5 pt-3 bg-white border-b border-[#E5DEF0] shrink-0">
          <div className="flex items-center gap-1 p-1 bg-[#F2EEF7] rounded-xl mb-3">
            <button
              type="button"
              onClick={() => {
                setDrawerTab('cart');
                setConfirmedOrder(null);
              }}
              className={`flex-1 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                drawerTab === 'cart' ? 'bg-white text-[#6E44A3] shadow-xs' : 'text-[#5E5266]'
              }`}
            >
              Giỏ hàng ({totalCount})
            </button>
            <button
              type="button"
              onClick={() => setDrawerTab('history')}
              className={`flex-1 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                drawerTab === 'history' ? 'bg-white text-[#6E44A3] shadow-xs' : 'text-[#5E5266]'
              }`}
            >
              Đơn đã đặt ({recentOrders.length})
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {drawerTab === 'history' ? (
            recentOrders.length === 0 ? (
              <div className="bg-white border border-[#E5DEF0] rounded-2xl p-8 text-center">
                <p className="font-display font-bold text-[#2A1F2D]">Chưa có đơn hàng nào</p>
                <p className="text-sm text-[#635869] mt-1">
                  Đơn bánh sau khi đặt sẽ được lưu tại đây để bạn tiện theo dõi hoặc gửi lại qua Zalo.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white border border-[#E5DEF0] rounded-2xl p-4 space-y-2.5"
                  >
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="font-mono font-bold text-[#6E44A3]">{order.id}</span>
                      <span className="text-[#635869] tabular-nums">
                        {order.createdAt} · Giao {order.deliveryWindow}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-[#2A1F2D]">
                      {order.customerName} · {order.classOrRoom}
                    </p>
                    <ul className="text-xs text-[#5E5266] space-y-1">
                      {order.items.map((it, idx) => (
                        <li key={idx}>
                          {it.quantity}× {it.name}
                        </li>
                      ))}
                    </ul>
                    <div className="pt-2 border-t border-[#E5DEF0] flex items-center justify-between">
                      <span className="font-mono font-bold text-sm text-[#2A1F2D] tabular-nums">
                        {formatVnd(order.total)}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopyZalo(order)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6E44A3] hover:underline cursor-pointer"
                      >
                        {copiedId === order.id ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Đã sao chép</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Sao chép gửi Zalo</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : confirmedOrder ? (
            <div className="bg-white border border-[#E5DEF0] rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-3 text-[#2E7D5B]">
                <CheckCircle2 className="w-7 h-7 shrink-0" />
                <div>
                  <p className="text-xs font-semibold">Đặt bánh thành công</p>
                  <h3 className="font-display text-xl font-bold text-[#2A1F2D]">
                    Mã đơn {confirmedOrder.id}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-[#5E5266] leading-relaxed">
                Tổ Bán & Giao bánh (Hoàng, Lâm, Trân) đã tiếp nhận yêu cầu giao đến{' '}
                <strong className="text-[#2A1F2D]">{confirmedOrder.classOrRoom}</strong> trong khung giờ{' '}
                <strong className="text-[#6E44A3] tabular-nums">{confirmedOrder.deliveryWindow}</strong>.
              </p>

              <div className="bg-[#FAF8FB] border border-[#E5DEF0] rounded-2xl p-4 space-y-2 text-sm">
                {confirmedOrder.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between gap-2">
                    <span className="text-[#2A1F2D]">
                      {it.quantity}× {it.name}
                    </span>
                    <span className="font-mono tabular-nums text-[#2A1F2D]">
                      {formatVnd(it.price * it.quantity)}
                    </span>
                  </div>
                ))}
                {confirmedOrder.discount > 0 && (
                  <div className="flex justify-between gap-2 text-[#2E7D5B] text-xs pt-1">
                    <span>Ưu đãi đặt trước (-5%)</span>
                    <span className="font-mono tabular-nums">-{formatVnd(confirmedOrder.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between gap-2 pt-2 border-t border-[#E5DEF0] font-bold">
                  <span>Tổng thanh toán</span>
                  <span className="font-mono text-[#6E44A3] tabular-nums">
                    {formatVnd(confirmedOrder.total)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => handleCopyZalo(confirmedOrder)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-[#6E44A3] hover:bg-[#5B358B] rounded-xl transition-colors cursor-pointer"
                >
                  {copiedId === confirmedOrder.id ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Đã sao chép tin nhắn đơn hàng</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Sao chép tin nhắn gửi nhóm Zalo lớp</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setConfirmedOrder(null);
                    onClose();
                  }}
                  className="w-full px-4 py-2.5 text-sm font-semibold text-[#5E5266] hover:text-[#2A1F2D] rounded-xl cursor-pointer"
                >
                  Quay lại thực đơn
                </button>
              </div>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="bg-white border border-[#E5DEF0] rounded-3xl p-8 text-center space-y-3">
              <p className="font-display text-lg font-bold text-[#2A1F2D]">Giỏ bánh đang trống</p>
              <p className="text-sm text-[#635869]">
                Chọn vài chiếc bánh bao nóng hổi hoặc combo cùng bạn bè để đặt giao tận lớp nhé.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-[#6E44A3] hover:bg-[#5B358B] rounded-xl transition-colors cursor-pointer"
              >
                Chọn bánh ngay
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item.key}
                    className="bg-white border border-[#E5DEF0] rounded-2xl p-3.5 flex items-center gap-3.5"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-xl object-cover shrink-0 bg-[#F2EEF7]"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display text-sm font-bold text-[#2A1F2D] truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-[#635869] mt-0.5">
                        {formatVnd(item.product.price)}
                        {item.product.hasSauceOption &&
                          ` · ${item.withChiliSauce ? 'Kèm tương ớt' : 'Không tương ớt'}`}
                      </p>

                      <div className="flex items-center justify-between mt-2">
                        <div className="inline-flex items-center gap-2 bg-[#F2EEF7] rounded-lg p-0.5">
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.key, -1)}
                            aria-label="Giảm số lượng"
                            className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white text-[#2A1F2D] cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-mono text-xs font-bold w-5 text-center tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.key, 1)}
                            aria-label="Tăng số lượng"
                            className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white text-[#2A1F2D] cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.key)}
                          aria-label={`Xóa ${item.product.name}`}
                          className="p-1.5 text-[#8B7E94] hover:text-[#B4435C] cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="bg-white border border-[#E5DEF0] rounded-3xl p-5 space-y-4">
                <h3 className="font-display text-base font-bold text-[#2A1F2D]">
                  Thông tin giao bánh tận lớp
                </h3>

                <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#F2EEF7] rounded-xl">
                  <button
                    type="button"
                    onClick={() => setOrderMode('preorder')}
                    className={`py-2 px-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      orderMode === 'preorder' ? 'bg-white text-[#6E44A3] shadow-xs' : 'text-[#5E5266]'
                    }`}
                  >
                    Đặt trước tối nay (-5% từ 3 bánh)
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderMode('morning')}
                    className={`py-2 px-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      orderMode === 'morning' ? 'bg-white text-[#6E44A3] shadow-xs' : 'text-[#5E5266]'
                    }`}
                  >
                    Đặt giao sáng nay (6h30–7h15)
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="block">
                    <span className="text-xs font-medium text-[#5E5266] block mb-1">Họ và tên *</span>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="VD: Minh Anh / Cô Lan"
                      className="w-full px-3.5 py-2 text-sm bg-[#FAF8FB] border border-[#E5DEF0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6E44A3]"
                    />
                  </label>

                  <label className="block">
                    <span className="text-xs font-medium text-[#5E5266] block mb-1">Đối tượng</span>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value as 'Học sinh' | 'Giáo viên / CBNV')}
                      className="w-full px-3.5 py-2 text-sm bg-[#FAF8FB] border border-[#E5DEF0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6E44A3]"
                    >
                      <option value="Học sinh">Học sinh</option>
                      <option value="Giáo viên / CBNV">Giáo viên / CBNV</option>
                    </select>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="block">
                    <span className="text-xs font-medium text-[#5E5266] block mb-1">
                      Lớp / Phòng ban *
                    </span>
                    <input
                      type="text"
                      required
                      value={classOrRoom}
                      onChange={(e) => setClassOrRoom(e.target.value)}
                      placeholder="VD: 11A2 hoặc P. Giáo viên"
                      className="w-full px-3.5 py-2 text-sm bg-[#FAF8FB] border border-[#E5DEF0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6E44A3]"
                    />
                  </label>

                  <label className="block">
                    <span className="text-xs font-medium text-[#5E5266] block mb-1">
                      Số điện thoại / Zalo *
                    </span>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="VD: 09xx xxx xxx"
                      className="w-full px-3.5 py-2 text-sm bg-[#FAF8FB] border border-[#E5DEF0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6E44A3]"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="block">
                    <span className="text-xs font-medium text-[#5E5266] block mb-1">
                      Khung giờ nhận bánh
                    </span>
                    <select
                      value={deliveryWindow}
                      onChange={(e) => setDeliveryWindow(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm bg-[#FAF8FB] border border-[#E5DEF0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6E44A3]"
                    >
                      <option value="06:30 – 06:45">06:30 – 06:45 (Sớm)</option>
                      <option value="06:45 – 07:00">06:45 – 07:00 (Cao điểm)</option>
                      <option value="07:00 – 07:15">07:00 – 07:15 (Trước trống)</option>
                    </select>
                  </label>

                  <label className="block">
                    <span className="text-xs font-medium text-[#5E5266] block mb-1">
                      Thanh toán (Tổ Thu ngân)
                    </span>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value as 'cash' | 'transfer')}
                      className="w-full px-3.5 py-2 text-sm bg-[#FAF8FB] border border-[#E5DEF0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6E44A3]"
                    >
                      <option value="cash">Tiền mặt (có sẵn tiền lẻ)</option>
                      <option value="transfer">Chuyển khoản QR Thu ngân</option>
                    </select>
                  </label>
                </div>

                <label className="block">
                  <span className="text-xs font-medium text-[#5E5266] block mb-1">
                    Ghi chú cho tổ giao bánh
                  </span>
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="VD: Giao bàn đầu dãy ngoài, chia làm 2 túi giấy..."
                    className="w-full px-3.5 py-2 text-sm bg-[#FAF8FB] border border-[#E5DEF0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6E44A3]"
                  />
                </label>

                {formError && (
                  <p className="text-xs font-medium text-[#B4435C]" role="alert">
                    {formError}
                  </p>
                )}

                <div className="pt-3 border-t border-[#E5DEF0] space-y-1.5 text-sm">
                  <div className="flex justify-between text-[#5E5266]">
                    <span>Tạm tính ({totalCount} phần)</span>
                    <span className="font-mono tabular-nums">{formatVnd(subtotal)}</span>
                  </div>
                  {preorderDiscount > 0 && (
                    <div className="flex justify-between text-[#2E7D5B] text-xs font-medium">
                      <span>Ưu đãi đặt trước tối hôm trước (-5%)</span>
                      <span className="font-mono tabular-nums">-{formatVnd(preorderDiscount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-base text-[#2A1F2D] pt-1">
                    <span>Tổng cộng</span>
                    <span className="font-mono text-[#6E44A3] tabular-nums">
                      {formatVnd(finalTotal)}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-5 text-sm font-semibold text-white bg-[#6E44A3] hover:bg-[#5B358B] active:scale-[0.99] rounded-xl transition-all cursor-pointer"
                >
                  Xác nhận đặt bánh · {formatVnd(finalTotal)}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
