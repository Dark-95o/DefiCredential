import { useState, useEffect, useCallback } from 'react';
import type { WalletRole, WalletType, WalletState } from '../types';
import { MOCK_WALLET_CONFIG } from '../constants/config';

interface UseWalletReturn {
  walletState: WalletState;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  openWalletModal: () => void;
  closeWalletModal: () => void;
  connectWallet: (type: WalletType) => Promise<void>;
  disconnectWallet: () => void;
  setRole: (role: WalletRole) => void;
}

export function useWallet(onLogEvent?: (type: 'access' | 'registration', message: string) => void): UseWalletReturn {
  const [walletState, setWalletState] = useState<WalletState>({
    connected: false,
    connecting: false,
    role: 'user',
    address: '',
    balance: '500.00',
    type: null,
  });
  const [showModal, setShowModal] = useState(false);

  const updateWalletState = useCallback((type: WalletType | null, role: WalletRole) => {
    if (!type) return;
    const providerConfig = MOCK_WALLET_CONFIG[type];
    if (!providerConfig) return;

    const account = providerConfig[role];
    setWalletState((prev) => ({
      ...prev,
      address: account.address,
      balance: account.balance,
      role,
      type,
    }));
  }, []);

  const connectWallet = useCallback(async (type: WalletType) => {
    setShowModal(false);
    setWalletState((prev) => ({ ...prev, connecting: true }));

    await new Promise((r) => setTimeout(r, 900));

    const providerConfig = MOCK_WALLET_CONFIG[type];
    const account = providerConfig[walletState.role];

    setWalletState((prev) => ({
      ...prev,
      connected: true,
      connecting: false,
      type,
      address: account.address,
      balance: account.balance,
    }));

    if (onLogEvent) {
      if (type === 'lace') {
        onLogEvent('access', 'Connected to Lace Beta Wallet on Midnight Testnet.');
      } else if (type === 'freighter') {
        onLogEvent('access', 'Connected to Freighter Wallet via Stellar Bridge.');
      } else {
        onLogEvent('access', 'Connected to Mock Developer Simulator Wallet.');
      }
    }
  }, [walletState.role, onLogEvent]);

  const disconnectWallet = useCallback(() => {
    setWalletState((prev) => ({
      ...prev,
      connected: false,
      connecting: false,
      address: '',
      type: null,
    }));
    if (onLogEvent) {
      onLogEvent('access', 'Wallet disconnected.');
    }
  }, [onLogEvent]);

  const setRole = useCallback((role: WalletRole) => {
    setWalletState((prev) => {
      if (prev.connected && prev.type) {
        const providerConfig = MOCK_WALLET_CONFIG[prev.type];
        const account = providerConfig[role];
        return {
          ...prev,
          role,
          address: account.address,
          balance: account.balance,
        };
      }
      return { ...prev, role };
    });
  }, []);

  useEffect(() => {
    if (walletState.connected && walletState.type) {
      updateWalletState(walletState.type, walletState.role);
    }
  }, [walletState.role, walletState.connected, walletState.type, updateWalletState]);

  return {
    walletState,
    showModal,
    setShowModal,
    openWalletModal: () => setShowModal(true),
    closeWalletModal: () => setShowModal(false),
    connectWallet,
    disconnectWallet,
    setRole,
  };
}
