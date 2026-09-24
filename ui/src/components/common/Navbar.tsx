import React from 'react';
import { ShieldCheck, Wallet } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { WalletState } from '../../types';
import { NETWORK_CONFIG } from '../../constants/config';

interface NavbarProps {
  walletState: WalletState;
  onConnectWallet: () => void;
  onDisconnectWallet: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  walletState,
  onConnectWallet,
  onDisconnectWallet,
}) => {
  return (
    <header className="border-b border-[#E5DFD5] bg-[#FFFDF9]/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#C2410C] flex items-center justify-center shadow-sm p-0.5">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-xl font-extrabold tracking-tight text-[#1C1917] flex items-center gap-2">
              CloakPass{' '}
              <span className="text-[10px] bg-[#F3EEE6] text-[#C2410C] px-2.5 py-0.5 rounded-full font-mono uppercase tracking-wider border border-[#E5DFD5] font-bold">
                Midnight ZK
              </span>
            </div>
            <span className="text-[11px] text-[#57534E] block leading-none font-mono">
              Shielded Access Gatekeeper
            </span>
          </div>
        </div>

        {/* Action Controls & Wallet */}
        <div className="flex items-center gap-4">
          {/* Network Indicator Pill */}
          <div className="hidden sm:flex items-center gap-2 bg-[#F3EEE6] border border-[#E5DFD5] px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold text-[#57534E]">
            <span className="w-2 h-2 rounded-full bg-[#15803D]"></span>
            {NETWORK_CONFIG.name}
          </div>

          {/* Wallet Connection Status / Trigger */}
          <AnimatePresence mode="wait">
            {!walletState.connected ? (
              <motion.button
                key="connect"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                onClick={onConnectWallet}
                disabled={walletState.connecting}
                className="bg-[#C2410C] hover:bg-[#9A3412] text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 active:scale-[0.98] transition-all shadow-sm disabled:opacity-50"
              >
                <Wallet className="w-4 h-4 stroke-[2.5]" />
                {walletState.connecting ? 'Connecting...' : 'Connect Wallet'}
              </motion.button>
            ) : (
              <motion.div
                key="details"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3 bg-[#F3EEE6] border border-[#E5DFD5] pl-3.5 pr-2 py-1.5 rounded-xl text-xs"
              >
                <div className="text-right font-mono">
                  <span className="text-[9px] text-[#57534E] block">
                    Balance ({walletState.type?.toUpperCase()}):
                  </span>
                  <span className="font-bold text-[#C2410C]">{walletState.balance}</span>
                </div>
                <div className="h-6 w-px bg-[#E5DFD5]"></div>
                <button
                  onClick={onDisconnectWallet}
                  title="Click to disconnect"
                  className="hover:text-[#C2410C] font-mono text-[10px] text-[#57534E] transition-colors uppercase font-bold tracking-wider"
                >
                  {walletState.address.substring(0, 6)}...{walletState.address.substring(walletState.address.length - 4)}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};
