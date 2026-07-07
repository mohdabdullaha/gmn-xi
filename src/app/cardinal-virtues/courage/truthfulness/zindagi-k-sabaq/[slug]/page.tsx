"use client";
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PremiumHero from "@/components/PremiumHero";
import AudioPlayer from "@/components/AudioPlayer";
import NavGrid from "@/components/NavGrid";
import SectionHeading from "@/components/SectionHeading";
import { content } from "@/data/content";

const heroImg = '/img.jpg';

const ZindagiKSabaqChapter = () => {
    const { slug } = useParams();
    const chapter = (content.truthfulness.zindagiKSabaq as any).pdfPages.find((item: any) => item.slug === slug);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!chapter) {
        return (
            <div className="min-h-screen flex flex-col bg-white">
                <Navbar pageTitle="Art of Life" />
                <main className="flex-grow max-w-4xl mx-auto px-6 py-16">
                    <SectionHeading>صفحہ دستیاب نہیں</SectionHeading>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar pageTitle={chapter.title} />

            <PremiumHero
                image={heroImg}
                title={chapter.title}
                intro={chapter.quote || content.truthfulness.zindagiKSabaq.quote}
            />

            <main className="flex-grow max-w-5xl mx-auto px-6 py-16">
                <div className="bg-white border border-ice-border rounded-2xl p-6 md:p-10 shadow-sm">
                    <div className="flex justify-end mb-8">
                        <SectionHeading centered={false}>{chapter.title}</SectionHeading>
                    </div>

                    <div className="space-y-6 text-right font-urdu" dir="rtl">
                        {chapter.content.map((line: string, idx: number) => {
                            // Poem block: starts with شعر:
                            if (line.startsWith('شعر:')) {
                                const verses = line.replace('شعر:', '').trim().split('\n');
                                return (
                                    <div key={idx} className="my-8 border-r-4 border-gold bg-gradient-to-l from-amber-50/80 via-amber-50/40 to-white rounded-2xl px-8 py-7 shadow-md">
                                        <p className="text-gold text-lg font-bold mb-4 text-right font-urdu">شعر</p>
                                        <div className="space-y-1">
                                            {verses.map((verse: string, vi: number) => (
                                                <p key={vi} className="text-2xl text-navy font-bold leading-[2.5] font-urdu">
                                                    {verse.trim()}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                );
                            }
                            // Lesson block: starts with سبق:
                            if (line.startsWith('سبق:')) {
                                const lessonText = line.replace('سبق:', '').trim();
                                const lessonParts = lessonText.split('\n');
                                return (
                                    <div key={idx} className="my-8 bg-gradient-to-l from-emerald-50/80 via-emerald-50/40 to-white border-r-4 border-emerald-500 rounded-2xl px-8 py-7 shadow-md">
                                        <p className="text-emerald-700 text-lg font-bold mb-4 text-right font-urdu">سبق</p>
                                        {lessonParts.map((part: string, pi: number) => (
                                            <p key={pi} className="text-2xl text-gray-800 leading-[2.2] font-semibold font-urdu">{part.trim()}</p>
                                        ))}
                                    </div>
                                );
                            }
                            // Regular paragraph
                            return (
                                <p key={idx} className="text-2xl text-gray-700 leading-relaxed">
                                    {line}
                                </p>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-12">
                    <AudioPlayer 
                        urduSrc={chapter.audio !== undefined ? chapter.audio : (content.truthfulness.zindagiKSabaq as any).audios?.urdu} 
                        englishSrc={(content.truthfulness.zindagiKSabaq as any).audios?.english} 
                    />
                </div>

                <div className="mt-16">
                    <NavGrid excludeId={chapter.id} section="zindagiKSabaq" />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ZindagiKSabaqChapter;
