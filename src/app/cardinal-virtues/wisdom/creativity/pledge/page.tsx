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

const PledgeCreativity = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);
    const { pledge } = content.creativity;

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar pageTitle={pledge.title} />

            <main className="flex-grow">
                <PremiumHero 
                    image={heroImg}
                    title={pledge.title}
                    subtitle="Hikmah /Knowledge & Wisdom"
                    intro="Pledge"
                />

                <section className="py-24 relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-green/5 rounded-full -mr-48 -mt-48 blur-3xl opacity-50" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full -ml-48 -mb-48 blur-3xl opacity-50" />

                    <div className="max-w-4xl mx-auto px-6 relative">
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="bg-white rounded-[3rem] shadow-2xl p-16 border border-gray-100 flex flex-col items-center text-center">
                            <SectionHeading centered={true}>The <span className="text-green">Pledge</span></SectionHeading>
                            
                            <p className="text-gray-500 text-lg mb-12 max-w-lg leading-relaxed italic">
                                "{pledge.text}"
                            </p>

                            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-navy p-12 rounded-[2rem] shadow-2xl relative w-full mb-12">
                                <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gold text-navy px-8 py-2 rounded-full font-bold text-sm tracking-widest uppercase shadow-lg">
                                    Solemn Promise
                                </span>
                                <p className="text-white text-3xl md:text-4xl font-serif font-medium leading-relaxed italic">
                                    "{pledge.pledge}"
                                </p>
                            </motion.div>

                            <div className="w-full flex flex-col items-center space-y-6 mt-6">
                                <div className="h-0.5 w-40 bg-gray-100" />
                                <p className="text-gold font-bold tracking-widest uppercase text-lg">{pledge.footer}</p>
                                <div className="w-48 h-16 border-b-2 border-dashed border-navy/20" />
                                <p className="text-xs text-gray-400 font-medium tracking-tighter">COMMITMENT TO GROWTH</p>
                            </div>
                            <div className="mt-12 w-full max-w-md mx-auto">
                                <AudioPlayer englishSrc={pledge.audios?.english} />
                            </div>
                        </motion.div>
                    </div>
                </section>

                <NavGrid section="creativity" />
            </main>

            <Footer />
        </div>
    );
};

export default PledgeCreativity;
