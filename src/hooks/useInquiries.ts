"use client";
import { useState, useCallback, useEffect } from 'react';
import { inquiriesApi } from "@/services/api";

// ── Types ─────────────────────────────────────────────────────
export interface Inquiry {
  _id: string;
  name: string;
  email: string;
  message: string;
  read?: boolean;
  createdAt?: string;
}

// ── Hook ──────────────────────────────────────────────────────
export const useInquiries = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInquiries = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await inquiriesApi.getAll();
      setInquiries(res.data as Inquiry[]);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch inquiries';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteInquiry = async (id: string): Promise<boolean> => {
    try {
      await inquiriesApi.delete(id);
      setInquiries(prev => prev.filter(iq => iq._id !== id));
      return true;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to delete inquiry';
      throw new Error(message);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  return { inquiries, loading, error, refresh: fetchInquiries, deleteInquiry };
};
