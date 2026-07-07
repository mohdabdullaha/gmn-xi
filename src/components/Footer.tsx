import React from 'react';
import { content } from "@/data/content";

const Footer = () => {
    const { metadata } = content;

    const socials = [
        { icon: '/assets/logo/Facebook.png', url: metadata.socials.facebook, alt: 'Facebook' },
        { icon: '/assets/logo/Instagram.png', url: metadata.socials.instagram, alt: 'Instagram' },
        { icon: '/assets/logo/LinkedIn.png', url: metadata.socials.linkedin, alt: 'LinkedIn' },
        { icon: '/assets/logo/Twitter.png', url: metadata.socials.twitter, alt: 'Twitter' },
        { icon: '/assets/logo/WhatsApp.png', url: metadata.socials.whatsapp, alt: 'WhatsApp' },
    ];

    return (
        <footer className="bg-[#060e1e] text-white border-t-4 border-gold">

            {/* ── Main Grid ── */}
            <div className="max-w-7xl mx-auto px-6 sm:px-10 pt-14 pb-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-16">

                    {/* Column 1 — Brand */}
                    <div className="flex flex-col gap-5 items-start text-left">
                        <div className="flex items-center gap-4">
                            <img
                                src="/assets/logo/GMN-Starburst.png"
                                alt="GMN Logo"
                                className="h-14 object-contain shrink-0"
                            />
                            <img
                                src="/assets/logo/GIFT-University-White.png"
                                alt="GIFT University"
                                className="h-10 object-contain"
                            />
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                            Ethical Growth Together
                        </p>
                        {/* Social Icons */}
                        <div className="flex items-center gap-3 mt-1">
                            {socials.map((social: any, idx: number) => (
                                <a
                                    key={social?.id || social?.title || idx}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1.5 hover:scale-110 transition-transform duration-300"
                                    title={social.alt}
                                >
                                    <img src={social.icon} alt={social.alt} className="h-5 w-5 object-contain" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2 — Contact */}
                    <div className="flex flex-col gap-4 sm:justify-self-end">
                        <h4 className="text-[11px] font-black text-gold uppercase tracking-[0.3em] mb-1 sm:text-right">Contact Us</h4>
                        <ul className="space-y-3 text-sm text-gray-400 flex flex-col sm:items-end">
                            <li className="flex items-start gap-3 sm:flex-row-reverse sm:text-right">
                                <img src="/assets/logo/location.png" alt="" className="h-4 mt-0.5 opacity-70 shrink-0" />
                                <span className="leading-snug">{metadata.contact.location}</span>
                            </li>
                            <li className="flex items-center gap-3 sm:flex-row-reverse sm:text-right">
                                <img src="/assets/logo/Services.png" alt="" className="h-4 opacity-70 shrink-0" />
                                <span>{metadata.contact.phone}</span>
                            </li>
                            <li className="flex items-center gap-3 sm:flex-row-reverse sm:text-right">
                                <img src="/assets/logo/Call.png" alt="" className="h-4 opacity-70 shrink-0" />
                                <span>{metadata.contact.altPhone}</span>
                            </li>
                            <li className="flex items-center gap-3 sm:flex-row-reverse sm:text-right">
                                <img src="/assets/logo/Web.png" alt="" className="h-4 opacity-70 shrink-0" />
                                <a
                                    href={`https://${metadata.contact.web}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gold hover:text-yellow-400 hover:underline transition-colors font-semibold"
                                >
                                    {metadata.contact.web}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* ── Bottom Bar ── */}
            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-6 sm:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span className="text-gold font-black px-2 py-1.5 text-[11px] tracking-[0.25em] uppercase">
                        {metadata.siteHandle}
                    </span>
                    <p className="text-[11px] text-gray-500 uppercase tracking-wider text-center">
                        &copy; {new Date().getFullYear()} GIFT Moral Nexus &nbsp;·&nbsp; Abdullah Asif &nbsp;·&nbsp; Adroit Creatives
                    </p>
                </div>
            </div>

        </footer>
    );
};

export default Footer;
