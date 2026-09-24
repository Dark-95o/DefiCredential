import React from 'react';
import { Sparkles, Server, Lock } from 'lucide-react';
import { NETWORK_CONFIG } from '../../constants/config';

interface HeroBannerProps {
  activeLeavesCount: number;
  accessCount: number;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  activeLeavesCount,
  accessCount,
}) => {
  return (
    <div className="cream-card rounded-3xl p-8 md:p-10 border border-[#E5DFD5] shadow-sm relative overflow-hidden bg-[#FFFDF9]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Banner Left Info Column */}
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3EEE6] border border-[#E5DFD5] text-[#C2410C] font-mono text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#C2410C]" /> Next-Gen Shielded Access Verification
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#1C1917] leading-tight">
            Zero-Knowledge Privacy Gateway
          </h1>

          <p className="text-sm text-[#57534E] leading-relaxed max-w-xl">
            CloakPass decouples user identity from membership validation. Verify access rights to private resources using Midnight Compact ZK-SNARK circuits without revealing your address or key.
          </p>

          {/* Stats Counters Grid */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#E5DFD5]">
            <div className="bg-[#F4EFE6] p-3.5 rounded-2xl border border-[#E5DFD5]">
              <span className="text-[10px] text-[#57534E] font-mono block uppercase tracking-wider font-semibold">
                Active Tree Leaves
              </span>
              <span className="text-xl font-bold text-[#1C1917] font-mono mt-0.5 block">
                {activeLeavesCount} / {NETWORK_CONFIG.maxLeaves}
              </span>
            </div>
            <div className="bg-[#F4EFE6] p-3.5 rounded-2xl border border-[#E5DFD5]">
              <span className="text-[10px] text-[#57534E] font-mono block uppercase tracking-wider font-semibold">
                Verified Proofs
              </span>
              <span className="text-xl font-bold text-[#C2410C] font-mono mt-0.5 block">
                {accessCount}
              </span>
            </div>
            <div className="bg-[#F4EFE6] p-3.5 rounded-2xl border border-[#E5DFD5]">
              <span className="text-[10px] text-[#57534E] font-mono block uppercase tracking-wider font-semibold">
                Circuit Protocol
              </span>
              <span className="text-xl font-bold text-[#B45309] font-mono mt-0.5 block">
                Compact ZK
              </span>
            </div>
          </div>
        </div>

        {/* Banner Right Technical Overview */}
        <div className="lg:col-span-5 bg-[#F4EFE6] rounded-2xl p-6 border border-[#E5DFD5] space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#57534E] flex items-center gap-2 border-b border-[#E5DFD5] pb-3">
            <Server className="w-4 h-4 text-[#C2410C]" /> Protocol Specifications
          </h3>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-[#FFFDF9] p-3 rounded-xl border border-[#E5DFD5] space-y-1">
              <span className="text-[10px] text-[#78716C] font-mono block">Merkle Tree</span>
              <span className="font-bold text-[#1C1917]">
                Depth {NETWORK_CONFIG.merkleDepth} ({NETWORK_CONFIG.maxLeaves} Slots)
              </span>
            </div>
            <div className="bg-[#FFFDF9] p-3 rounded-xl border border-[#E5DFD5] space-y-1">
              <span className="text-[10px] text-[#78716C] font-mono block">Prover System</span>
              <span className="font-bold text-[#1C1917]">Plonk ZK-SNARK</span>
            </div>
            <div className="bg-[#FFFDF9] p-3 rounded-xl border border-[#E5DFD5] space-y-1">
              <span className="text-[10px] text-[#78716C] font-mono block">Privacy Tier</span>
              <span className="font-bold text-[#15803D]">{NETWORK_CONFIG.tier}</span>
            </div>
            <div className="bg-[#FFFDF9] p-3 rounded-xl border border-[#E5DFD5] space-y-1">
              <span className="text-[10px] text-[#78716C] font-mono block">Deployment</span>
              <span className="font-bold text-[#C2410C] text-[11px] truncate block" title={NETWORK_CONFIG.contractAddress}>
                Local Deployment
              </span>
            </div>
          </div>

          <div className="bg-[#FFFDF9] p-3.5 rounded-xl border border-[#E5DFD5] flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-[#57534E]">
              <Lock className="w-3.5 h-3.5 text-[#C2410C]" />
              <span>Isolation: Local Browser WASM</span>
            </div>
            <span className="text-[10px] bg-[#E5DFD5] text-[#1C1917] px-2 py-0.5 rounded font-bold">
              Verified
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
