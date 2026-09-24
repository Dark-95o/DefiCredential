import React from 'react';

interface TabNavigationProps {
  activeTab: 'member' | 'admin';
  onTabChange: (tab: 'member' | 'admin') => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="bg-[#F4EFE6] rounded-2xl p-1 flex gap-1 border border-[#E5DFD5]">
      <button
        onClick={() => onTabChange('member')}
        className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${
          activeTab === 'member'
            ? 'bg-[#FFFDF9] text-[#1C1917] border border-[#E5DFD5] shadow-sm'
            : 'text-[#78716C] hover:text-[#1C1917]'
        }`}
      >
        Member Access
      </button>
      <button
        onClick={() => onTabChange('admin')}
        className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${
          activeTab === 'admin'
            ? 'bg-[#FFFDF9] text-[#1C1917] border border-[#E5DFD5] shadow-sm'
            : 'text-[#78716C] hover:text-[#1C1917]'
        }`}
      >
        Admin Vault
      </button>
    </div>
  );
};
