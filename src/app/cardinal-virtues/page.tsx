"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PremiumHero from "@/components/PremiumHero";
import { motion } from 'framer-motion';
import SectionHeading from "@/components/SectionHeading";

import { ArrowRight, ChevronRight } from 'lucide-react';

const heroImg = '/img.jpg';

const cardinalData = [
    {
        id: 'wisdom',
        arabic: 'حكمة',
        title: 'Hikmah / Knowledge & Wisdom',
        sub: 'Love for Learning, Curiosity & Creativity',
        subtopics: [
            { label: 'Love for Learning', path: '/cardinal-virtues/wisdom/love-for-learning' },
            { label: 'Curiosity', path: '/cardinal-virtues/wisdom/curiosity' },
            { label: 'Creativity', path: '/cardinal-virtues/wisdom/creativity' },
        ],
        desc: 'The ability to govern and discipline oneself by reason, discerning the true good in every circumstance and choosing the right means to achieve it.',
        path: '/cardinal-virtues/wisdom',
        color: 'from-emerald-600 to-teal-700',
        accent: '#10b981',
    },
    {
        id: 'justice',
        arabic: 'عدل',
        title: 'Adl / Justice',
        sub: 'Fairness, Team Work & Leadership',
        subtopics: [
            { label: 'Fairness', path: '/cardinal-virtues/justice/fairness' },
            { label: 'Team Work', path: '/cardinal-virtues/justice/team-work' },
            { label: 'Leadership', path: '/cardinal-virtues/justice/leadership' },
        ],
        desc: 'The constant and permanent determination to ensure fairness to oneself and others.',
        path: '/cardinal-virtues/justice',
        color: 'from-blue-600 to-indigo-700',
        accent: '#3b82f6',
    },
    {
        id: 'courage',
        arabic: 'شجاعة',
        title: 'Shujah / Courage',
        sub: 'Truthfulness, Honesty & Perseverance',
        subtopics: [
            { label: 'Truthfulness', path: '/cardinal-virtues/courage/truthfulness' },
            { label: 'Honesty', path: '/cardinal-virtues/courage/honesty' },
            { label: 'Perseverance', path: '/cardinal-virtues/courage/perseverance' },
        ],
        desc: 'The ability to conquer fear, endure trials, and remain steadfast in moral choices.',
        path: '/cardinal-virtues/courage',
        color: 'from-amber-600 to-orange-700',
        accent: '#f59e0b',
    },
    {
        id: 'temperance',
        arabic: 'عفة',
        title: 'Iffah / Temperance',
        sub: 'Self-Regulation, Modesty & Chastity',
        subtopics: [
            { label: 'Self-Regulation', path: '/cardinal-virtues/temperance/self-regulation' },
            { label: 'Modesty', path: '/cardinal-virtues/temperance/modesty' },
            { label: 'Chastity', path: '/cardinal-virtues/temperance/chastity' },
        ],
        desc: 'The moderation of desires and attraction for pleasures, ensuring self-mastery.',
        path: '/cardinal-virtues/temperance',
        color: 'from-purple-600 to-violet-700',
        accent: '#8b5cf6',
    },
];



/* ── Cardinal Virtue Card ── */
interface VirtueCardProps { v: (typeof cardinalData)[0]; index: number; }
const VirtueCard = ({ v, index }: VirtueCardProps) => {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            custom={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
            className="relative"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <Link
                href={v.path}
                className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:-translate-y-2"
            >
                {/* Top gradient banner */}
                <div className={`bg-gradient-to-br ${v.color} p-6 relative overflow-hidden`}>
                    <div className="absolute -right-4 -top-4 text-white/10 text-8xl font-black select-none">
                        {v.arabic}
                    </div>
                    <p className="text-white/70 text-xs font-bold tracking-[0.2em] uppercase mb-1">Cardinal Virtue</p>
                    <h3 className="text-white text-xl font-bold leading-tight font-arabic">{v.title}</h3>
                    <p className="text-white/80 text-sm mt-1 font-medium">{v.sub}</p>
                </div>

                {/* Body */}
                <div className="p-5">
                    <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>

                    {/* Subtopics shown on hover */}
                    <div className={`mt-4 space-y-1 overflow-hidden transition-all duration-300 ${hovered ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Sub-virtues</p>
                        {v.subtopics.map((s: any) => (
                            <div
                                key={s.label}
                                className="flex items-center gap-2 text-sm font-semibold text-navy/80 hover:text-navy"
                            >
                                <ChevronRight size={12} className="opacity-40 shrink-0" />
                                {s.label}
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 flex items-center gap-2 text-sm font-bold transition-all duration-300"
                        style={{ color: v.accent }}>
                        Explore <ArrowRight size={14} />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

/* SpiritualCard component removed since we are using inline mapped items for left alignment */

const CardinalVirtues = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar pageTitle="Cardinal Virtues" />

            <main className="flex-grow">
                <PremiumHero 
                    image={heroImg}
                    title={
                        <>
                            <span className="block drop-shadow-2xl">The Four Cardinal Virtues</span>
                        </>
                    }
                    intro="The Moral Foundation"
                />

                {/* ── Intro ── */}
                <section className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.6 }}
                    >
                        <SectionHeading>Greetings from <span className="text-green">GIFT Moral Nexus</span></SectionHeading>
                        <p className="text-gray-800 text-xl font-medium leading-relaxed mt-8">
                            Welcome to a journey of character, balance, and inner transformation. The Four Cardinal Virtues present a holistic framework for nurturing both the mind and the heart.
                        </p>
                        <p className="text-gray-600 text-lg leading-relaxed mt-4">
                            Rooted in timeless wisdom, these virtues guide us toward self-discipline, moral clarity, and spiritual excellence. As you explore this space, may these principles inspire you to cultivate a life of purpose, strengthen your connection with Divine, and contribute positively to a just and compassionate society.
                        </p>
                        <p className="text-gold font-bold text-lg mt-8 uppercase tracking-widest text-sm">
                            A brief general introduction to these virtues is presented below:
                        </p>
                    </motion.div>
                </section>

                {/* ── Four Cardinal Virtues Cards ── */}
                <section className="max-w-7xl mx-auto px-6 pb-20">
                    <div className="max-w-4xl mx-auto text-center mb-12">
                         <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">Cardinal Virtues</h2>
                         <p className="text-gray-700 text-lg leading-relaxed mb-4">
                            Cardinal Virtues are four foundational moral habits, <strong>Hikmah, Adl, Shujah &amp; Iffah</strong>. They represent key pillars for living a balanced, moral and purposeful life.
                         </p>
                         <p className="text-gray-600 text-lg leading-relaxed">
                            These cardinal virtues are considered <em>"natural,"</em> attainable through habit, education, and deliberate effort, though they can be perfected by grace. These virtues are the essential requirements of a flourishing life and harmonious society.
                         </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {cardinalData.map((v, i) => (
                            <VirtueCard key={v.id} v={v} index={i} />
                        ))}
                    </div>
                </section>


            </main>

            <Footer />
        </div>
    );
};

export default CardinalVirtues;
