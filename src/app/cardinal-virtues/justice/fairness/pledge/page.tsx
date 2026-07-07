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
import { HandHeart } from 'lucide-react';

const heroImg = '/img.jpg';

const Pledge = () => {
    const data = content.fairness.pledge as any;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar pageTitle="Pledge" />

            <main className="flex-grow">
                <PremiumHero 
                    image={heroImg}
                    title={data.title}
                    subtitle="Adl / Justice"
                />

                <section className="max-w-7xl mx-auto px-6 py-16">
                    <div className="max-w-3xl mx-auto space-y-12">
                        <SectionHeading>Our <span className="text-green">Pledge</span></SectionHeading>

                        <div className="bg-navy text-white p-10 rounded-2xl shadow-xl text-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-2 bg-green" />
                            
                            <HandHeart className="mx-auto text-green mb-6" size={48} />
                            
                            <p className="text-2xl font-medium mb-8 leading-relaxed text-ice">
                                {data.text}
                            </p>

                            <div className="space-y-6 text-left mb-10">
                                {data.items.map((item: any, idx: number) => (
                                    <motion.div 
                                        key={item?.id || item?.title || idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="bg-white/10 p-4 rounded-xl border border-white/20 backdrop-blur-sm"
                                    >
                                        <p className="text-xl leading-relaxed">{item}</p>
                                    </motion.div>
                                ))}
                            </div>

                            <p className="text-green font-bold text-xl italic tracking-wide">
                                {data.footer}
                            </p>
                        </div>

                        {data.audios && <AudioPlayer urduSrc={data.audios.urdu} englishSrc={data.audios.english} />}
                    </div>

                    <div className="mt-16">
                        <NavGrid excludeId="pledge" section="fairness" />
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Pledge;
