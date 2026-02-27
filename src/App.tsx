import React from 'react';
import { motion } from 'motion/react';
import { 
  Shield, 
  Wallet, 
  BarChart3, 
  Cpu, 
  Lock, 
  Globe, 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  User, 
  Zap,
  Menu,
  X,
  Linkedin,
  Twitter
} from 'lucide-react';

// --- Components ---

const Navbar = ({ activeSection, onWaitlistClick }: { activeSection: string, onWaitlistClick: () => void }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
    { id: 'problem', label: 'Problem' },
    { id: 'solution', label: 'Solution' },
    { id: 'enterprise', label: 'Enterprise' },
    { id: 'individuals', label: 'Individuals' },
    { id: 'security', label: 'Security' },
    { id: 'team', label: 'Team' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <button onClick={scrollToTop} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
            <Shield className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">AigenticPay</span>
        </button>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <a 
              key={link.id}
              href={`#${link.id}`} 
              className={`transition-colors ${activeSection === link.id ? 'text-emerald-600' : 'text-gray-600 hover:text-black'}`}
            >
              {link.label}
            </a>
          ))}
          <button onClick={onWaitlistClick} className="btn-primary py-2 text-sm">Join Waitlist</button>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-t border-black/5 px-6 py-8 flex flex-col gap-6"
        >
          {navLinks.map((link) => (
            <a 
              key={link.id}
              href={`#${link.id}`} 
              onClick={() => setIsOpen(false)} 
              className={`text-lg font-medium ${activeSection === link.id ? 'text-emerald-600' : 'text-gray-900'}`}
            >
              {link.label}
            </a>
          ))}
          <button onClick={() => { setIsOpen(false); onWaitlistClick(); }} className="btn-primary w-full">Join Waitlist</button>
        </motion.div>
      )}
    </nav>
  );
};

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const WaitlistModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const scriptUrl = import.meta.env.VITE_WAITLIST_API_URL;

    if (!scriptUrl) {
      console.error('Waitlist Error: VITE_WAITLIST_API_URL is not defined.');
      // In production, we'll show a fallback or alert to help the owner debug
      if (import.meta.env.DEV) {
        alert('Debug: VITE_WAITLIST_API_URL is missing!');
      }
    }

    try {
      if (scriptUrl) {
        const params = new URLSearchParams();
        params.append('email', email);
        params.append('timestamp', new Date().toLocaleString());
        params.append('source', 'AigenticPay Website');

        await fetch(scriptUrl, {
          method: 'POST',
          mode: 'no-cors', // Essential for Google Apps Script
          body: params,
        });
      } else {
        // Fallback for demo if no URL is provided
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      setSubmitted(true);
    } catch (error) {
      console.error('Waitlist submission error:', error);
      setSubmitted(true); // Still show success to user as no-cors often masks success
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl"
      >
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors">
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <>
            <h3 className="text-2xl font-bold mb-2">Join the Waitlist</h3>
            <p className="text-gray-600 mb-8">Be the first to deploy autonomous AI financial governance in your organization.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Work Email</label>
                <input 
                  required
                  name="email"
                  type="email" 
                  placeholder="name@company.com"
                  className="w-full px-4 py-3 bg-gray-50 border border-black/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="btn-primary w-full py-4 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : 'Request Access'}
              </button>
              <p className="text-[10px] text-center text-gray-400 uppercase tracking-widest">Enterprise Briefings Available Upon Request</p>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="text-emerald-600 w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-2">You're on the list!</h3>
            <p className="text-gray-600 mb-8">We've received your request. Our team will reach out shortly to schedule an enterprise briefing.</p>
            <button onClick={onClose} className="btn-primary w-full">Close</button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-[#1A1A1A] text-white py-20">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <Shield className="text-black w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">AigenticPay</span>
          </div>
          <p className="text-gray-400 max-w-sm mb-8">
            The Financial Governance Layer for Autonomous AI. Enabling safe, compliant, and autonomous transactions for the machine economy.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
              <XIcon className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-6">Platform</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><a href="#solution" className="hover:text-white transition-colors">Agent Wallets</a></li>
            <li><a href="#solution" className="hover:text-white transition-colors">Governance Layer</a></li>
            <li><a href="#security" className="hover:text-white transition-colors">Security Protocol</a></li>
            <li><a href="#enterprise" className="hover:text-white transition-colors">Enterprise API</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-6">Company</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><a href="#team" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Partnerships</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 uppercase tracking-widest">
        <p>© 2026 AigenticPay. All rights reserved.</p>
        <p>Secured by Naoris Protocol</p>
      </div>
    </div>
  </footer>
);

const SectionHeading = ({ children, subtitle, light = false }: { children: React.ReactNode, subtitle?: string, light?: boolean }) => (
  <div className="mb-16">
    <h2 className={`text-3xl md:text-4xl font-bold tracking-tight mb-4 ${light ? 'text-white' : 'text-[#1A1A1A]'}`}>
      {children}
    </h2>
    {subtitle && <p className={`text-lg max-w-2xl ${light ? 'text-gray-400' : 'text-gray-600'}`}>{subtitle}</p>}
  </div>
);

// --- Main App ---

export default function App() {
  const [isWaitlistOpen, setIsWaitlistOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('');
  const [showBackToTop, setShowBackToTop] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ['problem', 'solution', 'enterprise', 'individuals', 'security', 'team'];
    
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen font-sans">
      <Navbar activeSection={activeSection} onWaitlistClick={() => setIsWaitlistOpen(true)} />
      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />

      {/* Back to Top Button */}
      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 p-4 bg-black text-white rounded-full shadow-2xl hover:bg-emerald-600 transition-colors"
        >
          <ArrowRight className="w-6 h-6 -rotate-90" />
        </motion.button>
      )}

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 md:pt-56 md:pb-40 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-emerald-50/50 rounded-full blur-3xl opacity-50" />
        </div>
        <div className="section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-widest rounded-full mb-8 border border-emerald-100">
              Now in Private Beta
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#1A1A1A] mb-8 max-w-4xl mx-auto leading-[1.1]">
              The Financial Governance Layer for <span className="text-emerald-600">Autonomous AI</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
              AigenticPay enables AI agents to transact safely, compliantly, and autonomously — with programmable controls and enterprise-grade auditability.
            </p>
            <div className="flex justify-center">
              <button onClick={() => setIsWaitlistOpen(true)} className="btn-primary flex items-center gap-2 group px-12 py-4 text-lg">
                Join Waitlist
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 1: The Problem */}
      <section id="problem" className="bg-white border-y border-black/5">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <SectionHeading subtitle="Artificial intelligence is rapidly evolving from decision-support tools into autonomous actors.">
                AI Agents Are Beginning to Control Budgets
              </SectionHeading>
              <div className="space-y-6">
                <p className="text-gray-600 leading-relaxed">
                  AI agents are beginning to purchase compute, manage ad budgets, execute procurement, pay vendors, subscribe to APIs, and coordinate infrastructure.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Purchase compute",
                    "Manage ad budgets",
                    "Execute procurement",
                    "Pay vendors",
                    "Subscribe to APIs",
                    "Coordinate infrastructure"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-black/5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm font-medium text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-[#1A1A1A] rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
              <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                <Zap className="text-emerald-400 w-5 h-5" />
                The Structural Gap
              </h3>
              <p className="text-gray-400 mb-8">Financial systems were designed for humans. Without new infrastructure, enterprises face:</p>
              <ul className="space-y-4">
                {[
                  "Unbounded autonomous spending",
                  "Regulatory uncertainty",
                  "Lack of machine-readable audit trails",
                  "Fraud exposure",
                  "Institutional resistance to AI deployment"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-12 pt-8 border-t border-white/10">
                <p className="text-emerald-400 font-semibold italic">AigenticPay solves this structural gap.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: The Solution */}
      <section id="solution" className="bg-[#FBFBFA]">
        <div className="section-container">
          <SectionHeading subtitle="AigenticPay provides a policy-enforced, identity-bound payment layer designed specifically for AI systems.">
            Programmable Financial Infrastructure for AI Agents
          </SectionHeading>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Agent-Level Wallets", icon: Wallet, desc: "Dedicated secure vaults for each autonomous agent with unique cryptographic identities." },
              { title: "Budget & Spending Controls", icon: BarChart3, desc: "Granular limits on transaction size, frequency, and total budget per agent." },
              { title: "Merchant Whitelisting", icon: Shield, desc: "Restrict agent spending to pre-approved vendors and service providers." },
              { title: "Real-Time Validation", icon: CheckCircle2, desc: "Instant policy enforcement before any transaction is broadcast to the network." },
              { title: "Intent-Linked Audit", icon: Lock, desc: "Every payment is cryptographically linked to the agent's reasoning and intent." },
              { title: "Governance Layer", icon: Building2, desc: "Centralized dashboard for human oversight and enterprise-wide AI financial policy." },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 bg-white rounded-2xl border border-black/5 shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="text-emerald-600 w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold mb-3">{feature.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <p className="text-gray-500 font-medium italic">Deploy AI autonomy without sacrificing financial discipline.</p>
          </div>
        </div>
      </section>

      {/* Section 3: Enterprise Focus */}
      <section id="enterprise" className="bg-[#1A1A1A] text-white overflow-hidden">
        <div className="section-container relative">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px]" />
          
          <div className="max-w-3xl mb-20">
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-[0.2em] mb-4 block">Enterprise-First</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Built for Enterprise AI Workforces</h2>
            <p className="text-xl text-gray-400">Scalable governance for the next generation of corporate infrastructure.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {[
              { 
                num: "01",
                title: "AI Sales & Marketing Governance", 
                desc: "Manage autonomous ad spend and lead generation budgets with real-time ROI tracking.",
                details: {
                  scenario: "A SaaS enterprise deploys 50 outbound sales agents, 20 ad-buying agents, and 10 enrichment agents purchasing lead databases, ad credits, and SaaS tools.",
                  problem: "Finance refuses to attach corporate cards; spend attribution is impossible; fraud detection flags automated transactions.",
                  implementation: "Dedicated programmable wallets, department-level budget enforcement, and merchant-specific authorization.",
                  outcome: "AI-driven sales operations scale safely without compromising financial governance."
                }
              },
              { 
                num: "02",
                title: "Autonomous Procurement Controls", 
                desc: "Enable agents to source and pay for supplies within strict corporate policy bounds.",
                details: {
                  scenario: "Procurement AI monitors supplier pricing and executes vendor switching, contract renewals, and cross-border payments.",
                  problem: "Bank freezes due to automated patterns, unapproved vendor exposure, and compliance uncertainty.",
                  implementation: "Vendor whitelisting, country-based risk controls, FX spread management, and policy-based validation.",
                  outcome: "Autonomous procurement becomes legally defensible and operationally scalable."
                }
              },
              { 
                num: "03",
                title: "Cloud & Infrastructure Spend", 
                desc: "Dynamic scaling of compute resources with automated settlement and cost optimization.",
                details: {
                  scenario: "Engineering agents autonomously scale GPU clusters, purchase cloud credits, and optimize infrastructure costs.",
                  problem: "Runaway cloud spending, shadow infrastructure, and lack of per-agent cost tracking.",
                  implementation: "Compute-only wallet permissions, provider-restricted merchant lists, and monthly caps with automated anomaly detection.",
                  outcome: "Infrastructure automation becomes financially predictable."
                }
              },
              { 
                num: "04",
                title: "Cross-Department AI Budget Isolation", 
                desc: "Ensure departmental budgets remain segregated and auditable across the organization.",
                details: {
                  scenario: "An enterprise deploys AI across Marketing, Procurement, Engineering, HR, and Finance, each operating autonomous agents.",
                  problem: "Budget leakage, no financial isolation, no liability mapping, and inconsistent compliance exposure.",
                  implementation: "Department-level wallets, agent-level sub-accounts, inherited policy logic, and unified audit dashboard.",
                  outcome: "AI mirrors enterprise structure while maintaining financial discipline."
                }
              },
              { 
                num: "05",
                title: "Agent-to-Agent Settlement", 
                desc: "A frictionless framework for autonomous systems to trade resources and services.",
                details: {
                  scenario: "AI agents begin purchasing services (data, testing, analytics) from other AI agents autonomously.",
                  problem: "No machine-native settlement rail, no identity-bound wallets, and no microtransaction clearing.",
                  implementation: "Identity-linked agent wallets, policy-controlled microtransactions, and A2A settlement network.",
                  outcome: "The foundation for machine-to-machine commerce."
                }
              },
              { 
                num: "06",
                title: "Regulatory-Ready Audit Infrastructure", 
                desc: "Instant reporting and compliance trails for internal and external regulatory bodies.",
                details: {
                  scenario: "Regulators require accountability and logic for automated payments executed by AI systems.",
                  problem: "Lack of traceability, no defensible transaction rationale, and compliance exposure.",
                  implementation: "Agent identity binding, policy rule traceability, and immutable audit hashes via Naoris/Polygon anchoring.",
                  outcome: "AI becomes auditable by design rather than by exception."
                }
              },
            ].map((item, i) => (
              <div key={i} className="group relative">
                <div className="flex gap-6">
                  <div className="text-emerald-500/30 font-mono text-2xl font-bold group-hover:text-emerald-500 transition-colors shrink-0">{item.num}</div>
                  <div>
                    <h4 className="text-xl font-bold mb-3 cursor-help border-b border-transparent group-hover:border-emerald-500/30 inline-block transition-all">
                      {item.title}
                    </h4>
                    <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>

                {/* Hover Popup */}
                <div className={`absolute left-0 ${i >= 4 ? 'bottom-full mb-4' : 'top-full mt-4'} z-50 w-full md:w-[450px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ${i >= 4 ? '-translate-y-2' : 'translate-y-2'} group-hover:translate-y-0`}>
                  <div className="bg-[#2A2A2A] border border-white/10 rounded-2xl p-6 shadow-2xl backdrop-blur-xl">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Detailed Use Case</span>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h5 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Scenario</h5>
                        <p className="text-xs text-gray-300 leading-relaxed">{item.details.scenario}</p>
                      </div>
                      <div>
                        <h5 className="text-[10px] font-bold uppercase tracking-widest text-red-400/80 mb-1">Risk</h5>
                        <p className="text-xs text-gray-400 leading-relaxed">{item.details.problem}</p>
                      </div>
                      <div className="pt-3 border-t border-white/5">
                        <h5 className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 mb-1">AigenticPay Implementation</h5>
                        <p className="text-xs text-gray-300 leading-relaxed">{item.details.implementation}</p>
                      </div>
                      <div className="pt-2">
                        <div className="inline-block px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[9px] font-bold uppercase tracking-widest rounded-md">
                          Outcome: {item.details.outcome}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-24 pt-12 border-t border-white/5 text-center">
            <p className="text-gray-500 text-sm italic">Hover over any use case title to explore detailed implementation scenarios.</p>
          </div>
        </div>
      </section>

      {/* Section 4: Consumer Layer */}
      <section id="individuals" className="bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { 
                    title: "Personal Assistant Wallet", 
                    icon: User, 
                    desc: "Dedicated safe sandbox for autonomous personal assistants.",
                    details: {
                      scenario: "Manage subscriptions, book travel, refill prescriptions, optimize recurring bills, and purchase digital services.",
                      risk: "Main bank card exposed to autonomous activity; no merchant restrictions or spending segmentation.",
                      solution: "Dedicated AI wallet/virtual card, merchant whitelisting, task-based caps, and intent-linked records.",
                      outcome: "Safe financial sandbox without risking primary accounts."
                    }
                  },
                  { 
                    title: "Subscription Optimization", 
                    icon: Zap, 
                    desc: "AI-driven cost management and automated SaaS auditing.",
                    details: {
                      scenario: "AI agent audits recurring subscriptions, cancels unused services, downgrades tiers, and switches vendors.",
                      risk: "Uncontrolled recurring spend; difficult cancellation patterns; lack of payment transparency.",
                      solution: "Temporary-use virtual cards, subscription-specific rules, and auto-expiring payment permissions.",
                      outcome: "Financial automation becomes controlled and transparent."
                    }
                  },
                  { 
                    title: "Spending Limits", 
                    icon: Shield, 
                    desc: "Hard caps and granular controls on autonomous spend.",
                    details: {
                      scenario: "Set a strict $200 monthly limit for a grocery agent and a $20 per-transaction cap for a news agent.",
                      risk: "Rogue agents causing financial damage; accidental double-billing; unapproved premium upgrades.",
                      solution: "Hard-coded per-transaction and per-period caps with real-time policy enforcement.",
                      outcome: "Guaranteed financial safety with zero-overspend certainty."
                    }
                  },
                  { 
                    title: "Investment & Trading Agent", 
                    icon: BarChart3, 
                    desc: "Risk-contained autonomous portfolio management.",
                    details: {
                      scenario: "Crypto portfolio management, automated equity strategies, and yield optimization.",
                      risk: "Runaway trading; excess leverage exposure; exchange freezes due to bot activity.",
                      solution: "Segregated capital pool, drawdown limits, leverage caps, and immutable logic anchoring for every trade.",
                      outcome: "Autonomous investing becomes governed and risk-contained."
                    }
                  },
                ].map((item, i) => (
                  <div key={i} className="group relative">
                    <div className="p-8 bg-gray-50 rounded-2xl border border-black/5 hover:border-emerald-500/30 transition-all cursor-help">
                      <item.icon className="text-emerald-600 w-6 h-6 mb-4" />
                      <h5 className="font-bold mb-2 group-hover:text-emerald-600 transition-colors">{item.title}</h5>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>

                    {/* Hover Popup */}
                    <div className={`absolute left-0 ${i >= 2 ? 'bottom-full mb-4' : 'top-full mt-4'} z-50 w-full md:w-[400px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ${i >= 2 ? '-translate-y-2' : 'translate-y-2'} group-hover:translate-y-0`}>
                      <div className="bg-[#1A1A1A] text-white border border-white/10 rounded-2xl p-6 shadow-2xl backdrop-blur-xl">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Individual Use Case</span>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <h5 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Scenario</h5>
                            <p className="text-xs text-gray-300 leading-relaxed">{item.details.scenario}</p>
                          </div>
                          <div>
                            <h5 className="text-[10px] font-bold uppercase tracking-widest text-red-400/80 mb-1">Risk</h5>
                            <p className="text-xs text-gray-400 leading-relaxed">{item.details.risk}</p>
                          </div>
                          <div className="pt-3 border-t border-white/5">
                            <h5 className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 mb-1">AigenticPay Solution</h5>
                            <p className="text-xs text-gray-300 leading-relaxed">{item.details.solution}</p>
                          </div>
                          <div className="pt-2">
                            <div className="inline-block px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[9px] font-bold uppercase tracking-widest rounded-md">
                              Outcome: {item.details.outcome}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <SectionHeading subtitle="Consumers can deploy AI assistants safely using our consumer-grade wallet infrastructure.">
                Safe AI Wallets for Individuals
              </SectionHeading>
              <p className="text-gray-600 mb-8 leading-relaxed">
                While our core is enterprise, we believe the machine economy starts with individuals. Our consumer layer validates early adoption and builds ecosystem scale, enabling personal AI agents to manage budgets with the same rigor as corporate workforces.
              </p>
              <button onClick={() => setIsWaitlistOpen(true)} className="btn-secondary">Join Waitlist</button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Security & Trust */}
      <section id="security" className="bg-[#FBFBFA] border-y border-black/5">
        <div className="section-container text-center">
          <div className="max-w-3xl mx-auto">
            <div className="w-20 h-20 bg-black rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-xl">
              <Lock className="text-white w-10 h-10" />
            </div>
            <SectionHeading subtitle="AigenticPay integrates decentralized verification and post-quantum security infrastructure via Naoris Protocol.">
              Secured by Naoris Protocol
            </SectionHeading>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left mt-16">
              {[
                { title: "Tamper-Resistant Anchoring", desc: "Transaction logs are anchored to a decentralized ledger for immutable audit trails." },
                { title: "Decentralized Validation", desc: "Multi-node verification ensures no single point of failure in transaction approval." },
                { title: "Identity Verification Layer", desc: "Post-quantum secure identity for both agents and their human overseers." },
                { title: "Sub-Zero Infrastructure", desc: "Security logic that sits beneath the financial layer, protecting the core protocol." },
              ].map((item, i) => (
                <div key={i} className="p-6 bg-white rounded-xl border border-black/5">
                  <h5 className="font-bold mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    {item.title}
                  </h5>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-12 text-gray-500 text-sm font-medium">This differentiates AigenticPay from traditional fintech providers.</p>
          </div>
        </div>
      </section>

      {/* Section 6: Partnership */}
      <section className="bg-white overflow-hidden">
        <div className="section-container">
          <div className="bg-emerald-50 rounded-[2.5rem] p-12 md:p-20 relative overflow-hidden">
            <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl" />
            <div className="max-w-3xl relative z-10">
              <span className="text-emerald-700 text-xs font-bold uppercase tracking-widest mb-6 block">Strategic Investment & Ecosystem Alignment</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1A1A1A] mb-8">Strategic Partnership with Naoris Ventures</h2>
              <p className="text-lg text-gray-700 mb-10 leading-relaxed">
                AigenticPay is supported by Naoris Ventures through strategic narrative development, capital formation support, and institutional positioning.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                {[
                  "Infrastructure deployment",
                  "Enterprise introductions",
                  "Capital readiness",
                  "Protocol-level integration"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full" />
                    <span className="font-medium text-gray-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Team Page */}
      <section id="team" className="bg-[#FBFBFA]">
        <div className="section-container">
          <SectionHeading subtitle="Led by infrastructure veterans and supported by world-class venture partners.">
            The Team Behind AigenticPay
          </SectionHeading>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl">
            {/* Founder 1: Patrick */}
            <div className="group">
              <div className="aspect-[4/5] bg-gray-200 rounded-2xl mb-6 overflow-hidden relative border border-black/5">
                <img 
                  src="/patrick.png" 
                  alt="Patrick - Founder & Tech Lead" 
                  className="w-full h-full object-cover transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h4 className="text-xl font-bold mb-1">Patrick</h4>
              <p className="text-emerald-600 text-sm font-semibold mb-4 uppercase tracking-wider">Founder & Tech Lead</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Focus on design and developing product and long term strategy. Leading the technical vision and architecture of AigenticPay.
              </p>
            </div>

            {/* Founder 2: Scott */}
            <div className="group">
              <div className="aspect-[4/5] bg-gray-200 rounded-2xl mb-6 overflow-hidden relative border border-black/5">
                <img 
                  src="/scott.png" 
                  alt="Scott - Co-Founder" 
                  className="w-full h-full object-cover transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h4 className="text-xl font-bold mb-1">Scott</h4>
              <p className="text-emerald-600 text-sm font-semibold mb-4 uppercase tracking-wider">Co-Founder</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Responsible for marketing, sales and company operation. Driving ecosystem growth and strategic partnerships.
              </p>
            </div>
          </div>

          <div className="mt-20 p-8 bg-white rounded-2xl border border-black/5 flex flex-col md:flex-row items-center gap-8">
            <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center shrink-0">
              <Globe className="text-white w-8 h-8" />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-1">Naoris Ventures</h4>
              <p className="text-emerald-600 text-sm font-semibold mb-4 uppercase tracking-wider">Strategic Venture Partner</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Providing strategic narrative development, institutional positioning, and technical coordination with Naoris Protocol.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#1A1A1A] py-24">
        <div className="section-container text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">Ready to deploy AI autonomy?</h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Join the leading enterprises building the future of the machine economy with AigenticPay.
          </p>
          <div className="flex justify-center">
            <button onClick={() => setIsWaitlistOpen(true)} className="btn-primary bg-white text-black hover:bg-gray-100 px-12 py-4">Join Waitlist</button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
