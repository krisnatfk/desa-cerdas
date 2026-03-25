'use client';
/**
 * components/marketplace/CartContext.tsx
 * React Context/Provider for shopping cart state across the app.
 */
import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import {
  type CartItem,
  type MarketplaceProduct,
  getCart,
  addToCart as addToCartUtil,
  removeFromCart as removeFromCartUtil,
  updateCartQty as updateCartQtyUtil,
  clearCart as clearCartUtil,
  cartTotal,
} from '@/lib/marketplace';

interface CartContextType {
  items: CartItem[];
  total: number;
  count: number;
  addItem: (product: MarketplaceProduct, qty?: number) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(getCart());
  }, []);

  const addItem = useCallback((product: MarketplaceProduct, qty = 1) => {
    const updated = addToCartUtil(product, qty);
    setItems([...updated]);
  }, []);

  const removeItem = useCallback((productId: string) => {
    const updated = removeFromCartUtil(productId);
    setItems([...updated]);
  }, []);

  const updateQty = useCallback((productId: string, qty: number) => {
    const updated = updateCartQtyUtil(productId, qty);
    setItems([...updated]);
  }, []);

  const clear = useCallback(() => {
    clearCartUtil();
    setItems([]);
  }, []);

  return (
    <CartContext.Provider
      value={{
        items,
        total: cartTotal(items),
        count: items.reduce((s, i) => s + i.quantity, 0),
        addItem,
        removeItem,
        updateQty,
        clear,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
