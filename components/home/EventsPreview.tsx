"use client";

import { Calendar, Clock, MapPin } from "lucide-react";
import Link from "next/link";

export function EventsPreview() {
    return (
        <section className="py-20 relative overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Don't Miss Out</h2>
                    <h3 className="text-4xl font-bold text-white mb-4">Upcoming Events</h3>
                    <p className="text-white/60 max-w-2xl mx-auto">
                        Join us for special evenings featuring live music, guest chefs, and exclusive tasting menus.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <EventCard
                        title="Jazz & Wine Night"
                        date="Dec 24, 2025"
                        time="07:00 PM"
                        description="Enjoy smooth jazz melodies while sipping on our finest selection of vintage wines."
                        image="https://images.unsplash.com/photo-1514362545857-3bc16549766b?q=80&w=2670&auto=format&fit=crop"
                    />
                    <EventCard
                        title="Chef's Special Tasting"
                        date="Dec 31, 2025"
                        time="08:00 PM"
                        description="A 7-course journey through the flavors of the world, curated by Chef Antonio."
                        image="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2574&auto=format&fit=crop"
                    />
                </div>

                <div className="text-center mt-12">
                    <Link href="/events" className="inline-block px-8 py-3 border border-white/20 text-white rounded-full hover:bg-white/10 transition-colors">
                        View All Events
                    </Link>
                </div>
            </div>
        </section>
    );
}

interface EventCardProps {
    title: string;
    date: string;
    time: string;
    description: string;
    image: string;
}

function EventCard({ title, date, time, description, image }: EventCardProps) {
    return (
        <div className="glass-card group flex flex-col md:flex-row gap-6 items-center md:items-stretch overflow-hidden">
            <div className="w-full md:w-1/3 h-48 md:h-auto relative rounded-xl overflow-hidden shrink-0">
                <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-2 left-2 px-3 py-1 bg-primary text-white text-xs font-bold rounded-md">
                    Upcoming
                </div>
            </div>

            <div className="flex-1 flex flex-col justify-center">
                <h4 className="text-2xl font-bold text-white mb-2">{title}</h4>
                <div className="flex flex-wrap gap-4 text-sm text-white/60 mb-4">
                    <span className="flex items-center gap-1"><Calendar size={14} className="text-primary" /> {date}</span>
                    <span className="flex items-center gap-1"><Clock size={14} className="text-primary" /> {time}</span>
                </div>
                <p className="text-white/70 text-sm mb-6 line-clamp-2">{description}</p>

                <Link href="/events" className="self-start text-sm font-bold text-primary hover:text-white transition-colors flex items-center gap-2">
                    Book This Event <span className="text-lg">→</span>
                </Link>
            </div>
        </div>
    )
}
