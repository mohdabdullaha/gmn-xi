"use client";
import React, { ReactNode } from 'react';
import Link from 'next/link';

import { motion, Variants } from 'framer-motion';
import { content } from "@/data/content";
import {
    BookOpen, Star, MessageCircle, Heart, Flame, ArrowRight,
    Scale, Users, Award, FileText
} from 'lucide-react';

const defaultImg = '/img.jpg';

// ── Types ─────────────────────────────────────────────────────
interface Card {
  id: string;
  title: string;
  desc: string;
  path: string;
}

interface NavGridProps {
  excludeId?: string;
  section?: string;
  showTitle?: boolean;
}

// Icon map for all card IDs across the site
const iconMap: Record<string, ReactNode> = {
    // Cardinal Virtues
    truthfulness:         <Flame size={22} className="text-white" />,
    quran:                <BookOpen size={22} className="text-white" />,
    sunnah:               <Star size={22} className="text-white" />,
    questions:            <MessageCircle size={22} className="text-white" />,
    dilemmas:             <Scale size={22} className="text-white" />,
    mirror:               <Heart size={22} className="text-white" />,
    roleplay:             <Users size={22} className="text-white" />,
    pledge:               <Award size={22} className="text-white" />,
    razehayat:            <Flame size={22} className="text-white" />,
    'razehayat-aaghaz':   <Flame size={22} className="text-white" />,
    'razehayat-bamaqsd-zindagi': <Flame size={22} className="text-white" />,
    'razehayat-tameer-ki-fatah': <Flame size={22} className="text-white" />,
    'razehayat-khwab-main': <Flame size={22} className="text-white" />,
    'razehayat-rawaji-zehan': <Flame size={22} className="text-white" />,
    'razehayat-sanbhal-kar-chaliye': <Flame size={22} className="text-white" />,
    'razehayat-maqsadiyat': <Flame size={22} className="text-white" />,
    'razehayat-namuwafiq-halaat': <Flame size={22} className="text-white" />,
    'razehayat-tutne-ke-baad': <Flame size={22} className="text-white" />,
    'razehayat-qudrat-ka-nizam': <Flame size={22} className="text-white" />,
    'razehayat-shahad-ka-sabaq': <Flame size={22} className="text-white" />,
    'razehayat-sarak-ka-sabaq': <Flame size={22} className="text-white" />,
    'razehayat-kuch-aur-karna-hai': <Flame size={22} className="text-white" />,
    'razehayat-qudrat-ka-sabaq': <Flame size={22} className="text-white" />,
    // Love for Learning
    'lfl-quran':          <BookOpen size={22} className="text-white" />,
    'lfl-sunnah':         <Star size={22} className="text-white" />,
    'lfl-questions':      <MessageCircle size={22} className="text-white" />,
    'lfl-dilemmas':       <Scale size={22} className="text-white" />,
    'lfl-mirror':         <Heart size={22} className="text-white" />,
    'lfl-roleplay':       <Users size={22} className="text-white" />,
    'lfl-pledge':         <Award size={22} className="text-white" />,
    // Curiosity
    'curiosity-concept':     <Flame size={22} className="text-white" />,
    'curiosity-quran':       <BookOpen size={22} className="text-white" />,
    'curiosity-sunnah':      <Star size={22} className="text-white" />,
    'curiosity-questions':   <MessageCircle size={22} className="text-white" />,
    'curiosity-dilemmas':    <Scale size={22} className="text-white" />,
    'curiosity-mirror':      <Heart size={22} className="text-white" />,
    'curiosity-roleplay':    <Users size={22} className="text-white" />,
    'curiosity-pledge':      <Award size={22} className="text-white" />,
    // Creativity
    'creativity-quran':      <BookOpen size={22} className="text-white" />,
    'creativity-sunnah':     <Star size={22} className="text-white" />,
    'creativity-questions':  <MessageCircle size={22} className="text-white" />,
    'creativity-dilemmas':   <Scale size={22} className="text-white" />,
    'creativity-mirror':     <Heart size={22} className="text-white" />,
    'creativity-roleplay':   <Users size={22} className="text-white" />,
    'creativity-pledge':     <Award size={22} className="text-white" />,

    // Home
    'cardinal-virtues':   <Heart size={22} className="text-white" />,
    infographics:         <FileText size={22} className="text-white" />,
    videos:               <Star size={22} className="text-white" />,
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.08, duration: 0.45, ease: 'easeOut' },
    }),
};

const NavGrid: React.FC<NavGridProps> = ({ excludeId, section, showTitle = true }) => {
    let cards: Card[] = [];

    if (section === 'cardinalVirtues') {
        cards = content.cardinalVirtuesCards as Card[];
    } else if (section === 'loveForLearning') {
        cards = [
            { id: 'lfl-quran',     title: "Qur'an on Love for Learning",  desc: 'Divine verses on knowledge',       path: '/cardinal-virtues/wisdom/love-for-learning/quran' },
            { id: 'lfl-sunnah',    title: 'Prophetic Guidance',           desc: 'Hadith on seeking knowledge',       path: '/cardinal-virtues/wisdom/love-for-learning/sunnah' },
            { id: 'lfl-questions', title: 'Reflective Questions',         desc: 'In-depth personal reflection',      path: '/cardinal-virtues/wisdom/love-for-learning/questions' },
            { id: 'lfl-dilemmas',  title: 'Dilemmas',                     desc: 'Real-world learning choices',       path: '/cardinal-virtues/wisdom/love-for-learning/dilemmas' },
            { id: 'lfl-mirror',    title: 'Mirror Moments',               desc: 'Personal habit reflection',         path: '/cardinal-virtues/wisdom/love-for-learning/mirror' },
            { id: 'lfl-roleplay',  title: 'Role Play',                    desc: 'Interactive learning exercise',     path: '/cardinal-virtues/wisdom/love-for-learning/roleplay' },
            { id: 'lfl-pledge',    title: 'Learning Pledge',              desc: 'Commit to lifelong learning',       path: '/cardinal-virtues/wisdom/love-for-learning/pledge' },
        ];
    } else if (section === 'curiosity') {
        cards = [
            { id: 'curiosity-quran',     title: "Qur'an on Curiosity",        desc: 'Divine verses on exploration',      path: '/cardinal-virtues/wisdom/curiosity/quran' },
            { id: 'curiosity-sunnah',    title: 'Prophetic Guidance',          desc: 'Hadith on seeking knowledge',       path: '/cardinal-virtues/wisdom/curiosity/sunnah' },
            { id: 'curiosity-questions', title: 'Reflective Questions',        desc: 'In-depth personal reflection',      path: '/cardinal-virtues/wisdom/curiosity/questions' },
            { id: 'curiosity-dilemmas',  title: 'Dilemmas',                     desc: 'Real-world curiosity choices',      path: '/cardinal-virtues/wisdom/curiosity/dilemmas' },
            { id: 'curiosity-mirror',    title: 'Mirror Moments',              desc: 'Self-awareness reflection',         path: '/cardinal-virtues/wisdom/curiosity/mirror' },
            { id: 'curiosity-roleplay',  title: 'Role Play',                   desc: 'Interactive asking exercise',       path: '/cardinal-virtues/wisdom/curiosity/roleplay' },
            { id: 'curiosity-pledge',    title: 'Curiosity Pledge',            desc: 'Commit to lifelong curiosity',      path: '/cardinal-virtues/wisdom/curiosity/pledge' },
        ];
    } else if (section === 'creativity') {
        cards = [
            { id: 'creativity-quran',     title: "Qur'an on Creativity",         desc: 'Divine verses on reflection',       path: '/cardinal-virtues/wisdom/creativity/quran' },
            { id: 'creativity-sunnah',    title: 'Prophetic Guidance',           desc: 'Hadith on strategic innovation',    path: '/cardinal-virtues/wisdom/creativity/sunnah' },
            { id: 'creativity-questions', title: 'Reflective Questions',         desc: 'In-depth personal reflection',      path: '/cardinal-virtues/wisdom/creativity/questions' },
            { id: 'creativity-dilemmas',  title: 'Dilemmas',             desc: 'Real-world creative choices',       path: '/cardinal-virtues/wisdom/creativity/dilemmas' },
            { id: 'creativity-mirror',    title: 'Mirror Moments',               desc: 'Reflect on creative courage',       path: '/cardinal-virtues/wisdom/creativity/mirror' },
            { id: 'creativity-roleplay',  title: 'Role Play',                    desc: 'Interactive sharing exercise',      path: '/cardinal-virtues/wisdom/creativity/roleplay' },
            { id: 'creativity-pledge',    title: 'Creativity Pledge',            desc: 'Commit to creative growth',         path: '/cardinal-virtues/wisdom/creativity/pledge' },
        ];
    } else if (section === 'truthfulness') {
        cards = [
            { id: 'quran',     title: "Qur'an on Truthfulness",  desc: 'Divine verses on truth',            path: '/cardinal-virtues/courage/truthfulness/quran' },
            { id: 'sunnah',    title: 'Prophetic Guidance',      desc: 'Hadith on honesty',                 path: '/cardinal-virtues/courage/truthfulness/sunnah' },
            { id: 'questions', title: 'Reflective Questions',    desc: 'Think deeply about integrity',      path: '/cardinal-virtues/courage/truthfulness/questions' },
            { id: 'dilemmas',  title: 'Truthfulness Dilemmas',   desc: 'Real-world ethical scenarios',      path: '/cardinal-virtues/courage/truthfulness/dilemmas' },
            { id: 'mirror',    title: 'Mirror Moments',          desc: 'Personal reflection on honesty',    path: '/cardinal-virtues/courage/truthfulness/mirror' },
            { id: 'roleplay',  title: 'Role Play',               desc: 'Interactive truthfulness practice', path: '/cardinal-virtues/courage/truthfulness/roleplay' },
            { id: 'pledge',    title: 'The Moral Pledge',        desc: 'Commit to a life of integrity',     path: '/cardinal-virtues/courage/truthfulness/pledge' },
            { id: 'zindagiKSabaq', title: 'Art of Life',       desc: 'The secret to a fulfilling life',   path: '/cardinal-virtues/courage/truthfulness/zindagi-k-sabaq' },
        ];
    } else if (section === 'perseverance') {
        cards = [
            { id: 'quran',     title: "Qur'an on Perseverance",  desc: 'Divine verses on perseverance',     path: '/cardinal-virtues/courage/perseverance/quran' },
            { id: 'sunnah',    title: 'Prophetic Guidance',      desc: 'Hadith on steadfastness',           path: '/cardinal-virtues/courage/perseverance/sunnah' },
            { id: 'questions', title: 'Reflective Questions',    desc: 'Think deeply about persistence',    path: '/cardinal-virtues/courage/perseverance/questions' },
            { id: 'dilemmas',  title: 'Perseverance Dilemmas',   desc: 'Real-world ethical scenarios',      path: '/cardinal-virtues/courage/perseverance/dilemmas' },
            { id: 'mirror',    title: 'Mirror Moments',          desc: 'Personal reflection on resilience', path: '/cardinal-virtues/courage/perseverance/mirror' },
            { id: 'roleplay',  title: 'Role Play',               desc: 'Interactive perseverance practice', path: '/cardinal-virtues/courage/perseverance/roleplay' },
            { id: 'pledge',    title: 'The Moral Pledge',        desc: 'Commit to a life of perseverance',  path: '/cardinal-virtues/courage/perseverance/pledge' },
        ];
    } else if (section === 'selfRegulation') {
        cards = [
            { id: 'quran',     title: "Qur'an on Self-Regulation", desc: 'Divine verses on self-control',      path: '/cardinal-virtues/temperance/self-regulation/quran' },
            { id: 'sunnah',    title: 'Prophetic Guidance',        desc: 'Hadith on self-discipline',          path: '/cardinal-virtues/temperance/self-regulation/sunnah' },
            { id: 'questions', title: 'Reflective Questions',      desc: 'Think deeply about self-control',    path: '/cardinal-virtues/temperance/self-regulation/questions' },
            { id: 'dilemmas',  title: 'Self-Regulation Dilemmas',  desc: 'Real-world self-control scenarios',  path: '/cardinal-virtues/temperance/self-regulation/dilemmas' },
            { id: 'mirror',    title: 'Mirror Moments',            desc: 'Personal reflection on discipline',  path: '/cardinal-virtues/temperance/self-regulation/mirror' },
            { id: 'roleplay',  title: 'Role Play',                 desc: 'Interactive self-regulation practice', path: '/cardinal-virtues/temperance/self-regulation/roleplay' },
            { id: 'pledge',    title: 'The Moral Pledge',          desc: 'Commit to a life of self-discipline', path: '/cardinal-virtues/temperance/self-regulation/pledge' },
        ];
    } else if (section === 'leadership') {
        cards = [
            { id: 'quran',     title: "Qur'an on Leadership",  desc: 'Divine verses on trust & justice',      path: '/cardinal-virtues/justice/leadership/quran' },
            { id: 'sunnah',    title: 'Prophetic Guidance',    desc: 'Hadith on responsibility & protection',  path: '/cardinal-virtues/justice/leadership/sunnah' },
            { id: 'questions', title: 'Reflective Questions',  desc: 'Think deeply about leadership qualities', path: '/cardinal-virtues/justice/leadership/questions' },
            { id: 'dilemmas',  title: 'Leadership Dilemmas',   desc: 'Real-world ethical scenarios',          path: '/cardinal-virtues/justice/leadership/dilemmas' },
            { id: 'mirror',    title: 'Mirror Moments',        desc: 'Personal reflection on leading others', path: '/cardinal-virtues/justice/leadership/mirror' },
            { id: 'roleplay',  title: 'Role Play',             desc: 'Interactive leadership practice',       path: '/cardinal-virtues/justice/leadership/roleplay' },
            { id: 'pledge',    title: 'The Leadership Pledge',  desc: 'Commit to being a responsible leader',  path: '/cardinal-virtues/justice/leadership/pledge' },
        ];
    } else if (section === 'fairness') {
        cards = [
            { id: 'quran',     title: "Qur'an on Fairness",    desc: 'Divine verses on justice & equity',      path: '/cardinal-virtues/justice/fairness/quran' },
            { id: 'sunnah',    title: 'Prophetic Guidance',    desc: 'Hadith on economic rights & family fairness', path: '/cardinal-virtues/justice/fairness/sunnah' },
            { id: 'questions', title: 'Reflective Questions',  desc: 'Think deeply about fairness in daily life', path: '/cardinal-virtues/justice/fairness/questions' },
            { id: 'dilemmas',  title: 'Fairness Dilemmas',     desc: 'Real-world ethical scenarios',          path: '/cardinal-virtues/justice/fairness/dilemmas' },
            { id: 'mirror',    title: 'Mirror Moments',        desc: 'Personal reflection on treating others fairly', path: '/cardinal-virtues/justice/fairness/mirror' },
            { id: 'roleplay',  title: 'Role Play',             desc: 'Interactive decision-making simulation', path: '/cardinal-virtues/justice/fairness/roleplay' },
            { id: 'pledge',    title: 'The Fairness Pledge',   desc: 'Commit to treating everyone with equality', path: '/cardinal-virtues/justice/fairness/pledge' },
        ];
    } else if (section === 'teamWork') {
        cards = [
            { id: 'quran',     title: "Qur'an on Team Work",   desc: 'Divine verses on unity & cooperation',      path: '/cardinal-virtues/justice/team-work/quran' },
            { id: 'sunnah',    title: 'Prophetic Guidance',    desc: 'Hadith on mutual support & shared responsibility', path: '/cardinal-virtues/justice/team-work/sunnah' },
            { id: 'questions', title: 'Reflective Questions',  desc: 'Think deeply about team work in daily life', path: '/cardinal-virtues/justice/team-work/questions' },
            { id: 'dilemmas',  title: 'Team Work Dilemmas',    desc: 'Real-world ethical scenarios',          path: '/cardinal-virtues/justice/team-work/dilemmas' },
            { id: 'mirror',    title: 'Mirror Moments',        desc: 'Personal reflection on collaboration', path: '/cardinal-virtues/justice/team-work/mirror' },
            { id: 'roleplay',  title: 'Role Play',             desc: 'Interactive decision-making simulation', path: '/cardinal-virtues/justice/team-work/roleplay' },
            { id: 'pledge',    title: 'The Team Work Pledge',  desc: 'Commit to being a reliable team member', path: '/cardinal-virtues/justice/team-work/pledge' },
        ];
    } else if (section === 'zindagiKSabaq') {
        cards = content.zindagiKSabaqCards as Card[];
    } else {
        cards = content.home.cards as Card[];
    }

    const allCards = section === 'zindagiKSabaq' ? (content.zindagiKSabaqCards as Card[]) : 
                    section === 'cardinalVirtues' ? (content.cardinalVirtuesCards as Card[]) : cards;

    const filteredCards = allCards.filter(card => card.id !== excludeId);

    return (
        <div className="mt-14 mb-10">
            {showTitle && (
                <h3 className="text-green text-3xl font-bold mb-8 tracking-wide text-center uppercase">
                    Explore More
                </h3>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 max-w-7xl mx-auto">
                {filteredCards.map((card) => {
                    const originalIndex = allCards.findIndex(c => c.id === card.id);
                    return (
                        <motion.div
                            key={card.id}
                            custom={originalIndex}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <Link
                                href={card.path}
                                className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 hover:border-gold/30 transition-all duration-500 transform hover:-translate-y-3"
                            >
                                {/* Card Image */}
                                <div className="relative h-40 overflow-hidden">
                                    <img
                                        src={defaultImg}
                                        alt={card.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />

                                    {/* Icon bubble */}
                                    <div className="absolute top-3 right-3 bg-green/90 p-2 rounded-xl shadow-lg backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                                        {iconMap[card.id] || <Star size={22} className="text-white" />}
                                    </div>

                                    {/* Card number */}
                                    <div className="absolute bottom-2 left-3 text-white/30 text-4xl font-black leading-none select-none">
                                        {String(originalIndex + 1).padStart(2, '0')}
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-4 flex-grow flex flex-col justify-between">
                                    <div>
                                        <h4 className={`text-base font-bold text-navy group-hover:text-green transition-colors duration-300 mb-1.5 leading-snug ${card.title && /[\u0600-\u06FF]/.test(card.title) ? 'font-urdu text-xl' : ''}`}>
                                            {card.title}
                                        </h4>
                                        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                                            {card.desc}
                                        </p>
                                </div>
                                <div className="mt-3 flex items-center gap-1.5 text-green text-xs font-bold opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-300">
                                    Explore <ArrowRight size={13} />
                                </div>
                            </div>
                        </Link>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default NavGrid;
