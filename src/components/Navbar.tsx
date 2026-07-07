"use client";
import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';


import { content } from "@/data/content";
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────
interface NavItem {
    title: string;
    path: string;
    children?: NavItem[];
}

/* ─────────────────────────────────────────────────────────
   Nav structure — add `children` for dropdown sub-links
 ───────────────────────────────────────────────────────── */
const navLinks = [
    { title: 'Home', path: '/' },
    {
        title: 'Cardinal Virtues',
        path: '/cardinal-virtues',
        children: [
            {
                title: 'Ilm o Hikmah / Knowledge & Wisdom',
                path: '/cardinal-virtues/wisdom',
                children: [
                    { title: 'Love for Learning', path: '/cardinal-virtues/wisdom/love-for-learning' },
                    { title: 'Curiosity', path: '/cardinal-virtues/wisdom/curiosity' },
                    { title: 'Creativity', path: '/cardinal-virtues/wisdom/creativity' },
                ],
            },
            {
                title: 'Adl / Justice',
                path: '/cardinal-virtues/justice',
                children: [
                    { title: 'Fairness', path: '/cardinal-virtues/justice/fairness' },
                    { title: 'Team Work', path: '/cardinal-virtues/justice/team-work' },
                    { title: 'Leadership', path: '/cardinal-virtues/justice/leadership' },
                ],
            },
            {
                title: 'Shujah / Courage',
                path: '/cardinal-virtues/courage',
                children: [
                    { title: 'Truthfulness', path: '/cardinal-virtues/courage/truthfulness' },
                    { title: 'Honesty', path: '/cardinal-virtues/courage/honesty' },
                    { title: 'Perseverance', path: '/cardinal-virtues/courage/perseverance' },
                ],
            },
            {
                title: 'Iffah / Temperance',
                path: '/cardinal-virtues/temperance',
                children: [
                    { title: 'Self-Regulation', path: '/cardinal-virtues/temperance/self-regulation' },
                    { title: 'Modesty', path: '/cardinal-virtues/temperance/modesty' },
                    { title: 'Chastity', path: '/cardinal-virtues/temperance/chastity' },
                ],
            },
        ],
    },
    {
        title: 'Spiritual Virtues',
        path: '/spiritual-virtues',
        children: [
            {
                title: 'Tawakkul / Faith in Allah',
                path: '/spiritual-virtues/tawakkul',
            },
            {
                title: 'Ikhlas / Sincerity',
                path: '/spiritual-virtues/ikhlas',
            },
            {
                title: 'Shukr / Gratitude',
                path: '/spiritual-virtues/shukr',
            },
            {
                title: 'Tawadu / Humility',
                path: '/spiritual-virtues/tawadu',
            },
            {
                title: 'Sabr / Patience',
                path: '/spiritual-virtues/sabr',
            },
            {
                title: 'Karam / Generosity & Charity',
                path: '/spiritual-virtues/karam',
            },
        ],
    },

    { title: 'Art of Life', path: '/zindagi-k-sabaq' },
    { title: 'Infographics', path: '/infographics' },
    { title: 'Motivational Videos', path: '/videos' },
    { title: 'About Us', path: '/about' },
];

/* ─────────────────────────────────────────────────────────
   Desktop dropdown item
 ───────────────────────────────────────────────────────── */
const DesktopDropdown = ({ link }: { link: NavItem }) => {
    const [open, setOpen] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const pathname = usePathname();

    const isParentActive =
        pathname === link.path ||
        (link.children && link.children.some((c: NavItem) => pathname === c.path));

    const handleMouseEnter = () => {
        clearTimeout(timeoutRef.current);
        setOpen(true);
    };
    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => setOpen(false), 150);
    };

    if (!link.children) {
        return (
            <Link
                href={link.path}
                className={`flex items-center px-4 lg:px-5 h-full text-[13px] font-bold tracking-widest transition-all whitespace-nowrap border-b-2 ${isParentActive
                        ? 'text-gold border-gold bg-white/5'
                        : 'text-white/80 hover:text-white border-transparent hover:border-white/30'
                    }`}
            >
                {link.title}
            </Link>
        );
    }

    return (
        <div
            className="relative h-full"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Parent button */}
            <Link
                href={link.path}
                className={`flex items-center gap-1.5 px-4 lg:px-5 h-full text-[13px] font-bold tracking-widest transition-all whitespace-nowrap border-b-2 ${isParentActive
                    ? 'text-gold border-gold bg-white/5'
                    : 'text-white/80 hover:text-white border-transparent hover:border-white/30'
                    }`}
            >
                {link.title}
                <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${open ? 'rotate-180 text-gold' : ''}`}
                />
            </Link>

            {/* Dropdown panel */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-0 z-[200] min-w-[280px] bg-navy-dark border border-white/10 rounded-b-xl shadow-2xl py-2 overflow-visible"
                    >
                        {link.children.map((child) => (
                            <ChildDropdownItem key={child.path} child={child} onClose={() => setOpen(false)} />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

/* Sub-item with optional nested flyout */
const ChildDropdownItem = ({ child, onClose }: { child: NavItem; onClose: () => void }) => {
    const [subOpen, setSubOpen] = useState(false);
    const subTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const pathname = usePathname();
    const isActive = pathname === child.path || (child.children && child.children.some((c: NavItem) => pathname === c.path));

    const handleMouseEnter = () => {
        clearTimeout(subTimeoutRef.current);
        setSubOpen(true);
    };
    const handleMouseLeave = () => {
        subTimeoutRef.current = setTimeout(() => setSubOpen(false), 150);
    };

    return (
        <div
            className="relative group/child"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Link
                href={child.path}
                onClick={onClose}
                className={`flex items-center justify-between gap-3 px-6 py-3.5 text-[13px] font-semibold tracking-wide transition-all border-l-2 w-full ${isActive
                    ? 'text-gold border-gold bg-white/10'
                    : 'text-white/80 border-transparent hover:text-white hover:bg-white/5 hover:border-gold/50'
                    }`}
            >
                <span className="flex items-center gap-3 pr-2">
                    <ChevronRight size={14} className={`shrink-0 transition-colors ${isActive ? 'text-gold' : 'opacity-40 group-hover/child:opacity-100 group-hover/child:text-gold'}`} />
                    <span className="leading-tight text-left">{child.title}</span>
                </span>
                {child.children && (
                    <ChevronRight size={14} className={`opacity-50 shrink-0 transition-transform ${subOpen ? 'rotate-90 text-gold opacity-100' : ''}`} />
                )}
            </Link>

            {/* Nested flyout */}
            <AnimatePresence>
                {child.children && subOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -5 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-[-12px] left-full z-[300] min-w-[220px] bg-navy-dark border border-white/10 rounded-xl shadow-2xl py-2 ml-1 overflow-hidden"
                    >
                        {child.children.map((sub) => (
                            <Link
                                key={sub.path}
                                href={sub.path}
                                onClick={onClose}
                                className={`flex items-center gap-3 px-6 py-3 text-[13px] font-semibold tracking-wide transition-all border-l-2 ${isActive
                                        ? 'text-gold border-gold bg-white/10'
                                        : 'text-white/80 border-transparent hover:text-white hover:bg-white/5 hover:border-gold/50'
                                    }`}
                            >
                                <ChevronRight size={14} className={`shrink-0 transition-colors ${isActive ? 'text-gold' : 'opacity-40 hover:opacity-100'}`} />
                                <span className="leading-tight text-left">{sub.title}</span>
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};


/* ─────────────────────────────────────────────────────────
   Mobile accordion item
 ───────────────────────────────────────────────────────── */
const MobileAccordion = ({ link, onClose, level = 0 }: { link: NavItem; onClose: () => void; level?: number }) => {
    const [expanded, setExpanded] = useState(false);
    const pathname = usePathname();

    const isParentActive =
        pathname === link.path ||
        (link.children && link.children.some((c: NavItem) => pathname === c.path));

    if (!link.children) {
        return (
            <Link
                href={link.path}
                onClick={onClose}
                className={`${level === 0 ? 'px-6 py-4 rounded-xl text-base font-bold' : 'px-4 py-3 rounded-lg text-sm font-semibold'} tracking-wider transition-all border-l-4 block ${isParentActive
                        ? 'text-gold border-gold bg-white/10 shadow-inner'
                        : 'text-white/70 border-transparent hover:bg-white/5'
                    }`}
            >
                {level > 0 && <ChevronRight size={12} className="inline-block opacity-50 mr-2" />}
                {link.title}
            </Link>
        );
    }

    return (
        <div>
            {/* Accordion header */}
            <div
                className={`flex items-center justify-between ${level === 0 ? 'px-6 py-4 rounded-xl text-base' : 'px-4 py-3 rounded-lg text-sm'} font-bold tracking-wider cursor-pointer transition-all border-l-4 select-none ${isParentActive
                    ? 'text-gold border-gold bg-white/10'
                    : 'text-white/70 border-transparent hover:bg-white/5'
                    }`}
                onClick={() => setExpanded(!expanded)}
            >
                <div className="flex items-center gap-2 flex-1">
                    {level > 0 && <ChevronRight size={12} className="opacity-50 shrink-0" />}
                    <Link
                        href={link.path}
                        onClick={(e) => { e.stopPropagation(); onClose(); }}
                        className="flex-1"
                    >
                        {link.title}
                    </Link>
                </div>
                <ChevronDown
                    size={level === 0 ? 18 : 14}
                    className={`transition-transform duration-300 shrink-0 ml-2 ${expanded ? 'rotate-180' : ''}`}
                />
            </div>

            {/* Accordion body */}
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className={`ml-4 mt-1 mb-2 border-l border-white/10 pl-3 space-y-1 overflow-hidden`}
                    >
                        {link.children.map((child) => (
                            <MobileAccordion key={child.path} link={child} onClose={onClose} level={level + 1} />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

/* ─────────────────────────────────────────────────────────
   Main Navbar
 ───────────────────────────────────────────────────────── */
const Navbar = ({ pageTitle }: { pageTitle?: string }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolledDown, setIsScrolledDown] = useState(false);
    const closeMenu = () => setIsMenuOpen(false);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (Math.abs(currentScrollY - lastScrollY) < 15) return;
            if (currentScrollY > lastScrollY && currentScrollY > 150) {
                setIsScrolledDown(true);
            } else if (currentScrollY < lastScrollY) {
                setIsScrolledDown(false);
            }
            lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* Layout Spacer to prevent content from jumping */}
            <div className="h-[70px] md:h-[128px] w-full" />

            <nav
                className="w-full shadow-lg z-50 fixed top-0 bg-navy transition-all duration-300 h-auto overflow-visible"
            >
                {/* ── Top Header Row (Always Visible) ── */}
                <div className="relative bg-gradient-to-r from-[#081225] via-[#0E1F3B] to-[#081225] text-white px-4 md:px-8 lg:px-10 py-3 md:py-5 flex items-center justify-between gap-3 shadow-[0_4px_30px_rgba(0,0,0,0.4)] h-[70px] md:h-[80px] z-30">
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-70"></div>

                    {/* Left Side: Logo */}
                    <div className="flex items-center z-10 shrink-0">
                        <Link href="/" onClick={closeMenu} className="flex items-center group">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gold blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-full"></div>
                                <img src="/assets/logo/GMN-Starburst.png" alt="Logo" className="h-[45px] md:h-[55px] lg:h-[65px] transition-transform duration-500 ease-out group-hover:scale-105 relative z-10" />
                            </div>
                        </Link>
                    </div>

                    {/* Center: Site Title */}
                    <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-auto pointer-events-none text-center px-4">
                        <h2 className="text-sm md:text-xl lg:text-3xl font-black uppercase tracking-[0.1em] md:tracking-[0.3em] font-serif bg-clip-text text-transparent bg-gradient-to-r from-gray-100 via-white to-gray-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] pointer-events-auto inline-block relative whitespace-nowrap">
                            {content.metadata.siteTitle}
                        </h2>
                    </div>

                    {/* Right Side: Section Info */}
                    <div className="flex items-center gap-3 md:gap-6 z-10 shrink-0">
                        <div className="text-right flex flex-col justify-center max-w-[140px] md:max-w-none overflow-hidden">
                            <span className="text-[8px] md:text-[10px] font-black text-gold uppercase tracking-[0.2em] opacity-80 mb-0.5 truncate">
                                {pageTitle === 'Home' ? 'Platform' : 'Now Viewing'}
                            </span>
                            <span className={`text-xs md:text-lg lg:text-xl font-bold tracking-wider text-white/95 truncate ${pageTitle && /[\u0600-\u06FF]/.test(pageTitle) ? 'font-urdu' : ''}`}>
                                {pageTitle || 'Home'}
                            </span>
                        </div>

                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2.5 text-white bg-white/5 hover:bg-gold/20 hover:text-gold rounded-2xl transition-all border border-white/10"
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── Sub-Navigation Row (Hides on Scroll) ── */}
                <AnimatePresence>
                    {!isScrolledDown && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 48, opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="hidden md:block bg-navy-dark w-full overflow-visible z-20"
                        >
                            <div className="max-w-7xl mx-auto flex justify-center items-center h-full px-4">
                                <div className="flex items-stretch h-full relative">
                                    {navLinks.map((link) => (
                                        <DesktopDropdown key={link.path} link={link} />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── Mobile Navigation Menu (Side Drawer) ── */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={closeMenu}
                                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] md:hidden"
                            />
                            {/* Drawer */}
                            <motion.div
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                className="fixed top-0 right-0 h-[100dvh] w-[85%] max-w-[400px] bg-[#0c1930] shadow-2xl z-[110] md:hidden flex flex-col"
                            >
                                {/* Drawer Header */}
                                <div className="p-4 md:p-5 border-b border-white/5 flex justify-between items-center bg-[#081225]">
                                    <div className="flex items-center">
                                        <img src="/assets/logo/GMN-Starburst.png" alt="Logo" className="h-[40px] drop-shadow-md" />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="text-right flex flex-col justify-center">
                                            <span className="text-[8px] font-black text-gold uppercase tracking-[0.2em] opacity-80 mb-0.5">Platform</span>
                                            <span className="text-[11px] font-bold tracking-wider text-white">Home</span>
                                        </div>
                                        <button
                                            onClick={closeMenu}
                                            className="p-2 text-white bg-white/5 hover:bg-gold/20 hover:text-gold rounded-xl transition-all border border-white/10"
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>
                                </div>

                                {/* Drawer Body */}
                                <div className="flex-1 overflow-y-auto p-6 space-y-2">
                                    {navLinks.map((link) => (
                                        <MobileAccordion key={link.path} link={link} onClose={closeMenu} />
                                    ))}
                                </div>

                                {/* Drawer Footer */}
                                <div className="p-6 border-t border-white/5 bg-[#081225]/50 mt-auto">
                                    <p className="flex justify-center items-center gap-2 mb-6">
                                        <img src="/assets/logo/Web.png" alt="Web" className="h-[14px] opacity-80" />
                                        <a href={`https://${content.metadata.contact.web}`} target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold/80 text-sm transition-all duration-300 font-bold tracking-wider">
                                            {content.metadata.contact.web}
                                        </a>
                                    </p>

                                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6"></div>

                                    <div className="flex justify-center items-center gap-4">
                                        {[
                                            { icon: '/assets/logo/Facebook.png', url: content.metadata.socials.facebook, alt: 'Facebook' },
                                            { icon: '/assets/logo/Instagram.png', url: content.metadata.socials.instagram, alt: 'Instagram' },
                                            { icon: '/assets/logo/LinkedIn.png', url: content.metadata.socials.linkedin, alt: 'LinkedIn' },
                                            { icon: '/assets/logo/Twitter.png', url: content.metadata.socials.twitter, alt: 'Twitter' },
                                            { icon: '/assets/logo/WhatsApp.png', url: content.metadata.socials.whatsapp, alt: 'WhatsApp' },
                                        ].map((social: any, idx: number) => (
                                            <a key={social?.id || social?.title || idx} href={social.url} target="_blank" rel="noopener noreferrer" className="transition-all duration-300 hover:-translate-y-1 hover:drop-shadow-[0_0_10px_rgba(255,193,7,0.5)] bg-white/5 p-2 rounded-lg border border-white/5 hover:border-gold/30 hover:bg-white/10">
                                                <img src={social.icon} alt={social.alt} className="h-5 transition-all" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </nav>
        </>
    );
};

export default Navbar;
