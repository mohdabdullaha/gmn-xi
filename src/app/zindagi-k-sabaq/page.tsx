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

const heroImg = '/img.jpg'; // same as Sunnah page

const ZindagiKSabaq = () => {
    const data = content.truthfulness.zindagiKSabaq as any;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar pageTitle="Art of Life" />

            <PremiumHero 
                image={heroImg}
                title={data.title}
                intro={data.quote}
            />

            {/* MAIN CONTENT */}
            <main className="flex-grow max-w-7xl mx-auto px-6 py-16">
                {/* Heading */}
                <SectionHeading>Art of Life</SectionHeading>

                <NavGrid section="zindagiKSabaq" showTitle={false} />
            </main>

            <Footer />
        </div>
    );
};

export default ZindagiKSabaq;