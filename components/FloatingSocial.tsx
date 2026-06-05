'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Instagram } from 'lucide-react';

const socialLinks = [
  {
    href: 'https://wa.me/919876543210?text=Hi%20CineHaven!%20I%27d%20love%20to%20know%20more%20about%20your%20experiences.',
    label: 'WhatsApp',
    icon: MessageCircle,
    color: 'bg-green-500 hover:bg-green-600',
    shadow: 'shadow-green-500/30',
  },
  {
    href: 'https://instagram.com/cinehaven',
    label: 'Instagram',
    icon: Instagram,
    color: 'bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-400',
    shadow: 'shadow-pink-500/30',
  },
];

export function FloatingSocial() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {socialLinks.map((social) => (
        <motion.a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`group relative flex h-12 w-12 items-center justify-center rounded-full ${social.color} text-white ${social.shadow} shadow-lg transition-shadow`}
          aria-label={social.label}
        >
          <social.icon className="h-5 w-5" />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-xl bg-ink/90 px-3 py-1.5 text-xs font-medium text-white opacity-0 pointer-events-none transition-all group-hover:opacity-100 group-hover:mr-4">
            {social.label}
          </span>
        </motion.a>
      ))}
    </div>
  );
}
