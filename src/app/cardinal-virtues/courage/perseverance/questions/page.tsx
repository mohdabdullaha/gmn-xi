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
import { HelpCircle } from 'lucide-react';

const heroImg = '/img.jpg';

const Questions = () => {
    const data = content.perseverance.questions as any;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar pageTitle="Reflective Questions" />

            <main className="flex-grow">
                <PremiumHero 
                    image={heroImg}
                    title={data.title}
                    subtitle="Shujah / Courage"
                />

                <section className="max-w-7xl mx-auto px-6 py-16">
                    <div className="max-w-3xl mx-auto space-y-12">
                        <SectionHeading>Questions for <span className="text-green">Reflection</span></SectionHeading>

                        <div className="space-y-6">
                            {data.list.map((question: any, idx: number) => (
                                <motion.div 
                                    key={question?.id || question?.title || idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-ice/30 border border-ice-border p-6 rounded-xl flex gap-4 items-start"
                                >
                                    <HelpCircle className="text-green shrink-0 mt-1" size={24} />
                                    <p className="text-xl text-navy font-medium leading-relaxed">{question}</p>
                                </motion.div>
                            ))}
                        </div>

                        {data.audios && <AudioPlayer urduSrc={data.audios.urdu} englishSrc={data.audios.english} />}
                    </div>

                    <div className="mt-16">
                        <NavGrid excludeId="questions" section="perseverance" />
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Questions;
