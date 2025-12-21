"use client";

import { useState } from "react";
import { Calendar, Clock, MapPin, Ticket, Play } from "lucide-react";
import { EventBookingModal } from "@/components/events/EventBookingModal";
import { EventVideoModal } from "@/components/events/EventVideoModal";
import { useEvents } from "@/context/EventsContext";

export default function EventsPage() {
    const { events: EVENTS, memories: MEMORIES } = useEvents(); // Alias to matching existing variable names for minimal refactor
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const [playingVideo, setPlayingVideo] = useState<{ title: string; videoUrl: string } | null>(null);

    return (
        <div className="min-h-screen pb-20">
            <div className="bg-dark-800 py-16 border-b border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 blur-[100px]" />
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Upcoming <span className="text-primary">Events</span></h1>
                    <p className="text-white/60 max-w-2xl mx-auto">
                        Discover our curated experiences designed to bring people together through food, music, and culture.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 pt-12 mb-20">
                <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
                    {EVENTS.map((event) => (
                        <div key={event.id} className="glass-card flex flex-col md:flex-row overflow-hidden group hover:border-primary/30 transition-colors">
                            <div className="w-full md:w-2/5 h-64 md:h-auto relative overflow-hidden group/image">
                                <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            </div>
                            <div className="flex-1 p-8 flex flex-col justify-center">
                                <div className="flex items-center gap-4 text-sm font-semibold text-primary mb-3">
                                    <span className="flex items-center gap-1"><Calendar size={16} /> {event.date}</span>
                                    <span className="flex items-center gap-1"><Clock size={16} /> {event.time}</span>
                                </div>
                                <h3 className="text-3xl font-bold mb-4 text-white group-hover:text-primary transition-colors">{event.title}</h3>
                                <p className="text-white/60 mb-6 leading-relaxed">{event.description}</p>

                                <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/10">
                                    <div className="text-xl font-bold text-white">Free Entry</div>
                                    <button
                                        onClick={() => setSelectedEvent(event)}
                                        className="px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover shadow-lg shadow-primary/20 flex items-center gap-2 transform hover:translate-y-px transition-all"
                                    >
                                        <Ticket size={18} /> Book Table
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Best Event Memories Section */}
            <div className="container mx-auto px-6 py-16 border-t border-white/5">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Best Event <span className="text-primary">Memories</span></h2>
                    <p className="text-white/60">Relive the magic of our past celebrations and gatherings.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {MEMORIES.map((memory) => (
                        <div
                            key={memory.id}
                            className="group glass-card p-0 overflow-hidden relative aspect-[9/16] md:aspect-video lg:aspect-[3/4]"
                        >
                            <video
                                src={memory.videoUrl}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                            />

                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                                <h3 className="font-bold text-lg text-white group-hover:text-primary transition-colors">{memory.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Booking Modal */}
            <EventBookingModal
                isOpen={!!selectedEvent}
                onClose={() => setSelectedEvent(null)}
                eventTitle={selectedEvent?.title || ""}
            />

            {/* Video Modal */}
            <EventVideoModal
                isOpen={!!playingVideo}
                onClose={() => setPlayingVideo(null)}
                videoUrl={playingVideo?.videoUrl || ""}
                title={playingVideo?.title || ""}
            />
        </div>
    );
}
