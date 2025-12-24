"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface SpecialItem {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    price: number;
    spicyLevel: number; // 1-3
    serves: number;
}

interface SpecialContextType {
    specialItems: SpecialItem[];
    addSpecial: (item: Omit<SpecialItem, 'id'>) => void;
    updateSpecial: (id: string, item: Partial<SpecialItem>) => void;
    removeSpecial: (id: string) => void;
}

const DEFAULT_SPECIALS: SpecialItem[] = [
    {
        id: "default-1",
        title: "Royal Paneer Tikka Masala",
        subtitle: "Chef's Recommendation",
        description: "Experience the richness of our signature Paneer Tikka Masala. marinated cottage cheese cubes grilled to perfection in a tandoor, then simmered in a luscious, creamy tomato-based gravy infused with authentic Indian spices. Served with buttery garlic naan.",
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=2574&auto=format&fit=crop",
        price: 249,
        spicyLevel: 2,
        serves: 2
    }
];

const SpecialContext = createContext<SpecialContextType | undefined>(undefined);

export function SpecialProvider({ children }: { children: React.ReactNode }) {
    const [specialItems, setSpecialItems] = useState<SpecialItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("vrindhana_specials");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Handle potential migration from single object to array if needed, 
                // but since we controlled the prev version, we can just check if it's an array.
                if (Array.isArray(parsed)) {
                    setSpecialItems(parsed);
                } else if (parsed && typeof parsed === 'object') {
                    // Migrate single item to array
                    setSpecialItems([{ ...parsed, id: 'legacy-1' }]);
                } else {
                    setSpecialItems(DEFAULT_SPECIALS);
                }
            } catch (e) {
                console.error("Failed to parse special items", e);
                setSpecialItems(DEFAULT_SPECIALS);
            }
        } else {
            setSpecialItems(DEFAULT_SPECIALS);
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("vrindhana_specials", JSON.stringify(specialItems));
        }
    }, [specialItems, isLoaded]);

    const addSpecial = (item: Omit<SpecialItem, 'id'>) => {
        const newItem = { ...item, id: Date.now().toString() };
        setSpecialItems(prev => [...prev, newItem]);
    };

    const updateSpecial = (id: string, updatedItem: Partial<SpecialItem>) => {
        setSpecialItems(prev => prev.map(item =>
            item.id === id ? { ...item, ...updatedItem } : item
        ));
    };

    const removeSpecial = (id: string) => {
        setSpecialItems(prev => prev.filter(item => item.id !== id));
    };

    return (
        <SpecialContext.Provider value={{ specialItems, addSpecial, updateSpecial, removeSpecial }}>
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
