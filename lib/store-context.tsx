"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/lib/products";

export type CartLine = {
  key: string; // product.id + color + size
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
};

type StoreState = {
  cart: CartLine[];
  wishlist: string[]; // product ids
  isCartOpen: boolean;
  isSearchOpen: boolean;
  addToCart: (product: Product, color: string, size: string, quantity?: number) => void;
  removeFromCart: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  openCart: () => void;
  closeCart: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  cartCount: number;
  subtotal: number;
};

const StoreContext = createContext<StoreState | null>(null);

const CART_KEY = "manza:cart";
const WISHLIST_KEY = "manza:wishlist";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // NOTE: prototype persistence only — replace with real cart/account
  // storage (e.g. a commerce backend) when one is wired up.
  useEffect(() => {
    try {
      const rawCart = localStorage.getItem(CART_KEY);
      const rawWishlist = localStorage.getItem(WISHLIST_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from browser storage after mount
      if (rawCart) setCart(JSON.parse(rawCart));
      if (rawWishlist) setWishlist(JSON.parse(rawWishlist));
    } catch {
      // ignore malformed local storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {}
  }, [cart, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    } catch {}
  }, [wishlist, hydrated]);

  const addToCart = useCallback(
    (product: Product, color: string, size: string, quantity = 1) => {
      const key = `${product.id}:${color}:${size}`;
      setCart((prev) => {
        const existing = prev.find((line) => line.key === key);
        if (existing) {
          return prev.map((line) =>
            line.key === key ? { ...line, quantity: line.quantity + quantity } : line
          );
        }
        return [
          ...prev,
          {
            key,
            productId: product.id,
            slug: product.slug,
            name: product.name,
            image: product.images[0],
            price: product.price,
            color,
            size,
            quantity,
          },
        ];
      });
      setCartOpen(true);
    },
    []
  );

  const removeFromCart = useCallback((key: string) => {
    setCart((prev) => prev.filter((line) => line.key !== key));
  }, []);

  const updateQuantity = useCallback((key: string, quantity: number) => {
    setCart((prev) =>
      prev
        .map((line) => (line.key === key ? { ...line, quantity } : line))
        .filter((line) => line.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  }, []);

  const isWishlisted = useCallback((productId: string) => wishlist.includes(productId), [wishlist]);

  const cartCount = useMemo(() => cart.reduce((sum, line) => sum + line.quantity, 0), [cart]);
  const subtotal = useMemo(() => cart.reduce((sum, line) => sum + line.price * line.quantity, 0), [cart]);

  const value: StoreState = {
    cart,
    wishlist,
    isCartOpen,
    isSearchOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleWishlist,
    isWishlisted,
    openCart: () => setCartOpen(true),
    closeCart: () => setCartOpen(false),
    openSearch: () => setSearchOpen(true),
    closeSearch: () => setSearchOpen(false),
    cartCount,
    subtotal,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within a StoreProvider");
  return ctx;
}
