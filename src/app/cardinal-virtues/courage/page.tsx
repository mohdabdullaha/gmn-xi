"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PremiumHero from "@/components/PremiumHero";
import { motion, Variants } from 'framer-motion';
import SectionHeading from "@/components/SectionHeading";
import VerseCard from "@/components/VerseCard";
import AudioPlayer from "@/components/AudioPlayer";
import { ArrowRight, Flame, Shield, TrendingUp, CheckCircle, MessageCircle, Scale } from 'lucide-react';
import { content } from "@/data/content";

const heroImg = '/img.jpg';

const subtopics = [
    { id: 'truthfulness', title: 'Truthfulness', desc: 'Being honest in words, actions, and thoughts — standing by truth even when difficult.', icon: <Flame size={28} className="text-white" />, path: '/cardinal-virtues/courage/truthfulness' },
    { id: 'honesty', title: 'Honesty', desc: 'Integrity in dealings — being trustworthy and transparent in all relationships.', icon: <Shield size={28} className="text-white" />, path: '/cardinal-virtues/courage/honesty' },
    { id: 'perseverance', title: 'Perseverance', desc: "Steadfast commitment to one's goals in the face of adversity and hardship.", icon: <TrendingUp size={28} className="text-white" />, path: '/cardinal-virtues/courage/perseverance' },
];

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' } }),
};

const Courage: React.FC = () => {
    const data = content.courage as any;

    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar pageTitle="Shujah / Courage" />

            <main className="flex-grow">
                <PremiumHero 
                    image={heroImg}
                    title={
                        <div className="flex flex-col items-center">
                            <span className="text-white/20 text-5xl md:text-7xl font-bold mb-2 font-arabic tracking-normal">
                                {data.concept.arabicTitle}
                            </span>
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gold inline-block drop-shadow-2xl">
                                {data.concept.title}
                            </span>
                        </div>
                    }
                    subtitle="Cardinal Virtue"
                    intro="The ability to conquer fear, endure trials, and remain steadfast in moral choices."
                />

                {/* ── Concept Section ── */}
                <section className="max-w-4xl mx-auto px-6 py-16">
                    <SectionHeading centered={false}>
                        The Concept
                        <br />
                        <span className="text-green">{data.concept.title}</span>
                    </SectionHeading>
                    <div className="space-y-6 mt-8">
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-xl text-gray-700 leading-relaxed font-semibold">
                            {data.concept.intro}
                        </motion.p>
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-lg text-gray-600 leading-relaxed">
                            {data.concept.body1}
                        </motion.p>
                        {data.concept.audios?.english && (
                            <AudioPlayer englishSrc={data.concept.audios.english} />
                        )}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="bg-navy/5 border-l-4 border-navy p-6 rounded-xl my-8"
                        >
                            <p className="text-lg text-gray-800 leading-relaxed italic">{data.concept.body2}</p>
                        </motion.div>
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-lg text-gray-600 leading-relaxed">
                            {data.concept.body3}
                        </motion.p>
                    </div>
                </section>

                {/* ── Quran Section ── */}
                <section className="bg-ice py-16 px-6">
                    <div className="max-w-4xl mx-auto">
                        <SectionHeading>
                            {data.quran.title.split('Courage')[0]}<span className="text-green">Courage</span>{data.quran.title.split('Courage')[1]}
                        </SectionHeading>
                        <div className="my-10 space-y-8">
                            {data.quran.verses.map((verse: any) => (
                                <VerseCard key={verse.id} verse={verse} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Sunnah Section ── */}
                <section className="max-w-4xl mx-auto px-6 py-16">
                    <SectionHeading centered={false}>Prophetic <span className="text-green">Guidance</span></SectionHeading>
                    <div className="mt-10 space-y-8">
                        {(data.sunnah.insights as any[]).map((insight: any, idx: number) => (
                            <motion.div
                                key={insight?.id || insight?.title || idx}
                                initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}
                                className="bg-white border border-ice-border rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border-t-8 border-t-green text-left"
                            >
                                <h3 className="text-navy text-xl font-bold mb-2">{insight.title}</h3>
                                <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-6">{insight.narrator}</p>
                                <p className="text-right text-2xl text-navy leading-loose font-arabic mb-6 dir-rtl">{insight.arabic}</p>
                                <p className="text-gray-700 text-lg leading-relaxed mb-4">{insight.text}</p>
                                <p className="text-green font-bold text-sm tracking-wide mb-6">{insight.ref}</p>
                                
                                {insight.audio && (
                                    <div className="mt-8 pt-6 border-t border-ice-border text-left">
                                        <label className="text-xs font-black text-navy uppercase tracking-[0.2em] mb-3 block">
                                            English Audio
                                        </label>
                                        <audio controls controlsList="nodownload" onContextMenu={(e) => e.preventDefault()} className="w-full max-w-sm h-9 custom-audio-player" src={insight.audio}>
                                            Your browser does not support the audio element.
                                        </audio>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ── Exploratory Sections Grid ── */}
                <section className="bg-navy py-16 px-6 text-white overflow-hidden">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-8">
                            
                            {/* Questions */}
                            <motion.div initial={{ x: -30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm relative text-left h-full flex flex-col">
                                <div className="absolute top-0 right-0 p-6 opacity-10">
                                    <MessageCircle size={80} />
                                </div>
                                <h3 className="text-2xl font-bold text-gold mb-6 relative z-10">{data.questions.title}</h3>
                                <ul className="space-y-4 relative z-10 text-left flex-grow">
                                    {data.questions.list.map((q: any, i: number) => (
                                        <li key={q?.id || q?.title || i} className="flex gap-3 text-white/90 text-lg">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5 shrink-0" />
                                            <p>{q}</p>
                                        </li>
                                    ))}
                                </ul>
                                {data.questions.audios?.english && (
                                    <div className="mt-6 relative z-10 mt-auto">
                                        <label className="text-xs font-black text-gold uppercase tracking-[0.2em] mb-2 block">
                                            English Audio
                                        </label>
                                        <audio controls controlsList="nodownload" onContextMenu={(e) => e.preventDefault()} className="w-full max-w-sm h-9 custom-audio-player" src={data.questions.audios.english}>
                                            Your browser does not support the audio element.
                                        </audio>
                                    </div>
                                )}
                            </motion.div>

                            {/* Dilemmas */}
                            <motion.div initial={{ x: 30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm relative text-left h-full flex flex-col">
                                <div className="absolute top-0 right-0 p-6 opacity-10">
                                    <Scale size={80} />
                                </div>
                                <h3 className="text-2xl font-bold text-gold mb-6 relative z-10">{data.dilemmas.title}</h3>
                                <ul className="space-y-4 relative z-10 text-left flex-grow">
                                    {data.dilemmas.scenarios.map((d: any, i: number) => (
                                        <li key={d?.id || d?.title || i} className="flex gap-3 text-white/90 text-lg">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5 shrink-0" />
                                            <p>{d}</p>
                                        </li>
                                    ))}
                                </ul>
                                {data.dilemmas.audios?.english && (
                                    <div className="mt-6 relative z-10 mt-auto">
                                        <label className="text-xs font-black text-gold uppercase tracking-[0.2em] mb-2 block">
                                            English Audio
                                        </label>
                                        <audio controls controlsList="nodownload" onContextMenu={(e) => e.preventDefault()} className="w-full max-w-sm h-9 custom-audio-player" src={data.dilemmas.audios.english}>
                                            Your browser does not support the audio element.
                                        </audio>
                                    </div>
                                )}
                            </motion.div>

                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mt-8">
                            
                            {/* Mirror */}
                            <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm relative text-left h-full flex flex-col">
                                <h3 className="text-2xl font-bold text-gold mb-6">{data.mirror.title}</h3>
                                <ul className="space-y-4 text-left flex-grow">
                                    {data.mirror.prompts.map((m: any, i: number) => (
                                        <li key={m?.id || m?.title || i} className="flex gap-3 text-white/90 text-lg">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5 shrink-0" />
                                            <p>{m}</p>
                                        </li>
                                    ))}
                                </ul>
                                {data.mirror.audios?.english && (
                                    <div className="mt-6 mt-auto">
                                        <label className="text-xs font-black text-gold uppercase tracking-[0.2em] mb-2 block">
                                            English Audio
                                        </label>
                                        <audio controls controlsList="nodownload" onContextMenu={(e) => e.preventDefault()} className="w-full max-w-sm h-9 custom-audio-player" src={data.mirror.audios.english}>
                                            Your browser does not support the audio element.
                                        </audio>
                                    </div>
                                )}
                            </motion.div>

                            {/* Roleplay */}
                            {data.roleplay && (
                                <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm relative text-left h-full flex flex-col">
                                    <h3 className="text-2xl font-bold text-gold mb-6">{data.roleplay.title}</h3>
                                    <ul className="space-y-5 flex-grow">
                                        {data.roleplay.scenarios.map((r: any, i: number) => (
                                            <li key={r?.id || r?.title || i} className="bg-white/5 p-4 rounded-xl text-white/90 text-md leading-relaxed border border-white/5">
                                                {r}
                                            </li>
                                        ))}
                                    </ul>
                                    {data.roleplay.audios?.english && (
                                        <div className="mt-6 mt-auto">
                                            <label className="text-xs font-black text-gold uppercase tracking-[0.2em] mb-2 block">
                                                English Audio
                                            </label>
                                            <audio controls controlsList="nodownload" onContextMenu={(e) => e.preventDefault()} className="w-full max-w-sm h-9 custom-audio-player" src={data.roleplay.audios.english}>
                                                Your browser does not support the audio element.
                                            </audio>
                                        </div>
                                    )}
                                </motion.div>
                            )}

                        </div>
                    </div>
                </section>

                {/* ── Pledge Section ── */}
                <section className="bg-ice py-16 px-6">
                    <div className="max-w-3xl mx-auto text-center">
                        <SectionHeading>Our <span className="text-green">Pledge</span></SectionHeading>
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mt-10 border border-gray-100">
                            <ul className="space-y-6 text-left">
                                {data.pledge.items.map((item: any, idx: number) => (
                                    <li key={item?.id || item?.title || idx} className="flex items-start gap-4">
                                        <CheckCircle className="text-green shrink-0 mt-1" size={24} />
                                        <p className="text-xl text-navy font-medium leading-relaxed">{item}</p>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                        <AudioPlayer englishSrc={data.pledge.audios?.english} />
                    </div>
                </section>

                {/* ── Sub-topics Grid ── */}
                <section className="max-w-7xl mx-auto px-6 py-20 border-t border-gray-100 mt-10">
                    <div className="text-center mb-14">
                        <SectionHeading centered={true}>
                            Explore <span className="text-green">Sub-Virtues</span>
                        </SectionHeading>
                        <p className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto">
                            Dive deeper into the foundational pillars of Courage.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {subtopics.map((topic: any, index: number) => (
                            <motion.div key={topic.id} custom={index} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                <Link href={topic.path} className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 hover:border-green/25 transition-all duration-300 transform hover:-translate-y-2">
                                    <div className="relative h-44 overflow-hidden">
                                        <Image src={heroImg} alt={topic.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
                                        <div className="absolute top-4 right-4 bg-green/90 p-2.5 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                                            {topic.icon}
                                        </div>
                                        <div className="absolute bottom-3 left-4 text-white/40 text-5xl font-black leading-none select-none">
                                            {String(index + 1).padStart(2, '0')}
                                        </div>
                                    </div>
                                    <div className="p-6 flex-grow flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-lg font-bold text-navy group-hover:text-green transition-colors mb-2">{topic.title}</h3>
                                            <p className="text-sm text-gray-500 leading-relaxed">{topic.desc}</p>
                                        </div>
                                        <div className="mt-4 flex items-center gap-2 text-green text-sm font-bold opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-300">
                                            Explore <ArrowRight size={15} />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ── Quote Banner ── */}
                <section className="bg-navy py-14 px-6 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto">
                        <p className="text-gold text-3xl font-serif mb-3">"</p>
                        <p className="text-white text-lg md:text-xl font-medium leading-relaxed italic">
                            The truthful and trustworthy merchant will be with the Prophets, the truthful, and the martyrs in Paradise.
                        </p>
                        <p className="text-gold/60 text-xs mt-3 tracking-widest">Sunan al-Tirmidhi</p>
                        <div className="mt-5 h-0.5 w-14 bg-gold mx-auto rounded-full" />
                    </motion.div>
                </section>

            </main>

            <Footer />
        </div>
    );
};

export default Courage;
