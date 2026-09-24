import { useState } from 'react';
import { Navbar } from './components/common/Navbar';
import { WalletModal } from './components/common/WalletModal';
import { RoleControls } from './components/common/RoleControls';
import { TabNavigation } from './components/common/TabNavigation';
import { HeroBanner } from './components/features/HeroBanner';
import { HeroVisualizer } from './components/HeroVisualizer';
import { MemberAccess } from './components/MemberAccess';
import { AdminVault } from './components/AdminVault';
import { Terminal } from './components/Terminal';
import { useWallet } from './hooks/useWallet';
import { useCloakPass } from './hooks/useCloakPass';
import { NETWORK_CONFIG } from './constants/config';
import type { WalletRole } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'member' | 'admin'>('member');

  // Encapsulated Zero-Knowledge Contract and Prover State
  const {
    commitments,
    accessCount,
    terminalEvents,
    provingState,
    logEvent,
    registerCommitment,
    proveMembership,
    clearLedgerState,
  } = useCloakPass();

  // Encapsulated Multi-Wallet Provider Controller
  const {
    walletState,
    showModal,
    openWalletModal,
    closeWalletModal,
    connectWallet,
    disconnectWallet,
    setRole,
  } = useWallet(logEvent);

  const activeLeavesCount = commitments.filter(
    (c) => c !== '0000000000000000000000000000000000000000000000000000000000000000'
  ).length;

  const handleRoleChange = (role: WalletRole) => {
    setRole(role);
    setActiveTab(role === 'admin' ? 'admin' : 'member');
    if (!walletState.connected) {
      openWalletModal();
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C1917] font-sans overflow-x-hidden pb-16 selection:bg-[#E5DFD5] selection:text-[#C2410C]">
      {/* Navigation Header */}
      <Navbar
        walletState={walletState}
        onConnectWallet={openWalletModal}
        onDisconnectWallet={disconnectWallet}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 mt-8 space-y-8 relative z-10">
        {/* Editorial Architecture Showcase Banner */}
        <HeroBanner
          activeLeavesCount={activeLeavesCount}
          accessCount={accessCount}
        />

        {/* Dashboard Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: ZK Visualizer Stepper & Real-time Event Terminal */}
          <div className="lg:col-span-8 space-y-8">
            <HeroVisualizer
              currentSecret={provingState.currentSecret}
              isGenerating={provingState.isGenerating}
              step={provingState.step}
              isVerified={provingState.isVerified}
              eventId={provingState.lastEventId}
            />

            <Terminal events={terminalEvents} />
          </div>

          {/* Right Column: Interactive Role Simulation & Access Vaults */}
          <div className="lg:col-span-4 space-y-6">
            <RoleControls
              walletRole={walletState.role}
              walletConnected={walletState.connected}
              accessCount={accessCount}
              onRoleSelect={handleRoleChange}
              onResetLedger={clearLedgerState}
            />

            <TabNavigation
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />

            <div className="min-h-[440px]">
              {activeTab === 'member' ? (
                <MemberAccess
                  onProve={proveMembership}
                  isConnected={walletState.connected}
                />
              ) : (
                <AdminVault
                  onRegister={registerCommitment}
                  commitments={commitments}
                  maxLeaves={NETWORK_CONFIG.maxLeaves}
                  isConnected={walletState.connected}
                  isAdmin={walletState.role === 'admin'}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Multi-Wallet Provider Selection Modal */}
      <WalletModal
        isOpen={showModal}
        onClose={closeWalletModal}
        onSelectWallet={connectWallet}
      />
    </div>
  );
}
