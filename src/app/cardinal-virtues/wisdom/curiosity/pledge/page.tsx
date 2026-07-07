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

const PledgeCuriosity = () => {
    const data = content.curiosity.pledge as any;

    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar pageTitle="Curiosity Pledge" />

            <main className="flex-grow">
                <PremiumHero 
                    image={heroImg}
                    title={data.title}
                    subtitle="Hikmah /Knowledge & Wisdom"
                    intro="A Commitment to Inquiry"
                />

                <section className="max-w-7xl mx-auto px-6 py-16 text-center">
                    <div className="max-w-3xl mx-auto">
                        <SectionHeading>Our <span className="text-green">Pledge</span></SectionHeading>
                        <p className="text-gray-600 text-xl mt-4">{data.objective}</p>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                            className="bg-navy text-white rounded-2xl p-10 my-10 shadow-2xl"
                        >
                            <p className="text-white/70 text-lg mb-6">{data.text}</p>
                            <ul className="text-xl md:text-2xl font-semibold leading-relaxed text-gold text-left space-y-4 max-w-2xl mx-auto list-disc">
                                {data.items && data.items.map((item: any, index: number) => (
                                    <li key={item?.id || item?.title || index}>{item}</li>
                                ))}
                            </ul>
                            <div className="mt-8 h-px w-24 bg-gold/40 mx-auto" />
                            <p className="text-white/50 text-sm mt-4 italic">{data.footer}</p>
                        </motion.div>

                        {data.audios?.english && (
                            <AudioPlayer englishSrc={data.audios.english} />
                        )}
                    </div>

                    <NavGrid excludeId="curiosity-pledge" section="curiosity" />
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default PledgeCuriosity;
