import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // === LIGHT THEME BASE ===
        "cream": "#FDF8F5",
        "cream-warm": "#F5EDE8",
        "cream-dark": "#EBE0D8",
        "off-white": "#FFFFFF",
        
        // === SURFACE COLORS ===
        "surface": "#FFFFFF",
        "surface-warm": "#FDF8F5",
        "surface-elevated": "#FFFFFF",
        "surface-muted": "#F5EDE8",
        "surface-border": "#E0D5CC",
        "surface-border-light": "#EBE4DE",
        
        // === TEXT COLORS ===
        "ink": "#1A0F14",
        "ink-secondary": "#6B5058",
        "ink-muted": "#9A8088",
        "ink-light": "#B8A0A8",
        
        // === PRIMARY: BURGUNDY ===
        "burgundy": "#6B0F2A",
        "burgundy-light": "#A0405C",
        "burgundy-lighter": "#C8788C",
        "burgundy-muted": "#F0D8E0",
        "burgundy-bg": "#FDF0F4",
        "burgundy-dark": "#4A0A1E",
        
        // === SECONDARY: ROSE GOLD ===
        "rosegold": "#C47A7A",
        "rosegold-light": "#D89898",
        "rosegold-lighter": "#E8B8B8",
        "rosegold-muted": "#F5E0E0",
        "rosegold-bg": "#FDF5F5",
        "rosegold-dark": "#A06060",
        
        // === ACCENT: CRIMSON ===
        "crimson": "#A31636",
        "crimson-light": "#D46078",
        "crimson-muted": "#F5D0D8",
        
        // === LEGACY MAPPINGS (backward compat) ===
        "midnight": "#FDF8F5",
        "velvet": "#FFFFFF",
        "mauve": "#F5EDE8",
        "mauve-light": "#EBE0D8",
        "mauve-lighter": "#E0D5CC",
        "ivory": "#1A0F14",
        "mist": "#9A8088",
        "dusty": "#7A6068",
        "lavender": "#B8A0A8",
        
        // === OLD AMBER → BURGUNDY MAPPINGS ===
        "amber": "#6B0F2A",
        "amber-light": "#A0405C",
        "amber-lighter": "#C8788C",
        "amber-muted": "#F0D8E0",
        "amber-bg": "#FDF0F4",
        "amber-dark": "#4A0A1E",
        
        // === OLD SAGE → ROSE GOLD MAPPINGS ===
        "sage": "#C47A7A",
        "sage-light": "#D89898",
        "sage-lighter": "#E8B8B8",
        "sage-muted": "#F5E0E0",
        "sage-bg": "#FDF5F5",
        "sage-dark": "#A06060",
        
        // === CINEMA COLORS (Updated) ===
        "cinema-black": "#1A0F14",
        "cinema-charcoal": "#2D1A22",
        "cinema-surface": "#FFFFFF",
        "cinema-surface-light": "#FDF8F5",
        "cinema-gold": "#6B0F2A",
        "cinema-gold-light": "#A0405C",
        "cinema-gold-dark": "#4A0A1E",
        "cinema-cream": "#FDF8F5",
        "cinema-white": "#FFFFFF",
        "cinema-red": "#A31636",
        "cinema-red-glow": "#D46078",
        "cinema-muted": "#9A8088",
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        accent: ["Space Grotesk", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      spacing: {
        "section": "120px",
        "section-mobile": "80px",
        "section-sm": "60px",
      },
      borderRadius: {
        "card": "20px",
        "card-sm": "14px",
        "pill": "9999px",
        "button": "12px",
      },
      boxShadow: {
        "burgundy-glow": "0 0 30px rgba(107, 15, 42, 0.15)",
        "burgundy-glow-lg": "0 0 50px rgba(107, 15, 42, 0.25)",
        "burgundy-glow-sm": "0 0 15px rgba(107, 15, 42, 0.12)",
        "rosegold-glow": "0 0 30px rgba(196, 122, 122, 0.15)",
        "crimson-glow": "0 0 30px rgba(163, 22, 54, 0.15)",
        "card": "0 4px 24px rgba(0, 0, 0, 0.06)",
        "card-hover": "0 12px 40px rgba(0, 0, 0, 0.1)",
        "card-lift": "0 20px 50px rgba(0, 0, 0, 0.12)",
        "inner-burgundy": "inset 0 0 20px rgba(107, 15, 42, 0.06)",
        "inner-rosegold": "inset 0 0 20px rgba(196, 122, 122, 0.06)",
        "soft": "0 2px 12px rgba(0, 0, 0, 0.04)",
        "soft-lg": "0 8px 30px rgba(0, 0, 0, 0.06)",
      },
      transitionTimingFunction: {
        "velvet": "cubic-bezier(0.22, 1, 0.36, 1)",
        "cinematic": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "bounce-soft": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "fade-in": "fadeIn 0.7s ease-out forwards",
        "slide-in-left": "slideInLeft 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "slide-in-right": "slideInRight 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "scale-in": "scaleIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "blur-in": "blurIn 0.8s ease-out forwards",
        "pulse-burgundy": "pulseBurgundy 3s ease-in-out infinite",
        "float-slow": "floatSlow 8s ease-in-out infinite",
        "float-medium": "floatMedium 5s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "marquee": "marquee 30s linear infinite",
        "marquee-reverse": "marqueeReverse 30s linear infinite",
        "spin-slow": "spin 12s linear infinite",
        "bounce-soft": "bounceSoft 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "press": "press 0.2s ease-out",
        "scroll-bounce": "scrollBounce 2s ease-in-out infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.92)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        blurIn: {
          "0%": { opacity: "0", filter: "blur(10px)" },
          "100%": { opacity: "1", filter: "blur(0)" },
        },
        pulseBurgundy: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(107, 15, 42, 0.1)" },
          "50%": { boxShadow: "0 0 40px rgba(107, 15, 42, 0.25)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-15px) rotate(2deg)" },
        },
        floatMedium: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeReverse: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        bounceSoft: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
        press: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(0.96)" },
          "100%": { transform: "scale(1)" },
        },
        scrollBounce: {
          "0%, 100%": { transform: "translateY(0)", opacity: "1" },
          "50%": { transform: "translateY(10px)", opacity: "0.5" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-burgundy": "linear-gradient(135deg, #6B0F2A 0%, #A0405C 50%, #6B0F2A 100%)",
        "gradient-rosegold": "linear-gradient(135deg, #C47A7A 0%, #D89898 50%, #C47A7A 100%)",
        "gradient-crimson": "linear-gradient(135deg, #A31636 0%, #D46078 50%, #A31636 100%)",
        "gradient-velvet": "linear-gradient(180deg, rgba(253,248,245,0.2) 0%, rgba(253,248,245,0.95) 100%)",
        "gradient-surface": "linear-gradient(180deg, #FFFFFF 0%, #FDF8F5 100%)",
        "gradient-mesh": "radial-gradient(at 40% 20%, rgba(107,15,42,0.06) 0%, transparent 50%), radial-gradient(at 80% 0%, rgba(196,122,122,0.04) 0%, transparent 50%), radial-gradient(at 0% 50%, rgba(163,22,54,0.03) 0%, transparent 50%)",
      },
    },
  },
  plugins: [],
};

export default config;