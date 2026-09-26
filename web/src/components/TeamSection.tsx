import React from 'react';
import { 
  Users, 
  ShieldCheck, 
  Award, 
  GraduationCap, 
  Crown, 
  Cpu, 
  BookOpen,
  Calendar,
  Building
} from 'lucide-react';
import { TEAM_MEMBERS, TeamMember } from '../core/heatSinkData';

export const TeamSection: React.FC = () => {
  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-orange-950/40 via-slate-900 to-slate-950 border border-orange-500/30 shadow-2xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-orange-400 uppercase tracking-widest">
            <Users className="w-4 h-4 text-orange-500" />
            <span>Academic Research Group • Group 3</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Research Team & Academic Directory
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            Department of Materials Science and Engineering, University of Moratuwa. Formulated and defended under module MT1070: Thermodynamics and Phase Equilibria.
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-900 border border-slate-700 text-slate-300 text-xs font-mono self-start md:self-center">
          <Calendar className="w-3.5 h-3.5 text-orange-400" />
          <span>July 9 & 12, 2023</span>
        </div>
      </div>

      {/* University & Module Banner */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 flex-shrink-0 shadow-lg shadow-orange-950/40">
            <GraduationCap className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">University of Moratuwa</h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Department of Materials Science and Engineering • Faculty of Engineering
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-orange-500/20 text-orange-300 border border-orange-500/40 font-semibold">
                MT1070: Thermodynamics & Phase Equilibria
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold">
                Group 3 Project
              </span>
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-400 max-w-sm text-center md:text-right">
          A comprehensive thermodynamic and computational fluid dynamics analysis of heat sink heat dissipation mechanisms and modern solid-state modifications.
        </div>
      </div>

      {/* Team Member Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TEAM_MEMBERS.map((member) => {
          return (
            <div
              key={member.index}
              className={`p-5 rounded-3xl transition-all duration-300 border relative overflow-hidden ${
                member.isLeadAuthor
                  ? 'bg-gradient-to-b from-orange-950/40 via-slate-900 to-slate-950 border-amber-500/60 shadow-xl shadow-amber-950/30 scale-[1.02]'
                  : member.isGroupLeader
                  ? 'bg-slate-900/90 border-slate-700/80 shadow-lg'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
              }`}
            >
              {/* Highlight Aura for Sadun Premakumara */}
              {member.isLeadAuthor && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-3xl pointer-events-none" />
              )}

              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-sm ${
                    member.isLeadAuthor
                      ? 'bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 shadow-md shadow-orange-500/30'
                      : member.isGroupLeader
                      ? 'bg-slate-800 text-amber-400 border border-slate-700'
                      : 'bg-slate-800 text-slate-300 border border-slate-700'
                  }`}>
                    {member.name.slice(0, 2)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">
                        {member.name}
                      </h4>
                      {member.isLeadAuthor && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-amber-400" />
                          <span>Architect</span>
                        </span>
                      )}
                      {member.isGroupLeader && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1">
                          <Crown className="w-3 h-3 text-amber-400" />
                          <span>Leader</span>
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                      Index: <strong className={member.isLeadAuthor ? 'text-amber-400' : 'text-slate-300'}>{member.index}</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">
                  {member.role}
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
