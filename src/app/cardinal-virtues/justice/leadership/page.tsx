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

const Leadership = () => {
    const data = content.leadership.concept as any;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar pageTitle="Cardinal Virtues" />

            <main className="flex-grow">
                <PremiumHero 
                    image={heroImg}
                    title={data.title}
                    subtitle="Adl / Justice"
                />

                <section className="max-w-7xl mx-auto px-6 py-16">
                    <div className="max-w-4xl mx-auto text-left space-y-8">
                        <SectionHeading centered={false}>The Significance of <span className="text-green">Leadership</span></SectionHeading>
                        
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-xl text-gray-700 leading-relaxed"
                        >
                            {data.intro}
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-xl text-gray-700 leading-relaxed"
                        >
                            {data.body}
                        </motion.p>

                        <div className="grid md:grid-cols-2 gap-8 mt-12">
                            <motion.div
                                initial={{ x: -30, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                className="bg-ice border border-ice-border p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                            >
                                <h3 className="text-green text-2xl font-bold mb-4">{data.benefits.title}</h3>
                                <p className="text-gray-700 text-xl leading-relaxed">{data.benefits.text}</p>
                            </motion.div>

                            <motion.div
                                initial={{ x: 30, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                className="bg-ice border border-ice-border p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                            >
                                <h3 className="text-navy text-2xl font-bold mb-4">{data.consequences.title}</h3>
                                <p className="text-gray-700 text-xl leading-relaxed">{data.consequences.text}</p>
                            </motion.div>
                        </div>
                    </div>

                    <NavGrid excludeId="leadership" section="leadership" />
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Leadership;
