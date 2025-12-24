"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface SpecialItem {
    title: string;
    subtitle: string;
    description: string;
    image: string;
    price: number;
    spicyLevel: number; // 1-3
    serves: number;
}

interface SpecialContextType {
    specialItem: SpecialItem;
    updateSpecial: (item: SpecialItem) => void;
}

const DEFAULT_SPECIAL: SpecialItem = {
    title: "Royal Paneer Tikka Masala",
    subtitle: "Chef's Recommendation",
    description: "Experience the richness of our signature Paneer Tikka Masala. marinated cottage cheese cubes grilled to perfection in a tandoor, then simmered in a luscious, creamy tomato-based gravy infused with authentic Indian spices. Served with buttery garlic naan.",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=2574&auto=format&fit=crop",
    price: 249,
    spicyLevel: 2,
    serves: 2
};

const SpecialContext = createContext<SpecialContextType | undefined>(undefined);

export function SpecialProvider({ children }: { children: React.ReactNode }) {
    const [specialItem, setSpecialItem] = useState<SpecialItem>(DEFAULT_SPECIAL);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("vrindhana_special");
        if (saved) {
            setSpecialItem(JSON.parse(saved));
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("vrindhana_special", JSON.stringify(specialItem));
        }
    }, [specialItem, isLoaded]);

    const updateSpecial = (item: SpecialItem) => {
        setSpecialItem(item);
    };

    return (
        <SpecialContext.Provider value={{ specialItem, updateSpecial }}>
            {children}
        </SpecialContext.Provider>
    );
}

export function useSpecial() {
    const context = useContext(SpecialContext);
    if (context === undefined) {
        throw new Error("useSpecial must be used within a SpecialProvider");
    }
    return context;
}
