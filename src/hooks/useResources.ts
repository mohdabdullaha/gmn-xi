"use client";
import { useState, useCallback } from 'react';
import { infographicsApi, videosApi, uploadApi } from "@/services/api";

// ── Types ─────────────────────────────────────────────────────
export type ResourceType = 'infographics' | 'videos';

export interface Resource {
  _id?: string;
  title: string;
  fileUrl?: string;
  youtubeUrl?: string;
  desc?: string;
  order?: number;
  [key: string]: unknown;
}

// ── Hook ──────────────────────────────────────────────────────
export const useResources = (type: ResourceType) => {
  const [data, setData] = useState<Resource[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const apiMap = {
    infographics: infographicsApi,
    videos: videosApi,
  } as const;

  const api = apiMap[type];

  const fetchData = useCallback(async () => {
    if (!api) return;
    setLoading(true);
    setError(null);
    try {
      const res = await api.getAll();
      setData(res.data as Resource[]);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : `Failed to fetch ${type}`;
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [api, type]);

  const save = async (resource: Resource, file: File | null = null): Promise<boolean> => {
    try {
      const finalResource: Resource = { ...resource };

      if (file) {
        const uploadRes = await uploadApi.upload(file);
        finalResource.fileUrl = (uploadRes.data as { fileUrl: string }).fileUrl;
      }

      if (type === 'videos') {
        const videoData = {
          title: finalResource.title,
          youtubeUrl: (finalResource.youtubeUrl as string) || '',
          order: typeof finalResource.order === 'number' ? finalResource.order : undefined
        };
        if (finalResource._id) {
          await videosApi.update(finalResource._id, videoData);
        } else {
          await videosApi.create(videoData);
        }
      } else {
        const infoData = {
          title: finalResource.title,
          desc: typeof finalResource.desc === 'string' ? finalResource.desc : undefined,
          fileUrl: typeof finalResource.fileUrl === 'string' ? finalResource.fileUrl : undefined
        };
        if (finalResource._id) {
          await infographicsApi.update(finalResource._id, infoData);
        } else {
          await infographicsApi.create(infoData);
        }
      }

      await fetchData();
      return true;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : `Failed to save ${type}`;
      throw new Error(message);
    }
  };

  const remove = async (id: string): Promise<boolean> => {
    try {
      await api.delete(id);
      setData(prev => prev.filter(item => item._id !== id));
      return true;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : `Failed to delete ${type}`;
      throw new Error(message);
    }
  };

  return { data, loading, error, refresh: fetchData, save, remove };
};
