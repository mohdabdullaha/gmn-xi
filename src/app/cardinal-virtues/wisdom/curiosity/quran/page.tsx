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

const QuranCuriosity = () => {
    const data = content.curiosity.quran as any;

    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar pageTitle="Qur'an on Curiosity" />

            <main className="flex-grow">
                <PremiumHero 
                    image={heroImg}
                    title={data.title}
                    subtitle="Hikmah /Knowledge & Wisdom"
                    intro="Divine Inspiration on Curiosity"
                />

                <section className="max-w-7xl mx-auto px-6 py-16 text-center">
                    <div className="max-w-4xl mx-auto space-y-12">
                        <SectionHeading>The Divine Wisdom on <span className="text-green">Curiosity</span></SectionHeading>

                        <div className="my-10">
                            <h3 className="text-green text-3xl font-bold mb-8">Key Verses</h3>
                            {data.verses.map((verse: any) => (
                                <VerseCard key={verse.id} verse={verse} />
                            ))}
                        </div>
                    </div>

                    <NavGrid excludeId="curiosity-quran" section="curiosity" />
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default QuranCuriosity;
