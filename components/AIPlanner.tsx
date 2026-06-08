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
  Info,
  Play
} from 'lucide-react';

const occasions = [
  { value: 'birthday', label: 'Birthday', icon: Cake, accent: 'amber', description: 'Make their day unforgettable' },
  { value: 'proposal', label: 'Proposal', icon: Heart, accent: 'coral', description: 'The perfect "Yes" moment' },
  { value: 'anniversary', label: 'Anniversary', icon: Sparkles, accent: 'amber', description: 'Celebrate your journey' },
  { value: 'date_night', label: 'Date Night', icon: Wine, accent: 'coral', description: 'Intimate & romantic' },
  { value: 'family', label: 'Family', icon: Users, accent: 'sage', description: 'Memories for everyone' },
  { value: 'corporate', label: 'Corporate', icon: Briefcase, accent: 'amber', description: 'Impress your team' },
];

const moods = [
  { value: 'romantic', label: 'Romantic', icon: Heart, accent: 'coral', description: 'Soft lights & sweet moments' },
  { value: 'party', label: 'Party', icon: PartyPopper, accent: 'amber', description: 'High energy celebration' },
  { value: 'chill', label: 'Chill', icon: Flame, accent: 'sage', description: 'Relaxed & intimate' },
  { value: 'epic', label: 'Epic', icon: Zap, accent: 'amber', description: 'Grand & unforgettable' },
  { value: 'nostalgic', label: 'Nostalgic', icon: Film, accent: 'amber', description: 'Classic & timeless' },
];

const preferenceOptions = [
  { id: 'karaoke', label: 'Karaoke', icon: Music, accent: 'amber', description: 'Sing your heart out' },
  { id: 'photography', label: 'Photo Shoot', icon: Camera, accent: 'coral', description: 'Capture every moment' },
  { id: 'gaming', label: 'Gaming', icon: Gamepad2, accent: 'sage', description: 'Console & projector' },
  { id: 'live_music', label: 'Live Music', icon: Music, accent: 'amber', description: 'Acoustic performance' },
  { id: 'special_decor', label: 'Decor', icon: Sparkles, accent: 'coral', description: 'Themed decorations' },
  { id: 'gourmet_food', label: 'Gourmet', icon: Utensils, accent: 'amber', description: 'Chef-curated menu' },
  { id: 'champagne', label: 'Champagne', icon: Wine, accent: 'coral', description: 'Premium bubbly' },
  { id: 'movie_marathon', label: 'Movies', icon: Film, accent: 'sage', description: 'Binge-watch together' },
];

const steps = [
  { id: 'occasion', label: 'Occasion', icon: Gift },
  { id: 'mood', label: 'Mood', icon: Lightbulb },
  { id: 'group', label: 'Group', icon: Users },
  { id: 'budget', label: 'Budget', icon: Wallet },
  { id: 'preferences', label: 'Extras', icon: Sparkles },
];

const colorMap: Record<string, { 
  bg: string; 
  border: string; 
  text: string; 
  glow: string; 
  ring: string;
  gradient: string;
  light: string;
}> = {
  amber: { 
    bg: 'bg-amber/10', 
    border: 'border-amber/30', 
    text: 'text-amber',
    glow: 'shadow-amber/20',
    ring: 'ring-amber/40',
    gradient: 'from-amber to-amber-dark',
    light: 'bg-amber/5'
  },
  coral: { 
    bg: 'bg-coral/10', 
    border: 'border-coral/30', 
    text: 'text-coral',
    glow: 'shadow-coral/20',
    ring: 'ring-coral/40',
    gradient: 'from-coral to-coral-dark',
    light: 'bg-coral/5'
  },
  sage: { 
    bg: 'bg-sage/10', 
    border: 'border-sage/30', 
    text: 'text-sage',
    glow: 'shadow-sage/20',
    ring: 'ring-sage/40',
    gradient: 'from-sage to-sage-dark',
    light: 'bg-sage/5'
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

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.05 }
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.02, staggerDirection: -1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { 
    opacity: 1, 
    y: 0, 
    willChange: 'transform',
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
  },
  exit: { opacity: 0, y: -6, willChange: 'transform' }
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 40 : -40,
    opacity: 0,
    transition: { duration: 0.2 }
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
    // Simulate API call
    setTimeout(() => {
      setRecommendation({
        package: 'The Director\'s Cut',
        room: 'Royal Amber Screen',
        decorTheme: `${formData.occasion === 'proposal' ? 'Romantic Rose' : formData.occasion === 'birthday' ? 'Celebration Sparkle' : 'Luxury Elegance'}`,
        estimatedPrice: formData.budget,
        addOns: formData.preferences.map(p => {
          const pref = preferenceOptions.find(opt => opt.id === p);
          return pref?.label || '';
        }).filter(Boolean),
        description: `A ${formData.mood} ${occasions.find(o => o.value === formData.occasion)?.label || 'celebration'} for ${formData.groupSize} guests. Perfect blend of luxury and personalization.`,
        timeline: '3-4 hours',
        includes: ['Private theatre access', 'Welcome drinks', 'Premium sound system', 'Custom lighting', 'Dedicated host']
      });
      setLoading(false);
      setCurrentStep(steps.length);
    }, 2000);
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
      summaries.push({ icon: Users, label: `${formData.groupSize} guests`, accent: 'sage' });
    }
    if (formData.budget) {
      summaries.push({ icon: Wallet, label: `₹${(formData.budget/1000).toFixed(0)}K`, accent: 'amber' });
    }
    return summaries;
  };

  const getAccent = (accentName: string) => {
    return colorMap[accentName] || colorMap.amber;
  };

  return (
    <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-coral/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative rounded-3xl border border-amber/15 bg-white/60 backdrop-blur-sm shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="relative px-6 sm:px-8 lg:px-12 pt-8 sm:pt-10 pb-6 text-center border-b border-amber/10">
          <motion.div 
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-amber/30 bg-amber/10 px-4 py-2 mb-4">
              <Sparkles className="h-4 w-4 text-amber" />
              <span className="text-sm font-accent uppercase tracking-[0.2em] text-amber">AI Celebration Planner</span>
            </div>
            
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ivory mb-3">
              Plan Your Perfect{' '}
              <span className="text-burgundy">
                Experience
              </span>
            </h2>
            
            <p className="text-mist max-w-md mx-auto">
              Answer 5 quick questions and let our AI craft a celebration tailored just for you
            </p>
          </motion.div>
        </div>

        {/* Summary Chips - Moved above stepper for better visibility */}
        <AnimatePresence>
          {currentStep > 0 && currentStep < steps.length && getStepSummary().length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex justify-center gap-2 flex-wrap pt-4 px-6"
            >
              {getStepSummary().map((item, i) => {
                const accent = getAccent(item.accent);
                const ItemIcon = item.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08 }}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${accent.bg} ${accent.border} ${accent.text}`}
                  >
                    <ItemIcon className="h-3 w-3" />
                    {item.label}
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress Stepper */}
        <div className="px-6 sm:px-8 lg:px-12 pt-6 pb-4">
          <div className="flex items-center justify-between max-w-xl mx-auto">
            {steps.map((step, index) => {
              const isCompleted = index < currentStep;
              const isActive = index === currentStep;
              const StepIcon = step.icon;
              
              return (
                <div key={step.id} className="flex flex-col items-center flex-1">
                  <button
                    onClick={() => handleStepClick(index)}
                    disabled={index > currentStep}
                    className={`relative group focus:outline-none`}
                  >
                    <motion.div
                      animate={isActive ? { 
                        boxShadow: ['0 0 0 0px rgba(245, 158, 11, 0)', '0 0 0 4px rgba(245, 158, 11, 0.15)', '0 0 0 0px rgba(245, 158, 11, 0)']
                      } : {}}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 ${
                        isCompleted
                          ? 'text-gradient-amber shadow-lg'
                          : isActive
                          ? 'bg-amber text-midnight ring-4 ring-amber/20 shadow-lg'
                          : 'bg-white/40 border border-amber/10 text-mist/60'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : <StepIcon className="h-4 w-4" />}
                    </motion.div>
                    
                    {/* Tooltip on hover */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <span className="text-[10px] text-mist bg-midnight/80 px-2 py-1 rounded">{step.label}</span>
                    </div>
                  </button>
                  
                  <span className={`text-[10px] mt-2 font-medium transition-colors hidden sm:block ${
                    isActive ? 'text-amber' : isCompleted ? 'text-ivory/80' : 'text-mist/60'
                  }`}>
                    {step.label}
                  </span>
                  
                  {/* Progress line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-[calc(50%+20px)] top-5 w-[calc(100%-40px)] h-0.5 -z-10 hidden sm:block">
                      <div className={`h-full transition-all duration-500 ${
                        index < currentStep ? 'bg-gradient-to-r from-amber to-coral' : 'bg-white/10'
                      }`} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="min-h-[420px] px-6 sm:px-8 lg:px-12 py-6">
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
                className="space-y-6"
              >
                <div className="text-center">
                  <h3 className="text-2xl font-display font-bold text-ivory mb-2">
                    What's the occasion?
                  </h3>
                  <p className="text-mist text-sm">Select the celebration you're planning</p>
                </div>
                
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-2 md:grid-cols-3 gap-3"
                >
                  {occasions.map((occasion) => {
                    const accent = getAccent(occasion.accent);
                    const isSelected = formData.occasion === occasion.value;
                    const OccasionIcon = occasion.icon;
                    
                    return (
                      <motion.button
                        key={occasion.value}
                        variants={itemVariants}
                        onClick={() => setFormData({ ...formData, occasion: occasion.value })}
                        className={`group relative flex flex-col items-center text-center rounded-xl border p-4 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
                          isSelected
                            ? `${accent.bg} ${accent.border} ring-2 ${accent.ring}`
                            : 'border-amber/10 bg-white/50 hover:border-amber/30'
                        }`}
                      >
                        <div className={`p-2.5 rounded-xl mb-3 transition-all duration-300 ${
                          isSelected ? accent.bg : 'bg-white/5 group-hover:bg-amber/10'
                        }`}>
                          <OccasionIcon className={`h-6 w-6 transition-colors ${
                            isSelected ? accent.text : 'text-mist group-hover:text-amber'
                          }`} />
                        </div>
                        <h4 className={`font-semibold text-sm mb-0.5 transition-colors ${
                          isSelected ? 'text-ivory' : 'text-ivory/90'
                        }`}>
                          {occasion.label}
                        </h4>
                        <p className="text-[10px] text-mist/80">{occasion.description}</p>
                        
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-2 right-2"
                          >
                            <CheckCircle2 className={`h-4 w-4 ${accent.text}`} />
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
                className="space-y-6"
              >
                <div className="text-center">
                  <h3 className="text-2xl font-display font-bold text-ivory mb-2">
                    Set the mood
                  </h3>
                  <p className="text-mist text-sm">How do you want the atmosphere to feel?</p>
                </div>
                
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-2 md:grid-cols-3 gap-3"
                >
                  {moods.map((mood) => {
                    const accent = getAccent(mood.accent);
                    const isSelected = formData.mood === mood.value;
                    const MoodIcon = mood.icon;
                    
                    return (
                      <motion.button
                        key={mood.value}
                        variants={itemVariants}
                        onClick={() => setFormData({ ...formData, mood: mood.value })}
                        className={`group relative flex flex-col items-center text-center rounded-xl border p-4 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
                          isSelected
                            ? `${accent.bg} ${accent.border} ring-2 ${accent.ring}`
                            : 'border-amber/10 bg-white/50 hover:border-amber/30'
                        }`}
                      >
                        <div className={`p-2.5 rounded-xl mb-3 transition-all duration-300 ${
                          isSelected ? accent.bg : 'bg-white/5 group-hover:bg-amber/10'
                        }`}>
                          <MoodIcon className={`h-6 w-6 transition-colors ${
                            isSelected ? accent.text : 'text-mist group-hover:text-amber'
                          }`} />
                        </div>
                        <h4 className={`font-semibold text-sm mb-0.5 transition-colors ${
                          isSelected ? 'text-ivory' : 'text-ivory/90'
                        }`}>
                          {mood.label}
                        </h4>
                        <p className="text-[10px] text-mist/80">{mood.description}</p>
                        
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-2 right-2"
                          >
                            <CheckCircle2 className={`h-4 w-4 ${accent.text}`} />
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
                className="space-y-6"
              >
                <div className="text-center">
                  <h3 className="text-2xl font-display font-bold text-ivory mb-2">
                    How many guests?
                  </h3>
                  <p className="text-mist text-sm">Tell us your group size</p>
                </div>
                
                <div className="max-w-sm mx-auto">
                  <motion.div 
                    key={formData.groupSize}
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center mb-6"
                  >
                    <div className="inline-flex items-baseline gap-2">
                      <span className="text-5xl sm:text-6xl font-bold font-display bg-gradient-to-r from-amber to-coral bg-clip-text text-transparent">
                        {formData.groupSize}
                      </span>
                      <span className="text-base text-mist">guests</span>
                    </div>
                  </motion.div>
                  
                  <div className="relative mb-6">
                    <input
                      type="range"
                      min="2"
                      max="50"
                      value={formData.groupSize}
                      onChange={(e) => setFormData({ ...formData, groupSize: parseInt(e.target.value) })}
                      className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-amber"
                      style={{
                        background: `linear-gradient(to right, #F59E0B 0%, #F59E0B ${((formData.groupSize - 2) / 48) * 100}%, rgba(255,255,255,0.1) ${((formData.groupSize - 2) / 48) * 100}%, rgba(255,255,255,0.1) 100%)`
                      }}
                    />
                    <div className="flex justify-between mt-2 text-xs text-mist/80">
                      <span>2</span>
                      <span>25</span>
                      <span>50</span>
                    </div>
                  </div>

                  {/* Quick Select */}
                  <div className="flex justify-center gap-2 flex-wrap">
                    {[2, 4, 6, 10, 15, 20, 30, 50].map((num) => (
                      <motion.button
                        key={num}
                        onClick={() => setFormData({ ...formData, groupSize: num })}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all hover:scale-105 active:scale-95 ${
                          formData.groupSize === num
                            ? 'bg-amber text-midnight'
                            : 'bg-white/50 text-ink-secondary hover:bg-white/70 border border-amber/10'
                        }`}
                      >
                        {num}
                      </motion.button>
                    ))}
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
                className="space-y-6"
              >
                <div className="text-center">
                  <h3 className="text-2xl font-display font-bold text-ivory mb-2">
                    What's your budget?
                  </h3>
                  <p className="text-mist text-sm">Set a comfortable spending range</p>
                </div>
                
                <div className="max-w-sm mx-auto">
                  <motion.div 
                    key={formData.budget}
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center mb-6"
                  >
                    <span className="text-4xl sm:text-5xl font-bold font-display bg-gradient-to-r from-amber to-coral bg-clip-text text-transparent">
                      ₹{(formData.budget / 1000).toFixed(0)}K
                    </span>
                    <p className="text-xs text-mist/60 mt-1">
                      {formData.budget >= 50000 ? '✨ Premium Experience' : 
                       formData.budget >= 15000 ? '🌟 Standard Package' : '💫 Budget Friendly'}
                    </p>
                  </motion.div>
                  
                  <div className="relative mb-6">
                    <input
                      type="range"
                      min="2000"
                      max="200000"
                      step="1000"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) })}
                      className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-amber"
                      style={{
                        background: `linear-gradient(to right, #F59E0B 0%, #F59E0B ${((formData.budget - 2000) / 198000) * 100}%, rgba(255,255,255,0.1) ${((formData.budget - 2000) / 198000) * 100}%, rgba(255,255,255,0.1) 100%)`
                      }}
                    />
                    <div className="flex justify-between mt-2 text-xs text-mist/80">
                      <span>₹2K</span>
                      <span>₹1L</span>
                      <span>₹2L</span>
                    </div>
                  </div>

                  {/* Budget Tiers */}
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: 'Essential', min: 2000, max: 5000, icon: Target, accent: 'sage' },
                      { label: 'Standard', min: 5000, max: 15000, icon: Star, accent: 'amber' },
                      { label: 'Premium', min: 15000, max: 50000, icon: Crown, accent: 'amber' },
                      { label: 'Luxury', min: 50000, max: 200000, icon: Diamond, accent: 'coral' },
                    ].map((tier) => {
                      const isActive = formData.budget >= tier.min && formData.budget <= tier.max;
                      const accent = getAccent(tier.accent);
                      const TierIcon = tier.icon;
                      
                      return (
                        <motion.button
                          key={tier.label}
                          onClick={() => setFormData({ ...formData, budget: Math.round((tier.min + tier.max) / 2) })}
                          className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition-all hover:scale-[1.02] active:scale-[0.98] ${
                            isActive 
                              ? `${accent.bg} ${accent.border} ring-2 ${accent.ring}` 
                              : 'border-amber/10 bg-white/50 hover:border-amber/30'
                          }`}
                        >
                          <TierIcon className={`h-4 w-4 ${isActive ? accent.text : 'text-mist/80'}`} />
                          <span className={`text-xs font-semibold ${isActive ? 'text-ivory' : 'text-ivory/80'}`}>
                            {tier.label}
                          </span>
                          <span className="text-[9px] text-mist/80">
                            ₹{(tier.min/1000).toFixed(0)}K - ₹{(tier.max/1000).toFixed(0)}K
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
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
                className="space-y-6"
              >
                <div className="text-center">
                  <h3 className="text-2xl font-display font-bold text-ivory mb-2">
                    Any special touches?
                  </h3>
                  <p className="text-mist text-sm">Select extras to make it unforgettable</p>
                </div>
                
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-2xl mx-auto"
                >
                  {preferenceOptions.map((pref) => {
                    const accent = getAccent(pref.accent);
                    const isSelected = formData.preferences.includes(pref.id);
                    const PrefIcon = pref.icon;
                    
                    return (
                      <motion.button
                        key={pref.id}
                        variants={itemVariants}
                        onClick={() => {
                          const newPrefs = isSelected
                            ? formData.preferences.filter((p) => p !== pref.id)
                            : [...formData.preferences, pref.id];
                          setFormData({ ...formData, preferences: newPrefs });
                        }}
                        className={`flex items-center gap-3 rounded-xl border p-3 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] ${
                          isSelected
                            ? `${accent.bg} ${accent.border} ring-1 ${accent.ring}`
                            : 'border-amber/10 bg-white/50 hover:border-amber/30'
                        }`}
                      >
                        <div className={`p-2 rounded-lg transition-colors ${
                          isSelected ? accent.bg : 'bg-white/5'
                        }`}>
                          <PrefIcon className={`h-4 w-4 ${isSelected ? accent.text : 'text-mist'}`} />
                        </div>
                        <div className="flex-1 text-left">
                          <h4 className={`text-sm font-medium ${isSelected ? 'text-ivory' : 'text-ivory/90'}`}>
                            {pref.label}
                          </h4>
                          <p className="text-[10px] text-mist/80">{pref.description}</p>
                        </div>
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                          isSelected ? `${accent.border} ${accent.bg}` : 'border-white/20'
                        }`}>
                          {isSelected && <CheckCircle2 className={`h-3 w-3 ${accent.text}`} />}
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
                      className="text-center"
                    >
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber/10 text-amber text-xs font-medium">
                        <Sparkles className="h-3 w-3" />
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
                className="text-center py-12"
              >
                <div className="relative inline-block mb-6">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Loader2 className="h-12 w-12 text-amber" />
                  </motion.div>
                  <div className="absolute inset-0 h-12 w-12 rounded-full bg-amber/20 blur-xl animate-pulse" />
                </div>
                
                <motion.p 
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-mist mb-4"
                >
                  Crafting your perfect celebration...
                </motion.p>
                
                <div className="flex justify-center gap-2">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -6, 0], opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      className="h-2 w-2 rounded-full bg-amber"
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Recommendation Result */}
            {recommendation && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Header */}
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-amber/10 border border-amber/30"
                  >
                    <Star className="h-4 w-4 text-amber fill-amber" />
                    <span className="text-xs font-semibold text-amber">AI Recommended</span>
                  </motion.div>
                  
                  <h3 className="text-2xl font-display font-bold text-ivory mb-2">
                    Your Perfect{' '}
                    <span className="text-burgundy">
                      Celebration
                    </span>
                  </h3>
                  <p className="text-mist text-sm max-w-md mx-auto">{recommendation.description}</p>
                </div>

                {/* Main Cards */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-amber/10 bg-white/50 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Crown className="h-4 w-4 text-amber" />
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-ivory/80">Package</span>
                    </div>
                    <p className="font-semibold text-ivory">{recommendation.package}</p>
                  </div>

                  <div className="rounded-xl border border-amber/10 bg-white/50 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-coral" />
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-ivory/80">Venue</span>
                    </div>
                    <p className="font-semibold text-ivory">{recommendation.room}</p>
                  </div>

                  <div className="rounded-xl border border-amber/10 bg-white/50 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="h-4 w-4 text-sage" />
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-ivory/80">Theme</span>
                    </div>
                    <p className="font-semibold text-ivory">{recommendation.decorTheme}</p>
                  </div>

                  <div className="rounded-xl border border-amber/10 bg-gradient-to-br from-amber/10 to-coral/10 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Wallet className="h-4 w-4 text-amber" />
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-amber">Estimated</span>
                    </div>
                    <p className="text-xl font-bold text-burgundy">
                      ₹{recommendation.estimatedPrice.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Includes List */}
                {recommendation.includes && recommendation.includes.length > 0 && (
                  <div className="rounded-xl border border-amber/10 bg-white/50 p-4">
                    <h4 className="font-semibold text-ivory mb-3 flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-sage" />
                      What's Included
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {recommendation.includes.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-mist">
                          <div className="h-1 w-1 rounded-full bg-amber" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add-ons */}
                {recommendation.addOns.length > 0 && (
                  <div className="rounded-xl border border-amber/10 bg-white/50 p-4">
                    <h4 className="font-semibold text-ivory mb-3 flex items-center gap-2 text-sm">
                      <Gift className="h-4 w-4 text-coral" />
                      Recommended Add-ons
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {recommendation.addOns.map((addon, i) => (
                        <span key={addon} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs bg-amber/10 text-amber border border-amber/30">
                          <Sparkles className="h-3 w-3" />
                          {addon}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Timeline & Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl bg-white/50 border border-amber/10">
                    <Clock className="h-4 w-4 text-mist/80" />
                    <span className="text-sm text-mist">
                      <span className="text-ivory font-medium">Duration:</span> {recommendation.timeline}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <motion.button
                      onClick={resetPlanner}
                      className="px-4 py-3 rounded-xl border border-amber/10 text-ink-secondary text-sm font-medium hover:bg-amber/5 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </motion.button>
                    
                    <motion.a
                      href="/book"
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-gradient-amber text-sm font-bold shadow-lg shadow-amber/20 hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Play className="h-4 w-4 fill-current" />
                      Book This Experience
                      <ArrowRight className="h-4 w-4" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation - Simplified */}
        {currentStep < steps.length && !recommendation && (
          <div className="border-t border-amber/10 px-6 sm:px-8 lg:px-12 py-5 flex justify-between items-center">
            <motion.button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:-translate-x-0.5 active:scale-[0.98] ${
                currentStep === 0
                  ? 'opacity-0 pointer-events-none'
                  : 'text-mist hover:text-ivory hover:bg-amber/5 border border-amber/10'
              }`}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </motion.button>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-mist">
                {currentStep + 1} <span className="text-mist/60">/</span> {steps.length}
              </span>
            </div>
            
            {currentStep < steps.length - 1 ? (
              <motion.button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="group relative inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-gradient-burgundy text-white font-bold text-sm tracking-wider overflow-hidden shadow-burgundy-glow hover:shadow-burgundy-glow-lg transition-all duration-300 hover:-translate-y-0.5 sm:w-auto justify-center disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            ) : (
              <motion.button
                onClick={handleSubmit}
                disabled={!isStepValid() || loading}
                className="group relative inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-gradient-burgundy text-white font-bold text-sm uppercase tracking-wider overflow-hidden shadow-burgundy-glow hover:shadow-burgundy-glow-lg transition-all duration-300 hover:-translate-y-0.5 w-full sm:w-auto justify-center disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Planning...
                  </>
                ) : (
                  <>
                    Get My Plan
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