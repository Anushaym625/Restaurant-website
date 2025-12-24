"use client";

import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { RestaurantProvider } from "@/context/RestaurantContext";
import { EventsProvider } from "@/context/EventsContext";
import { SpecialProvider } from "@/context/SpecialContext";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <RestaurantProvider>
                <EventsProvider>
                    <SpecialProvider>
                        <CartProvider>
                            {children}
                        </CartProvider>
                    </SpecialProvider>
                </EventsProvider>
            </RestaurantProvider>
        </AuthProvider>
    );
}
