"use client";

import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { RestaurantProvider } from "@/context/RestaurantContext";
import { EventsProvider } from "@/context/EventsContext";
import { SpecialProvider } from "@/context/SpecialContext";
import { BestDeliveredProvider } from "@/context/BestDeliveredContext";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <RestaurantProvider>
                <EventsProvider>
                    <BestDeliveredProvider>
                        <SpecialProvider>
                            <CartProvider>
                                {children}
                            </CartProvider>
                        </SpecialProvider>
                    </BestDeliveredProvider>
                </EventsProvider>
            </RestaurantProvider>
        </AuthProvider>
    );
}
