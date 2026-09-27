import React, { useState } from 'react';
import { 
  Presentation, 
  FileText, 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  X, 
  Search, 
  BookOpen, 
  ExternalLink,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';
import { PRESENTATION_SLIDES, REPORT_CHAPTERS, SlideData, ReportChapter } from '../core/heatSinkData';
import { MathView } from './MathView';

interface DocumentViewerProps {
  initialMode?: 'slides' | 'report';
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({ initialMode = 'slides' }) => {
  const [docMode, setDocMode] = useState<'slides' | 'report'>(initialMode);
  
  // Slides viewer state
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [slideCategoryFilter, setSlideCategoryFilter] = useState<string>('All');
  const [isFullscreenModalOpen, setIsFullscreenModalOpen] = useState<boolean>(false);
  const [slideSearchQuery, setSlideSearchQuery] = useState<string>('');

  // Report reader state
  const [selectedChapterId, setSelectedChapterId] = useState<string>('ch2-2');

  const filteredSlides = PRESENTATION_SLIDES.filter(s => {
    const matchesCategory = slideCategoryFilter === 'All' || s.category === slideCategoryFilter;
    const matchesSearch = s.title.toLowerCase().includes(slideSearchQuery.toLowerCase()) || 
                          s.summary.toLowerCase().includes(slideSearchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const currentSlide = PRESENTATION_SLIDES[currentSlideIndex] || PRESENTATION_SLIDES[0];
  const activeChapter = REPORT_CHAPTERS.find(c => c.id === selectedChapterId) || REPORT_CHAPTERS[0];

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev < PRESENTATION_SLIDES.length - 1 ? prev + 1 : 0));
  };

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : PRESENTATION_SLIDES.length - 1));
  };

  return (
    <div className="space-y-8">
      
      {/* Top Toggle Switcher: Defense Slides vs Project Report */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
        
        <div className="flex items-center gap-2 p-1 rounded-2xl bg-slate-950 border border-slate-800 w-full sm:w-auto">
          <button
            onClick={() => setDocMode('slides')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              docMode === 'slides'
                ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg shadow-orange-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Presentation className="w-4 h-4" />
            <span>47-Slide Defense Deck</span>
          </button>

          <button
            onClick={() => setDocMode('report')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              docMode === 'report'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>77-Page Project Report</span>
          </button>
        </div>

        {/* Download Direct PDF Button */}
        {docMode === 'slides' ? (
          <a
            href="/docs/Heat_Sink_Thermodynamic_Analysis_Presentation.pdf"
            download="Heat_Sink_Thermodynamic_Analysis_Presentation.pdf"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 transition-all hover:scale-105"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Presentation (PDF)</span>
          </a>
        ) : (
          <a
            href="/docs/Heat_Sink_Thermodynamic_Analysis_Report.pdf"
            download="Heat_Sink_Thermodynamic_Analysis_Report.pdf"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 transition-all hover:scale-105"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Technical Report (PDF)</span>
          </a>
        )}

      </div>

      {/* ======================= MODE A: PRESENTATION SLIDES VIEWER ======================= */}
      {docMode === 'slides' && (
        <div className="space-y-6">
          
          {/* Main Slide Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Slide Display Area (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="relative aspect-16/9 rounded-3xl overflow-hidden bg-slate-950 border border-slate-700 shadow-2xl flex items-center justify-center group">
                <img 
                  src={currentSlide.image} 
                  alt={currentSlide.title}
                  className="w-full h-full object-contain"
                />

                {/* Left/Right Overlaid Arrow Navigation */}
                <button
                  onClick={handlePrevSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={handleNextSlide}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Fullscreen Expand Button */}
                <button
                  onClick={() => setIsFullscreenModalOpen(true)}
                  className="absolute top-4 right-4 p-2.5 rounded-xl bg-black/70 hover:bg-black/90 border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md"
                  title="Expand to Fullscreen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>

                {/* Slide Number Pill */}
                <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-xs font-mono text-amber-400 border border-amber-500/30">
                  Slide {currentSlide.slideNumber} of 47
                </div>
              </div>

              {/* Slide Meta Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div>
                  <div className="text-xs font-mono font-bold text-amber-400 uppercase">
                    {currentSlide.category}
                  </div>
                  <h3 className="text-base font-bold text-white mt-0.5">
                    {currentSlide.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {currentSlide.summary}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-center">
                  <button
                    onClick={handlePrevSlide}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono text-slate-300 px-2">
                    {currentSlide.slideNumber} / 47
                  </span>
                  <button
                    onClick={handleNextSlide}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Slide Deck Thumbnails Strip & Filter (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              
              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-1.5 p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
                {['All', 'Conduction', 'Convection', 'Radiation', 'Design & Aerodynamics', 'Advanced Modifications'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSlideCategoryFilter(cat)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                      slideCategoryFilter === cat
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Thumbnails Scroll Container */}
              <div className="p-3 rounded-3xl bg-slate-900/80 border border-slate-800 h-[460px] overflow-y-auto space-y-2 pr-1">
                {filteredSlides.map((slide) => {
                  const isCurrent = slide.slideNumber === currentSlide.slideNumber;
                  return (
                    <button
                      key={slide.slideNumber}
                      onClick={() => setCurrentSlideIndex(slide.slideNumber - 1)}
                      className={`w-full flex items-center gap-3 p-2 rounded-2xl text-left transition-all border ${
                        isCurrent
                          ? 'bg-amber-500/15 border-amber-500/50 shadow-md'
                          : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="w-20 aspect-16/9 rounded-lg overflow-hidden bg-slate-900 flex-shrink-0 border border-slate-700/60">
                        <img 
                          src={slide.image} 
                          alt={`Thumbnail ${slide.slideNumber}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="overflow-hidden">
                        <div className="text-[10px] font-mono text-amber-400">Slide {slide.slideNumber}</div>
                        <div className="text-xs font-semibold text-white truncate">{slide.title}</div>
                        <div className="text-[10px] text-slate-400 truncate">{slide.category}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

            </div>

          </div>

        </div>
      )}

      {/* ======================= MODE B: 77-PAGE PROJECT REPORT READER ======================= */}
      {docMode === 'report' && (
        <div className="space-y-6">
          
          {/* Chapter Navigation Bar */}
          <div className="flex flex-wrap gap-2 p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
            {REPORT_CHAPTERS.map((ch) => {
              const isSelected = ch.id === selectedChapterId;
              return (
                <button
                  key={ch.id}
                  onClick={() => setSelectedChapterId(ch.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                    isSelected
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-md shadow-cyan-500/10'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <span className="font-mono opacity-80">{ch.chapterNumber}:</span> {ch.title.split(' ')[0]}
                </button>
              );
            })}
          </div>

          {/* Chapter Content Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Summary & KaTeX Equations (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md space-y-6">
                
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
                      {activeChapter.chapterNumber} • {activeChapter.pages}
                    </span>
                    <h3 className="text-2xl font-black text-white mt-1">
                      {activeChapter.title}
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                    MT1070 Thesis
                  </span>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {activeChapter.summary}
                </p>

                {/* Mathematical Derivations Section */}
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>Governing Mathematical Formulations</span>
                  </h4>
                  <div className="space-y-3">
                    {activeChapter.keyEquations.map((eq, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                        <div className="text-xs font-bold text-cyan-300">{eq.name}</div>
                        <div className="py-1">
                          <MathView latex={eq.latex} block={true} />
                        </div>
                        <p className="text-[11px] text-slate-400 italic">
                          {eq.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chapter Highlights */}
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Info className="w-4 h-4 text-orange-400" />
                    <span>Key Empirical Findings & Takeaways</span>
                  </h4>
                  <ul className="space-y-2">
                    {activeChapter.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>

            {/* Right: Embedded Figures from Report (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md space-y-6">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>Extracted Thesis Figures & Diagrams</span>
                </h4>

                <div className="space-y-5">
                  {activeChapter.keyFigures.map((fig, i) => (
                    <div key={i} className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 p-3 space-y-2">
                      <div className="h-48 w-full flex items-center justify-center overflow-hidden rounded-xl bg-black">
                        <img 
                          src={fig.image} 
                          alt={fig.title}
                          className="w-full h-full object-contain p-2 hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="text-xs font-bold text-white">{fig.title}</div>
                      <p className="text-[11px] text-slate-400">{fig.caption}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Fullscreen Slide Modal */}
      {isFullscreenModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4">
          <button
            onClick={() => setIsFullscreenModalOpen(false)}
            className="absolute top-5 right-5 p-3 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative max-w-6xl w-full aspect-16/9 flex items-center justify-center">
            <img 
              src={currentSlide.image} 
              alt={currentSlide.title}
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl border border-slate-800"
            />
          </div>

          <div className="mt-4 flex items-center gap-4">
            <button
              onClick={handlePrevSlide}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
            <span className="text-sm font-mono text-amber-400">
              Slide {currentSlide.slideNumber} of 47
            </span>
            <button
              onClick={handleNextSlide}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
