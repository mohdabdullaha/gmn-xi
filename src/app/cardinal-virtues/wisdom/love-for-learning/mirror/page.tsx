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

const heroImg = '/img.jpg';

const MirrorLFL = () => {
    const data = content.loveForLearning.mirror as any;

    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar pageTitle="Mirror Moments" />

            <main className="flex-grow">
                <PremiumHero 
                    image={heroImg}
                    title={data.title}
                    subtitle="Hikmah /Knowledge & Wisdom"
                    intro="Deep Reflection on Learning"
                />

                <section className="max-w-7xl mx-auto px-6 py-16 text-center">
                    <div className="max-w-4xl mx-auto">
                        <SectionHeading>Mirror <span className="text-green">Moments</span></SectionHeading>

                        <h3 className="text-green text-2xl font-bold mb-8 text-center text-navy tracking-tight underline decoration-gold/50 underline-offset-8 italic">
                            Objective: {data.objective}
                        </h3>

                        <div className="bg-ice border border-ice-border p-8 rounded-2xl shadow-sm my-10 text-center">
                            <p className="text-3xl font-medium mb-6 text-navy">{data.text}</p>
                            <div className="flex flex-col md:flex-row gap-4 justify-center">
                                {data.prompts.map((item: any, idx: number) => (
                                    <motion.div
                                        key={item?.id || item?.title || idx}
                                        whileHover={{ scale: 1.05 }}
                                        className="bg-white p-6 rounded-2xl shadow-sm border-2 border-dashed border-green/30 flex-1 text-gray-700 text-xl italic"
                                    >
                                        "{item}"
                                    </motion.div>
                                ))}
                            </div>
                            <p className="mt-8 text-sm text-gray-500 font-medium bg-white/50 py-2 rounded-full inline-block px-6">
                                {data.footer}
                            </p>
                        </div>
                        <AudioPlayer englishSrc={data.audios?.english} />
                    </div>

                    <NavGrid excludeId="lfl-mirror" section="loveForLearning" />
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default MirrorLFL;
