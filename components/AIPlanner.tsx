'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cake, 
  Heart, 
  Sparkles, 
  Users, 
  Briefcase,
  PartyPopper,
  Flame,
  Zap,
  Film,
  Music,
  Camera,
  Gamepad2,
  Utensils,
  Wine,
  ArrowRight,
  ArrowLeft,
  Loader2,
  RotateCcw,
  CheckCircle2,
  Star,
  Crown,
  Diamond,
  Gift,
  Lightbulb,
  Target,
  Wallet,
  Clock,
  MapPin,
  Calendar,
  ChevronRight,
  Info
} from 'lucide-react';

const occasions = [
  { value: 'birthday', label: 'Birthday', icon: Cake, accent: 'burgundy', description: 'Make their day unforgettable' },
  { value: 'proposal', label: 'Proposal', icon: Heart, accent: 'rosegold', description: 'The perfect "Yes" moment' },
  { value: 'anniversary', label: 'Anniversary', icon: Sparkles, accent: 'burgundy', description: 'Celebrate your journey' },
  { value: 'date_night', label: 'Date Night', icon: Wine, accent: 'rosegold', description: 'Intimate & romantic' },
  { value: 'family', label: 'Family', icon: Users, accent: 'teal', description: 'Memories for everyone' },
  { value: 'corporate', label: 'Corporate', icon: Briefcase, accent: 'ink', description: 'Impress your team' },
];

const moods = [
  { value: 'romantic', label: 'Romantic', icon: Heart, accent: 'rosegold', description: 'Soft lights & sweet moments' },
  { value: 'party', label: 'Party', icon: PartyPopper, accent: 'burgundy', description: 'High energy celebration' },
  { value: 'chill', label: 'Chill', icon: Flame, accent: 'teal', description: 'Relaxed & intimate' },
  { value: 'epic', label: 'Epic', icon: Zap, accent: 'burgundy', description: 'Grand & unforgettable' },
  { value: 'nostalgic', label: 'Nostalgic', icon: Film, accent: 'ink', description: 'Classic & timeless' },
];

const preferenceOptions = [
  { id: 'karaoke', label: 'Karaoke', icon: Music, accent: 'burgundy', description: 'Sing your heart out' },
  { id: 'photography', label: 'Photo Shoot', icon: Camera, accent: 'rosegold', description: 'Capture every moment' },
  { id: 'gaming', label: 'Gaming', icon: Gamepad2, accent: 'teal', description: 'Console & projector' },
  { id: 'live_music', label: 'Live Music', icon: Music, accent: 'burgundy', description: 'Acoustic performance' },
  { id: 'special_decor', label: 'Decor', icon: Sparkles, accent: 'rosegold', description: 'Themed decorations' },
  { id: 'gourmet_food', label: 'Gourmet', icon: Utensils, accent: 'burgundy', description: 'Chef-curated menu' },
  { id: 'champagne', label: 'Champagne', icon: Wine, accent: 'rosegold', description: 'Premium bubbly' },
  { id: 'movie_marathon', label: 'Movies', icon: Film, accent: 'teal', description: 'Binge-watch together' },
];

const steps = [
  { id: 'occasion', label: 'Occasion', icon: Gift },
  { id: 'mood', label: 'Mood', icon: Lightbulb },
  { id: 'group', label: 'Group', icon: Users },
  { id: 'budget', label: 'Budget', icon: Wallet },
  { id: 'preferences', label: 'Extras', icon: Sparkles },
];

const accentClasses: Record<string, { 
  bg: string; 
  border: string; 
  text: string; 
  glow: string; 
  ring: string;
  gradient: string;
}> = {
  burgundy: { 
    bg: 'bg-[#fdf5f7]', 
    border: 'border-[#6b0f2a]/30', 
    text: 'text-[#6b0f2a]',
    glow: 'shadow-[0_0_20px_rgba(107,15,42,0.15)]',
    ring: 'ring-[#6b0f2a]/50',
    gradient: 'from-[#6b0f2a]/20 to-[#faf8f5]'
  },
  rosegold: { 
    bg: 'bg-[#fdf8f5]', 
    border: 'border-[#c9a87c]/30', 
    text: 'text-[#a08060]',
    glow: 'shadow-[0_0_20px_rgba(201,168,124,0.15)]',
    ring: 'ring-[#c9a87c]/50',
    gradient: 'from-[#c9a87c]/20 to-[#faf8f5]'
  },
  teal: { 
    bg: 'bg-[#f5fafa]', 
    border: 'border-[#2d8a7e]/30', 
    text: 'text-[#2d8a7e]',
    glow: 'shadow-[0_0_20px_rgba(45,138,126,0.15)]',
    ring: 'ring-[#2d8a7e]/50',
    gradient: 'from-[#2d8a7e]/20 to-[#faf8f5]'
  },
  ink: { 
    bg: 'bg-[#f8f8f8]', 
    border: 'border-[#666]/30', 
    text: 'text-[#666]',
    glow: '',
    ring: 'ring-[#666]/30',
    gradient: 'from-[#666]/10 to-[#faf8f5]'
  },
};

interface Recommendation {
  package: string;
  room: string;
  decorTheme: string;
  estimatedPrice: number;
  addOns: string[];
  description: string;
  timeline: string;
  includes: string[];
}

// ============ ANIMATION VARIANTS ============
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.08 }
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.04, staggerDirection: -1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  },
  exit: { opacity: 0, y: -8, scale: 0.96 }
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
    scale: 0.97
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 60 : -60,
    opacity: 0,
    scale: 0.97,
    transition: { duration: 0.25 }
  })
};

export default function AIPlanner() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [formData, setFormData] = useState({
    occasion: '',
    mood: '',
    groupSize: 4,
    budget: 10000,
    preferences: [] as string[],
  });
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (index: number) => {
    if (index < currentStep) {
      setDirection(-1);
      setCurrentStep(index);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/ai-planner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.status === 'success') {
        setRecommendation(data.data);
        setCurrentStep(steps.length);
      }
    } catch (error) {
      console.error('Error getting recommendation:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetPlanner = () => {
    setFormData({
      occasion: '',
      mood: '',
      groupSize: 4,
      budget: 10000,
      preferences: [],
    });
    setRecommendation(null);
    setCurrentStep(0);
    setDirection(0);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0: return formData.occasion !== '';
      case 1: return formData.mood !== '';
      case 2: return formData.groupSize >= 2;
      case 3: return formData.budget >= 2000;
      default: return true;
    }
  };

  const getStepSummary = () => {
    const summaries = [];
    if (formData.occasion) {
      const occ = occasions.find(o => o.value === formData.occasion);
      if (occ) summaries.push({ icon: occ.icon, label: occ.label, accent: occ.accent });
    }
    if (formData.mood) {
      const mood = moods.find(m => m.value === formData.mood);
      if (mood) summaries.push({ icon: mood.icon, label: mood.label, accent: mood.accent });
    }
    if (formData.groupSize) {
      summaries.push({ icon: Users, label: `${formData.groupSize}`, accent: 'teal' });
    }
    return summaries;
  };

  return (
    <div className="relative mx-auto max-w-5xl px-4 sm:px-2">
      {/* Background Decorations */}
      <div className="absolute -top-10 sm:-top-20 -right-10 sm:-right-20 w-64 h-64 sm:w-96 sm:h-96 bg-[#6b0f2a]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 sm:-bottom-20 -left-10 sm:-left-20 w-56 h-56 sm:w-80 sm:h-80 bg-[#c9a87c]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative rounded-2xl sm:rounded-3xl border border-[#eee] bg-white/80 backdrop-blur-2xl p-5 sm:p-8 lg:p-12 shadow-[0_8px_40px_rgba(0,0,0,0.04)] overflow-hidden">
        
        {/* Header */}
        <motion.div 
          className="mb-6 sm:mb-10 text-center"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4 px-3 sm:px-2 py-1.5 sm:py-2 rounded-full bg-[#fdf5f7] border border-[#6b0f2a]/15">
            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#6b0f2a]" />
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#6b0f2a]">
              AI Celebration Planner
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-[#1a1a1a] mb-2 sm:mb-3 leading-tight">
            Plan Your Perfect <span className="bg-gradient-to-r from-[#6b0f2a] to-[#a04060] bg-clip-text text-transparent">Experience</span>
          </h2>
          <p className="text-[#888] text-sm sm:text-base max-w-md mx-auto px-2">
            Answer 5 quick questions and let our AI craft a celebration tailored just for you
          </p>
        </motion.div>

        {/* Progress Stepper — Mobile Optimized */}
        <div className="mb-8 sm:mb-12">
          {/* Desktop Stepper */}
          <div className="hidden sm:flex items-center justify-center">
            {steps.map((step, index) => {
              const isCompleted = index < currentStep;
              const isActive = index === currentStep;
              const StepIcon = step.icon;
              
              return (
                <div key={step.id} className="flex items-center">
                  <motion.button
                    onClick={() => handleStepClick(index)}
                    disabled={index > currentStep}
                    whileHover={index <= currentStep ? { scale: 1.05 } : {}}
                    whileTap={index <= currentStep ? { scale: 0.95 } : {}}
                    className={`relative flex flex-col items-center gap-1.5 sm:gap-2 transition-all duration-300 ${
                      index > currentStep ? 'cursor-not-allowed' : 'cursor-pointer'
                    }`}>
                    <motion.div
                      animate={isActive ? { 
                        boxShadow: ['0 0 0 0px rgba(107, 15, 42, 0)', '0 0 0 8px rgba(107, 15, 42, 0.1)', '0 0 0 0px rgba(107, 15, 42, 0)']
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl transition-all duration-500 ${
                        isCompleted
                          ? 'bg-[#6b0f2a] text-white shadow-[0_0_20px_rgba(107,15,42,0.3)]'
                          : isActive
                          ? 'bg-[#6b0f2a] text-white ring-4 ring-[#6b0f2a]/20 shadow-[0_0_20px_rgba(107,15,42,0.3)]'
                          : 'bg-[#f8f5f2] text-[#999] border border-[#eee]'
                      }`}>
                      {isCompleted ? <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5" /> : <StepIcon className="h-4 w-4 sm:h-5 sm:w-5" />}
                    </motion.div>
                    <span className={`text-[10px] sm:text-xs font-medium transition-colors ${
                      isActive ? 'text-[#6b0f2a]' : isCompleted ? 'text-[#1a1a1a]' : 'text-[#bbb]'
                    }`}>
                      {step.label}
                    </span>
                    
                    {isActive && (
                      <motion.div layoutId="activeStep" className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#6b0f2a]" />
                    )}
                  </motion.button>
                  
                  {index < steps.length - 1 && (
                    <div className="flex flex-col items-center mx-1 sm:mx-2 lg:mx-4">
                      <div className={`h-0.5 w-6 sm:w-8 lg:w-12 transition-all duration-500 ${
                        isCompleted ? 'bg-[#6b0f2a]' : 'bg-[#eee]'
                      }`} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile Stepper — Compact Dots */}
          <div className="sm:hidden">
            <div className="flex items-center justify-center gap-1.5">
              {steps.map((step, index) => {
                const isCompleted = index < currentStep;
                const isActive = index === currentStep;
                const StepIcon = step.icon;
                
                return (
                  <div key={step.id} className="flex items-center">
                    <motion.button
                      onClick={() => handleStepClick(index)}
                      disabled={index > currentStep}
                      className={`relative flex flex-col items-center gap-1 transition-all ${
                        index > currentStep ? 'opacity-40' : ''
                      }`}>
                      <div className={`flex h-8 w-8 items-center justify-center rounded-xl transition-all duration-300 ${
                        isCompleted
                          ? 'bg-[#6b0f2a] text-white'
                          : isActive
                          ? 'bg-[#6b0f2a] text-white ring-2 ring-[#6b0f2a]/20'
                          : 'bg-[#f5f0ec] text-[#bbb] border border-[#eee]'
                      }`}>
                        {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : <StepIcon className="h-3.5 w-3.5" />}
                      </div>
                      <span className={`text-[9px] font-medium ${
                        isActive ? 'text-[#6b0f2a]' : isCompleted ? 'text-[#1a1a1a]' : 'text-[#bbb]'
                      }`}>
                        {step.label}
                      </span>
                    </motion.button>
                    
                    {index < steps.length - 1 && (
                      <div className={`h-0.5 w-4 mx-0.5 transition-all duration-500 ${
                        isCompleted ? 'bg-[#6b0f2a]' : 'bg-[#eee]'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Summary Chips */}
          <AnimatePresence>
            {currentStep > 0 && getStepSummary().length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-4 flex-wrap px-2">
                {getStepSummary().map((item, i) => {
                  const accent = accentClasses[item.accent];
                  const ItemIcon = item.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.08 }}
                      className={`inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium ${accent.bg} ${accent.border} ${accent.text} border`}>
                      <ItemIcon className="h-3 w-3" />
                      {item.label}
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content Area */}
        <div className="min-h-[320px] sm:min-h-[400px]">
          <AnimatePresence mode="wait" custom={direction}>
            
            {/* Step 0: Occasion */}
            {currentStep === 0 && (
              <motion.div
                key="step0"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-5 sm:space-y-8">
                <div className="text-center px-2">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-[#1a1a1a] mb-1.5 sm:mb-2">
                    What's the occasion?
                  </h3>
                  <p className="text-[#888] text-sm sm:text-base">Select the celebration you're planning</p>
                </div>
                
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-4">
                  {occasions.map((occasion) => {
                    const accent = accentClasses[occasion.accent];
                    const isSelected = formData.occasion === occasion.value;
                    const OccasionIcon = occasion.icon;
                    
                    return (
                      <motion.button
                        key={occasion.value}
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setFormData({ ...formData, occasion: occasion.value })}
                        className={`group relative flex flex-col items-center text-center rounded-xl sm:rounded-2xl border p-4 sm:p-6 lg:p-8 transition-all duration-300 ${
                          isSelected
                            ? `${accent.bg} ${accent.border} ${accent.glow} ring-2 ${accent.ring}`
                            : 'bg-white border-[#eee] hover:border-[#6b0f2a]/20 hover:shadow-sm'
                        }`}>
                        <div className={`p-2.5 sm:p-4 rounded-xl sm:rounded-2xl mb-2.5 sm:mb-4 transition-all duration-300 ${
                          isSelected ? accent.bg : 'bg-[#f8f5f2] group-hover:bg-[#fdf5f7]'
                        }`}>
                          <OccasionIcon className={`h-6 w-6 sm:h-8 sm:w-8 transition-colors ${
                            isSelected ? accent.text : 'text-[#999] group-hover:text-[#6b0f2a]'
                          }`} />
                        </div>
                        <h4 className={`font-semibold text-sm sm:text-base mb-0.5 sm:mb-1 transition-colors ${
                          isSelected ? 'text-[#1a1a1a]' : 'text-[#555]'
                        }`}>
                          {occasion.label}
                        </h4>
                        <p className="text-[10px] sm:text-xs text-[#aaa] leading-tight">{occasion.description}</p>
                        
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-2 right-2 sm:top-3 sm:right-3">
                            <CheckCircle2 className={`h-4 w-4 sm:h-5 sm:w-5 ${accent.text}`} />
                          </motion.div>
                        )}
                      </motion.button>
                    );
                  })}
                </motion.div>
              </motion.div>
            )}

            {/* Step 1: Mood */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-5 sm:space-y-8">
                <div className="text-center px-2">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-[#1a1a1a] mb-1.5 sm:mb-2">
                    Set the mood
                  </h3>
                  <p className="text-[#888] text-sm sm:text-base">How do you want the atmosphere to feel?</p>
                </div>
                
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-4">
                  {moods.map((mood) => {
                    const accent = accentClasses[mood.accent];
                    const isSelected = formData.mood === mood.value;
                    const MoodIcon = mood.icon;
                    
                    return (
                      <motion.button
                        key={mood.value}
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setFormData({ ...formData, mood: mood.value })}
                        className={`group relative flex flex-col items-center text-center rounded-xl sm:rounded-2xl border p-4 sm:p-6 lg:p-8 transition-all duration-300 ${
                          isSelected
                            ? `${accent.bg} ${accent.border} ${accent.glow} ring-2 ${accent.ring}`
                            : 'bg-white border-[#eee] hover:border-[#6b0f2a]/20 hover:shadow-sm'
                        }`}>
                        <div className={`p-2.5 sm:p-4 rounded-xl sm:rounded-2xl mb-2.5 sm:mb-4 transition-all duration-300 ${
                          isSelected ? accent.bg : 'bg-[#f8f5f2] group-hover:bg-[#fdf5f7]'
                        }`}>
                          <MoodIcon className={`h-6 w-6 sm:h-8 sm:w-8 transition-colors ${
                            isSelected ? accent.text : 'text-[#999] group-hover:text-[#6b0f2a]'
                          }`} />
                        </div>
                        <h4 className={`font-semibold text-sm sm:text-base mb-0.5 sm:mb-1 transition-colors ${
                          isSelected ? 'text-[#1a1a1a]' : 'text-[#555]'
                        }`}>
                          {mood.label}
                        </h4>
                        <p className="text-[10px] sm:text-xs text-[#aaa] leading-tight">{mood.description}</p>
                        
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-2 right-2 sm:top-3 sm:right-3">
                            <CheckCircle2 className={`h-4 w-4 sm:h-5 sm:w-5 ${accent.text}`} />
                          </motion.div>
                        )}
                      </motion.button>
                    );
                  })}
                </motion.div>
              </motion.div>
            )}

            {/* Step 2: Group Size */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-6 sm:space-y-8">
                <div className="text-center px-2">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-[#1a1a1a] mb-1.5 sm:mb-2">
                    How many guests?
                  </h3>
                  <p className="text-[#888] text-sm sm:text-base">Tell us your group size</p>
                </div>
                
                <div className="max-w-sm mx-auto px-2">
                  <motion.div 
                    key={formData.groupSize}
                    initial={{ scale: 1.15, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-center mb-6 sm:mb-8">
                    <div className="inline-flex items-baseline gap-1.5 sm:gap-2">
                      <span className="text-6xl sm:text-7xl lg:text-8xl font-bold font-display bg-gradient-to-r from-[#6b0f2a] to-[#a04060] bg-clip-text text-transparent">
                        {formData.groupSize}
                      </span>
                      <span className="text-base sm:text-xl text-[#888] font-medium">guests</span>
                    </div>
                  </motion.div>
                  
                  <div className="relative mb-6 sm:mb-8 px-1">
                    <input
                      type="range"
                      min="2"
                      max="50"
                      value={formData.groupSize}
                      onChange={(e) => setFormData({ ...formData, groupSize: parseInt(e.target.value) })}
                      className="w-full h-2.5 sm:h-3 bg-[#f5ede8] rounded-full appearance-none cursor-pointer accent-[#6b0f2a]"
                      style={{
                        background: `linear-gradient(to right, #6B0F2A 0%, #6B0F2A ${((formData.groupSize - 2) / 48) * 100}%, #F5EDE8 ${((formData.groupSize - 2) / 48) * 100}%, #F5EDE8 100%)`
                      }}
                    />
                    <div className="flex justify-between mt-2 sm:mt-3 text-xs sm:text-sm text-[#aaa] font-medium">
                      <span>2</span>
                      <span>25</span>
                      <span>50</span>
                    </div>
                  </div>

                  {/* Quick Select */}
                  <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex justify-center gap-2 sm:gap-3 flex-wrap">
                    {[2, 4, 6, 10, 15, 25, 50].map((num) => (
                      <motion.button
                        key={num}
                        variants={itemVariants}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={() => setFormData({ ...formData, groupSize: num })}
                        className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                          formData.groupSize === num
                            ? 'bg-[#6b0f2a] text-white shadow-[0_0_16px_rgba(107,15,42,0.25)]'
                            : 'bg-[#f8f5f2] text-[#555] hover:bg-[#f0eae5] border border-[#eee]'
                        }`}>
                        {num}
                      </motion.button>
                    ))}
                  </motion.div>

                  {/* Capacity Hint */}
                  <div className="mt-5 sm:mt-6 flex items-center justify-center gap-1.5 text-xs sm:text-sm text-[#aaa]">
                    <Info className="h-3.5 w-3.5 flex-shrink-0" />
                    <span>Perfect for intimate to grand celebrations</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Budget */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-6 sm:space-y-8">
                <div className="text-center px-2">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-[#1a1a1a] mb-1.5 sm:mb-2">
                    What's your budget?
                  </h3>
                  <p className="text-[#888] text-sm sm:text-base">Set a comfortable spending range</p>
                </div>
                
                <div className="max-w-sm mx-auto px-2">
                  <motion.div 
                    key={formData.budget}
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-center mb-6 sm:mb-8">
                    <span className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display bg-gradient-to-r from-[#6b0f2a] to-[#a04060] bg-clip-text text-transparent">
                      ₹{(formData.budget / 1000).toFixed(0)}K
                    </span>
                    <p className="text-xs sm:text-sm text-[#aaa] mt-1.5 sm:mt-2">
                      {formData.budget >= 50000 ? 'Premium Experience' : 
                       formData.budget >= 15000 ? 'Standard Package' : 'Budget Friendly'}
                    </p>
                  </motion.div>
                  
                  <div className="relative mb-6 sm:mb-8 px-1">
                    <input
                      type="range"
                      min="2000"
                      max="200000"
                      step="1000"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) })}
                      className="w-full h-2.5 sm:h-3 bg-[#f5ede8] rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #6B0F2A 0%, #6B0F2A ${((formData.budget - 2000) / 198000) * 100}%, #F5EDE8 ${((formData.budget - 2000) / 198000) * 100}%, #F5EDE8 100%)`
                      }}
                    />
                    <div className="flex justify-between mt-2 sm:mt-3 text-xs sm:text-sm text-[#aaa] font-medium">
                      <span>₹2K</span>
                      <span>₹1L</span>
                      <span>₹2L</span>
                    </div>
                  </div>

                  {/* Budget Tiers */}
                  <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-2 gap-2 sm:gap-3">
                    {[
                      { label: 'Essential', min: 2000, max: 5000, color: 'teal', icon: Target },
                      { label: 'Standard', min: 5000, max: 15000, color: 'burgundy', icon: Star },
                      { label: 'Premium', min: 15000, max: 50000, color: 'burgundy', icon: Crown },
                      { label: 'Luxury', min: 50000, max: 200000, color: 'rosegold', icon: Diamond },
                    ].map((tier) => {
                      const isActive = formData.budget >= tier.min && formData.budget <= tier.max;
                      const accent = accentClasses[tier.color];
                      const TierIcon = tier.icon;
                      
                      return (
                        <motion.button
                          key={tier.label}
                          variants={itemVariants}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setFormData({ ...formData, budget: Math.round((tier.min + tier.max) / 2) })}
                          className={`flex flex-col items-center gap-1.5 sm:gap-2 p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all ${
                            isActive 
                              ? `${accent.bg} ${accent.border} ring-2 ${accent.ring}` 
                              : 'bg-white border-[#eee] hover:border-[#6b0f2a]/20'
                          }`}>
                          <TierIcon className={`h-4 w-4 sm:h-5 sm:w-5 ${isActive ? accent.text : 'text-[#aaa]'}`} />
                          <span className={`text-xs sm:text-sm font-semibold ${isActive ? 'text-[#1a1a1a]' : 'text-[#555]'}`}>
                            {tier.label}
                          </span>
                          <span className="text-[9px] sm:text-[11px] text-[#aaa]">
                            ₹{(tier.min/1000).toFixed(0)}K - ₹{(tier.max/1000).toFixed(0)}K
                          </span>
                        </motion.button>
                      );
                    })}
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Preferences */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-5 sm:space-y-8">
                <div className="text-center px-2">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-[#1a1a1a] mb-1.5 sm:mb-2">
                    Any special touches?
                  </h3>
                  <p className="text-[#888] text-sm sm:text-base">Select extras to make it unforgettable</p>
                </div>
                
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid gap-2 sm:gap-3 max-w-2xl mx-auto">
                  {preferenceOptions.map((pref) => {
                    const accent = accentClasses[pref.accent];
                    const isSelected = formData.preferences.includes(pref.id);
                    const PrefIcon = pref.icon;
                    
                    return (
                      <motion.button
                        key={pref.id}
                        variants={itemVariants}
                        whileHover={{ scale: 1.01, x: 2 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => {
                          const newPrefs = isSelected
                            ? formData.preferences.filter((p) => p !== pref.id)
                            : [...formData.preferences, pref.id];
                          setFormData({ ...formData, preferences: newPrefs });
                        }}
                        className={`flex items-center justify-between rounded-xl sm:rounded-2xl border p-3 sm:p-4 lg:p-5 transition-all duration-300 ${
                          isSelected
                            ? `${accent.bg} ${accent.border} ring-1 ${accent.ring}`
                            : 'bg-white border-[#eee] hover:border-[#6b0f2a]/20 hover:shadow-sm'
                        }`}>
                        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                          <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl flex-shrink-0 transition-colors ${
                            isSelected ? accent.bg : 'bg-[#f8f5f2]'
                          }`}>
                            <PrefIcon className={`h-4 w-4 sm:h-5 sm:w-5 ${isSelected ? accent.text : 'text-[#999]'}`} />
                          </div>
                          <div className="text-left min-w-0">
                            <h4 className={`font-semibold text-sm sm:text-base ${isSelected ? 'text-[#1a1a1a]' : 'text-[#555]'}`}>
                              {pref.label}
                            </h4>
                            <p className="text-[10px] sm:text-xs text-[#aaa] truncate">{pref.description}</p>
                          </div>
                        </div>
                        
                        <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ml-2 ${
                          isSelected ? `${accent.border} ${accent.bg}` : 'border-[#eee]'
                        }`}>
                          {isSelected && <CheckCircle2 className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${accent.text}`} />}
                        </div>
                      </motion.button>
                    );
                  })}
                </motion.div>

                {/* Selected Count */}
                <AnimatePresence>
                  {formData.preferences.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="text-center">
                      <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#fdf5f7] text-[#6b0f2a] text-xs sm:text-sm font-medium">
                        <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        {formData.preferences.length} extra{formData.preferences.length > 1 ? 's' : ''} selected
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Loading State */}
            {currentStep === steps.length && !recommendation && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 sm:py-20">
                <div className="relative inline-block mb-6 sm:mb-8">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                    <Loader2 className="h-12 w-12 sm:h-16 sm:w-16 text-[#6b0f2a]" />
                  </motion.div>
                  <div className="absolute inset-0 h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-[#6b0f2a]/20 blur-xl animate-pulse" />
                </div>
                
                <motion.p 
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-base sm:text-lg text-[#888] mb-4 sm:mb-6">
                  Crafting your perfect celebration...
                </motion.p>
                
                <div className="flex justify-center gap-2 sm:gap-3">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        y: [0, -6, 0],
                        opacity: [0.3, 1, 0.3]
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity, 
                        delay: i * 0.2 
                      }}
                      className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#6b0f2a]"
                    />
                  ))}
                </div>

                {/* Fake Loading Steps */}
                <div className="mt-6 sm:mt-8 max-w-xs sm:max-w-sm mx-auto space-y-2 px-4">
                  {['Analyzing preferences...', 'Matching venues...', 'Curating add-ons...', 'Finalizing package...'].map((step, i) => (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.8 }}
                      className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-[#888]">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ delay: i * 0.8, duration: 0.5 }}>
                        <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#2d8a7e]" />
                      </motion.div>
                      {step}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Recommendation Result */}
            {recommendation && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-5 sm:space-y-8">
                {/* Header */}
                <div className="text-center px-2">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="inline-flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#fdf5f7] border border-[#6b0f2a]/20">
                    <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#6b0f2a] fill-[#6b0f2a]" />
                    <span className="text-xs sm:text-sm text-[#6b0f2a] font-semibold">AI Recommended</span>
                  </motion.div>
                  
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#1a1a1a] mb-2 sm:mb-3 leading-tight">
                    Your Perfect <span className="bg-gradient-to-r from-[#6b0f2a] to-[#a04060] bg-clip-text text-transparent">Celebration</span>
                  </h3>
                  <p className="text-[#888] text-sm sm:text-base max-w-md mx-auto">{recommendation.description}</p>
                </div>

                {/* Main Cards */}
                <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 px-1">
                  <motion.div
                    whileHover={{ y: -3 }}
                    className="rounded-xl sm:rounded-2xl border border-[#eee] bg-white p-4 sm:p-6 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center gap-2.5 sm:gap-3 mb-2 sm:mb-3">
                      <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-[#fdf5f7]">
                        <Crown className="h-4 w-4 sm:h-5 sm:w-5 text-[#6b0f2a]" />
                      </div>
                      <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-[#6b0f2a]">Package</span>
                    </div>
                    <p className="text-base sm:text-xl font-semibold text-[#1a1a1a]">{recommendation.package}</p>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -3 }}
                    className="rounded-xl sm:rounded-2xl border border-[#eee] bg-white p-4 sm:p-6 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center gap-2.5 sm:gap-3 mb-2 sm:mb-3">
                      <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-[#fdf5f7]">
                        <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-[#6b0f2a]" />
                      </div>
                      <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-[#6b0f2a]">Venue</span>
                    </div>
                    <p className="text-base sm:text-xl font-semibold text-[#1a1a1a]">{recommendation.room}</p>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -3 }}
                    className="rounded-xl sm:rounded-2xl border border-[#eee] bg-white p-4 sm:p-6 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center gap-2.5 sm:gap-3 mb-2 sm:mb-3">
                      <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-[#fdf8f5]">
                        <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-[#a08060]" />
                      </div>
                      <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-[#a08060]">Theme</span>
                    </div>
                    <p className="text-base sm:text-xl font-semibold text-[#1a1a1a]">{recommendation.decorTheme}</p>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -3 }}
                    className="rounded-xl sm:rounded-2xl border border-[#eee] bg-white p-4 sm:p-6 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center gap-2.5 sm:gap-3 mb-2 sm:mb-3">
                      <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-[#fdf5f7]">
                        <Wallet className="h-4 w-4 sm:h-5 sm:w-5 text-[#6b0f2a]" />
                      </div>
                      <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-[#6b0f2a]">Estimated</span>
                    </div>
                    <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#6b0f2a] to-[#a04060] bg-clip-text text-transparent">₹{recommendation.estimatedPrice.toLocaleString()}</p>
                  </motion.div>
                </div>

                {/* Includes List */}
                {recommendation.includes && recommendation.includes.length > 0 && (
                  <div className="rounded-xl sm:rounded-2xl border border-[#eee] bg-[#f8f5f2] p-4 sm:p-6 mx-1">
                    <h4 className="font-semibold text-[#1a1a1a] mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                      <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-[#2d8a7e]" />
                      What's Included
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-2 sm:gap-3">
                      {recommendation.includes.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08 }}
                          className="flex items-center gap-2 text-xs sm:text-sm text-[#555]">
                          <div className="h-1.5 w-1.5 rounded-full bg-[#6b0f2a] flex-shrink-0" />
                          {item}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add-ons */}
                {recommendation.addOns.length > 0 && (
                  <div className="rounded-xl sm:rounded-2xl border border-[#eee] bg-white p-4 sm:p-6 mx-1">
                    <h4 className="font-semibold text-[#1a1a1a] mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                      <Gift className="h-4 w-4 sm:h-5 sm:w-5 text-[#a08060]" />
                      Recommended Add-ons
                    </h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {recommendation.addOns.map((addon, i) => (
                        <motion.span
                          key={addon}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.08 }}
                          className="inline-flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm bg-[#fdf5f7] text-[#6b0f2a] border border-[#6b0f2a]/15 font-medium">
                          <Sparkles className="h-3 w-3" />
                          {addon}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Timeline */}
                {recommendation.timeline && (
                  <div className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-xl bg-[#f8f5f2] border border-[#eee] mx-1">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-[#999]" />
                    <span className="text-xs sm:text-sm text-[#555]">
                      <span className="font-semibold text-[#1a1a1a]">Duration:</span> {recommendation.timeline}
                    </span>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row justify-center gap-2.5 sm:gap-4 pt-2 sm:pt-4 px-1">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={resetPlanner}
                    className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-xl border border-[#eee] text-[#555] text-sm font-medium hover:bg-[#f8f5f2] transition-all">
                    <RotateCcw className="h-4 w-4" />
                    Start Over
                  </motion.button>
                  
                  <motion.a
                    href="/book"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 rounded-xl bg-gradient-to-r from-[#6b0f2a] to-[#8b1a3a] text-white text-sm font-bold shadow-[0_0_20px_rgba(107,15,42,0.25)] hover:shadow-[0_0_30px_rgba(107,15,42,0.35)] transition-all">
                    Book This Experience
                    <ArrowRight className="h-4 w-4" />
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        {currentStep < steps.length && !recommendation && (
          <div className="mt-8 sm:mt-12 flex justify-between items-center px-1">
            <motion.button
              whileHover={{ x: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrev}
              disabled={currentStep === 0}
              className={`inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-sm font-medium transition-all ${
                currentStep === 0
                  ? 'opacity-0 pointer-events-none'
                  : 'text-[#555] hover:bg-[#f8f5f2] border border-[#eee]'
              }`}>
              <ArrowLeft className="h-4 w-4" />
              Back
            </motion.button>
            
            <div className="flex items-center gap-1.5">
              <span className="text-xs sm:text-sm text-[#aaa]">
                {currentStep + 1} <span className="text-[#ccc]">/</span> {steps.length}
              </span>
            </div>
            
            {currentStep < steps.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNext}
                disabled={!isStepValid()}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-[#6b0f2a] to-[#8b1a3a] text-white text-sm font-semibold shadow-[0_0_16px_rgba(107,15,42,0.2)] hover:shadow-[0_0_24px_rgba(107,15,42,0.3)] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none">
                Continue
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={!isStepValid() || loading}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-[#6b0f2a] to-[#8b1a3a] text-white text-sm font-semibold shadow-[0_0_16px_rgba(107,15,42,0.2)] hover:shadow-[0_0_24px_rgba(107,15,42,0.3)] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none">
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="hidden sm:inline">Generating...</span>
                    <span className="sm:hidden">...</span>
                  </>
                ) : (
                  <>
                    Get Plan
                    <Sparkles className="h-4 w-4" />
                  </>
                )}
              </motion.button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}