"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent, ComponentType } from 'react';
import { 
    Plus, Trash2, Edit2, X, FileText, Loader2, Image as ImageIcon, Upload, Paperclip, Save
} from 'lucide-react';
import PageLayout from "@/components/layout/PageLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useResources, ResourceType, Resource } from "@/hooks/useResources";

interface PDFState {
  _id?: string;
  title: string;
  desc: string;
  fileUrl: string;
  order: number;
}

interface TabButtonProps {
  value: 'infographics';
  label: string;
  icon: ComponentType<{ size: number }>;
}

const PDFManager: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'infographics'>('infographics');
    const { data: resources, loading, save, remove, refresh } = useResources(activeTab as ResourceType);
    
    const [isEditing, setIsEditing] = useState(false);
    const [currentPDF, setCurrentPDF] = useState<PDFState>({ title: '', desc: '', fileUrl: '', order: 1 });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        refresh();
    }, [activeTab, refresh]);

    const handleSave = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await save(currentPDF as Resource, selectedFile);
            setIsEditing(false);
            setSelectedFile(null);
            setCurrentPDF({ title: '', desc: '', fileUrl: '', order: resources.length + 1 });
        } catch (err: any) {
            alert(err.message || 'Failed to save resource');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id?: string) => {
        if (!id) return;
        if (!window.confirm('Are you sure?')) return;
        try {
            await remove(id);
        } catch (err: any) {
            alert(err.message || 'Failed to delete resource');
        }
    };

    // TabButton removed, will inline it below.

    return (
        <PageLayout 
            title="Manage Resources"
            action={!isEditing && (
                <Button 
                    variant="secondary" 
                    onClick={() => {
                        setIsEditing(true);
                        setCurrentPDF({ title: '', desc: '', fileUrl: '', order: resources.length + 1 });
                    }}
                    icon={Plus}
                >
                    ADD NEW INFOGRAPHIC
                </Button>
            )}
        >
            <div className="bg-white rounded-3xl p-2 border border-ice-border shadow-sm mb-12 flex max-w-md mx-auto">
                <button 
                    onClick={() => setActiveTab('infographics')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold transition-all ${activeTab === 'infographics' ? 'bg-navy text-white shadow-lg' : 'text-navy/40 hover:text-navy'}`}
                >
                    <ImageIcon size={18} />
                    INFOGRAPHICS
                </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    <h2 className="text-2xl font-black text-navy uppercase tracking-tight flex items-center gap-3 mb-6">
                        <FileText className="text-green" size={24} />
                        Infographic <span className="text-green">Library</span>
                    </h2>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <Loader2 className="animate-spin text-navy" size={32} />
                        </div>
                    ) : (
                        resources.map((pdf) => (
                            <div key={pdf._id} className="bg-white p-5 rounded-2xl border border-ice-border shadow-sm flex items-center justify-between group hover:border-green/30 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-ice rounded-xl flex items-center justify-center text-navy font-bold">{pdf.order ?? 0}</div>
                                    <div>
                                        <h3 className="font-bold text-navy group-hover:text-green transition-colors">{pdf.title}</h3>
                                        <p className="text-xs text-gray-400 italic line-clamp-1">{pdf.desc as string}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={() => { 
                                            setCurrentPDF({
                                                _id: pdf._id,
                                                title: pdf.title,
                                                desc: (pdf.desc as string) || '',
                                                fileUrl: (pdf.fileUrl as string) || '',
                                                order: pdf.order ?? 0
                                            }); 
                                            setIsEditing(true); 
                                        }} 
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                    <button onClick={() => handleDelete(pdf._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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
                                <h3 className="text-xl font-bold text-navy">{currentPDF._id ? 'Edit Entry' : 'Add New Entry'}</h3>
                                <button onClick={() => setIsEditing(false)} className="p-1 hover:bg-gray-100 rounded-lg"><X size={20} className="text-gray-400" /></button>
                            </div>

                            <form onSubmit={handleSave} className="space-y-6">
                                <Input label="Title" value={currentPDF.title} onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setCurrentPDF({...currentPDF, title: e.target.value})} required />
                                <Input label="Description" value={currentPDF.desc} onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setCurrentPDF({...currentPDF, desc: e.target.value})} textarea required />
                                
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-navy/40 uppercase tracking-widest ml-1">PDF Document</label>
                                    <div className="relative group">
                                        <input 
                                            type="file" 
                                            id="pdf-upload" 
                                            accept=".pdf" 
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                const files = e.target.files;
                                                if (files && files.length > 0) {
                                                    setSelectedFile(files[0]);
                                                }
                                            }} 
                                            className="hidden" 
                                        />
                                        <label htmlFor="pdf-upload" className="flex items-center justify-center gap-3 w-full py-10 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer group-hover:border-green group-hover:bg-green/5 transition-all">
                                            {selectedFile ? (
                                                <div className="text-center">
                                                    <FileText className="mx-auto text-green mb-2" size={32} />
                                                    <p className="text-sm font-bold text-navy truncate max-w-[200px]">{selectedFile.name}</p>
                                                    <p className="text-[10px] text-gray-400 uppercase mt-1">Click to change</p>
                                                </div>
                                            ) : (
                                                <div className="text-center">
                                                    <div className="w-12 h-12 bg-ice rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-green group-hover:text-white transition-colors">
                                                        <Upload size={20} />
                                                    </div>
                                                    <p className="text-sm font-bold text-navy tracking-tight">Upload PDF File</p>
                                                    <p className="text-[10px] text-gray-400 uppercase mt-1">Max 10MB • PDF only</p>
                                                </div>
                                            )}
                                        </label>
                                    </div>
                                    <div className="relative flex items-center gap-2">
                                        <div className="flex-grow h-px bg-gray-100 italic text-[10px] text-gray-300 text-center uppercase tracking-widest">or provide manual link</div>
                                    </div>
                                    <Input value={currentPDF.fileUrl} onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setCurrentPDF({...currentPDF, fileUrl: e.target.value})} icon={Paperclip} placeholder="https://example.com/file.pdf" />
                                </div>

                                <Input label="Display Order" type="number" value={String(currentPDF.order)} onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setCurrentPDF({...currentPDF, order: parseInt(e.target.value) || 0})} />
                                
                                <Button type="submit" fullWidth disabled={isSubmitting} icon={Save} className="py-4">
                                    {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : 'SAVE CHANGES'}
                                </Button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </PageLayout>
    );
};

export default PDFManager;
