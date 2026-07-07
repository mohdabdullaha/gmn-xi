"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PremiumHero from "@/components/PremiumHero";
import { motion } from 'framer-motion';
import SectionHeading from "@/components/SectionHeading";
import { ArrowRight, Scale, Users, Star } from 'lucide-react';

const heroImg = '/img.jpg';
const subtopics = [
    { id: 'fairness', title: 'Fairness', desc: 'Ensuring equal and impartial treatment for all people in every situation.', icon: <Scale size={28} className="text-white" />, path: '/cardinal-virtues/justice/fairness' },
    { id: 'team-work', title: 'Team Work', desc: 'Collaborating effectively to achieve shared goals with mutual respect.', icon: <Users size={28} className="text-white" />, path: '/cardinal-virtues/justice/team-work' },
    { id: 'leadership', title: 'Leadership', desc: "Guiding others with wisdom, integrity, and a servant's heart.", icon: <Star size={28} className="text-white" />, path: '/cardinal-virtues/justice/leadership' },
];
const cardVariants = { hidden: { opacity: 0, y: 30 }, visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }) };

const Justice = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar pageTitle="Adl / Justice" />
            <main className="flex-grow">
                <PremiumHero 
                    image={heroImg}
                    title={
                        <div className="flex flex-col items-center">
                            <span className="text-white/20 text-5xl md:text-7xl font-bold mb-2 font-arabic tracking-normal">
                                عدل
                            </span>
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gold inline-block drop-shadow-2xl">
                                Adl / Justice
                            </span>
                        </div>
                    }
                    subtitle="Cardinal Virtue"
                    intro="The constant and permanent determination to ensure fairness to oneself and others."
                />
                <section className="max-w-7xl mx-auto px-6 py-20">
                    <div className="text-center mb-14">
                        <SectionHeading centered={true}>Explore <span className="text-green">Justice</span> Topics</SectionHeading>
                        <p className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto">Select a topic to explore its core concept, Quranic verses, Prophetic guidance, activities, and more.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {subtopics.map((topic: any, index: number) => (
                            <motion.div key={topic.id} custom={index} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                <Link href={topic.path} className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 hover:border-green/25 transition-all duration-300 transform hover:-translate-y-2">
                                    <div className="relative h-44 overflow-hidden">
                                        <img src={heroImg} alt={topic.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
                                        <div className="absolute top-4 right-4 bg-green/90 p-2.5 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">{topic.icon}</div>
                                        <div className="absolute bottom-3 left-4 text-white/40 text-5xl font-black leading-none select-none">{String(index + 1).padStart(2, '0')}</div>
                                    </div>
                                    <div className="p-6 flex-grow flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-lg font-bold text-navy group-hover:text-green transition-colors mb-2">{topic.title}</h3>
                                            <p className="text-sm text-gray-500 leading-relaxed">{topic.desc}</p>
                                        </div>
                                        <div className="mt-4 flex items-center gap-2 text-green text-sm font-bold opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-300">Explore <ArrowRight size={15} /></div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </section>
                <section className="bg-navy py-14 px-6 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto">
                        <p className="text-gold text-3xl font-serif mb-3">"</p>
                        <p className="text-white text-lg md:text-xl font-medium leading-relaxed italic">O you who believe! Stand firmly for justice, as witnesses to Allah.</p>
                        <p className="text-gold/60 text-xs mt-3 tracking-widest">Surah An-Nisa (4:135)</p>
                        <div className="mt-5 h-0.5 w-14 bg-gold mx-auto rounded-full" />
                    </motion.div>
                </section>
            </main>
            <Footer />
        </div>
    );
};
export default Justice;
