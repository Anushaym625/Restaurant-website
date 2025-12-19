"use client";

import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { RestaurantProvider } from "@/context/RestaurantContext";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <RestaurantProvider>
                <CartProvider>
                    {children}
                </CartProvider>
            </RestaurantProvider>
        </AuthProvider>
    );
}
