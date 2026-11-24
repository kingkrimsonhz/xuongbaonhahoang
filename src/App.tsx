import { useEffect, useState } from 'react';
import { BusinessPlanSection } from './components/BusinessPlanSection';
import { CartDrawer, CartItem, SubmittedOrder } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MenuSection } from './components/MenuSection';
import { WorkflowSection } from './components/WorkflowSection';
import { BunProduct } from './data/bakeryData';

const CART_STORAGE_KEY = 'bbnh_cart_v1';
const ORDERS_STORAGE_KEY = 'bbnh_orders_v1';

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  const [recentOrders, setRecentOrders] = useState<SubmittedOrder[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as SubmittedOrder[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // Ignore storage quota errors
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(recentOrders));
    } catch {
      // Ignore storage quota errors
    }
  }, [recentOrders]);

  const handleAddToCart = (product: BunProduct, withChiliSauce: boolean) => {
    const key = `${product.id}__${withChiliSauce ? 'sauce' : 'nosauce'}`;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...prev, { key, product, withChiliSauce, quantity: 1 }];
    });
  };

  const handleUpdateQty = (key: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + delta } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const handleRemoveItem = (key: string) => {
    setCartItems((prev) => prev.filter((item) => item.key !== key));
  };

  const handleOrderSubmitted = (order: SubmittedOrder) => {
    setRecentOrders((prev) => [order, ...prev].slice(0, 15));
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8FB] text-[#2A1F2D]">
      <Header cartCount={totalCartCount} onOpenCart={() => setCartOpen(true)} />

      <main className="flex-1">
        <HeroSection onQuickPreOrder={() => setCartOpen(true)} />
        <MenuSection onAddToCart={handleAddToCart} />
        <WorkflowSection />
        <BusinessPlanSection />
      </main>

      <Footer />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCartItems([])}
        recentOrders={recentOrders}
        onOrderSubmitted={handleOrderSubmitted}
      />
    </div>
  );
}
