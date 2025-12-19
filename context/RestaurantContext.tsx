"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface RestaurantSettings {
    name: string;
    email: string;
    phone: string;
    address: string;
    openingTime: string;
    closingTime: string;
    weeklyHoliday: string;
}

interface RestaurantContextType {
    settings: RestaurantSettings;
    updateSettings: (newSettings: Partial<RestaurantSettings>) => void;
}

const DEFAULT_SETTINGS: RestaurantSettings = {
    name: "Vrindhana Restaurant",
    email: "contact@vrindhana.com",
    phone: "+91 98765 43210",
    address: "123, Food Street, Gourmet City, India",
    openingTime: "09:00",
    closingTime: "23:00",
    weeklyHoliday: "None",
};

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export function RestaurantProvider({ children }: { children: React.ReactNode }) {
    const [settings, setSettings] = useState<RestaurantSettings>(DEFAULT_SETTINGS);

    // Load from local storage on mount
    useEffect(() => {
        const savedSettings = localStorage.getItem("restaurantSettings");
        if (savedSettings) {
            try {
                setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(savedSettings) });
            } catch (error) {
                console.error("Failed to parse restaurant settings", error);
            }
        }
    }, []);

    const updateSettings = (newSettings: Partial<RestaurantSettings>) => {
        setSettings((prev) => {
            const updated = { ...prev, ...newSettings };
            localStorage.setItem("restaurantSettings", JSON.stringify(updated));
            return updated;
        });
    };

    return (
        <RestaurantContext.Provider value={{ settings, updateSettings }}>
            {children}
        </RestaurantContext.Provider>
    );
}

export function useRestaurant() {
    const context = useContext(RestaurantContext);
    if (!context) {
        throw new Error("useRestaurant must be used within a RestaurantProvider");
    }
    return context;
}
