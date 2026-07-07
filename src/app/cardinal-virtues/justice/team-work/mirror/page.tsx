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

const MirrorMoments = () => {
    const data = content.teamWork.mirror as any;

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
                    subtitle="Adl / Justice"
                    intro="Deep Reflection on Team Work"
                />

                <section className="max-w-7xl mx-auto px-6 py-16">
                    <div className="max-w-4xl mx-auto text-center space-y-12">
                        
                        <SectionHeading>Look in the <span className="text-green">Mirror</span></SectionHeading>
                        <p className="text-xl text-gray-700">{data.objective}</p>

                        <div className="bg-navy text-white rounded-3xl p-10 shadow-2xl my-12 text-left relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-green/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                            
                            <h3 className="text-2xl font-bold mb-8 text-green">{data.text}</h3>
                            <ul className="space-y-6 relative z-10">
                                {data.prompts.map((prompt: any, idx: number) => (
                                    <motion.li 
                                        key={prompt?.id || prompt?.title || idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="flex gap-4 text-lg items-start"
                                    >
                                        <span className="text-green font-bold text-2xl mt-1">•</span>
                                        <span className="leading-relaxed">{prompt}</span>
                                    </motion.li>
                                ))}
                            </ul>
                            
                            {data.footer && (
                                <div className="mt-12 pt-8 border-t border-white/10 text-center">
                                    <p className="text-ice/80 italic text-xl font-medium">{data.footer}</p>
                                </div>
                            )}
                        </div>

                        {data.audios && <AudioPlayer englishSrc={data.audios.english} />}
                    </div>

                    <NavGrid excludeId="mirror" section="teamWork" />
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default MirrorMoments;
