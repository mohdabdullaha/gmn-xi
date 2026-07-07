"use client";
import React, { useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PremiumHero from "@/components/PremiumHero";
import AudioPlayer from "@/components/AudioPlayer";
import VerseCard from "@/components/VerseCard";
import NavGrid from "@/components/NavGrid";
import SectionHeading from "@/components/SectionHeading";
import { content } from "@/data/content";

const heroImg = '/img.jpg';

const QuranSelfRegulation = () => {
    const data = content.selfRegulation.quran as any;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar pageTitle="Quranic Verses" />

            <main className="flex-grow">
                <PremiumHero 
                    image={heroImg}
                    title={data.title}
                    subtitle="Iffah / Temperance"
                    intro="The Divine Wisdom on Self-Regulation"
                />

                <section className="max-w-7xl mx-auto px-6 py-16 text-center">
                    <div className="max-w-4xl mx-auto space-y-12">
                        <SectionHeading>The Divine Wisdom on <span className="text-green">Self-Regulation</span></SectionHeading>
                        <p className="text-xl text-gray-700">{data.intro}</p>

                        <div className="my-10 space-y-8">
                            {data.verses.map((verse: any, idx: number) => (
                                <VerseCard key={verse?.id || verse?.title || idx} verse={verse} />
                            ))}
                        </div>

                        {data.audios && <AudioPlayer englishSrc={data.audios.english} />}
                    </div>

                    <NavGrid excludeId="quran" section="selfRegulation" />
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default QuranSelfRegulation;
