import React from 'react';
import { ShieldCheck, Shield, Wallet, Cpu } from 'lucide-react';
import type { WalletType } from '../../types';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectWallet: (type: WalletType) => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
  onSelectWallet,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1917]/40 backdrop-blur-sm">
      <div className="cream-card w-full max-w-md p-6 rounded-3xl border border-[#E5DFD5] shadow-xl relative bg-[#FFFDF9]">
        <div className="flex items-center gap-2.5 mb-2">
          <ShieldCheck className="w-5 h-5 text-[#C2410C]" />
          <h3 className="text-lg font-bold text-[#1C1917]">Select Wallet Provider</h3>
        </div>
        <p className="text-xs text-[#57534E] mb-6">
          Select a Midnight or Stellar compatible wallet to proceed.
        </p>

        <div className="space-y-3">
          {/* Lace Wallet */}
          <button
            onClick={() => onSelectWallet('lace')}
            className="w-full bg-[#F4EFE6] hover:bg-[#E5DFD5]/60 border border-[#E5DFD5] p-4 rounded-xl flex items-center justify-between transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FFFDF9] border border-[#E5DFD5] flex items-center justify-center text-[#C2410C]">
                <Shield className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-[#1C1917] group-hover:text-[#C2410C] transition-colors">
                  Lace Wallet
                </div>
                <span className="text-[10px] text-[#78716C] font-mono">Midnight Testnet</span>
              </div>
            </div>
            <span className="text-[10px] text-[#C2410C] font-bold uppercase tracking-wider bg-[#FFFDF9] px-2.5 py-1 rounded border border-[#E5DFD5]">
              Connect
            </span>
          </button>

          {/* Freighter Wallet */}
          <button
            onClick={() => onSelectWallet('freighter')}
            className="w-full bg-[#F4EFE6] hover:bg-[#E5DFD5]/60 border border-[#E5DFD5] p-4 rounded-xl flex items-center justify-between transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FFFDF9] border border-[#E5DFD5] flex items-center justify-center text-[#B45309]">
                <Wallet className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-[#1C1917] group-hover:text-[#B45309] transition-colors">
                  Freighter Wallet
                </div>
                <span className="text-[10px] text-[#78716C] font-mono">Stellar Integration</span>
              </div>
            </div>
            <span className="text-[10px] text-[#B45309] font-bold uppercase tracking-wider bg-[#FFFDF9] px-2.5 py-1 rounded border border-[#E5DFD5]">
              Connect
            </span>
          </button>

          {/* Mock Developer Wallet */}
          <button
            onClick={() => onSelectWallet('mock')}
            className="w-full bg-[#F4EFE6] hover:bg-[#E5DFD5]/60 border border-[#E5DFD5] p-4 rounded-xl flex items-center justify-between transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FFFDF9] border border-[#E5DFD5] flex items-center justify-center text-[#57534E]">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-[#1C1917] group-hover:text-[#1C1917] transition-colors">
                  Mock Wallet
                </div>
                <span className="text-[10px] text-[#78716C] font-mono">Developer Simulator</span>
              </div>
            </div>
            <span className="text-[10px] text-[#57534E] font-bold uppercase tracking-wider bg-[#FFFDF9] px-2.5 py-1 rounded border border-[#E5DFD5]">
              Connect
            </span>
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-5 bg-[#F4EFE6] hover:bg-[#E5DFD5] py-2.5 rounded-xl text-xs font-bold text-[#57534E] transition-colors border border-[#E5DFD5]"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
