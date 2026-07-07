"use client";
import React, { useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PremiumHero from "@/components/PremiumHero";
import AudioPlayer from "@/components/AudioPlayer";
import NavGrid from "@/components/NavGrid";
import { motion } from 'framer-motion';
import SectionHeading from "@/components/SectionHeading";
import { HelpCircle } from 'lucide-react';
import { content } from "@/data/content";

const heroImg = '/img.jpg';

const Questions = () => {
    const data = content.selfRegulation.questions as any;

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
                    subtitle="Iffah / Temperance"
                    intro="Deep Reflection on Self-Regulation"
                />

                <section className="max-w-7xl mx-auto px-6 py-16">
                    <div className="max-w-4xl mx-auto space-y-12">
                        
                        <SectionHeading>Questions for <span className="text-green">Reflection</span></SectionHeading>

                        <div className="grid gap-6 my-10">
                            {data.list.map((question: any, idx: number) => (
                                <motion.div 
                                    key={question?.id || question?.title || idx}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-ice border border-ice-border p-6 rounded-2xl flex items-start gap-4 hover:shadow-md transition-shadow"
                                >
                                    <div className="bg-white p-3 rounded-xl shadow-sm text-green">
                                        <HelpCircle size={24} />
                                    </div>
                                    <p className="text-xl text-gray-700 leading-relaxed pt-2">{question}</p>
                                </motion.div>
                            ))}
                        </div>

                        {data.audios && <AudioPlayer englishSrc={data.audios.english} />}
                    </div>

                    <NavGrid excludeId="questions" section="selfRegulation" />
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Questions;
