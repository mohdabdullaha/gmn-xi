"use client";
import React, { useEffect, useRef, useState, useCallback, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

import { motion, AnimatePresence } from 'framer-motion';
import { Clock } from 'lucide-react';
import { useAuth } from "@/hooks/useAuth";

// ── Types ─────────────────────────────────────────────────────
interface AdminInactivityTrackerProps {
  children: ReactNode;
  timeoutMinutes?: number;
}

/**
 * Monitors user activity (mouse, keys, click, scroll).
 * Auto-clears the session and redirects to login after inactivity.
 */
const AdminInactivityTracker: React.FC<AdminInactivityTrackerProps> = ({
  children,
  timeoutMinutes = 15,
}) => {
  const navigate = useRouter();
  const { logout } = useAuth();
  const [showWarning, setShowWarning] = useState<boolean>(false);

  const timeoutMs = timeoutMinutes * 60 * 1000;
  const warningMs = (timeoutMinutes - 2) * 60 * 1000;

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const warningTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLogout = useCallback(async () => {
    await logout();
    navigate.push('/giftadmin?expired=true');
  }, [navigate, logout]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (warningTimerRef.current) clearTimeout(warningTimerRef.current);

    setShowWarning(false);
    localStorage.setItem('gift_admin_last_activity', Date.now().toString());

    timerRef.current = setTimeout(() => {
      handleLogout();
    }, timeoutMs);

    warningTimerRef.current = setTimeout(() => {
      setShowWarning(true);
    }, warningMs);
  }, [handleLogout, timeoutMs, warningMs]);

  useEffect(() => {
    const lastActivity = localStorage.getItem('gift_admin_last_activity');
    if (lastActivity) {
      const gap = Date.now() - parseInt(lastActivity, 10);
      if (gap > timeoutMs) {
        handleLogout();
        return;
      }
    }

    const activityEvents: string[] = [
      'mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart', 'click',
    ];

    const initialTimer = setTimeout(() => { resetTimer(); }, 0);
    activityEvents.forEach(event => window.addEventListener(event, resetTimer));

    return () => {
      clearTimeout(initialTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
      activityEvents.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, [resetTimer, handleLogout, timeoutMs]);

  return (
    <>
      {children}
      <AnimatePresence>
        {showWarning && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 z-[9999]"
          >
            <div className="bg-white border-2 border-orange-400 p-6 rounded-3xl shadow-2xl flex flex-col gap-4 max-w-sm">
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-2 rounded-xl">
                  <Clock className="text-orange-600" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-navy">Session Expiring</h4>
                  <p className="text-gray-500 text-sm">
                    For security, your session will end in 2 minutes.
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={resetTimer}
                  className="flex-grow bg-navy text-white py-2.5 rounded-xl font-bold hover:bg-navy/90 transition-all shadow-md active:scale-95"
                >
                  Stay Logged In
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2.5 text-gray-500 font-bold hover:text-red-500 transition-all"
                >
                  Logout
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminInactivityTracker;
