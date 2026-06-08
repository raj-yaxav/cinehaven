'use client';

import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  Star,
  Heart,
  Zap,
  Users,
  MapPin,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Film,
  PartyPopper,
  Gem,
  Play,
  Quote,
  TrendingUp,
  Award,
  Clock,
  ChevronRight,
  Instagram,
  Linkedin,
  Twitter
} from 'lucide-react';

// Metadata removed — 'use client' prevents static exports

const milestones = [
  {
    year: '2022',
    title: 'The Premiere',
    description: 'Born in Mumbai with a single vision: transform ordinary celebrations into cinematic premieres. Our first theatre opened with just 20 seats and infinite dreams.',
    stat: '1 Theatre',
    icon: Sparkles,
    color: 'amber',
  },
  {
    year: '2023',
    title: 'Box Office Hit',
    description: 'Expanded to Bangalore & Delhi. 5,000+ celebrations hosted. Featured in Vogue India as "The Future of Intimate Celebrations."',
    stat: '5,000+ Events',
    icon: PartyPopper,
    color: 'coral',
  },
  {
    year: '2024',
    title: 'Director\'s Cut',
    description: 'Launched AI celebration planner, immersive 3D room previews, and social booking with split payments. Innovation became our signature.',
    stat: 'AI Launch',
    icon: Zap,
    color: 'sage',
  },
  {
    year: '2025',
    title: 'Nationwide Release',
    description: 'Now in 10+ cities. Partnered with Netflix India for exclusive premiere events. Celebrity endorsements from Bollywood\'s finest.',
    stat: '10+ Cities',
    icon: MapPin,
    color: 'amber',
  },
];

const team = [
  {
    name: 'Aditya Sharma',
    role: 'Founder & CEO',
    bio: 'Former filmmaker turned entrepreneur. Believes every celebration deserves a standing ovation.',
    initials: 'AS',
    color: 'amber',
    social: 'linkedin'
  },
  {
    name: 'Priya Mehta',
    role: 'Head of Operations',
    bio: 'Hospitality veteran with 15+ years. Obsessed with the perfect popcorn temperature.',
    initials: 'PM',
    color: 'coral',
    social: 'instagram'
  },
  {
    name: 'Rahul Verma',
    role: 'Creative Director',
    bio: 'Award-winning set designer. Turns empty rooms into dreamscapes overnight.',
    initials: 'RV',
    color: 'sage',
    social: 'twitter'
  },
  {
    name: 'Sneha Patel',
    role: 'CX Lead',
    bio: 'Has personally attended 200+ celebrations. Your happiness is her KPI.',
    initials: 'SP',
    color: 'amber',
    social: 'instagram'
  },
];

const values = [
  {
    icon: Star,
    title: 'Excellence in Every Frame',
    description: 'From projection clarity to petal placement, we obsess over pixels and petals alike. No detail too small.',
    color: 'amber',
    stat: '4.9/5',
    statLabel: 'Rating'
  },
  {
    icon: Heart,
    title: 'Stories Over Bookings',
    description: 'We don\'t count transactions. We count proposals, anniversaries, and tears of joy. Every booking is a story.',
    color: 'coral',
    stat: '12,847+',
    statLabel: 'Stories'
  },
  {
    icon: Zap,
    title: 'Tech-First Magic',
    description: 'AI planners, 3D previews, smart lighting. We use technology to make magic feel effortless.',
    color: 'sage',
    stat: 'AI',
    statLabel: 'Powered'
  },
  {
    icon: Users,
    title: 'Customer Obsession',
    description: '2 AM requests? Last-minute changes? We\'ve heard it all and delivered it all. Your wish is our command.',
    color: 'amber',
    stat: '24/7',
    statLabel: 'Support'
  },
];

const comparisonFeatures = [
  { feature: 'AI-Powered Celebration Planner', cinehaven: true, others: false, highlight: true },
  { feature: 'Immersive 3D Room Preview', cinehaven: true, others: false, highlight: true },
  { feature: 'Split Payment with Friends', cinehaven: true, others: false, highlight: false },
  { feature: '4K Laser Projection', cinehaven: true, others: true, highlight: false },
  { feature: 'Professional Photography Included', cinehaven: true, others: false, highlight: true },
  { feature: 'Custom Decor Themes', cinehaven: true, others: true, highlight: false },
  { feature: 'Dolby Atmos Surround', cinehaven: true, others: true, highlight: false },
  { feature: '24/7 Concierge Support', cinehaven: true, others: false, highlight: false },
];

const stats = [
  { icon: PartyPopper, value: '12,847+', label: 'Celebrations', color: 'amber' },
  { icon: Star, value: '4.9/5', label: 'Average Rating', color: 'amber' },
  { icon: MapPin, value: '10+', label: 'Cities', color: 'coral' },
  { icon: Users, value: '50+', label: 'Team', color: 'sage' },
  { icon: Clock, value: '24/7', label: 'Support', color: 'amber' },
  { icon: Award, value: '15+', label: 'Awards', color: 'coral' },
];

const testimonials = [
  {
    quote: "CineHaven turned my proposal into a Bollywood premiere. The fog entry, the rose petals, the 4K screen playing our video — she said yes before I even got on one knee.",
    author: "Rohan & Priya",
    occasion: "Engagement",
    location: "Mumbai"
  },
  {
    quote: "We booked for our anniversary thinking it was just a movie night. It became the most romantic evening of our marriage. The gourmet dinner was Michelin-level.",
    author: "Arjun & Meera",
    occasion: "5th Anniversary",
    location: "Bangalore"
  },
  {
    quote: "My daughter's 16th birthday party was legendary. The gaming console, the karaoke, the LED dance floor — her friends are still talking about it.",
    author: "The Kapoor Family",
    occasion: "Sweet 16",
    location: "Delhi"
  }
];

const colorMap: Record<string, {
  bg: string;
  text: string;
  border: string;
  glow: string;
  gradient: string;
  light: string;
}> = {
  amber: {
    bg: 'bg-amber/15',
    text: 'text-amber',
    border: 'border-amber/30',
    glow: 'shadow-amber/20',
    gradient: 'from-amber to-amber-dark',
    light: 'bg-amber/5'
  },
  coral: {
    bg: 'bg-coral/15',
    text: 'text-coral',
    border: 'border-coral/30',
    glow: 'shadow-coral/20',
    gradient: 'from-coral to-coral-dark',
    light: 'bg-coral/5'
  },
  sage: {
    bg: 'bg-sage/15',
    text: 'text-sage',
    border: 'border-sage/30',
    glow: 'shadow-sage/20',
    gradient: 'from-sage to-sage-dark',
    light: 'bg-sage/5'
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-midnight text-ivory relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="fixed inset-0 bg-cover bg-center opacity-[15%]"
          style={{ backgroundImage: 'url(https://res.cloudinary.com/dq3typk9u/image/upload/v1780913946/cinehaven/about-bg.png)' }}
        />
        <div className="absolute top-0 right-1/4 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-amber/8 rounded-full blur-[120px] sm:blur-[200px]" />
        <div className="absolute bottom-0 left-1/4 w-[250px] h-[250px] sm:w-[500px] sm:h-[500px] bg-coral/6 rounded-full blur-[100px] sm:blur-[180px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[700px] sm:h-[700px] bg-mauve/10 rounded-full blur-[150px] sm:blur-[250px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px] sm:bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
      </div>

      {/* Hero Section - Split Layout with Image */}
<section className="relative min-h-[90vh] flex items-center pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
  <div className="mx-auto max-w-7xl w-full">
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      
      {/* Left: Welcome Message */}
      <div className="order-2 lg:order-1">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber/30 bg-amber/10 px-4 py-2 mb-6 animate-in fade-in slide-in-from-left-5 duration-700">
          <Sparkles className="h-4 w-4 text-amber" />
          <span className="text-sm font-accent uppercase tracking-[0.2em] text-amber">Welcome to CineHaven</span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-ivory leading-[1.1] text-balance animate-in fade-in slide-in-from-left-5 duration-700 delay-100">
          Your{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber via-amber-light to-coral">
            Private Cinema
          </span>
          <br />
          <span className="text-ivory">Awaits</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-ink-secondary max-w-xl leading-relaxed animate-in fade-in slide-in-from-left-5 duration-700 delay-200">
          Step into a world where luxury meets entertainment. Experience blockbuster movies, 
          intimate celebrations, and unforgettable moments — all in your own private theatre.
        </p>

        {/* Trust indicators */}
        <div className="mt-8 flex flex-wrap gap-6 animate-in fade-in duration-700 delay-300">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-6 w-6 rounded-full bg-gradient-to-br from-amber to-coral border-2 border-midnight" />
              ))}
            </div>
            <span className="text-sm text-ink-secondary">Trusted by 12,847+ guests</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-amber fill-amber" />
            <Star className="h-4 w-4 text-amber fill-amber" />
            <Star className="h-4 w-4 text-amber fill-amber" />
            <Star className="h-4 w-4 text-amber fill-amber" />
            <Star className="h-4 w-4 text-amber fill-amber" />
            <span className="text-sm text-ink-secondary ml-1">4.9/5</span>
          </div>
        </div>
      </div>

      {/* Right: Floating Logo */}
      <div className="order-1 lg:order-2 relative flex items-center justify-center">
        {/* Animated Background Glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[400px] h-[400px] rounded-full bg-gradient-to-r from-amber/20 via-coral/15 to-sage/20 blur-3xl animate-pulse" />
          <div className="absolute w-[300px] h-[300px] rounded-full bg-amber/10 blur-2xl animate-pulse animation-delay-1000" />
        </div>

        {/* Floating Logo Container */}
        <div className="relative animate-in fade-in zoom-in duration-700 delay-200">
          <div className="relative group animate-float">
            {/* Logo Card */}
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-full border border-white/20 shadow-2xl shadow-amber/20">
              
              {/* Logo Image */}
              <Image
                src="https://res.cloudinary.com/dq3typk9u/image/upload/v1780913947/cinehaven/cinehavenLogo.png"
                alt="CineHaven Logo - Luxury Private Theatre"
                fill
                className="object-contain p-8"
                priority
              />
            </div>

            {/* Floating Orbits */}
            <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full border border-amber/30 animate-spin-slow">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-amber" />
            </div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full border border-coral/30 animate-spin-slow animation-delay-500">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-coral" />
            </div>

            {/* Decorative Stars */}
            <div className="absolute -top-8 -left-8">
              <Star className="h-4 w-4 text-amber/50 animate-pulse" />
            </div>
            <div className="absolute -bottom-8 -right-8">
              <Star className="h-3 w-3 text-coral/50 animate-pulse animation-delay-700" />
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 -left-8 w-12 h-12 rounded-full bg-amber/10 blur-xl animate-float" />
        <div className="absolute bottom-1/4 -right-8 w-16 h-16 rounded-full bg-coral/10 blur-xl animate-float animation-delay-1000" />
      </div>
    </div>
  </div>

  {/* Scroll Indicator */}
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
    <span className="text-xs text-ink-secondary uppercase tracking-wider">Scroll</span>
    <div className="w-6 h-10 rounded-full border border-white/20 flex justify-center">
      <div className="w-1 h-2 rounded-full bg-amber mt-2 animate-scroll" />
    </div>
  </div>
</section>



      {/* Stats Bar - Horizontal Scroll on Mobile */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              const colors = colorMap[stat.color];

              return (
                <div
                  key={stat.label}
                  className="group rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-6 text-center hover:border-amber/30 transition-all duration-300 hover:-translate-y-1">
                  <div className={`inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl ${colors.bg} ${colors.border} border mb-3 sm:mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${colors.text}`} />
                  </div>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-ivory">{stat.value}</p>
                  <p className="mt-1 text-[10px] sm:text-xs text-ink-secondary uppercase tracking-wider">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials - Grid Layout for Better Readability */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-sm font-accent uppercase tracking-[0.2em] text-amber">Love Stories</span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-ivory">
              Words From the <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber to-coral">Audience</span>
            </h2>
            <p className="mt-4 text-ink-secondary max-w-2xl mx-auto">
              Real moments, real people, real magic — hear what our guests have to say about their CineHaven experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-amber/30 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
              >
                <Quote className="h-8 w-8 text-amber/30 mb-4" />
                <p className="text-sm sm:text-base text-ivory/90 leading-relaxed mb-6 flex-grow">"{t.quote}"</p>
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div>
                    <p className="text-sm font-semibold text-ivory">{t.author}</p>
                    <p className="text-xs text-ink-secondary">{t.occasion}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-ink-secondary">
                    <MapPin className="h-3 w-3" />
                    {t.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline - Vertical Timeline Style */}
      <section id="journey" className="relative px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-sm font-accent uppercase tracking-[0.2em] text-amber">The Journey</span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-ivory">
              From <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber to-coral">Script to Screen</span>
            </h2>
            <p className="mt-4 text-ink-secondary max-w-2xl mx-auto">
              Our story is still being written, and the best scenes are yet to come.
            </p>
          </div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-amber/40 via-coral/40 to-amber/40 hidden md:block" />

            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              const colors = colorMap[milestone.color];
              const isEven = index % 2 === 0;

              return (
                <div key={milestone.year} className={`relative mb-16 md:mb-24 last:mb-0 ${isEven ? 'md:pr-[calc(50%+2rem)]' : 'md:pl-[calc(50%+2rem)] md:mt-[-4rem]'}`}>
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-amber shadow-lg shadow-amber/30 z-10 hidden md:block" />

                  {/* Year Badge - Mobile */}
                  <div className="flex items-center gap-3 mb-4 md:hidden">
                    <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${colors.bg} ${colors.border} border`}>
                      <Icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <span className={`text-3xl font-bold ${colors.text}`}>{milestone.year}</span>
                  </div>

                  {/* Content Card */}
                  <div className="ml-12 md:ml-0">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-amber/30 transition-all duration-300 group">
                      {/* Year Badge - Desktop */}
                      <div className={`hidden md:flex items-center gap-3 mb-4 ${isEven ? 'justify-end' : ''}`}>
                        <span className={`text-3xl font-bold ${colors.text}`}>{milestone.year}</span>
                        <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${colors.bg} ${colors.border} border`}>
                          <Icon className={`h-5 w-5 ${colors.text}`} />
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-ivory group-hover:text-amber transition-colors mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-sm text-ink-secondary leading-relaxed mb-4">
                        {milestone.description}
                      </p>

                      <div className={`inline-flex items-center gap-2 rounded-full ${colors.bg} ${colors.border} border px-3 py-1`}>
                        <TrendingUp className={`h-3.5 w-3.5 ${colors.text}`} />
                        <span className={`text-sm font-semibold ${colors.text}`}>{milestone.stat}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose CineHaven - Comparison Grid */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Left: Sticky Header */}
            <div className="lg:col-span-2 lg:sticky lg:top-32 lg:self-start">
              <span className="text-sm font-accent uppercase tracking-[0.2em] text-amber">The Difference</span>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-ivory mb-4">
                Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber to-coral">CineHaven?</span>
              </h2>
              <p className="text-ink-secondary mb-6 leading-relaxed">
                We didn't just build a booking platform. We built a celebration engine that thinks, feels, and delivers magic.
              </p>

              <div className="hidden lg:block">
                <div className="rounded-2xl border border-amber/20 bg-gradient-to-br from-amber/10 to-coral/10 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Gem className="h-6 w-6 text-amber" />
                    <span className="text-lg font-bold text-ivory">The CineHaven Edge</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-ink-secondary">
                      <CheckCircle2 className="h-4 w-4 text-amber flex-shrink-0" />
                      <span>First-mover in AI celebration planning</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-ink-secondary">
                      <CheckCircle2 className="h-4 w-4 text-amber flex-shrink-0" />
                      <span>Exclusive partnerships with top brands</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-ink-secondary">
                      <CheckCircle2 className="h-4 w-4 text-amber flex-shrink-0" />
                      <span>End-to-end experience curation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Comparison Table */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden">
                {/* Header */}
                <div className="grid grid-cols-[1fr_80px_80px] sm:grid-cols-[1fr_120px_120px] gap-2 sm:gap-4 p-4 sm:p-6 border-b border-white/10 bg-white/[0.02]">
                  <div className="text-xs sm:text-sm font-accent uppercase tracking-wider text-dusty flex items-center">Feature</div>
                  <div className="text-center">
                    <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-amber/15 border border-amber/30 px-2 sm:px-3 py-1 sm:py-1.5">
                      <Gem className="h-3 w-3 sm:h-4 sm:w-4 text-amber" />
                      <span className="text-[10px] sm:text-sm font-bold text-amber">Us</span>
                    </div>
                  </div>
                  <div className="text-center text-[10px] sm:text-sm font-accent uppercase tracking-wider text-dusty flex items-center justify-center">Others</div>
                </div>

                {/* Rows */}
                {comparisonFeatures.map((item, index) => (
                  <div
                    key={item.feature}
                    className={`grid grid-cols-[1fr_80px_80px] sm:grid-cols-[1fr_120px_120px] gap-2 sm:gap-4 p-3.5 sm:p-5 items-center hover:bg-white/[0.02] transition-colors ${index !== comparisonFeatures.length - 1 ? 'border-b border-white/5' : ''} ${item.highlight ? 'bg-amber/[0.02]' : ''}`}>
                    <div className="text-xs sm:text-sm text-ivory font-medium leading-tight flex items-center gap-2">
                      {item.highlight && <Sparkles className="h-3 w-3 text-amber flex-shrink-0" />}
                      {item.feature}
                    </div>
                    <div className="flex justify-center">
                      <div className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-sage/15 border border-sage/30">
                        <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-sage" />
                      </div>
                    </div>
                    <div className="flex justify-center">
                      {item.others ? (
                        <div className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white/5 border border-white/10">
                          <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-ink-secondary/40" />
                        </div>
                      ) : (
                        <div className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-coral/10 border border-coral/20">
                          <XCircle className="h-3 w-3 sm:h-4 sm:w-4 text-coral/60" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values - Bento Grid Layout */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-sm font-accent uppercase tracking-[0.2em] text-amber">Principles</span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-ivory">
              Our Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber to-coral">Values</span>
            </h2>
            <p className="mt-4 text-ink-secondary max-w-2xl mx-auto">
              The beliefs that guide everything we do, from our first hello to your final farewell.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {values.map((value, i) => {
              const Icon = value.icon;
              const colors = colorMap[value.color];
              const isLarge = i === 0 || i === 3;

              return (
                <div
                  key={value.title}
                  className={`group relative rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 hover:border-amber/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden ${isLarge ? 'sm:row-span-2' : ''}`}>

                  {/* Background Number */}
                  <div className={`absolute -right-4 -top-4 text-[120px] sm:text-[160px] font-bold ${colors.text} opacity-[0.03] leading-none select-none`}>
                    {i + 1}
                  </div>

                  <div className={`inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl ${colors.bg} ${colors.border} border mb-5 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-6 w-6 sm:h-7 sm:w-7 ${colors.text}`} />
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-ivory group-hover:text-amber transition-colors mb-2 sm:mb-3">
                    {value.title}
                  </h3>
                  <p className="text-sm sm:text-base text-ink-secondary leading-relaxed mb-4 sm:mb-6">
                    {value.description}
                  </p>

                  <div className={`inline-flex items-center gap-2 rounded-full ${colors.bg} ${colors.border} border px-3 py-1`}>
                    <span className={`text-sm font-bold ${colors.text}`}>{value.stat}</span>
                    <span className="text-xs text-ink-secondary">{value.statLabel}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team - Profile Grid */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14 gap-4">
            <div>
              <span className="text-sm font-accent uppercase tracking-[0.2em] text-amber">The Crew</span>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-ivory">
                Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber to-coral">Directors</span>
              </h2>
              <p className="mt-3 text-ink-secondary max-w-lg">The visionaries behind every magical moment</p>
            </div>
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 text-sm text-amber hover:text-amber-light transition-colors group"
            >
              Join the team <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {team.map((member) => {
              const colors = colorMap[member.color];

              return (
                <div
                  key={member.name}
                  className="group rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden hover:border-amber/30 transition-all duration-300 hover:-translate-y-2">

                  {/* Avatar Area */}
                  <div className="relative h-32 sm:h-48 bg-gradient-to-br from-white/[0.05] to-white/[0.02] flex items-center justify-center overflow-hidden">
                    <div className={`h-16 w-16 sm:h-24 sm:w-24 rounded-full ${colors.bg} ${colors.border} border-2 flex items-center justify-center text-2xl sm:text-4xl font-bold ${colors.text} group-hover:scale-110 transition-transform duration-300`}>
                      {member.initials}
                    </div>
                    <div className={`absolute inset-0 ${colors.light} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  </div>

                  <div className="p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-bold text-ivory group-hover:text-amber transition-colors">{member.name}</h3>
                    <p className={`text-xs sm:text-sm ${colors.text} mt-1 font-medium`}>{member.role}</p>
                    <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-ink-secondary leading-relaxed">{member.bio}</p>

                    {/* Social */}
                    <div className="mt-4 flex gap-2">
                      {member.social === 'linkedin' && (
                        <div className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-amber/10 hover:border-amber/30 transition-colors cursor-pointer">
                          <Linkedin className="h-3.5 w-3.5 text-ink-secondary hover:text-amber transition-colors" />
                        </div>
                      )}
                      {member.social === 'instagram' && (
                        <div className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-amber/10 hover:border-amber/30 transition-colors cursor-pointer">
                          <Instagram className="h-3.5 w-3.5 text-ink-secondary hover:text-amber transition-colors" />
                        </div>
                      )}
                      {member.social === 'twitter' && (
                        <div className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-amber/10 hover:border-amber/30 transition-colors cursor-pointer">
                          <Twitter className="h-3.5 w-3.5 text-ink-secondary hover:text-amber transition-colors" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section - Soft and Minimal */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
        <div className="mx-auto max-w-4xl text-center">
          <div className="relative rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-12 md:p-16 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber/10 rounded-full blur-3xl -z-0" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-coral/10 rounded-full blur-3xl -z-0" />

            <div className="inline-flex items-center gap-2 rounded-full border border-amber/30 bg-amber/10 px-4 py-2 mb-6">
              <Sparkles className="h-4 w-4 text-amber" />
              <span className="text-sm font-accent uppercase tracking-[0.2em] text-amber">Ready for Your Premiere?</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-ivory mb-4 sm:mb-6">
              Your Story Deserves a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber to-coral">
                Blockbuster
              </span>
            </h2>
            <p className="text-ink-secondary text-base sm:text-lg mb-8 sm:mb-10 max-w-2xl mx-auto">
              Join 12,000+ happy customers who turned their special moments into unforgettable cinematic experiences.
              From proposals to birthdays, we've directed them all.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber to-amber-dark px-8 py-3.5 text-sm font-bold text-midnight shadow-lg shadow-amber/20 hover:shadow-xl hover:shadow-amber/30 transition-all duration-300 hover:-translate-y-0.5">
                <Heart className="h-4 w-4" />
                Start Your Celebration
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/theatres"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-ivory/20 bg-white/5 px-8 py-3.5 text-sm font-medium text-ivory hover:border-amber/40 hover:text-amber hover:bg-amber/5 transition-all duration-300">
                Explore Theatres
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2 text-xs text-ink-secondary">
                <CheckCircle2 className="h-3.5 w-3.5 text-sage" />
                Instant Booking
              </div>
              <div className="flex items-center gap-2 text-xs text-ink-secondary">
                <CheckCircle2 className="h-3.5 w-3.5 text-sage" />
                Free Cancellation
              </div>
              <div className="flex items-center gap-2 text-xs text-ink-secondary">
                <CheckCircle2 className="h-3.5 w-3.5 text-sage" />
                24/7 Support
              </div>
            </div>
          </div>
        </div>
      </section>
      <style jsx>{`
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  @keyframes scroll {
    0% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(15px); }
  }
  .animate-scroll {
    animation: scroll 1.5s ease-in-out infinite;
  }
  .animation-delay-1000 {
    animation-delay: 1000ms;
  }
  .animation-delay-500 {
    animation-delay: 500ms;
  }
  .animation-delay-700 {
    animation-delay: 700ms;
  }
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .animate-spin-slow {
    animation: spin-slow 8s linear infinite;
  }
`}</style>
    </main>
    
  );
}