"use client";
import React, { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PremiumHero from "@/components/PremiumHero";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import { content } from "@/data/content";
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Eye, Target, ArrowRight, X, Quote } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';


const defaultImg = '/img.jpg';

const Home = () => {
    const [selectedLeader, setSelectedLeader] = useState<{ name: string; role: string; message: string; image: string } | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="min-h-screen flex flex-col"
        >
            <Navbar pageTitle="Home" />

            <main className="flex-grow">
                <PremiumHero 
                    image={defaultImg}
                    title={
                        <>
                            <span className="block drop-shadow-2xl">The Future of</span>
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gold inline-block drop-shadow-2xl">
                                Moral Excellence
                            </span>
                        </>
                    }
                    subtitle="Ethical Growth Together"
                    intro={content.home.title}
                    height="h-[85vh] md:h-[95vh]"
                    showScroll={true}
                    showButtons={true}
                    buttons={[
                        { text: 'GET STARTED', link: '/cardinal-virtues', primary: true, icon: <ArrowRight size={18} strokeWidth={3} /> },
                        { text: 'CONTACT US', link: '#contact', primary: false }
                    ]}
                />

                <section className="max-w-7xl mx-auto px-6 py-12 md:py-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto mb-16"
                    >
                        <p className="text-2xl leading-relaxed text-gray-700">
                            {content.home.welcome}
                        </p>
                    </motion.div>

                    <section className="max-w-7xl mx-auto px-6 pt-12 pb-16 bg-ice/30 rounded-3xl mb-4 text-left">
                        <SectionHeading>Our <span className="text-green">Purpose</span></SectionHeading>

                        <div className="grid md:grid-cols-2 gap-10">
                            <motion.div
                                initial={{ x: -40, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                className="bg-white p-8 rounded-3xl shadow-lg border border-ice-border flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1"
                            >
                                <motion.div 
                                    animate={{ y: [-4, 4, -4] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="bg-navy p-4 rounded-2xl mb-6 shadow-md"
                                >
                                    <Eye size={36} className="text-white" />
                                </motion.div>
                                <h3 className="text-xl font-bold text-navy mb-4 underline underline-offset-8 decoration-gold decoration-4">
                                    {content.purpose.vision.title}
                                </h3>
                                <p className="text-base text-gray-700 leading-relaxed italic">
                                    "{content.purpose.vision.text}"
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ x: 40, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                className="bg-white p-8 rounded-3xl shadow-lg border border-ice-border flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1"
                            >
                                <motion.div 
                                    animate={{ y: [-4, 4, -4] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    className="bg-green p-4 rounded-2xl mb-6 shadow-md"
                                >
                                    <Target size={36} className="text-white" />
                                </motion.div>
                                <h3 className="text-xl font-bold text-green mb-4 underline underline-offset-8 decoration-gold decoration-4">
                                    {content.purpose.mission.title}
                                </h3>
                                <p className="text-base text-gray-700 leading-relaxed italic">
                                    "{content.purpose.mission.text}"
                                </p>
                            </motion.div>
                        </div>
                    </section>

                    <section className="max-w-7xl mx-auto pt-10 pb-10 px-6 bg-ice/20 rounded-[2.5rem] mb-4 text-center">
                        <SectionHeading>Leadership <span className="text-green">Vision</span></SectionHeading>
                        <p className="text-gray-600 mt-2 mb-12 text-lg max-w-2xl mx-auto">
                            The GIFT Moral Nexus Project is guided by the visionary leadership and faculty of GIFT University.
                        </p>

                        <div className="grid md:grid-cols-3 gap-8 text-left">
                            {content.projectTeam.leadership.map((leader: any, idx: number) => (
                                <motion.div
                                    key={leader?.id || leader?.title || idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.15 }}
                                    className="bg-white border border-ice-border rounded-3xl p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 relative overflow-hidden"
                                >
                                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-navy via-gold to-green opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    
                                    <div>
                                        <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border-2 border-ice shadow-sm group-hover:border-gold transition-colors duration-300">
                                            <Image src={leader.image} alt={leader.name} width={96} height={96} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110" />
                                        </div>
                                        <h3 className="text-xl font-bold text-navy group-hover:text-gold transition-colors duration-300">{leader.name}</h3>
                                        <p className="text-xs font-black text-gold/80 uppercase tracking-widest mt-1 mb-4">{leader.role}</p>
                                        <p className="text-gray-600 font-serif italic text-sm leading-relaxed mb-6">
                                            "{leader.message.slice(0, 140)}..."
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => setSelectedLeader(leader)}
                                        className="text-green font-bold text-sm tracking-wider flex items-center gap-1.5 group-hover:text-navy transition-colors w-fit mt-auto"
                                    >
                                        Read Full Message <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                                    </button>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-12 mb-2 flex justify-center relative z-10">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative group"
                            >
                                {/* Glowing backdrop that intensifies on hover */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-gold via-green to-navy rounded-full blur opacity-30 group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-pulse"></div>
                                
                                <Link
                                    href="/about"
                                    className="relative flex items-center gap-3 px-10 py-5 bg-navy text-white font-bold text-sm md:text-base tracking-[0.2em] rounded-full uppercase transition-all duration-300 overflow-hidden border border-white/10"
                                >
                                    {/* Inner hover background slide effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-gold to-yellow-500 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
                                    
                                    <span className="relative z-10 flex items-center gap-3 group-hover:text-navy transition-colors duration-300">
                                        Meet Our Core Team
                                        <div className="bg-white/10 p-2 rounded-full group-hover:bg-navy/10 transition-colors">
                                            <ArrowRight size={18} className="transform group-hover:translate-x-1 group-hover:scale-110 transition-all duration-300" />
                                        </div>
                                    </span>
                                </Link>
                            </motion.div>
                        </div>
                    </section>

                    <section id="contact" className="max-w-7xl mx-auto pt-12 pb-20 px-6 bg-navy/5 rounded-3xl mt-4 text-left">
                        <div className="grid lg:grid-cols-2 gap-12 items-start text-left">
                            <div>
                                <SectionHeading centered={false}>Get In <span className="text-green">Touch</span></SectionHeading>

                                <p className="text-lg md:text-xl text-gray-700 font-medium mb-10 max-w-lg">
                                    {content.contact.subtitle}
                                </p>

                                <div className="space-y-4">
                                    {content.contact.details.map((detail: any, idx: number) => (
                                        <motion.div
                                            key={detail?.id || detail?.title || idx}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="flex items-center gap-4 bg-white p-4 rounded-3xl border border-white/50 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all group overflow-hidden relative"
                                        >
                                            <div className="absolute left-0 top-0 h-full w-1 bg-gold scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300" />
                                            <div className="bg-navy w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-white group-hover:bg-navy-dark transition-all duration-300 group-hover:scale-110 shadow-lg flex-shrink-0">
                                                {detail.icon === 'email' && <Mail size={20} className="md:w-6 md:h-6" />}
                                                {detail.icon === 'phone' && <Phone size={20} className="md:w-6 md:h-6" />}
                                                {detail.icon === 'location' && <MapPin size={20} className="md:w-6 md:h-6" />}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <p className="text-[10px] font-black text-gold uppercase tracking-[0.2em] mb-1 truncate">
                                                    {detail.label}
                                                </p>
                                                <p className="text-sm md:text-xl font-bold text-navy group-hover:text-gold transition-colors duration-300 break-words">
                                                    {detail.value}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <ContactForm />
                        </div>
                    </section>
                </section>
            </main>

            <AnimatePresence>
                {selectedLeader && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                        onClick={() => setSelectedLeader(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
                            className="bg-white rounded-[2rem] shadow-2xl w-full max-w-3xl overflow-hidden relative border border-white/20 flex flex-col md:flex-row max-h-[90vh] md:max-h-[600px]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedLeader(null)}
                                className="absolute top-4 right-4 z-20 p-2.5 bg-black/5 hover:bg-black/10 rounded-full transition-colors text-gray-700"
                            >
                                <X size={20} />
                            </button>

                            {/* Left Side: Leader Portrait */}
                            <div className="w-full md:w-1/3 bg-navy relative h-56 md:h-auto shrink-0">
                                <Image
                                    src={selectedLeader.image}
                                    alt={selectedLeader.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent md:bg-gradient-to-r md:from-transparent md:via-navy/30 md:to-navy/90"></div>
                            </div>

                            {/* Right Side: Message Content */}
                            <div className="p-8 md:p-10 flex-1 flex flex-col justify-start text-left relative overflow-y-auto">
                                <motion.div 
                                    animate={{ y: [-5, 5, -5] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute top-4 right-8 text-gold/10 pointer-events-none"
                                >
                                    <Quote size={100} style={{ transform: 'rotate(180deg)' }} />
                                </motion.div>
                                <h3 className="text-2xl font-bold text-navy mb-1">{selectedLeader.name}</h3>
                                <p className="text-gold font-bold uppercase text-xs tracking-widest mb-6">{selectedLeader.role}</p>
                                <div className="border-t border-ice-border pt-4">
                                    <p className="text-gray-700 leading-relaxed font-serif italic text-base md:text-lg whitespace-pre-line">
                                        "{selectedLeader.message}"
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </motion.div>
    );
};

export default Home;