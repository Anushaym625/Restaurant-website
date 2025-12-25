"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface BestDeliveredItem {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    reverse?: boolean; // Layout layout preference
}

interface BestDeliveredContextType {
    items: BestDeliveredItem[];
    addItem: (item: Omit<BestDeliveredItem, 'id'>) => void;
    updateItem: (id: string, item: Partial<BestDeliveredItem>) => void;
    removeItem: (id: string) => void;
}

const DEFAULT_ITEMS: BestDeliveredItem[] = [
    {
        id: "101",
        name: "Special Masala Dosa",
        description: "Crispy golden crepe filled with spiced potato mash, served with coconut chutney and sambar.",
        price: 120,
        image: "/masala-dosa.png",
        reverse: false
    },
    {
        id: "102",
        name: "Idli Vada Combo",
        description: "Steamed fluffy rice cakes and crispy lentil donuts, the perfect traditional breakfast duo.",
        price: 90,
        image: "/idli-vada.png",
        reverse: true // This one is reversed in layout!
    },
    {
        id: "103",
        name: "Hyderabadi Veg Biryani",
        description: "Aromatic basmati rice cooked with fresh vegetables and exotic spices in traditional dum style.",
        price: 240,
        image: "/veg-biryani.jpg",
        reverse: false
    }
];

const BestDeliveredContext = createContext<BestDeliveredContextType | undefined>(undefined);

export function BestDeliveredProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<BestDeliveredItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("vrindhana_best_delivered");
        if (saved) {
            try {
                setItems(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse best delivered items", e);
                setItems(DEFAULT_ITEMS);
            }
        } else {
            setItems(DEFAULT_ITEMS);
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("vrindhana_best_delivered", JSON.stringify(items));
        }
    }, [items, isLoaded]);

    const addItem = (item: Omit<BestDeliveredItem, 'id'>) => {
        const newItem = { ...item, id: Date.now().toString() };
        setItems(prev => [...prev, newItem]);
    };

    const updateItem = (id: string, updatedItem: Partial<BestDeliveredItem>) => {
        setItems(prev => prev.map(item =>
            item.id === id ? { ...item, ...updatedItem } : item
        ));
    };

    const removeItem = (id: string) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    return (
        <BestDeliveredContext.Provider value={{ items, addItem, updateItem, removeItem }}>
            {children}
        </BestDeliveredContext.Provider>
    );
}

export function useBestDelivered() {
    const context = useContext(BestDeliveredContext);
    if (context === undefined) {
        throw new Error("useBestDelivered must be used within a BestDeliveredProvider");
    }
    return context;
}
