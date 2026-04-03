import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ isOpen, onClose, title, children }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
                    {/* Backdrop */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div 
                        initial={{ scale: 0.95, opacity: 0, y: 10 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: -10 }}
                        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl shadow-primary-900/20 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100 bg-gray-50/50">
                            <h2 className="text-2xl font-black text-gray-900 tracking-tight">{title}</h2>
                            <button 
                                onClick={onClose}
                                className="p-2 text-gray-400 hover:text-primary-600 hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-gray-100"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-8 max-h-[70vh] overflow-y-auto">
                            {children}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
