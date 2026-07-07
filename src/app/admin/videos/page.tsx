"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Plus, Trash2, Edit2, Save, X, Video as VideoIcon, AlertCircle, Loader2 } from 'lucide-react';
import PageLayout from "@/components/layout/PageLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useResources, Resource } from "@/hooks/useResources";

interface VideoState {
  _id?: string;
  title: string;
  youtubeUrl: string;
  order: number;
}

const VideoManager: React.FC = () => {
    const { data: videos, loading, error, save, remove, refresh } = useResources('videos');
    const [isEditing, setIsEditing] = useState(false);
    const [currentVideo, setCurrentVideo] = useState<VideoState>({ title: '', youtubeUrl: '', order: 1 });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        refresh();
    }, [refresh]);

    const handleSave = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await save(currentVideo as Resource);
            setIsEditing(false);
            setCurrentVideo({ title: '', youtubeUrl: '', order: videos.length + 1 });
        } catch (err: any) {
            alert(err.message || 'Failed to save video');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id?: string) => {
        if (!id) return;
        if (!window.confirm('Are you sure you want to delete this video?')) return;
        try {
            await remove(id);
        } catch (err: any) {
            alert(err.message || 'Failed to delete video');
        }
    };

    const handleEdit = (video: Resource) => {
        setCurrentVideo({
            _id: video._id,
            title: video.title,
            youtubeUrl: (video.youtubeUrl as string) || '',
            order: video.order ?? 0
        });
        setIsEditing(true);
    };

    return (
        <PageLayout 
            title="Manage Videos"
            action={!isEditing && (
                <Button 
                    variant="secondary" 
                    onClick={() => {
                        setIsEditing(true);
                        setCurrentVideo({ title: '', youtubeUrl: '', order: videos.length + 1 });
                    }}
                    icon={Plus}
                >
                    ADD NEW VIDEO
                </Button>
            )}
        >
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    <h2 className="text-2xl font-black text-navy uppercase tracking-tight flex items-center gap-3 mb-6">
                        <VideoIcon className="text-green" size={24} />
                        Video <span className="text-green">Library</span>
                    </h2>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <Loader2 className="animate-spin text-navy" size={32} />
                        </div>
                    ) : error ? (
                        <div className="p-6 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3 border border-red-100">
                            <AlertCircle size={24} />
                            <p>{error}</p>
                        </div>
                    ) : videos.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                            <VideoIcon className="mx-auto text-gray-300 mb-4" size={48} />
                            <p className="text-gray-500 font-medium">No videos found. Create your first one!</p>
                        </div>
                    ) : (
                        videos.map((video) => (
                            <div key={video._id} className="bg-white p-5 rounded-2xl border border-ice-border shadow-sm flex items-center justify-between group hover:border-green/30 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-ice rounded-xl flex items-center justify-center text-navy font-bold">{video.order ?? 0}</div>
                                    <div>
                                        <h3 className="font-bold text-navy group-hover:text-green transition-colors">{video.title}</h3>
                                        <p className="text-xs text-gray-400 truncate max-w-xs">{video.youtubeUrl as string}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => handleEdit(video)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                        <Edit2 size={18} />
                                    </button>
                                    <button onClick={() => handleDelete(video._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {isEditing && (
                    <div className="lg:col-span-1">
                        <div className="bg-white p-8 rounded-3xl border border-ice-border shadow-xl shadow-navy/5 sticky top-8">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-bold text-navy">{currentVideo._id ? 'Edit Video' : 'Add New Video'}</h3>
                                <button onClick={() => setIsEditing(false)} className="p-1 hover:bg-gray-100 rounded-lg"><X size={20} className="text-gray-400" /></button>
                            </div>

                            <form onSubmit={handleSave} className="space-y-6">
                                <Input label="Title" value={currentVideo.title} onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setCurrentVideo({...currentVideo, title: e.target.value})} placeholder="e.g., The Power of Honesty" required />
                                <Input label="YouTube URL" type="url" value={currentVideo.youtubeUrl} onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setCurrentVideo({...currentVideo, youtubeUrl: e.target.value})} placeholder="https://youtube.com/watch?v=..." required />
                                <Input label="Display Order" type="number" value={String(currentVideo.order)} onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setCurrentVideo({...currentVideo, order: parseInt(e.target.value) || 0})} />
                                
                                <Button type="submit" fullWidth disabled={isSubmitting} icon={Save} className="py-4">
                                    {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : 'SAVE VIDEO'}
                                </Button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </PageLayout>
    );
};

export default VideoManager;
