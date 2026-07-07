"use client";
import React, { useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PremiumHero from "@/components/PremiumHero";
import AudioPlayer from "@/components/AudioPlayer";
import NavGrid from "@/components/NavGrid";
import { motion } from 'framer-motion';
import SectionHeading from "@/components/SectionHeading";
import { content } from "@/data/content";
import Image from 'next/image';

const heroImg = '/img.jpg';

const Creativity = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);
    const { concept } = content.creativity;

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar pageTitle={concept.title} />

            <main className="flex-grow">
                <PremiumHero 
                    image={heroImg}
                    title={concept.title}
                    subtitle="Hikmah /Knowledge & Wisdom"
                    intro="Unlocking the Divine Gift of Creativity"
                />

                {/* Core Concept */}
                <section className="py-24 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                                <SectionHeading centered={false}>The Core <span className="text-green">Concept</span></SectionHeading>
                                <p className="text-gray-600 text-lg leading-relaxed mb-8">{concept.body}</p>
                                
                                <div className="grid grid-cols-2 gap-6 mt-10">
                                    {concept.elements.map((el: any, i: number) => (
                                        <div key={el?.id || el?.title || i} className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-gold">
                                            <h4 className="text-navy font-bold mb-2">{el.title}</h4>
                                            <p className="text-sm text-gray-500">{el.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative">
                                <Image src={heroImg} alt="Conceptual" width={600} height={400} className="w-full h-auto rounded-3xl shadow-2xl" />
                                <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-2xl shadow-xl max-w-xs hidden md:block border border-gray-100">
                                    <p className="text-navy font-medium italic">"Combine knowledge, experience, and imagination."</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Benefits & Impact */}
                <AudioPlayer englishSrc={concept.audios?.english} />
                <section className="py-24">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid md:grid-cols-2 gap-12">
                            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-green/5 p-10 rounded-3xl border border-green/10">
                                <h3 className="text-2xl font-bold text-navy mb-6 flex items-center gap-3">
                                    <span className="w-10 h-10 bg-green text-white rounded-full flex items-center justify-center text-sm">01</span>
                                    {concept.benefits.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed text-lg">{concept.benefits.text}</p>
                            </motion.div>
                            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-gold/5 p-10 rounded-3xl border border-gold/10">
                                <h3 className="text-2xl font-bold text-navy mb-6 flex items-center gap-3">
                                    <span className="w-10 h-10 bg-gold text-white rounded-full flex items-center justify-center text-sm">02</span>
                                    {concept.consequences.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed text-lg">{concept.consequences.text}</p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                <NavGrid section="creativity" />
            </main>

            <Footer />
        </div>
    );
};

export default Creativity;
