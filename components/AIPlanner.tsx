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
  Palmtree,
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
  { value: 'family', label: 'Family Gathering', icon: Users, accent: 'teal', description: 'Memories for everyone' },
  { value: 'corporate', label: 'Corporate Event', icon: Briefcase, accent: 'ink', description: 'Impress your team' },
];

const moods = [
  { value: 'romantic', label: 'Romantic', icon: Heart, accent: 'rosegold', description: 'Soft lights & sweet moments' },
  { value: 'party', label: 'Party Vibes', icon: PartyPopper, accent: 'burgundy', description: 'High energy celebration' },
  { value: 'chill', label: 'Chill & Cozy', icon: Flame, accent: 'teal', description: 'Relaxed & intimate' },
  { value: 'epic', label: 'Epic Surprise', icon: Zap, accent: 'burgundy', description: 'Grand & unforgettable' },
  { value: 'nostalgic', label: 'Nostalgic', icon: Film, accent: 'ink', description: 'Classic & timeless' },
];

const preferenceOptions = [
  { id: 'karaoke', label: 'Karaoke Night', icon: Music, accent: 'burgundy', description: 'Sing your heart out' },
  { id: 'photography', label: 'Photo Shoot', icon: Camera, accent: 'rosegold', description: 'Capture every moment' },
  { id: 'gaming', label: 'Gaming Setup', icon: Gamepad2, accent: 'teal', description: 'Console & projector' },
  { id: 'live_music', label: 'Live Music', icon: Music, accent: 'burgundy', description: 'Acoustic performance' },
  { id: 'special_decor', label: 'Custom Decor', icon: Sparkles, accent: 'rosegold', description: 'Themed decorations' },
  { id: 'gourmet_food', label: 'Gourmet Dining', icon: Utensils, accent: 'burgundy', description: 'Chef-curated menu' },
  { id: 'champagne', label: 'Champagne Toast', icon: Wine, accent: 'rosegold', description: 'Premium bubbly' },
  { id: 'movie_marathon', label: 'Movie Marathon', icon: Film, accent: 'teal', description: 'Binge-watch together' },
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
    bg: 'bg-burgundy-bg', 
    border: 'border-burgundy/30', 
    text: 'text-burgundy',
    glow: 'shadow-burgundy-glow',
    ring: 'ring-burgundy/50',
    gradient: 'from-burgundy/20 to-cream'
  },
  rosegold: { 
    bg: 'bg-rosegold-bg', 
    border: 'border-rosegold/30', 
    text: 'text-rosegold',
    glow: 'shadow-rosegold-glow',
    ring: 'ring-rosegold/50',
    gradient: 'from-rosegold/20 to-cream'
  },
  teal: { 
    bg: 'bg-teal-bg', 
    border: 'border-teal/30', 
    text: 'text-teal',
    glow: 'shadow-teal-glow',
    ring: 'ring-teal/50',
    gradient: 'from-teal/20 to-cream'
  },
  ink: { 
    bg: 'bg-cream-warm', 
    border: 'border-ink-muted/30', 
    text: 'text-ink-secondary',
    glow: '',
    ring: 'ring-ink-muted/30',
    gradient: 'from-ink-muted/10 to-cream'
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
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  },
  exit: { opacity: 0, y: -10, scale: 0.95 }
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    scale: 0.95
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.3 }
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
      summaries.push({ icon: Users, label: `${formData.groupSize} guests`, accent: 'teal' });
    }
    return summaries;
  };

  return (
    <div className="relative mx-auto max-w-5xl">
      {/* Background Decorations */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-burgundy/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-rosegold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative rounded-3xl border border-surface-border bg-white/80 backdrop-blur-2xl p-8 lg:p-12 shadow-soft-lg overflow-hidden">
        
        {/* Header */}
        <motion.div 
          className="mb-10 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-burgundy-bg border border-burgundy/15">
            <Sparkles className="h-4 w-4 text-burgundy" />
            <span className="text-xs font-accent uppercase tracking-[0.25em] text-burgundy font-semibold">
              AI Celebration Planner
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-ink mb-3">
            Plan Your Perfect <span className="text-gradient-burgundy">Experience</span>
          </h2>
          <p className="text-ink-muted max-w-lg mx-auto">
            Answer 5 quick questions and let our AI craft a celebration tailored just for you
          </p>
        </motion.div>

        {/* Progress Stepper — Enhanced */}
        <div className="mb-12">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => {
              const isCompleted = index < currentStep;
              const isActive = index === currentStep;
              const isPending = index > currentStep;
              const StepIcon = step.icon;
              
              return (
                <div key={step.id} className="flex items-center">
                  <motion.button
                    onClick={() => handleStepClick(index)}
                    disabled={index > currentStep}
                    whileHover={index <= currentStep ? { scale: 1.05 } : {}}
                    whileTap={index <= currentStep ? { scale: 0.95 } : {}}
                    className={`relative flex flex-col items-center gap-2 transition-all duration-300 ${
                      index > currentStep ? 'cursor-not-allowed' : 'cursor-pointer'
                    }`}
                  >
                    <motion.div
                      animate={isActive ? { 
                        boxShadow: ['0 0 0 0px rgba(107, 15, 42, 0)', '0 0 0 8px rgba(107, 15, 42, 0.1)', '0 0 0 0px rgba(107, 15, 42, 0)']
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-500 ${
                        isCompleted
                          ? 'bg-burgundy text-white shadow-burgundy-glow'
                          : isActive
                          ? 'bg-burgundy text-white ring-4 ring-burgundy/20 shadow-burgundy-glow'
                          : 'bg-cream-warm text-ink-muted border border-surface-border'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <StepIcon className="h-5 w-5" />
                      )}
                    </motion.div>
                    <span className={`text-xs font-medium transition-colors ${
                      isActive ? 'text-burgundy' : isCompleted ? 'text-ink' : 'text-ink-light'
                    }`}>
                      {step.label}
                    </span>
                    
                    {/* Active Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeStep"
                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-burgundy"
                      />
                    )}
                  </motion.button>
                  
                  {index < steps.length - 1 && (
                    <div className="flex flex-col items-center mx-2 lg:mx-4">
                      <div className={`h-0.5 w-8 lg:w-12 transition-all duration-500 ${
                        isCompleted ? 'bg-burgundy' : 'bg-surface-border'
                      }`} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Summary Chips */}
          <AnimatePresence>
            {currentStep > 0 && getStepSummary().length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex justify-center gap-2 mt-4 flex-wrap"
              >
                {getStepSummary().map((item, i) => {
                  const accent = accentClasses[item.accent];
                  const ItemIcon = item.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${accent.bg} ${accent.border} ${accent.text} border`}
                    >
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
        <div className="min-h-[400px]">
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
                className="space-y-8"
              >
                <div className="text-center">
                  <h3 className="text-2xl lg:text-3xl font-display font-bold text-ink mb-2">
                    What's the occasion?
                  </h3>
                  <p className="text-ink-muted">Select the celebration you're planning</p>
                </div>
                
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  {occasions.map((occasion) => {
                    const accent = accentClasses[occasion.accent];
                    const isSelected = formData.occasion === occasion.value;
                    const OccasionIcon = occasion.icon;
                    
                    return (
                      <motion.button
                        key={occasion.value}
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, y: -4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setFormData({ ...formData, occasion: occasion.value })}
                        className={`group relative flex flex-col items-center text-center rounded-2xl border p-6 lg:p-8 transition-all duration-300 ${
                          isSelected
                            ? `${accent.bg} ${accent.border} ${accent.glow} ring-2 ${accent.ring}`
                            : 'bg-white border-surface-border hover:border-burgundy/20 hover:shadow-soft'
                        }`}
                      >
                        <div className={`p-4 rounded-2xl mb-4 transition-all duration-300 ${
                          isSelected ? accent.bg : 'bg-cream-warm group-hover:bg-burgundy-bg'
                        }`}>
                          <OccasionIcon className={`h-8 w-8 transition-colors ${
                            isSelected ? accent.text : 'text-ink-muted group-hover:text-burgundy'
                          }`} />
                        </div>
                        <h4 className={`font-semibold mb-1 transition-colors ${
                          isSelected ? 'text-ink' : 'text-ink-secondary'
                        }`}>
                          {occasion.label}
                        </h4>
                        <p className="text-xs text-ink-muted">{occasion.description}</p>
                        
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-3 right-3"
                          >
                            <CheckCircle2 className={`h-5 w-5 ${accent.text}`} />
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
                className="space-y-8"
              >
                <div className="text-center">
                  <h3 className="text-2xl lg:text-3xl font-display font-bold text-ink mb-2">
                    Set the mood
                  </h3>
                  <p className="text-ink-muted">How do you want the atmosphere to feel?</p>
                </div>
                
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  {moods.map((mood) => {
                    const accent = accentClasses[mood.accent];
                    const isSelected = formData.mood === mood.value;
                    const MoodIcon = mood.icon;
                    
                    return (
                      <motion.button
                        key={mood.value}
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, y: -4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setFormData({ ...formData, mood: mood.value })}
                        className={`group relative flex flex-col items-center text-center rounded-2xl border p-6 lg:p-8 transition-all duration-300 ${
                          isSelected
                            ? `${accent.bg} ${accent.border} ${accent.glow} ring-2 ${accent.ring}`
                            : 'bg-white border-surface-border hover:border-burgundy/20 hover:shadow-soft'
                        }`}
                      >
                        <div className={`p-4 rounded-2xl mb-4 transition-all duration-300 ${
                          isSelected ? accent.bg : 'bg-cream-warm group-hover:bg-burgundy-bg'
                        }`}>
                          <MoodIcon className={`h-8 w-8 transition-colors ${
                            isSelected ? accent.text : 'text-ink-muted group-hover:text-burgundy'
                          }`} />
                        </div>
                        <h4 className={`font-semibold mb-1 transition-colors ${
                          isSelected ? 'text-ink' : 'text-ink-secondary'
                        }`}>
                          {mood.label}
                        </h4>
                        <p className="text-xs text-ink-muted">{mood.description}</p>
                        
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-3 right-3"
                          >
                            <CheckCircle2 className={`h-5 w-5 ${accent.text}`} />
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
                className="space-y-8"
              >
                <div className="text-center">
                  <h3 className="text-2xl lg:text-3xl font-display font-bold text-ink mb-2">
                    How many guests?
                  </h3>
                  <p className="text-ink-muted">Tell us your group size</p>
                </div>
                
                <div className="max-w-md mx-auto">
                  <motion.div 
                    key={formData.groupSize}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center mb-8"
                  >
                    <div className="inline-flex items-baseline gap-2">
                      <span className="text-7xl lg:text-8xl font-bold font-display text-gradient-burgundy">
                        {formData.groupSize}
                      </span>
                      <span className="text-xl text-ink-muted font-medium">guests</span>
                    </div>
                  </motion.div>
                  
                  <div className="relative mb-8">
                    <input
                      type="range"
                      min="2"
                      max="50"
                      value={formData.groupSize}
                      onChange={(e) => setFormData({ ...formData, groupSize: parseInt(e.target.value) })}
                      className="w-full h-3 bg-cream-warm rounded-full appearance-none cursor-pointer accent-burgundy"
                      style={{
                        background: `linear-gradient(to right, #6B0F2A 0%, #6B0F2A ${((formData.groupSize - 2) / 48) * 100}%, #F5EDE8 ${((formData.groupSize - 2) / 48) * 100}%, #F5EDE8 100%)`
                      }}
                    />
                    <div className="flex justify-between mt-3 text-sm text-ink-muted font-medium">
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
                    className="flex justify-center gap-3 flex-wrap"
                  >
                    {[2, 4, 6, 10, 15, 25, 50].map((num) => (
                      <motion.button
                        key={num}
                        variants={itemVariants}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setFormData({ ...formData, groupSize: num })}
                        className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                          formData.groupSize === num
                            ? 'bg-burgundy text-white shadow-burgundy-glow-sm'
                            : 'bg-cream-warm text-ink-secondary hover:bg-cream-dark border border-surface-border'
                        }`}
                      >
                        {num}
                      </motion.button>
                    ))}
                  </motion.div>

                  {/* Capacity Hint */}
                  <div className="mt-6 flex items-center justify-center gap-2 text-sm text-ink-muted">
                    <Info className="h-4 w-4" />
                    <span>Perfect for intimate gatherings to grand celebrations</span>
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
                className="space-y-8"
              >
                <div className="text-center">
                  <h3 className="text-2xl lg:text-3xl font-display font-bold text-ink mb-2">
                    What's your budget?
                  </h3>
                  <p className="text-ink-muted">Set a comfortable spending range</p>
                </div>
                
                <div className="max-w-md mx-auto">
                  <motion.div 
                    key={formData.budget}
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center mb-8"
                  >
                    <span className="text-5xl lg:text-6xl font-bold font-display text-gradient-burgundy">
                      ₹{(formData.budget / 1000).toFixed(0)}K
                    </span>
                    <p className="text-sm text-ink-muted mt-2">
                      {formData.budget >= 50000 ? 'Premium Experience' : 
                       formData.budget >= 15000 ? 'Standard Package' : 'Budget Friendly'}
                    </p>
                  </motion.div>
                  
                  <div className="relative mb-8">
                    <input
                      type="range"
                      min="2000"
                      max="200000"
                      step="1000"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) })}
                      className="w-full h-3 bg-cream-warm rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #6B0F2A 0%, #6B0F2A ${((formData.budget - 2000) / 198000) * 100}%, #F5EDE8 ${((formData.budget - 2000) / 198000) * 100}%, #F5EDE8 100%)`
                      }}
                    />
                    <div className="flex justify-between mt-3 text-sm text-ink-muted font-medium">
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
                    className="grid grid-cols-2 lg:grid-cols-4 gap-3"
                  >
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
                          className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${
                            isActive 
                              ? `${accent.bg} ${accent.border} ring-2 ${accent.ring}` 
                              : 'bg-white border-surface-border hover:border-burgundy/20'
                          }`}
                        >
                          <TierIcon className={`h-5 w-5 ${isActive ? accent.text : 'text-ink-muted'}`} />
                          <span className={`text-sm font-semibold ${isActive ? 'text-ink' : 'text-ink-secondary'}`}>
                            {tier.label}
                          </span>
                          <span className="text-xs text-ink-muted">
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
                className="space-y-8"
              >
                <div className="text-center">
                  <h3 className="text-2xl lg:text-3xl font-display font-bold text-ink mb-2">
                    Any special touches?
                  </h3>
                  <p className="text-ink-muted">Select extras to make it unforgettable</p>
                </div>
                
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid gap-3 max-w-2xl mx-auto"
                >
                  {preferenceOptions.map((pref) => {
                    const accent = accentClasses[pref.accent];
                    const isSelected = formData.preferences.includes(pref.id);
                    const PrefIcon = pref.icon;
                    
                    return (
                      <motion.button
                        key={pref.id}
                        variants={itemVariants}
                        whileHover={{ scale: 1.01, x: 4 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => {
                          const newPrefs = isSelected
                            ? formData.preferences.filter((p) => p !== pref.id)
                            : [...formData.preferences, pref.id];
                          setFormData({ ...formData, preferences: newPrefs });
                        }}
                        className={`flex items-center justify-between rounded-2xl border p-4 lg:p-5 transition-all duration-300 ${
                          isSelected
                            ? `${accent.bg} ${accent.border} ring-1 ${accent.ring}`
                            : 'bg-white border-surface-border hover:border-burgundy/20 hover:shadow-soft'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-xl transition-colors ${
                            isSelected ? accent.bg : 'bg-cream-warm'
                          }`}>
                            <PrefIcon className={`h-5 w-5 ${isSelected ? accent.text : 'text-ink-muted'}`} />
                          </div>
                          <div className="text-left">
                            <h4 className={`font-semibold ${isSelected ? 'text-ink' : 'text-ink-secondary'}`}>
                              {pref.label}
                            </h4>
                            <p className="text-xs text-ink-muted">{pref.description}</p>
                          </div>
                        </div>
                        
                        <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                          isSelected ? `${accent.border} ${accent.bg}` : 'border-surface-border'
                        }`}>
                          {isSelected && <CheckCircle2 className={`h-4 w-4 ${accent.text}`} />}
                        </div>
                      </motion.button>
                    );
                  })}
                </motion.div>

                {/* Selected Count */}
                <AnimatePresence>
                  {formData.preferences.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-center"
                    >
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-burgundy-bg text-burgundy text-sm font-medium">
                        <Sparkles className="h-4 w-4" />
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
                className="text-center py-20"
              >
                <div className="relative inline-block mb-8">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Loader2 className="h-16 w-16 text-burgundy" />
                  </motion.div>
                  <div className="absolute inset-0 h-16 w-16 rounded-full bg-burgundy/20 blur-xl animate-pulse" />
                </div>
                
                <motion.p 
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-lg text-ink-muted mb-6"
                >
                  Crafting your perfect celebration...
                </motion.p>
                
                <div className="flex justify-center gap-3">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        y: [0, -8, 0],
                        opacity: [0.3, 1, 0.3]
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity, 
                        delay: i * 0.2 
                      }}
                      className="h-3 w-3 rounded-full bg-burgundy"
                    />
                  ))}
                </div>

                {/* Fake Loading Steps */}
                <div className="mt-8 max-w-sm mx-auto space-y-2">
                  {['Analyzing preferences...', 'Matching venues...', 'Curating add-ons...', 'Finalizing package...'].map((step, i) => (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.8 }}
                      className="flex items-center gap-3 text-sm text-ink-muted"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ delay: i * 0.8, duration: 0.5 }}
                      >
                        <CheckCircle2 className="h-4 w-4 text-teal" />
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
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-8"
              >
                {/* Header */}
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-burgundy-bg border border-burgundy/20"
                  >
                    <Star className="h-4 w-4 text-burgundy fill-burgundy" />
                    <span className="text-sm text-burgundy font-semibold">AI Recommended</span>
                  </motion.div>
                  
                  <h3 className="text-3xl font-display font-bold text-ink mb-3">
                    Your Perfect <span className="text-gradient-burgundy">Celebration</span>
                  </h3>
                  <p className="text-ink-muted max-w-lg mx-auto">{recommendation.description}</p>
                </div>

                {/* Main Cards */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="rounded-2xl border border-surface-border bg-white p-6 shadow-soft hover:shadow-card transition-all"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-xl bg-burgundy-bg">
                        <Crown className="h-5 w-5 text-burgundy" />
                      </div>
                      <span className="text-xs font-accent uppercase tracking-[0.2em] text-burgundy font-semibold">Package</span>
                    </div>
                    <p className="text-xl font-semibold text-ink">{recommendation.package}</p>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -4 }}
                    className="rounded-2xl border border-surface-border bg-white p-6 shadow-soft hover:shadow-card transition-all"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-xl bg-burgundy-bg">
                        <MapPin className="h-5 w-5 text-burgundy" />
                      </div>
                      <span className="text-xs font-accent uppercase tracking-[0.2em] text-burgundy font-semibold">Venue</span>
                    </div>
                    <p className="text-xl font-semibold text-ink">{recommendation.room}</p>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -4 }}
                    className="rounded-2xl border border-surface-border bg-white p-6 shadow-soft hover:shadow-card transition-all"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-xl bg-rosegold-bg">
                        <Sparkles className="h-5 w-5 text-rosegold" />
                      </div>
                      <span className="text-xs font-accent uppercase tracking-[0.2em] text-rosegold font-semibold">Theme</span>
                    </div>
                    <p className="text-xl font-semibold text-ink">{recommendation.decorTheme}</p>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -4 }}
                    className="rounded-2xl border border-surface-border bg-white p-6 shadow-soft hover:shadow-card transition-all"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-xl bg-burgundy-bg">
                        <Wallet className="h-5 w-5 text-burgundy" />
                      </div>
                      <span className="text-xs font-accent uppercase tracking-[0.2em] text-burgundy font-semibold">Estimated</span>
                    </div>
                    <p className="text-2xl font-bold text-gradient-burgundy">₹{recommendation.estimatedPrice.toLocaleString()}</p>
                  </motion.div>
                </div>

                {/* Includes List */}
                {recommendation.includes && recommendation.includes.length > 0 && (
                  <div className="rounded-2xl border border-surface-border bg-cream-warm p-6">
                    <h4 className="font-semibold text-ink mb-4 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-teal" />
                      What's Included
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {recommendation.includes.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-2 text-sm text-ink-secondary"
                        >
                          <div className="h-1.5 w-1.5 rounded-full bg-burgundy" />
                          {item}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add-ons */}
                {recommendation.addOns.length > 0 && (
                  <div className="rounded-2xl border border-surface-border bg-white p-6">
                    <h4 className="font-semibold text-ink mb-4 flex items-center gap-2">
                      <Gift className="h-5 w-5 text-rosegold" />
                      Recommended Add-ons
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {recommendation.addOns.map((addon, i) => (
                        <motion.span
                          key={addon}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm bg-burgundy-bg text-burgundy border border-burgundy/20 font-medium"
                        >
                          <Sparkles className="h-3.5 w-3.5" />
                          {addon}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Timeline */}
                {recommendation.timeline && (
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-cream-warm border border-surface-border">
                    <Clock className="h-5 w-5 text-ink-muted" />
                    <span className="text-sm text-ink-secondary">
                      <span className="font-semibold text-ink">Duration:</span> {recommendation.timeline}
                    </span>
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-center gap-4 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={resetPlanner}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-surface-border text-ink-secondary font-medium hover:bg-cream-warm transition-all"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Start Over
                  </motion.button>
                  
                  <motion.a
                    href="/book"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-burgundy text-white font-bold shadow-burgundy-glow hover:shadow-burgundy-glow-lg transition-all"
                  >
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
          <div className="mt-12 flex justify-between items-center">
            <motion.button
              whileHover={{ x: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrev}
              disabled={currentStep === 0}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all ${
                currentStep === 0
                  ? 'opacity-0 pointer-events-none'
                  : 'text-ink-secondary hover:bg-cream-warm border border-surface-border'
              }`}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </motion.button>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-ink-muted">
                Step {currentStep + 1} of {steps.length}
              </span>
            </div>
            
            {currentStep < steps.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNext}
                disabled={!isStepValid()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-burgundy text-white font-semibold shadow-burgundy-glow-sm hover:shadow-burgundy-glow transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={!isStepValid() || loading}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-burgundy text-white font-semibold shadow-burgundy-glow-sm hover:shadow-burgundy-glow transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    Get Recommendations
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