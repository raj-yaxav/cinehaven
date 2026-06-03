import type { Metadata } from 'next';
import Link from 'next/link';
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
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us - CineHaven | Our Story',
  description: 'Learn about CineHaven - India\'s premier private theatre booking platform. Our mission, team, and commitment to creating unforgettable celebration experiences.',
  keywords: ['about CineHaven', 'private theatre story', 'celebration experts', 'cinema booking platform'],
};

const milestones = [
  {
    year: '2022',
    title: 'The Beginning',
    description: 'CineHaven was born from a simple idea: everyone deserves to feel like a star on their special day. We opened our first premium private theatre in Mumbai.',
    stat: '1 City',
    icon: Sparkles,
    color: 'amber',
  },
  {
    year: '2023',
    title: 'Rapid Growth',
    description: 'Expanded to Bangalore and Delhi. Hosted over 5,000 celebrations and achieved a 4.9-star rating across all platforms.',
    stat: '5,000+ Events',
    icon: PartyPopper,
    color: 'coral',
  },
  {
    year: '2024',
    title: 'Innovation',
    description: 'Launched AI-powered celebration planning and immersive room previews. Introduced social booking with split payments.',
    stat: 'AI Launch',
    icon: Zap,
    color: 'sage',
  },
  {
    year: '2025',
    title: 'Going National',
    description: 'Now present in 10+ cities across India. Partnered with leading brands for corporate events and celebrity endorsements.',
    stat: '10+ Cities',
    icon: MapPin,
    color: 'amber',
  },
];

const team = [
  { 
    name: 'Aditya Sharma', 
    role: 'Founder & CEO', 
    bio: 'Former filmmaker with a vision to democratize luxury celebrations',
    initials: 'AS',
    color: 'amber',
  },
  { 
    name: 'Priya Mehta', 
    role: 'Head of Operations', 
    bio: 'Hospitality veteran ensuring flawless execution every time',
    initials: 'PM',
    color: 'coral',
  },
  { 
    name: 'Rahul Verma', 
    role: 'Creative Director', 
    bio: 'Award-winning designer crafting immersive visual experiences',
    initials: 'RV',
    color: 'sage',
  },
  { 
    name: 'Sneha Patel', 
    role: 'Customer Experience', 
    bio: 'Passionate about turning moments into lifelong memories',
    initials: 'SP',
    color: 'amber',
  },
];

const values = [
  {
    icon: Star,
    title: 'Excellence in Every Detail',
    description: 'We obsess over every aspect of your experience, from the quality of our projection to the temperature of your popcorn.',
    color: 'amber',
  },
  {
    icon: Heart,
    title: 'Creating Memories',
    description: 'We don\'t just book rooms; we create moments that last a lifetime. Every celebration matters to us.',
    color: 'coral',
  },
  {
    icon: Zap,
    title: 'Innovation First',
    description: 'We continuously evolve our offerings with technology like AI planning and immersive previews to stay ahead.',
    color: 'sage',
  },
  {
    icon: Users,
    title: 'Customer Obsession',
    description: 'Your happiness is our success. We go above and beyond to exceed expectations at every touchpoint.',
    color: 'amber',
  },
];

const comparisonFeatures = [
  { feature: 'AI-Powered Planning', cinehaven: true, others: false },
  { feature: 'Immersive Room Preview', cinehaven: true, others: false },
  { feature: 'Split Payment Options', cinehaven: true, others: false },
  { feature: '4K Laser Projection', cinehaven: true, others: true },
  { feature: 'Professional Photography', cinehaven: true, others: false },
  { feature: 'Custom Decor Themes', cinehaven: true, others: true },
  { feature: 'Dolby Atmos Sound', cinehaven: true, others: true },
  { feature: '24/7 Customer Support', cinehaven: true, others: false },
];

const stats = [
  { icon: PartyPopper, value: '12,847+', label: 'Celebrations Hosted', color: 'amber' },
  { icon: Star, value: '4.9/5', label: 'Average Rating', color: 'amber' },
  { icon: MapPin, value: '10+', label: 'Cities Across India', color: 'coral' },
  { icon: Users, value: '50+', label: 'Team Members', color: 'sage' },
];

const colorMap: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  amber: { bg: 'bg-amber/15', text: 'text-amber', border: 'border-amber/30', glow: 'shadow-amber/20' },
  coral: { bg: 'bg-coral/15', text: 'text-coral', border: 'border-coral/30', glow: 'shadow-coral/20' },
  sage: { bg: 'bg-sage/15', text: 'text-sage', border: 'border-sage/30', glow: 'shadow-sage/20' },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-midnight text-ivory relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-amber/8 rounded-full blur-[120px] sm:blur-[200px]" />
        <div className="absolute bottom-0 left-1/4 w-[250px] h-[250px] sm:w-[500px] sm:h-[500px] bg-coral/6 rounded-full blur-[100px] sm:blur-[180px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[700px] sm:h-[700px] bg-mauve/10 rounded-full blur-[150px] sm:blur-[250px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px] sm:bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-amber/30 bg-amber/10 px-4 sm:px-5 py-2 sm:py-2.5 mb-6 sm:mb-8">
              <Film className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber" />
              <span className="text-[11px] sm:text-sm font-accent uppercase tracking-[0.2em] text-amber">Our Story</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-ivory leading-[1.05] text-balance">
              Where Passion Meets{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber via-amber-light to-coral">
                Premiere
              </span>
            </h1>
            
            <p className="mt-4 sm:mt-6 text-sm sm:text-lg md:text-xl text-mist max-w-2xl mx-auto text-balance leading-relaxed px-2 sm:px-0">
              From a passion for cinema and celebrations to India&apos;s most trusted private theatre platform. 
              Every frame of our story is dedicated to yours.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              const colors = colorMap[stat.color];
              
              return (
                <div 
                  key={stat.label}
                  className={`group rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-6 text-center sm:hover:border-amber/30 transition-all duration-300 sm:hover:-translate-y-1`}>
                  <div className={`inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl ${colors.bg} ${colors.border} border mb-3 sm:mb-4`}>
                    <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${colors.text}`} />
                  </div>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-ivory">{stat.value}</p>
                  <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-mist uppercase tracking-wider">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-10 sm:mb-16">
            <span className="text-[11px] sm:text-sm font-accent uppercase tracking-[0.2em] text-amber">Journey</span>
            <h2 className="mt-3 sm:mt-4 font-display text-2xl sm:text-4xl md:text-5xl font-bold text-ivory">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber to-coral">Evolution</span>
            </h2>
          </div>

          <div className="relative">
            {/* Timeline line - Desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-amber/50 via-amber/20 to-transparent" />
            
            {/* Timeline line - Mobile */}
            <div className="md:hidden absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-amber/50 via-amber/20 to-transparent" />

            <div className="space-y-10 sm:space-y-16">
              {milestones.map((milestone, index) => {
                const Icon = milestone.icon;
                const colors = colorMap[milestone.color];
                const isLeft = index % 2 === 0;

                return (
                  <div key={milestone.year} className="relative flex items-start gap-4 sm:gap-6 md:gap-8">
                    {/* Mobile: Content with left padding */}
                    <div className="md:hidden absolute left-4 sm:left-6 -translate-x-1/2 z-10 top-0">
                      <div className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full ${colors.bg} ${colors.border} border-2 shadow-lg ${colors.glow}`}>
                        <span className={`text-[10px] sm:text-xs font-bold ${colors.text}`}>{milestone.year}</span>
                      </div>
                    </div>

                    {/* Desktop: Center dot */}
                    <div className="hidden md:block absolute left-1/2 -translate-x-1/2 z-10">
                      <div className={`flex h-14 w-14 lg:h-16 lg:w-16 items-center justify-center rounded-full ${colors.bg} ${colors.border} border-2 shadow-lg ${colors.glow}`}>
                        <span className={`text-xs lg:text-sm font-bold ${colors.text}`}>{milestone.year}</span>
                      </div>
                    </div>

                    {/* Content - Mobile: full width with left margin */}
                    <div className={`md:hidden ml-10 sm:ml-14 flex-1`}>
                      <div className={`rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-6 sm:hover:border-amber/30 transition-all duration-300`}>
                        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                          <span className={`inline-flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-md sm:rounded-lg ${colors.bg} ${colors.border} border`}>
                            <Icon className={`h-3 w-3 sm:h-4 sm:w-4 ${colors.text}`} />
                          </span>
                          <span className="text-xl sm:text-2xl font-bold text-ivory">{milestone.year}</span>
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold text-ivory sm:group-hover:text-amber transition-colors">{milestone.title}</h3>
                        <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-mist leading-relaxed">{milestone.description}</p>
                        <div className={`mt-3 sm:mt-4 inline-flex items-center gap-1.5 rounded-full ${colors.bg} ${colors.border} border px-2.5 sm:px-3 py-0.5 sm:py-1`}>
                          <span className={`text-[10px] sm:text-xs font-medium ${colors.text}`}>{milestone.stat}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content - Desktop: alternating sides */}
                    <div className={`hidden md:block flex-1 ${isLeft ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12 md:col-start-2'}`}>
                      <div className={`rounded-2xl border border-white/10 bg-white/[0.03] p-6 lg:p-8 hover:border-amber/30 transition-all duration-300 group ${isLeft ? '' : 'md:ml-auto'}`}>
                        <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'md:justify-end' : ''}`}>
                          <span className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${colors.bg} ${colors.border} border`}>
                            <Icon className={`h-4 w-4 ${colors.text}`} />
                          </span>
                          <span className="text-3xl font-bold text-ivory">{milestone.year}</span>
                        </div>
                        <h3 className="text-xl font-semibold text-ivory group-hover:text-amber transition-colors">{milestone.title}</h3>
                        <p className="mt-2 text-mist leading-relaxed">{milestone.description}</p>
                        <div className={`mt-4 inline-flex items-center gap-2 rounded-full ${colors.bg} ${colors.border} border px-3 py-1`}>
                          <span className={`text-xs font-medium ${colors.text}`}>{milestone.stat}</span>
                        </div>
                      </div>
                    </div>

                    {/* Empty side for desktop alternating layout */}
                    <div className="hidden md:block flex-1" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose CineHaven - Comparison Table */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-[11px] sm:text-sm font-accent uppercase tracking-[0.2em] text-amber">Comparison</span>
            <h2 className="mt-3 sm:mt-4 font-display text-2xl sm:text-4xl md:text-5xl font-bold text-ivory">
              Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber to-coral">CineHaven?</span>
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-mist">See how we stack up against the competition</p>
          </div>

          <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 p-4 sm:p-6 border-b border-white/10 bg-white/[0.02]">
              <div className="text-[10px] sm:text-sm font-accent uppercase tracking-wider text-dusty flex items-center">Feature</div>
              <div className="text-center">
                <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-amber/15 border border-amber/30 px-2.5 sm:px-4 py-1 sm:py-1.5">
                  <Gem className="h-3 w-3 sm:h-4 sm:w-4 text-amber" />
                  <span className="text-[10px] sm:text-sm font-bold text-amber">CineHaven</span>
                </div>
              </div>
              <div className="text-center text-[10px] sm:text-sm font-accent uppercase tracking-wider text-dusty flex items-center justify-center">Others</div>
            </div>

            {/* Rows */}
            {comparisonFeatures.map((item, index) => (
              <div 
                key={item.feature} 
                className={`grid grid-cols-3 gap-2 sm:gap-4 p-3.5 sm:p-5 items-center sm:hover:bg-white/[0.02] ${index !== comparisonFeatures.length - 1 ? 'border-b border-white/5' : ''}`}>
                <div className="text-xs sm:text-sm text-ivory font-medium leading-tight">{item.feature}</div>
                <div className="flex justify-center">
                  <div className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-sage/15 border border-sage/30">
                    <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-sage" />
                  </div>
                </div>
                <div className="flex justify-center">
                  {item.others ? (
                    <div className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white/5 border border-white/10">
                      <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-mist/40" />
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
      </section>

      {/* Values Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-[11px] sm:text-sm font-accent uppercase tracking-[0.2em] text-amber">Principles</span>
            <h2 className="mt-3 sm:mt-4 font-display text-2xl sm:text-4xl md:text-5xl font-bold text-ivory">
              Our Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber to-coral">Values</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 sm:gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              const colors = colorMap[value.color];
              
              return (
                <div
                  key={value.title}
                  className="group rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-8 sm:hover:border-amber/30 transition-all duration-300 sm:hover:-translate-y-1">
                  <div className={`inline-flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl ${colors.bg} ${colors.border} border mb-4 sm:mb-6 sm:group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${colors.text}`} />
                  </div>
                  <h3 className="text-base sm:text-xl font-semibold text-ivory sm:group-hover:text-amber transition-colors">{value.title}</h3>
                  <p className="mt-2 sm:mt-3 text-xs sm:text-base text-mist leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-[11px] sm:text-sm font-accent uppercase tracking-[0.2em] text-amber">The People</span>
            <h2 className="mt-3 sm:mt-4 font-display text-2xl sm:text-4xl md:text-5xl font-bold text-ivory">
              Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber to-coral">Team</span>
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-mist">The visionaries behind your perfect celebrations</p>
          </div>

          <div className="grid gap-3 sm:gap-6 grid-cols-2 lg:grid-cols-4">
            {team.map((member) => {
              const colors = colorMap[member.color];
              
              return (
                <div
                  key={member.name}
                  className="group rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-6 text-center sm:hover:border-amber/30 transition-all duration-300 sm:hover:-translate-y-2">
                  {/* Avatar */}
                  <div className={`mx-auto mb-3 sm:mb-4 flex h-14 w-14 sm:h-20 sm:w-20 items-center justify-center rounded-xl sm:rounded-2xl ${colors.bg} ${colors.border} border text-lg sm:text-2xl font-bold ${colors.text} sm:group-hover:scale-110 transition-transform duration-300`}>
                    {member.initials}
                  </div>
                  
                  <h3 className="text-sm sm:text-lg font-semibold text-ivory sm:group-hover:text-amber transition-colors">{member.name}</h3>
                  <p className={`text-[10px] sm:text-sm ${colors.text} mt-0.5 sm:mt-1`}>{member.role}</p>
                  <p className="mt-2 sm:mt-3 text-[11px] sm:text-sm text-mist leading-relaxed">{member.bio}</p>
                  
                  {/* Social dots */}
                  <div className="mt-3 sm:mt-4 flex justify-center gap-1.5 sm:gap-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-white/20 sm:group-hover:bg-amber/40 transition-colors" />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20">
        <div className="mx-auto max-w-5xl">
          <div className="relative rounded-2xl sm:rounded-3xl border border-amber/20 bg-gradient-to-br from-amber/10 via-mauve/20 to-coral/10 p-6 sm:p-12 md:p-16 text-center overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <div className="absolute top-6 sm:top-10 left-6 sm:left-10 h-20 w-20 sm:h-32 sm:w-32 rounded-full bg-amber/10 blur-2xl sm:blur-3xl" />
              <div className="absolute bottom-6 sm:bottom-10 right-6 sm:right-10 h-24 w-24 sm:h-40 sm:w-40 rounded-full bg-coral/10 blur-2xl sm:blur-3xl" />
            </div>

            <div className="relative">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-amber/30 bg-amber/10 px-4 sm:px-5 py-2 sm:py-2.5 mb-4 sm:mb-6">
                <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber" />
                <span className="text-[11px] sm:text-sm font-accent uppercase tracking-[0.2em] text-amber">Ready to Celebrate?</span>
              </div>
              
              <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-ivory mb-3 sm:mb-4 leading-tight">
                Create Your Premiere Today
              </h2>
              <p className="text-mist max-w-xl mx-auto mb-6 sm:mb-8 text-sm sm:text-lg px-2 sm:px-0">
                Join thousands of happy customers who celebrated their special moments with CineHaven.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-2.5 sm:gap-4 px-2 sm:px-0">
                <Link
                  href="/book"
                  className="group inline-flex items-center justify-center gap-2 sm:gap-3 rounded-xl bg-gradient-to-r from-amber to-amber-dark px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-midnight shadow-lg shadow-amber/20 hover:shadow-xl hover:shadow-amber/30 transition-all duration-300 hover:-translate-y-0.5">
                  <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                  Book Now
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 sm:gap-3 rounded-xl border border-ivory/20 bg-white/5 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium text-ivory hover:border-amber/40 hover:text-amber hover:bg-amber/5 transition-all duration-300">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}