"use client";
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from 'next/link';
import Image from 'next/image';

import SectionHeading from "@/components/SectionHeading";

import { content } from "@/data/content";

const getYoutubeId = (url: string): string => {
    if (!url) return "";
    if (url.includes("/shorts/")) {
        return url.split("/").pop()?.split("?")[0] ?? "";
    }
    if (url.includes("youtu.be/")) {
        return url.split("/").pop()?.split("?")[0] ?? "";
    }
    if (url.includes("youtube.com/watch")) {
        return new URL(url).searchParams.get("v") ?? "";
    }
    return "";
};

const MotivationalVideos = () => {
    // Only show videos that have a valid extractable YouTube ID
    const allVideos = content.motivationalVideos.videos;
    const videos = allVideos.filter((video: any) => {
        const id = getYoutubeId(video.youtube || '');
        return !!id;
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar pageTitle="Videos" />

            <main className="flex-grow max-w-7xl mx-auto px-6 py-16">
                <SectionHeading centered={false}>Motivational <span className="text-green">Videos</span></SectionHeading>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {videos.map((video: any) => {
                        const id = getYoutubeId(video.youtube || '');
                        const thumbnail = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

                        return (
                            <Link
                                key={video.id}
                                href={`/videos/${video.id}`}
                                className="group"
                            >
                                <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
                                    <div className="relative aspect-video">
                                        <Image
                                            src={thumbnail}
                                            alt={video.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                            <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center scale-0 group-hover:scale-100 transition-transform">
                                                <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-navy border-b-[8px] border-b-transparent ml-1"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-base font-bold text-navy line-clamp-2 leading-tight group-hover:text-green transition-colors">{video.title}</h3>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default MotivationalVideos;