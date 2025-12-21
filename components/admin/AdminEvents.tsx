
"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Calendar, Clock, MapPin, Video, Image as ImageIcon, X, Pencil } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEvents, Event } from "@/context/EventsContext";

export function AdminEvents() {
    const { events, memories, addEvent, updateEvent, deleteEvent, addMemory, deleteMemory } = useEvents();
    const [activeTab, setActiveTab] = useState<"events" | "memories">("events");
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    const [isMemoryModalOpen, setIsMemoryModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);

    const handleEditEvent = (event: Event) => {
        setEditingEvent(event);
        setIsEventModalOpen(true);
    };

    const handleCloseEventModal = () => {
        setIsEventModalOpen(false);
        setEditingEvent(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                    Event Management
                </h2>
                <div className="flex gap-4">
                    <button
                        onClick={() => setActiveTab("events")}
                        className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all border ${activeTab === "events"
                            ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                            : "bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10"
                            }`}
                    >
                        Upcoming Events
                    </button>
                    <button
                        onClick={() => setActiveTab("memories")}
                        className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all border ${activeTab === "memories"
                            ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                            : "bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10"
                            }`}
                    >
                        Event Memories
                    </button>
                </div>
            </div>

            {activeTab === "events" ? (
                <div className="space-y-6">
                    <button
                        onClick={() => setIsEventModalOpen(true)}
                        className="w-full py-4 border-2 border-dashed border-white/20 rounded-xl flex items-center justify-center gap-2 text-white/40 hover:text-white hover:border-primary/50 hover:bg-white/5 transition-all group"
                    >
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                            <Plus size={20} />
                        </div>
                        <span className="font-semibold">Add New Event</span>
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {events.map((event) => (
                            <div key={event.id} className="glass-card p-0 overflow-hidden group relative">
                                <div className="h-48 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent z-10" />
                                    <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => handleEditEvent(event)}
                                            className="w-8 h-8 bg-black/50 hover:bg-primary text-white rounded-lg flex items-center justify-center backdrop-blur-sm transition-colors"
                                        >
                                            <Pencil size={14} />
                                        </button>
                                        <button
                                            onClick={() => deleteEvent(event.id)}
                                            className="w-8 h-8 bg-red-500/80 hover:bg-red-500 text-white rounded-lg flex items-center justify-center backdrop-blur-sm transition-colors"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex gap-4 text-xs font-semibold text-primary mb-2">
                                        <span className="flex items-center gap-1"><Calendar size={14} /> {event.date}</span>
                                        <span className="flex items-center gap-1"><Clock size={14} /> {event.time}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                                    <p className="text-white/60 text-sm line-clamp-2 mb-4">{event.description}</p>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-white font-bold">Price: ₹{event.price}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    <button
                        onClick={() => setIsMemoryModalOpen(true)}
                        className="w-full py-4 border-2 border-dashed border-white/20 rounded-xl flex items-center justify-center gap-2 text-white/40 hover:text-white hover:border-primary/50 hover:bg-white/5 transition-all group"
                    >
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                            <Plus size={20} />
                        </div>
                        <span className="font-semibold">Add New Memory (Video/Reel)</span>
                    </button>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {memories.map((memory) => (
                            <div key={memory.id} className="glass-card p-0 overflow-hidden group relative aspect-[9/16]">
                                <video
                                    src={memory.videoUrl}
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent pointer-events-none" />

                                <div className="absolute bottom-0 left-0 right-0 p-3">
                                    <h3 className="text-white text-xs font-bold truncate leading-tight">{memory.title}</h3>
                                </div>

                                <button
                                    onClick={() => deleteMemory(memory.id)}
                                    className="absolute top-2 right-2 w-6 h-6 bg-red-500/80 hover:bg-red-500 text-white rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm shadow-sm"
                                >
                                    <Trash2 size={12} />
                                </button>

                                <div className="absolute top-2 left-2 w-6 h-6 bg-black/50 backdrop-blur-sm rounded flex items-center justify-center text-white/80">
                                    <Video size={12} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <AddEventModal
                isOpen={isEventModalOpen}
                onClose={handleCloseEventModal}
                onAdd={addEvent}
                onUpdate={updateEvent}
                initialData={editingEvent}
            />
            <AddMemoryModal isOpen={isMemoryModalOpen} onClose={() => setIsMemoryModalOpen(false)} onAdd={addMemory} />
        </div>
    );
}

function AddEventModal({
    isOpen,
    onClose,
    onAdd,
    onUpdate,
    initialData
}: {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (e: any) => void;
    onUpdate: (id: number, e: any) => void;
    initialData: Event | null;
}) {
    const [formData, setFormData] = useState({
        title: "",
        date: "",
        time: "",
        description: "",
        image: "",
        price: 0
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title,
                date: initialData.date,
                time: initialData.time,
                description: initialData.description,
                image: initialData.image,
                price: initialData.price
            });
        } else {
            setFormData({ title: "", date: "", time: "", description: "", image: "", price: 0 });
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (initialData) {
            onUpdate(initialData.id, formData);
        } else {
            onAdd(formData);
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card w-full max-w-lg p-6 relative bg-dark-900 border border-white/10"
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white">
                    <X size={20} />
                </button>
                <h3 className="text-2xl font-bold text-white mb-6">{initialData ? "Edit Event" : "Add New Event"}</h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-white/60 uppercase mb-1">Event Title</label>
                        <input
                            required
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                            placeholder="e.g. Jazz Night"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-white/60 uppercase mb-1">Date</label>
                            <input
                                required
                                type="text"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                                placeholder="e.g. Dec 24, 2025"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-white/60 uppercase mb-1">Time</label>
                            <input
                                required
                                type="text"
                                value={formData.time}
                                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                                placeholder="e.g. 07:00 PM"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-white/60 uppercase mb-1">Description</label>
                        <textarea
                            required
                            rows={3}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                            placeholder="Event details..."
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-white/60 uppercase mb-1">Image URL</label>
                        <input
                            required
                            type="text"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                            placeholder="https://..."
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-white/60 uppercase mb-1">Price (₹)</label>
                        <input
                            required
                            type="number"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                        />
                    </div>

                    <button type="submit" className="w-full py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20 mt-4">
                        {initialData ? "Update Event" : "Create Event"}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}

function AddMemoryModal({ isOpen, onClose, onAdd }: { isOpen: boolean; onClose: () => void; onAdd: (e: any) => void }) {
    const [formData, setFormData] = useState({
        title: "",
        thumbnail: "https://images.unsplash.com/photo-1514362545857-3bc16549766b", // Default placeholder
        videoUrl: ""
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAdd(formData);
        onClose();
        setFormData({ title: "", thumbnail: "https://images.unsplash.com/photo-1514362545857-3bc16549766b", videoUrl: "" });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card w-full max-w-lg p-6 relative bg-dark-900 border border-white/10"
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white">
                    <X size={20} />
                </button>
                <h3 className="text-2xl font-bold text-white mb-6">Add New Memory</h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-white/60 uppercase mb-1">Title</label>
                        <input
                            required
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                            placeholder="e.g. New Year's Eve"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-white/60 uppercase mb-1">Video URL (MP4)</label>
                        <input
                            required
                            type="text"
                            value={formData.videoUrl}
                            onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                            placeholder="https://...mp4"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-white/60 uppercase mb-1">Thumbnail URL</label>
                        <input
                            type="text"
                            value={formData.thumbnail}
                            onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                            placeholder="Optional"
                        />
                    </div>

                    <button type="submit" className="w-full py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20 mt-4">
                        Add Memory
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
