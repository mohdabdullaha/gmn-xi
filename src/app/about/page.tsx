"use client";
import React, { useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PremiumHero from "@/components/PremiumHero";
import SectionHeading from "@/components/SectionHeading";
import { content } from "@/data/content";
import { motion, Variants } from 'framer-motion';
import { Quote, Award, Shield, Users } from 'lucide-react';

const About: React.FC = () => {
    const { projectTeam } = content;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen flex flex-col bg-white"
        >
            <Navbar pageTitle="About Us" />

            <main className="flex-grow">
                {/* Hero Section */}
                <PremiumHero 
                    image="/img.jpg"
                    title={
                        <>
                            <span className="block drop-shadow-2xl">Our Vision &</span>
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gold inline-block drop-shadow-2xl">
                                Leadership Team
                            </span>
                        </>
                    }
                    subtitle="About Us"
                    intro="Bridging knowledge with character to shape morally conscious leaders and inspire positive social transformation."
                />

                {/* Introduction Section */}
                <section className="max-w-4xl mx-auto px-6 py-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <h2 className="text-3xl font-serif text-navy font-bold">The GIFT Moral Nexus Project</h2>
                        <div className="w-16 h-1 bg-gold mx-auto rounded-full my-4"></div>
                        <p className="text-xl text-gray-700 leading-relaxed font-medium italic">
                            "A platform designed to instill foundational ethics, spiritual growth, and professional integrity."
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Established under the Department of Islamic Studies at GIFT University, the Moral Nexus Project serves as a bridge between moral knowledge and daily character. Our comprehensive framework integrates Timeless Quranic Wisdom and Prophetic Sunnah with modern reflective practices, ethical dilemmas, and active pledges. We strive to empower our youth to face challenges with courage, act with fairness, and live lives of profound purpose.
                        </p>
                    </motion.div>
                </section>

                {/* Leadership Messages Section */}
                <section className="bg-ice/20 py-20 px-6 border-t border-b border-ice-border/40">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <SectionHeading>
                                Leadership <span className="text-green">Messages</span>
                            </SectionHeading>
                            <p className="text-gray-500 mt-4 text-lg max-w-xl mx-auto">
                                Inspiring thoughts and guidance from the leadership of GIFT University and the Project Team.
                            </p>
                        </div>

                        <div className="space-y-24">
                            {projectTeam.leadership.map((leader: any, index: number) => {
                                const isEven = index % 2 === 0;
                                return (
                                    <motion.div
                                        key={leader?.id || leader?.title || index}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.2 }}
                                        transition={{ duration: 0.7, ease: "easeOut" }}
                                        className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 ${
                                            isEven ? '' : 'lg:flex-row-reverse'
                                        }`}
                                    >
                                        {/* Leader Photo */}
                                        <div className="w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 shrink-0 relative group rounded-[2rem] overflow-hidden shadow-xl border-4 border-white cursor-pointer">
                                            <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-50 group-hover:opacity-0 transition-opacity duration-300 z-10"></div>
                                            <img
                                                src={leader.image}
                                                alt={leader.name}
                                                className="w-full h-full object-cover object-top relative z-0 transition-transform duration-700 group-hover:scale-110"
                                            />
                                            
                                            {/* Decorative Elements - small blue bar by default */}
                                            <div className="absolute bottom-0 left-0 w-full h-2 bg-navy z-20 transition-transform duration-500 group-hover:translate-y-full"></div>

                                            {/* The Hover Bar displaying name */}
                                            <div className="absolute bottom-0 left-0 w-full bg-navy/95 border-t-4 border-gold p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-30 flex flex-col items-center justify-center">
                                                <h4 className="text-lg font-bold text-white text-center">
                                                    {leader.name}
                                                </h4>
                                                <div className="h-0.5 w-8 bg-gold my-1.5 rounded-full"></div>
                                                <p className="text-xs font-semibold text-ice uppercase tracking-wider text-center">
                                                    {leader.role}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Message Content */}
                                        <div className="flex-grow text-left relative">
                                            <motion.div 
                                                animate={{ y: [-5, 5, -5] }}
                                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                                className="absolute -top-6 -left-6 text-gold/15 pointer-events-none"
                                            >
                                                <Quote size={80} style={{ transform: 'rotate(180deg)' }} />
                                            </motion.div>

                                            <h3 className="text-2xl font-bold text-navy mb-1 relative z-10">{leader.name}</h3>
                                            <p className="text-gold font-bold uppercase text-xs tracking-widest mb-6 relative z-10">
                                                {leader.role}
                                            </p>

                                            <motion.div 
                                                whileHover={{ y: -5 }}
                                                transition={{ duration: 0.3 }}
                                                className="bg-white border border-ice-border p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all relative z-10 overflow-hidden"
                                            >
                                                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-navy to-gold"></div>
                                                <p className="text-gray-700 leading-relaxed text-lg font-serif whitespace-pre-line italic">
                                                    "{leader.message}"
                                                </p>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Core Team Members Section */}
                <section className="max-w-7xl mx-auto px-6 py-20">
                    <div className="text-center mb-16">
                        <SectionHeading>
                            Meet Our Core <span className="text-green">Team</span>
                        </SectionHeading>
                        <p className="text-gray-500 mt-4 text-lg max-w-xl mx-auto">
                            The dedicated professionals driving research, development, and execution of the GIFT Moral Nexus.
                        </p>
                    </div>

                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6"
                    >
                        {projectTeam.team.map((member: any, index: number) => (
                            <motion.div
                                key={member?.id || member?.title || index}
                                variants={itemVariants}
                                className="group relative rounded-[1.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-[300px] cursor-pointer"
                            >
                                {/* Background Image */}
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                                />
                                
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

                                {/* Small blue bar visible by default at bottom */}
                                <div className="absolute bottom-0 left-0 w-full h-2 bg-navy z-20 transition-transform duration-500 group-hover:translate-y-full"></div>

                                {/* Blue Bar below the image effect (Slides up on hover) */}
                                <div className="absolute bottom-0 left-0 w-full bg-navy/95 border-t-4 border-gold p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-30 flex flex-col items-center justify-center">
                                    <h4 className="text-lg font-bold text-white text-center">
                                        {member.name}
                                    </h4>
                                    <div className="h-0.5 w-8 bg-gold my-2 rounded-full"></div>
                                    <p className="text-xs font-semibold text-ice uppercase tracking-wider text-center">
                                        {member.role}
                                    </p>
                                </div>

                                {/* Persistent Info has been completely removed so only the image shows before hover */}
                            </motion.div>
                        ))}
                    </motion.div>
                </section>
            </main>

            <Footer />
        </motion.div>
    );
};

export default About;
