export type WalletRole = 'admin' | 'user';
export type WalletType = 'lace' | 'freighter' | 'mock';

export interface WalletState {
  connected: boolean;
  connecting: boolean;
  role: WalletRole;
  address: string;
  balance: string;
  type: WalletType | null;
}

export interface TerminalEvent {
  id: string;
  blockNumber: number;
  txHash: string;
  timestamp: string;
  type: 'access' | 'registration';
  details: string;
}

export interface ProofExecutionState {
  currentSecret: string;
  isGenerating: boolean;
  step: number;
  isVerified: boolean;
  lastEventId: string;
}

export interface MerkleTreePathEntry {
  sibling: string;
  isRight: boolean;
}

export interface MerkleTreePath {
  leaf: string;
  path: MerkleTreePathEntry[];
}

export interface CloakPassWitnesses {
  get_secret: () => string;
  get_membership_proof: () => MerkleTreePath;
  get_admin_secret: () => string;
}
