import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  ChevronDown, 
  Sparkles,
  Heart,
  ArrowRight,
  ShieldCheck,
  Zap,
  Headphones,
  Instagram,
  Twitter
} from 'lucide-react';
import ContactForm from '../../components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us - CineHaven | Let\'s Plan Something Unforgettable',
  description: 'Get in touch with CineHaven\'s celebration experts. WhatsApp, call, or email us. We respond within 2 hours during business hours.',
  keywords: ['contact CineHaven', 'celebration planning', 'customer support', 'private theatre contact'],
};

const contactMethods = [
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+91 98765 43210',
    href: 'https://wa.me/919876543210',
    description: 'Fastest response time',
    badge: 'Under 5 min',
    badgeColor: 'bg-green-500/20 text-green-400 border-green-500/30',
    external: true,
    gradient: 'from-green-500/10 to-emerald-500/5',
    hoverBorder: 'hover:border-green-500/40',
  },
  {
    icon: Phone,
    label: 'Call Us',
    value: '+91 98765 43210',
    href: 'tel:+919876543210',
    description: 'Mon-Sun, 10AM - 11PM',
    badge: '24/7 Available',
    badgeColor: 'bg-amber/20 text-amber border-amber/30',
    external: false,
    gradient: 'from-amber/10 to-orange-500/5',
    hoverBorder: 'hover:border-amber/40',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@cinehaven.com',
    href: 'mailto:hello@cinehaven.com',
    description: 'Detailed inquiries welcome',
    badge: '2 hr response',
    badgeColor: 'bg-coral/20 text-coral border-coral/30',
    external: false,
    gradient: 'from-coral/10 to-rose-500/5',
    hoverBorder: 'hover:border-coral/40',
  },
];

const locations = [
  {
    city: 'Mumbai',
    address: 'Bandra West, Near Pali Hill',
    phone: '+91 22 1234 5678',
    timing: '10:00 AM - 11:00 PM',
    image: '/images/locations/mumbai.jpg',
  },
  {
    city: 'Bangalore',
    address: 'Koramangala, 5th Block',
    phone: '+91 80 1234 5678',
    timing: '10:00 AM - 11:00 PM',
    image: '/images/locations/bangalore.jpg',
  },
  {
    city: 'Delhi',
    address: 'Hauz Khas Village',
    phone: '+91 11 1234 5678',
    timing: '10:00 AM - 11:00 PM',
    image: '/images/locations/delhi.jpg',
  },
];

const faqs = [
  {
    question: 'How far in advance should I book?',
    answer: 'We recommend booking at least 3-7 days in advance for weekdays and 2-4 weeks for weekends. During peak seasons like Valentine\'s Day and New Year\'s Eve, booking even earlier is advisable to secure your preferred slot.',
  },
  {
    question: 'Can I bring outside food or decorations?',
    answer: 'Our premium packages include gourmet catering and curated decor. Outside food is not permitted, but we offer extensive customization options. You can bring personal decorations with prior approval, and our team will help set them up perfectly.',
  },
  {
    question: 'What is the cancellation & refund policy?',
    answer: 'Full refund if cancelled 7+ days before your booking. 50% refund for cancellations made 3-7 days prior. No refund for cancellations within 48 hours, but we offer one complimentary rescheduling within 30 days.',
  },
  {
    question: 'Are children allowed? Is there an age limit?',
    answer: 'Absolutely! We welcome families of all sizes. Our packages can be customized for all ages, and we offer special kids\' menus, age-appropriate movie selections, and supervised entertainment options. There is no age limit.',
  },
  {
    question: 'Can I request a specific movie or content?',
    answer: 'Yes! You can choose from our extensive licensed library of 5000+ titles. We also support streaming from Netflix, Prime Video, and Disney+ Hotstar with your personal subscription, or bring your own content on USB.',
  },
  {
    question: 'Do you offer photography or videography services?',
    answer: 'Yes! Our Gold and Diamond packages include professional photography. You can also add it as an à la carte service starting at ₹1,499 for 20 edited shots. Drone coverage and cinematic highlight reels are also available.',
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-midnight text-ivory relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-coral/8 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-amber/6 rounded-full blur-[180px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-mauve/10 rounded-full blur-[250px]" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-amber/30 bg-amber/10 px-5 py-2.5 mb-8">
              <Headphones className="h-4 w-4 text-amber" />
              <span className="text-sm font-accent uppercase tracking-[0.2em] text-amber">We&apos;re Here to Help</span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-ivory leading-[1.05] text-balance">
              Let&apos;s Plan Something{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber via-amber-light to-coral">
                Unforgettable
              </span>
            </h1>
            
            <p className="mt-6 text-lg md:text-xl text-mist max-w-2xl mx-auto text-balance leading-relaxed">
              Our celebration experts are here to help craft your perfect event. 
              Reach out however you prefer — we respond within minutes.
            </p>

            {/* Quick stats */}
            <div className="mt-10 flex flex-wrap justify-center gap-6">
              {[
                { icon: Zap, label: 'Avg. Response', value: 'Under 5 min' },
                { icon: ShieldCheck, label: 'Satisfaction', value: '4.9/5 Rating' },
                { icon: Clock, label: 'Support Hours', value: '10 AM - 11 PM' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3 rounded-full border border-black/6 bg-black/3 px-5 py-3">
                  <Icon className="h-4 w-4 text-amber" />
                  <div className="text-left">
                    <p className="text-[10px] uppercase tracking-wider text-dusty">{label}</p>
                    <p className="text-sm font-semibold text-ivory">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="relative px-6 lg:px-8 pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-3">
            {contactMethods.map((method) => {
              const Icon = method.icon;
              const Wrapper = method.external ? 'a' : Link;
              const wrapperProps = method.external 
                ? { href: method.href, target: '_blank', rel: 'noopener noreferrer' }
                : { href: method.href };

              return (
                <Wrapper
                  key={method.label}
                  {...wrapperProps}
                  className={`group relative rounded-2xl border border-black/6 bg-gradient-to-br ${method.gradient} p-8 transition-all duration-500 ${method.hoverBorder} hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/40 overflow-hidden`}
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative">
                    {/* Icon & Badge */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black/3 border border-black/6 group-hover:border-amber/30 transition-colors">
                        <Icon className="h-6 w-6 text-amber" />
                      </div>
                      <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-medium uppercase tracking-wider ${method.badgeColor}`}>
                        {method.badge}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold text-ivory group-hover:text-amber transition-colors">
                      {method.label}
                    </h3>
                    <p className="mt-1 text-lg font-medium text-ivory/90">{method.value}</p>
                    <p className="mt-2 text-sm text-mist">{method.description}</p>

                    {/* Arrow */}
                    <div className="mt-6 flex items-center gap-2 text-sm text-amber opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0">
                      <span>Connect now</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Wrapper>
              );
            })}
          </div>
        </div>
      </section>

      {/* Split Section: Form + Locations */}
      <section className="relative px-6 lg:px-8 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-black/6 bg-black/[0.015] backdrop-blur-xl p-8 md:p-10">
                <div className="flex items-center gap-3 mb-2">
                  <Sparkles className="h-5 w-5 text-amber" />
                  <span className="text-sm font-accent uppercase tracking-[0.2em] text-amber">Get in Touch</span>
                </div>
                <h2 className="text-3xl font-display font-bold text-ivory mb-2">Send us a Message</h2>
                <p className="text-mist mb-8">Tell us about your celebration and we&apos;ll craft the perfect experience.</p>

                <ContactForm />
                <form className="hidden">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-xs font-accent uppercase tracking-[0.15em] text-dusty">Full Name</label>
                      <input
                        type="text"
                        className="w-full rounded-xl border border-black/6 bg-black/3 px-4 py-3.5 text-ivory placeholder:text-dusty/50 outline-none transition-all duration-300 focus:border-amber/50 focus:bg-amber/5 focus:ring-1 focus:ring-amber/20"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-accent uppercase tracking-[0.15em] text-dusty">Email Address</label>
                      <input
                        type="email"
                        className="w-full rounded-xl border border-black/6 bg-black/3 px-4 py-3.5 text-ivory placeholder:text-dusty/50 outline-none transition-all duration-300 focus:border-amber/50 focus:bg-amber/5 focus:ring-1 focus:ring-amber/20"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-xs font-accent uppercase tracking-[0.15em] text-dusty">Phone Number</label>
                      <input
                        type="tel"
                        className="w-full rounded-xl border border-black/6 bg-black/3 px-4 py-3.5 text-ivory placeholder:text-dusty/50 outline-none transition-all duration-300 focus:border-amber/50 focus:bg-amber/5 focus:ring-1 focus:ring-amber/20"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-accent uppercase tracking-[0.15em] text-dusty">Occasion</label>
                      <select className="w-full rounded-xl border border-black/6 bg-black/3 px-4 py-3.5 text-ivory outline-none transition-all duration-300 focus:border-amber/50 focus:bg-amber/5 focus:ring-1 focus:ring-amber/20 appearance-none cursor-pointer">
                        <option value="" className="bg-midnight">Select occasion</option>
                        <option value="birthday" className="bg-midnight">🎂 Birthday Celebration</option>
                        <option value="proposal" className="bg-midnight">💍 Marriage Proposal</option>
                        <option value="anniversary" className="bg-midnight">💕 Anniversary</option>
                        <option value="date_night" className="bg-midnight">🌙 Date Night</option>
                        <option value="family" className="bg-midnight">👨‍👩‍👧‍👦 Family Gathering</option>
                        <option value="corporate" className="bg-midnight">💼 Corporate Event</option>
                        <option value="other" className="bg-midnight">✨ Something Else</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-accent uppercase tracking-[0.15em] text-dusty">Your Message</label>
                    <textarea
                      rows={5}
                      className="w-full rounded-xl border border-black/6 bg-black/3 px-4 py-3.5 text-ivory placeholder:text-dusty/50 outline-none transition-all duration-300 focus:border-amber/50 focus:bg-amber/5 focus:ring-1 focus:ring-amber/20 resize-none"
                      placeholder="Tell us about your dream celebration — guest count, preferred date, special requests, or any questions you have..."
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      id="newsletter" 
                      className="h-4 w-4 rounded border-black/10 bg-black/3 text-amber focus:ring-amber/30"
                    />
                    <label htmlFor="newsletter" className="text-sm text-mist cursor-pointer">
                      Send me exclusive offers and celebration ideas
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="group relative w-full md:w-auto inline-flex items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-amber to-amber-dark px-8 py-4 text-sm font-bold text-midnight shadow-lg shadow-burgundy/20 hover:shadow-xl hover:shadow-burgundy/30 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <Send className="h-4 w-4" />
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Locations Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-sm font-accent uppercase tracking-[0.2em] text-amber mb-4">Our Locations</h3>
                <div className="space-y-4">
                  {locations.map((loc) => (
                    <div 
                      key={loc.city}
                      className="group rounded-2xl border border-black/6 bg-black/[0.015] p-5 hover:border-amber/30 transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber/10">
                          <MapPin className="h-5 w-5 text-amber" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-ivory group-hover:text-amber transition-colors">{loc.city}</h4>
                          <p className="text-sm text-mist mt-0.5">{loc.address}</p>
                          <div className="mt-3 flex flex-wrap gap-3">
                            <span className="inline-flex items-center gap-1.5 text-xs text-dusty">
                              <Phone className="h-3 w-3" />
                              {loc.phone}
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-xs text-dusty">
                              <Clock className="h-3 w-3" />
                              {loc.timing}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="rounded-2xl border border-black/6 bg-black/[0.015] p-6">
                <h4 className="text-sm font-semibold text-ivory mb-4">Follow Our Celebrations</h4>
                <div className="flex gap-3">
                  {[
                    { icon: Instagram, label: 'Instagram' },
                    { icon: Twitter, label: 'Twitter' },
                    { icon: MessageCircle, label: 'WhatsApp' },
                  ].map(({ icon: Icon, label }) => (
                    <button
                      key={label}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/6 bg-black/3 text-mist hover:border-amber/30 hover:text-amber hover:bg-amber/5 transition-all duration-300"
                      aria-label={label}
                    >
                      <Icon className="h-4 w-4" />
                    </button>
                  ))}
                </div>
                <p className="mt-4 text-xs text-dusty leading-relaxed">
                  Follow us for behind-the-scenes content, celebration inspiration, and exclusive offers.
                </p>
              </div>

              {/* Quick Help */}
              <div className="rounded-2xl border border-amber/20 bg-amber/5 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Heart className="h-5 w-5 text-amber" />
                  <h4 className="font-semibold text-ivory">Need Urgent Help?</h4>
                </div>
                <p className="text-sm text-mist mb-4">
                  For same-day bookings or urgent inquiries, call us directly. We prioritize last-minute celebrations.
                </p>
                <a 
                  href="tel:+919876543210"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-amber hover:text-amber-light transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  Call Now — +91 98765 43210
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative px-6 lg:px-8 pb-20">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-sm font-accent uppercase tracking-[0.2em] text-amber">FAQ</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold text-ivory">
              Common <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber to-coral">Questions</span>
            </h2>
            <p className="mt-4 text-mist">Everything you need to know before booking</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group rounded-xl border border-black/6 bg-black/[0.015] transition-all duration-300 hover:border-black/10 open:border-amber/30 open:bg-amber/[0.02]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between p-6 text-left">
                  <span className="text-base font-medium text-ivory group-hover:text-amber transition-colors pr-4">
                    {faq.question}
                  </span>
                  <span className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full border border-black/6 bg-black/3 group-hover:border-amber/30 group-hover:bg-amber/5 transition-all">
                    <ChevronDown className="h-4 w-4 text-mist transition-transform duration-300 group-open:rotate-180 group-open:text-amber" />
                  </span>
                </summary>
                <div className="px-6 pb-6">
                  <div className="border-t border-black/4 pt-4">
                    <p className="text-mist leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 lg:px-8 pb-20">
        <div className="mx-auto max-w-5xl">
          <div className="relative rounded-3xl border border-amber/20 bg-gradient-to-br from-amber/10 via-cream-warm/20 to-coral/10 p-12 md:p-16 text-center overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-10 left-10 h-20 w-20 rounded-full bg-amber/10 blur-2xl" />
              <div className="absolute bottom-10 right-10 h-32 w-32 rounded-full bg-coral/10 blur-3xl" />
            </div>

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber/30 bg-amber/10 px-5 py-2.5 mb-6">
                <Sparkles className="h-4 w-4 text-amber" />
                <span className="text-sm font-accent uppercase tracking-[0.2em] text-amber">Ready to Celebrate?</span>
              </div>
              
              <h2 className="font-display text-3xl md:text-5xl font-bold text-ivory mb-4">
                Your Private Cinema Awaits
              </h2>
              <p className="text-mist max-w-xl mx-auto mb-8 text-lg">
                Join thousands of happy celebrators. Book your unforgettable experience today.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/book"
                  className="group inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-amber to-amber-dark px-8 py-4 text-sm font-bold text-midnight shadow-lg shadow-burgundy/20 hover:shadow-xl hover:shadow-burgundy/30 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Heart className="h-5 w-5" />
                  Book Your Celebration
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-3 rounded-xl border border-ivory/20 bg-black/3 px-8 py-4 text-sm font-medium text-ivory hover:border-amber/40 hover:text-amber hover:bg-amber/5 transition-all duration-300"
                >
                  Explore Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
