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

const PledgeLFL = () => {
    const data = content.loveForLearning.pledge as any;

    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar pageTitle="Love for Learning Pledge" />

            <main className="flex-grow">
                <PremiumHero 
                    image={heroImg}
                    title={data.title}
                    subtitle="Hikmah /Knowledge & Wisdom"
                    intro="A Commitment to Learning"
                />

                <section className="max-w-7xl mx-auto px-6 py-16 text-center">
                    <div className="max-w-5xl mx-auto">
                        <SectionHeading>Our Moral <span className="text-green">Pledge</span></SectionHeading>

                        <h3 className="text-green text-2xl font-bold mb-8 text-center italic">
                            Objective: {data.objective}
                        </h3>

                        <div className="bg-navy text-white p-12 rounded-[2rem] shadow-2xl my-10 text-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gold/5 transform skew-y-12 translate-y-20 group-hover:translate-y-10 transition-transform duration-1000" />

                            <p className="text-xl md:text-2xl font-medium mb-8 relative z-10">
                                {data.text}
                            </p>

                            <div className="p-1 border-2 border-gold/30 rounded-2xl relative z-10">
                                <div className="bg-white/5 backdrop-blur-sm p-10 rounded-xl border border-gold/50">
                                    <p className="text-2xl md:text-4xl font-bold italic text-gold leading-tight">
                                        {data.pledge}
                                    </p>
                                </div>
                            </div>

                            <p className="mt-10 text-base font-semibold text-gold/80 relative z-10 tracking-widest italic">
                                {data.footer}
                            </p>
                        </div>
                        <AudioPlayer englishSrc={data.audios?.english} />
                    </div>

                    <NavGrid excludeId="lfl-pledge" section="loveForLearning" />
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default PledgeLFL;
