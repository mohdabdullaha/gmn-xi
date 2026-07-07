"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { useContactForm } from "@/hooks/useContactForm";
import { content } from "@/data/content";

const ContactForm = () => {
    const { formData, status, handleChange, submit } = useContactForm();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white border border-ice-border rounded-3xl p-8 md:p-10 shadow-xl relative"
        >
            <div className="text-left mb-8 relative z-10">
                <h2 className="text-xl font-bold text-navy mb-2 tracking-tight">
                    {content.contact.form.title}
                </h2>
                <p className="text-xs text-gray-400 font-serif italic">
                    {content.contact.form.subtitle}
                </p>
            </div>

            <form onSubmit={submit} className="space-y-4 relative z-10">
                <div className="text-left">
                    <label className="block text-[11px] font-semibold text-black mb-1 tracking-wide uppercase">
                        Full Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Abdullah Asif"
                        className="w-full bg-ice border-none rounded-xl p-4 text-navy placeholder:text-navy/20 focus:ring-2 focus:ring-gold/30 transition-all outline-none"
                        required
                    />
                </div>

                <div className="text-left">
                    <label className="block text-[11px] font-semibold text-black mb-1 tracking-wide uppercase">
                        Email Address
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="2313xxxx@gift.edu.pk"
                        className="w-full bg-ice border-none rounded-xl p-4 text-navy placeholder:text-navy/20 focus:ring-2 focus:ring-gold/30 transition-all outline-none"
                        required
                    />
                </div>

                <div className="text-left">
                    <label className="block text-[11px] font-semibold text-black mb-1 tracking-wide uppercase">
                        Message Description
                    </label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Enter your message..."
                        className="w-full bg-ice border-none rounded-xl p-4 text-navy placeholder:text-navy/20 h-32 focus:ring-2 focus:ring-gold/30 transition-all outline-none"
                        required
                    />
                </div>

                {status.error && (
                    <p className="text-red-500 text-xs font-semibold text-center">{status.error}</p>
                )}

                {status.success ? (
                    <div className="flex flex-col items-center justify-center p-6 bg-green text-white rounded-xl shadow-lg animate-bounce">
                        <CheckCircle2 size={32} className="mb-2" />
                        <p className="font-bold tracking-widest text-sm">MESSAGE SENT SUCCESSFULLY!</p>
                    </div>
                ) : (
                    <button 
                        type="submit"
                        disabled={status.loading}
                        className="w-full bg-navy hover:bg-navy-dark text-white font-bold py-4 rounded-xl shadow-lg shadow-navy/20 transition-all active:scale-[0.98] tracking-widest flex items-center justify-center gap-3 disabled:opacity-70"
                    >
                        {status.loading ? <Loader2 className="animate-spin" size={20} /> : null}
                        {status.loading ? 'SENDING...' : 'SEND MESSAGE'}
                    </button>
                )}
            </form>
        </motion.div>
    );
};

export default ContactForm;
