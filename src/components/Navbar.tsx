import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  Wind, 
  SunMedium, 
  Gauge, 
  Layers, 
  Sparkles, 
  Presentation, 
  FileText, 
  Users, 
  Download, 
  Menu, 
  X,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [downloadDropdownOpen, setDownloadDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 10) {
          setIsVisible(false); // Scrolling down
        } else if (lastScrollY - currentScrollY > 10) {
          setIsVisible(true); // Scrolling up
        }
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: Flame },
    { id: 'fin-sim', label: 'Fin ODE Simulator', icon: Flame },
    { id: 'convection', label: 'Convection & Boundary Layer', icon: Wind },
    { id: 'radiation', label: 'Radiation Studio', icon: SunMedium },
    { id: 'operating-point', label: 'Fan P-Q Solver', icon: Gauge },
    { id: 'profiles', label: 'Fin Profiles', icon: Layers },
    { id: 'modifications', label: '9 Advanced Tech', icon: Sparkles },
    { id: 'slides', label: 'Presentation Deck', icon: Presentation },
    { id: 'report', label: 'Project Report', icon: FileText },
    { id: 'team', label: 'Research Team', icon: Users },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        } bg-[#030712]/85 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl shadow-black/60`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Brand Logo & Title */}
          <div 
            onClick={() => setActiveTab('overview')}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-orange-500/40 p-0.5 bg-slate-900 group-hover:border-orange-400 transition-colors shadow-lg shadow-orange-950/40">
              <img 
                src="/assets/heat_sink_logo.jpg" 
                alt="Heat Sink Analysis Logo" 
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-transparent pointer-events-none" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold tracking-wider bg-gradient-to-r from-orange-400 via-amber-300 to-cyan-400 bg-clip-text text-transparent">
                  THERMODYNAMIC ANALYSIS
                </span>
                <span className="hidden md:inline-block px-2 py-0.5 text-[10px] font-mono font-semibold bg-orange-500/20 text-orange-300 rounded border border-orange-500/30">
                  HEAT SINK
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                MT1070 Thermodynamics & Phase Equilibria
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.slice(0, 7).map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-orange-500/15 text-orange-400 border border-orange-500/40 shadow-sm shadow-orange-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-orange-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* More / Docs Dropdown */}
            <div className="relative">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/60"
              >
                <span>Docs & Team</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </nav>

          {/* Action Downloads & Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Download Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDownloadDropdownOpen(!downloadDropdownOpen)}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white shadow-lg shadow-orange-600/30 border border-orange-400/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">PDF Documents</span>
                <span className="sm:hidden">PDFs</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {downloadDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-72 bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-2.5 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150"
                  onMouseLeave={() => setDownloadDropdownOpen(false)}
                >
                  <div className="text-[11px] font-semibold text-slate-400 px-3 py-1 uppercase tracking-wider">
                    Official Course Documents
                  </div>
                  <a
                    href="/docs/Heat_Sink_Thermodynamic_Analysis_Report.pdf"
                    download="Heat_Sink_Thermodynamic_Analysis_Report.pdf"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs text-slate-200 hover:bg-slate-800/90 hover:text-orange-400 transition-colors group"
                  >
                    <FileText className="w-4 h-4 text-orange-400" />
                    <div>
                      <div className="font-semibold text-white group-hover:text-orange-300">Technical Report</div>
                      <div className="text-[10px] text-slate-400">Complete 77-Page Academic Document</div>
                    </div>
                  </a>
                  <a
                    href="/docs/Heat_Sink_Thermodynamic_Analysis_Presentation.pdf"
                    download="Heat_Sink_Thermodynamic_Analysis_Presentation.pdf"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs text-slate-200 hover:bg-slate-800/90 hover:text-amber-400 transition-colors group mt-1"
                  >
                    <Presentation className="w-4 h-4 text-amber-400" />
                    <div>
                      <div className="font-semibold text-white group-hover:text-amber-300">Defense Presentation</div>
                      <div className="text-[10px] text-slate-400">Complete 47-Slide Defense Deck</div>
                    </div>
                  </a>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-slate-300 hover:text-white bg-slate-800/60 border border-slate-700/60"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-slate-950/95 backdrop-blur-2xl border-b border-slate-800 px-4 pt-3 pb-6 max-h-[80vh] overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-medium text-left transition-all ${
                      isActive
                        ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40'
                        : 'text-slate-300 hover:bg-slate-900/80 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-orange-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Secondary Quick Jump Sub-Navigation for Desktop */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden md:flex items-center gap-1.5 px-3 py-2 bg-slate-900/85 backdrop-blur-xl border border-slate-700/60 rounded-full shadow-2xl shadow-black/80">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              title={item.label}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
};
