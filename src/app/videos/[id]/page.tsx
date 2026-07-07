"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import { content } from "@/data/content";

const extractYoutubeId = (url: string | null | undefined): string | null => {
    if (!url || typeof url !== 'string') return null;
    try {
        if (url.includes('youtu.be/')) {
            return url.split('youtu.be/').pop()?.split(/[?&]/)[0] ?? null;
        }
        if (url.includes('/shorts/')) {
            return url.split('/shorts/').pop()?.split(/[?&]/)[0] ?? null;
        }
        const urlObj = new URL(url);
        if (urlObj.searchParams.has('v')) return urlObj.searchParams.get('v');
        return urlObj.pathname.split('/').filter(Boolean).pop() ?? null;
    } catch {
        const m = url.match(/(?:v=|\/)([0-9A-Za-z_-]{6,})/);
        return m ? m[1] : null;
    }
};

const VideoPlayer = () => {
    const { id: videoIdParam } = useParams();
    const navigate = useRouter();
    const [iframeError, setIframeError] = useState(false);

    const videos = content.motivationalVideos.videos;
    const video = videos.find((v: any) => String(v.id) === String(videoIdParam));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [videoIdParam]);

    // Auto-redirect back when iframe fails (deleted/private YouTube video)
    useEffect(() => {
        if (iframeError) {
            const timer = setTimeout(() => navigate.push('/videos'), 2000);
            return () => clearTimeout(timer);
        }
    }, [iframeError, navigate]);

    const videoUrl = video ? video.youtube : null;
    const videoId = extractYoutubeId(videoUrl);
    const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;

    // No valid video or no valid YouTube ID
    if (!video || !videoId || !embedUrl) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-6">
                <Navbar />
                <h2 className="text-2xl font-semibold mb-2 text-navy">Video Not Available</h2>
                <p className="mb-6 text-gray-500">Redirecting you back to videos...</p>
                <Link
                    href="/videos"
                    className="px-8 py-3 bg-navy text-white rounded-xl hover:bg-navy-dark transition-all shadow-lg font-bold"
                >
                    ← Back to Videos
                </Link>
                <Footer />
            </div>
        );
    }

    if (iframeError) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-6">
                <Navbar />
                <h2 className="text-2xl font-semibold mb-2 text-navy">Video Unavailable</h2>
                <p className="mb-6 text-gray-500">This video is no longer available. Redirecting you back in 2 seconds...</p>
                <Link
                    href="/videos"
                    className="px-8 py-3 bg-navy text-white rounded-xl hover:bg-navy-dark transition-all shadow-lg font-bold"
                >
                    ← Back to Videos
                </Link>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar pageTitle="Videos" />

            <main className="flex-grow flex flex-col items-center justify-center max-w-5xl mx-auto px-6 py-12 w-full text-center">
                <SectionHeading>{video.title}</SectionHeading>

                <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg mx-auto">
                    <iframe
                        key={embedUrl}
                        title={video.title}
                        src={embedUrl}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full rounded-xl border-0"
                        onError={() => setIframeError(true)}
                    />
                </div>

                <div className="mt-8 text-center">
                    <Link
                        href="/videos"
                        className="inline-block px-8 py-3 bg-navy text-white rounded-xl hover:bg-navy-dark transition-all shadow-lg shadow-navy/20 font-bold tracking-widest"
                    >
                        ← Back to Videos
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default VideoPlayer;