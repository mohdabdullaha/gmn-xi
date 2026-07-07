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
import { CircleUserRound } from 'lucide-react';

const heroImg = '/img.jpg';

const MirrorMoments = () => {
    const data = content.perseverance.mirror as any;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar pageTitle="Mirror Moments" />

            <main className="flex-grow">
                <PremiumHero 
                    image={heroImg}
                    title={data.title}
                    subtitle="Shujah / Courage"
                />

                <section className="max-w-7xl mx-auto px-6 py-16">
                    <div className="max-w-3xl mx-auto space-y-12">
                        <SectionHeading>Mirror <span className="text-green">Moments</span></SectionHeading>

                        <div className="bg-ice border border-ice-border p-8 rounded-2xl shadow-sm text-center">
                            <p className="text-xl text-gray-700 font-medium mb-8">
                                {data.text}
                            </p>

                            <div className="space-y-6 text-left">
                                {data.prompts.map((prompt: any, idx: number) => (
                                    <motion.div 
                                        key={prompt?.id || prompt?.title || idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex gap-4 items-center"
                                    >
                                        <CircleUserRound className="text-navy shrink-0" size={24} />
                                        <p className="text-lg text-gray-800 font-medium">{prompt}</p>
                                    </motion.div>
                                ))}
                            </div>

                            <p className="mt-8 text-green font-semibold italic text-lg">
                                {data.footer}
                            </p>
                        </div>

                        {data.audios && <AudioPlayer urduSrc={data.audios.urdu} englishSrc={data.audios.english} />}
                    </div>

                    <div className="mt-16">
                        <NavGrid excludeId="mirror" section="perseverance" />
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default MirrorMoments;
