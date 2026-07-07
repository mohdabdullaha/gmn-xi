"use client";
import React, { useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PremiumHero from "@/components/PremiumHero";
import VerseCard from "@/components/VerseCard";
import AudioPlayer from "@/components/AudioPlayer";
import NavGrid from "@/components/NavGrid";
import { motion } from 'framer-motion';
import SectionHeading from "@/components/SectionHeading";
import { content } from "@/data/content";

const heroImg = '/img.jpg';

const QuranLoveForLearning = () => {
    const data = content.loveForLearning.quran as any;

    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar pageTitle="Qur'an on Love for Learning" />

            <main className="flex-grow">
                <PremiumHero 
                    image={heroImg}
                    title={data.title}
                    subtitle="Hikmah /Knowledge & Wisdom"
                    intro="Divine Inspiration on Learning"
                />

                <section className="max-w-7xl mx-auto px-6 py-16 text-center">
                    <div className="max-w-4xl mx-auto space-y-12">
                        <SectionHeading>The Divine Wisdom on <span className="text-green">Love for Learning</span></SectionHeading>

                        <div className="my-10">
                            <h3 className="text-green text-3xl font-bold mb-8">Key Verses</h3>
                            {data.verses.map((verse: any) => (
                                <VerseCard key={verse.id} verse={verse} />
                            ))}
                        </div>
                    </div>

                    <NavGrid excludeId="lfl-quran" section="loveForLearning" />
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default QuranLoveForLearning;
