"use client";

import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { RestaurantProvider } from "@/context/RestaurantContext";
import { EventsProvider } from "@/context/EventsContext";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <RestaurantProvider>
                <EventsProvider>
                    <CartProvider>
                        {children}
                    </CartProvider>
                </EventsProvider>
            </RestaurantProvider>
        </AuthProvider>
    );
}
