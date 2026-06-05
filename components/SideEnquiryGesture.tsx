'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, MessageCircleQuestion, Sparkles } from 'lucide-react';

interface SideEnquiryGestureProps {
  onClick: () => void;
}

export function SideEnquiryGesture({ onClick }: SideEnquiryGestureProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-30 hidden lg:block">
      <motion.div
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        className="cursor-pointer"
      >
        <motion.div
          animate={{ width: isHovered ? 200 : 52 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={`flex items-center gap-3 overflow-hidden rounded-r-2xl px-4 py-4 text-white shadow-burgundy-glow ${
            isHovered ? 'bg-gradient-burgundy' : 'bg-burgundy/90 backdrop-blur'
          }`}
        >
          <motion.div className="relative shrink-0">
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-full bg-white/20"
            />
            <motion.div
              animate={{ x: [0, isHovered ? 0 : 4, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="relative"
            >
              <MessageCircleQuestion className="h-5 w-5" />
            </motion.div>
          </motion.div>
          <motion.span
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.15 }}
            className="text-sm font-medium whitespace-nowrap flex items-center gap-1.5"
          >
            <Sparkles className="h-3.5 w-3.5 text-rosegold-light" />
            Enquire Now
          </motion.span>
          <ChevronRight
            className={`h-4 w-4 shrink-0 transition-opacity ${isHovered ? 'opacity-100 animate-pulse' : 'opacity-0'}`}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
