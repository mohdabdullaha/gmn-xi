"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PremiumHero from "@/components/PremiumHero";
import { motion } from 'framer-motion';
import SectionHeading from "@/components/SectionHeading";

import { ArrowRight, ChevronRight } from 'lucide-react';

const heroImg = '/img.jpg';

const spiritualData = [
    {
        id: 'tawakkul',
        arabic: 'توكل',
        title: 'Tawakkul / Faith in Allah',
        sub: "Relying on God's will.",
        subtopics: [],
        desc: "Relying on God's will. Trusting completely in Allah's plan and wisdom.",
        path: '/spiritual-virtues',
        color: 'from-teal-600 to-emerald-700',
        accent: '#10b981',
    },
    {
        id: 'ikhlas',
        arabic: 'إخلاص',
        title: 'Ikhlas / Sincerity',
        sub: 'Purity of intention',
        subtopics: [],
        desc: 'Purity of intention in actions, directed toward Allah. Doing good deeds solely for the pleasure of the Divine.',
        path: '/spiritual-virtues',
        color: 'from-blue-600 to-indigo-700',
        accent: '#3b82f6',
    },
    {
        id: 'shukr',
        arabic: 'شكر',
        title: 'Shukr / Gratitude',
        sub: 'Thankfulness to God',
        subtopics: [],
        desc: 'Thankfulness to God, recognized as essential for spiritual health. Appreciating all blessings big and small.',
        path: '/spiritual-virtues',
        color: 'from-pink-600 to-rose-700',
        accent: '#f43f5e',
    },
    {
        id: 'tawadu',
        arabic: 'تواضع',
        title: 'Tawadu / Humility',
        sub: 'Modesty and absence of arrogance',
        subtopics: [],
        desc: 'Modesty and absence of arrogance. Recognizing one\'s place and treating others with respect and dignity.',
        path: '/spiritual-virtues',
        color: 'from-amber-600 to-orange-700',
        accent: '#f59e0b',
    },
    {
        id: 'sabr',
        arabic: 'صبر',
        title: 'Sabr / Patience',
        sub: 'Steadfastness in faith',
        subtopics: [],
        desc: 'Steadfastness in faith and endurance during trials. Maintaining composure and faith during difficult times.',
        path: '/spiritual-virtues',
        color: 'from-purple-600 to-violet-700',
        accent: '#8b5cf6',
    },
    {
        id: 'karam',
        arabic: 'كرم',
        title: 'Karam / Generosity & Charity',
        sub: 'Giving from what one loves',
        subtopics: [],
        desc: 'Giving from what one loves. Willingly sharing wealth, time, and knowledge with those in need.',
        path: '/spiritual-virtues',
        color: 'from-cyan-600 to-sky-700',
        accent: '#0ea5e9',
    },
];

/* ── Spiritual Virtue Card ── */
interface VirtueCardProps { v: (typeof spiritualData)[0]; index: number; }
const VirtueCard = ({ v, index }: VirtueCardProps) => {


    return (
        <motion.div
            custom={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
            className="relative"
        >
            <div className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:-translate-y-2 h-full flex flex-col cursor-default">
                {/* Top gradient banner */}
                <div className={`bg-gradient-to-br ${v.color} p-6 relative overflow-hidden shrink-0`}>
                    <div className="absolute -right-4 -top-4 text-white/10 text-8xl font-black select-none">
                        {v.arabic}
                    </div>
                    <p className="text-white/70 text-xs font-bold tracking-[0.2em] uppercase mb-1">Spiritual Virtue</p>
                    <h3 className="text-white text-xl font-bold leading-tight font-arabic">{v.title}</h3>
                    <p className="text-white/80 text-sm mt-1 font-medium">{v.sub}</p>
                </div>

                {/* Body */}
                <div className="p-5 flex-grow flex flex-col justify-between">
                    <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
            </div>
        </motion.div>
    );
};

const SpiritualVirtues = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar pageTitle="Spiritual Virtues" />

            <main className="flex-grow">
                <PremiumHero 
                    image={heroImg}
                    title={
                        <>
                            <span className="block drop-shadow-2xl">The Six Essential Spiritual Virtues</span>
                        </>
                    }
                    intro="Matters related to Heart"
                />

                {/* ── Intro ── */}
                <section className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.6 }}
                    >
                        <SectionHeading>Greetings from <span className="text-green">GIFT Moral Nexus</span></SectionHeading>
                        <p className="text-gray-800 text-xl font-medium leading-relaxed mt-8">
                            These virtues are designed to produce a balanced soul and a harmonious society, acting as indispensable components of faith in Allah.
                        </p>
                        <p className="text-gray-600 text-lg leading-relaxed mt-4">
                            These virtues are believed to be bestowed by the grace and blessings of Allah Almighty through constant prayer and purification of soul.
                        </p>
                        <p className="text-gold font-bold text-lg mt-8 uppercase tracking-widest text-sm">
                            A brief introduction to these spiritual virtues is presented below:
                        </p>
                    </motion.div>
                </section>

                {/* ── Spiritual Virtues Cards ── */}
                <section className="max-w-7xl mx-auto px-6 pb-20">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {spiritualData.map((v, i) => (
                            <VirtueCard key={v.id} v={v} index={i} />
                        ))}
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
};

export default SpiritualVirtues;
