"use client";
import React, { useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PremiumHero from "@/components/PremiumHero";
import VerseCard from "@/components/VerseCard";
import NavGrid from "@/components/NavGrid";
import { motion } from 'framer-motion';
import SectionHeading from "@/components/SectionHeading";
import { content } from "@/data/content";

const heroImg = '/img.jpg';

const QuranCreativity = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);
    const { quran } = content.creativity;

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar pageTitle={quran.title} />

            <main className="flex-grow">
                <PremiumHero 
                    image={heroImg}
                    title={quran.title}
                    subtitle="Hikmah /Knowledge & Wisdom"
                    intro="Quranic Verses"
                />

                <section className="py-24">
                    <div className="max-w-4xl mx-auto px-6">
                        <SectionHeading centered={true}>Quranic <span className="text-green">Verses</span></SectionHeading>
                        <div className="space-y-12">
                            {quran.verses.map((verse: any, index: number) => (
                                <motion.div key={verse?.id || verse?.title || index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                                    <VerseCard verse={verse} />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <NavGrid section="creativity" />
            </main>

            <Footer />
        </div>
    );
};

export default QuranCreativity;
