"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    qty: number;
    image: string;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (item: Omit<CartItem, 'qty'>) => void;
    removeFromCart: (id: string) => void;
    updateQty: (id: string, qty: number) => void;
    clearCart: () => void;
    total: number;
    itemCount: number;
}

import { useAuth } from './AuthContext';
import { useRef } from 'react';

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const { isAuthenticated } = useAuth();
    const prevAuthRef = useRef(isAuthenticated);

    // Calculate total
    const total = items.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const itemCount = items.reduce((sum, item) => sum + item.qty, 0);

    // Watch for logout (Authenticated -> Unauthenticated)
    useEffect(() => {
        if (prevAuthRef.current && !isAuthenticated) {
            setItems([]); // Clear cart on logout
        }
        prevAuthRef.current = isAuthenticated;
    }, [isAuthenticated]);

    const addToCart = (newItem: Omit<CartItem, 'qty'>) => {
        setItems(current => {
            const existing = current.find(item => item.id === newItem.id);
            if (existing) {
                return current.map(item =>
                    item.id === newItem.id ? { ...item, qty: item.qty + 1 } : item
                );
            }
            return [...current, { ...newItem, qty: 1 }];
        });
    };

    const removeFromCart = (id: string) => {
        setItems(current => current.filter(item => item.id !== id));
    };

    const updateQty = (id: string, qty: number) => {
        if (qty < 1) {
            removeFromCart(id);
            return;
        }
        setItems(current =>
            current.map(item => item.id === id ? { ...item, qty } : item)
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQty, clearCart, total, itemCount }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
