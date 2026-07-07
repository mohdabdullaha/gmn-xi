"use client";
import { useState, ChangeEvent, FormEvent } from 'react';
import { inquiriesApi } from "@/services/api";

// ── Constants ─────────────────────────────────────────────────
const ALLOWED_DOMAINS = ['gmail.com', 'gift.edu.pk'] as const;

// ── Types ─────────────────────────────────────────────────────
interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormStatus {
  loading: boolean;
  success: boolean;
  error: string;
}

// ── Hook ──────────────────────────────────────────────────────
export const useContactForm = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<FormStatus>({ loading: false, success: false, error: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = (): string | null => {
    const emailDomain = formData.email.split('@')[1]?.toLowerCase();
    if (!emailDomain || !ALLOWED_DOMAINS.includes(emailDomain as (typeof ALLOWED_DOMAINS)[number])) {
      return 'Only @gmail.com and @gift.edu.pk email addresses are accepted.';
    }
    if (!formData.name.trim()) return 'Name is required.';
    if (!formData.message.trim()) return 'Message is required.';
    return null;
  };

  const submit = async (e?: FormEvent): Promise<boolean> => {
    if (e) e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setStatus({ loading: false, success: false, error: validationError });
      return false;
    }

    setStatus({ loading: true, success: false, error: '' });
    try {
      await inquiriesApi.submit(formData);
      setStatus({ loading: false, success: true, error: '' });
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 5000);
      return true;
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string; errors?: Array<{ message: string }> } }; message?: string };
      const message =
        apiError?.response?.data?.message ??
        apiError?.response?.data?.errors?.[0]?.message ??
        apiError?.message ??
        'Something went wrong. Please try again.';
      setStatus({ loading: false, success: false, error: message });
      return false;
    }
  };

  return { formData, status, handleChange, submit, setFormData };
};
