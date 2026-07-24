import React from "react";

const TestimonialsSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 my-12 relative">
      <div className="relative bg-slate-50/60 dark:bg-[#17181c]/30 border border-slate-200 dark:border-white/5 rounded-3xl px-6 py-16 md:py-20 md:px-12 overflow-hidden">
        {/* Background ambient glow inside container */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(129,77,243,0.05)_0%,transparent_70%)]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(0,218,243,0.03)_0%,transparent_70%)]" />
        </div>

        <div className="text-center mb-12 relative z-10">
          <h2 className="font-headline text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Real results from real students
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {/* Card 1 */}
          <div className="bg-white dark:bg-[#10131a]/80 p-6 sm:p-8 rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-md hover:border-slate-200 dark:hover:border-white/10 transition-all duration-300 flex flex-col justify-between">
            <p className="italic text-slate-700 dark:text-slate-300 text-[13px] md:text-sm mb-6 leading-relaxed">
              "Aspirev completely restructured how I view my career preparation.
              The skill roadmap and tracker were exactly what I needed to focus my
              prep."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center font-bold text-xs shrink-0">
                MS
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  Marcus Sterling
                </div>
                <div className="text-[10px] text-slate-500 dark:text-white/40 font-label uppercase tracking-widest mt-0.5">
                  Graduate Engineer
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-[#10131a]/80 p-6 sm:p-8 rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-md hover:border-slate-200 dark:hover:border-white/10 transition-all duration-300 flex flex-col justify-between">
            <p className="italic text-slate-700 dark:text-slate-300 text-[13px] md:text-sm mb-6 leading-relaxed">
              "The interface alone makes tracking applications enjoyable. The
              career roadmap tool helped me land an internship in just 3 weeks."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0">
                ER
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  Elena Rodriguez
                </div>
                <div className="text-[10px] text-slate-500 dark:text-white/40 font-label uppercase tracking-widest mt-0.5">
                  Product Design Student
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white dark:bg-[#10131a]/80 p-6 sm:p-8 rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-md hover:border-slate-200 dark:hover:border-white/10 transition-all duration-300 flex flex-col justify-between">
            <p className="italic text-slate-700 dark:text-slate-300 text-[13px] md:text-sm mb-6 leading-relaxed">
              "I finally stopped guessing what skills companies wanted. Aspirev
              gave me a clear, step-by-step roadmap to guide my learning journey."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
                DC
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  David Chen
                </div>
                <div className="text-[10px] text-slate-500 dark:text-white/40 font-label uppercase tracking-widest mt-0.5">
                  Self-Taught Developer
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
