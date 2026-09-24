import React from 'react';
import { Info, RefreshCw } from 'lucide-react';
import type { WalletRole } from '../../types';

interface RoleControlsProps {
  walletRole: WalletRole;
  walletConnected: boolean;
  accessCount: number;
  onRoleSelect: (role: WalletRole) => void;
  onResetLedger: () => void;
}

export const RoleControls: React.FC<RoleControlsProps> = ({
  walletRole,
  walletConnected,
  accessCount,
  onRoleSelect,
  onResetLedger,
}) => {
  return (
    <div className="cream-card rounded-3xl p-6 border border-[#E5DFD5] bg-[#FFFDF9] shadow-sm relative overflow-hidden">
      <h3 className="text-xs font-bold uppercase tracking-wider text-[#1C1917] flex items-center gap-1.5 mb-2">
        <Info className="w-4 h-4 shrink-0 text-[#C2410C]" />
        Simulator Role Controls
      </h3>
      <p className="text-xs text-[#57534E] mb-4 leading-relaxed">
        Switch roles to simulate allowlist registration as Admin or proof verification as Member.
      </p>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <button
          onClick={() => onRoleSelect('admin')}
          className={`py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all border ${
            walletRole === 'admin' && walletConnected
              ? 'bg-[#C2410C] border-[#9A3412] text-white shadow-sm'
              : 'bg-[#F4EFE6] border-[#E5DFD5] text-[#57534E] hover:text-[#1C1917]'
          }`}
        >
          Act as Admin
        </button>
        <button
          onClick={() => onRoleSelect('user')}
          className={`py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all border ${
            walletRole === 'user' && walletConnected
              ? 'bg-[#B45309] border-[#92400E] text-white shadow-sm'
              : 'bg-[#F4EFE6] border-[#E5DFD5] text-[#57534E] hover:text-[#1C1917]'
          }`}
        >
          Act as Member
        </button>
      </div>

      <div className="border-t border-[#E5DFD5] pt-3 flex justify-between items-center text-[11px] font-mono">
        <span className="text-[#57534E]">
          Proof Events: <strong className="text-[#1C1917]">{accessCount}</strong>
        </span>
        <button
          onClick={onResetLedger}
          className="text-[#C2410C] hover:text-[#9A3412] font-bold uppercase tracking-wider flex items-center gap-1 transition-all"
        >
          <RefreshCw className="w-3 h-3" />
          Reset Ledger
        </button>
      </div>
    </div>
  );
};
