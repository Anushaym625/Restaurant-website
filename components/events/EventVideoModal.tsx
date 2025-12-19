"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";

interface EventVideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    videoUrl: string;
    title: string;
}

export function EventVideoModal({ isOpen, onClose, videoUrl, title }: EventVideoModalProps) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="w-full max-w-4xl relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-10 bg-gradient-to-b from-black/80 to-transparent">
                        <h3 className="text-lg font-bold text-white drop-shadow-md flex items-center gap-2">
                            <Play size={16} className="fill-primary text-primary" />
                            {title}
                        </h3>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full bg-black/50 hover:bg-white/20 text-white transition-colors backdrop-blur-sm"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Video Player */}
                    <video
                        src={videoUrl}
                        controls
                        autoPlay
                        className="w-full h-full object-contain"
                    >
                        Your browser does not support the video tag.
                    </video>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
