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

const QuestionsCreativity = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);
    const { questions } = content.creativity;

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar pageTitle={questions.title} />

            <main className="flex-grow">
                <PremiumHero 
                    image={heroImg}
                    title={questions.title}
                    subtitle="Hikmah /Knowledge & Wisdom"
                    intro="Reflective Questions"
                />

                <section className="py-24">
                    <div className="max-w-4xl mx-auto px-6">
                        <SectionHeading centered={true}>Reflective <span className="text-green">Questions</span></SectionHeading>
                        <div className="space-y-6 mb-12">
                            {questions.list.map((item: any, index: number) => (
                                <motion.div key={item?.id || item?.title || index} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="flex items-start gap-6 bg-gray-50 p-8 rounded-2xl hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-gold/20">
                                    <span className="flex-shrink-0 w-12 h-12 bg-navy text-white rounded-full flex items-center justify-center font-bold text-lg">{index + 1}</span>
                                    <p className="text-xl text-gray-700 font-medium pt-2">{item}</p>
                                </motion.div>
                            ))}
                        </div>
                        <AudioPlayer englishSrc={questions.audios?.english} />
                    </div>
                </section>

                <NavGrid section="creativity" />
            </main>

            <Footer />
        </div>
    );
};

export default QuestionsCreativity;
