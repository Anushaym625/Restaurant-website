"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TabsProps {
    categories: string[];
    activeCategory: string;
    onSelect: (category: string) => void;
}

export function MenuTabs({ categories, activeCategory, onSelect }: TabsProps) {
    return (
        <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onSelect(category)}
                    className={cn(
                        "relative px-6 py-2 rounded-full text-sm font-semibold transition-colors",
                        activeCategory === category
                            ? "text-white"
                            : "text-white/60 hover:text-white hover:bg-white/5"
                    )}
                >
                    {activeCategory === category && (
                        <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 bg-primary rounded-full -z-10"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    {category}
                </button>
            ))}
        </div>
    );
}
