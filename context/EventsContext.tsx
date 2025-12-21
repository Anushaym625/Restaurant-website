"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Event {
    id: number;
    title: string;
    date: string;
    time: string;
    description: string;
    image: string;
    price: number;
}

export interface Memory {
    id: number;
    title: string;
    thumbnail: string;
    videoUrl: string;
}

interface EventsContextType {
    events: Event[];
    memories: Memory[];
    addEvent: (event: Omit<Event, "id">) => void;
    updateEvent: (id: number, event: Partial<Event>) => void;
    deleteEvent: (id: number) => void;
    addMemory: (memory: Omit<Memory, "id">) => void;
    deleteMemory: (id: number) => void;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

const DEFAULT_EVENTS: Event[] = [
    {
        id: 1,
        title: "Jazz & Wine Night",
        date: "Dec 24, 2025",
        time: "07:00 PM",
        description: "Enjoy smooth jazz melodies while sipping on our finest selection of vintage wines. A perfect evening for couples and music lovers.",
        image: "https://images.unsplash.com/photo-1514362545857-3bc16549766b",
        price: 50
    },
    {
        id: 2,
        title: "Chef's Special Tasting",
        date: "Dec 31, 2025",
        time: "08:00 PM",
        description: "A 7-course journey through the flavors of the world, curated by Chef Antonio. Limited seating available for this exclusive experience.",
        image: "https://images.unsplash.com/photo-1559339352-11d035aa65de",
        price: 120
    },
    {
        id: 3,
        title: "Salsa Night",
        date: "Jan 05, 2026",
        time: "09:00 PM",
        description: "Dance the night away with live salsa bands and refreshing cocktails. Beginners workshop starts at 8 PM.",
        image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7",
        price: 30
    }
];

const DEFAULT_MEMORIES: Memory[] = [
    {
        id: 1,
        title: "New Year's Eve 2024",
        thumbnail: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9",
        videoUrl: "https://videos.pexels.com/video-files/3195958/3195958-hd_1920_1080_25fps.mp4"
    },
    {
        id: 2,
        title: "Valentine's Special",
        thumbnail: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205",
        videoUrl: "https://videos.pexels.com/video-files/855564/855564-hd_1920_1080_30fps.mp4"
    },
    {
        id: 3,
        title: "Summer Garden Party",
        thumbnail: "https://images.unsplash.com/photo-1530103862676-de3c9da59af7",
        videoUrl: "https://videos.pexels.com/video-files/6561172/6561172-uhd_2560_1440_25fps.mp4"
    },
    {
        id: 4,
        title: "Live Jazz Night",
        thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
        videoUrl: "https://videos.pexels.com/video-files/3195958/3195958-hd_1920_1080_25fps.mp4"
    }
];

export function EventsProvider({ children }: { children: React.ReactNode }) {
    const [events, setEvents] = useState<Event[]>([]);
    const [memories, setMemories] = useState<Memory[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        const savedEvents = localStorage.getItem("vrindhana_events");
        const savedMemories = localStorage.getItem("vrindhana_memories");

        if (savedEvents) {
            setEvents(JSON.parse(savedEvents));
        } else {
            setEvents(DEFAULT_EVENTS);
        }

        if (savedMemories) {
            setMemories(JSON.parse(savedMemories));
        } else {
            setMemories(DEFAULT_MEMORIES);
        }
        setIsLoaded(true);
    }, []);

    // Save to localStorage whenever data changes
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("vrindhana_events", JSON.stringify(events));
        }
    }, [events, isLoaded]);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("vrindhana_memories", JSON.stringify(memories));
        }
    }, [memories, isLoaded]);

    const addEvent = (newEvent: Omit<Event, "id">) => {
        const id = Math.max(0, ...events.map(e => e.id)) + 1;
        setEvents(prev => [...prev, { ...newEvent, id }]);
    };

    const updateEvent = (id: number, updatedEvent: Partial<Event>) => {
        setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updatedEvent } : e));
    };

    const deleteEvent = (id: number) => {
        setEvents(prev => prev.filter(e => e.id !== id));
    };

    const addMemory = (newMemory: Omit<Memory, "id">) => {
        const id = Math.max(0, ...memories.map(m => m.id)) + 1;
        setMemories(prev => [...prev, { ...newMemory, id }]);
    };

    const deleteMemory = (id: number) => {
        setMemories(prev => prev.filter(m => m.id !== id));
    };

    return (
        <EventsContext.Provider value={{ events, memories, addEvent, updateEvent, deleteEvent, addMemory, deleteMemory }}>
            {children}
        </EventsContext.Provider>
    );
}

export function useEvents() {
    const context = useContext(EventsContext);
    if (context === undefined) {
        throw new Error("useEvents must be used within an EventsProvider");
    }
    return context;
}
