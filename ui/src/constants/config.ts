import { hashValues, pad32 } from '../services/cloakpass';

export const ADMIN_SK = 'admin-super-secret-key-12345';
export const ADMIN_PK = hashValues([pad32('cloakpass:admin:v1'), ADMIN_SK]);

export const NETWORK_CONFIG = {
  name: 'Midnight Testnet',
  tier: 'Shielded Nonce',
  merkleDepth: 4,
  maxLeaves: 16,
  contractAddress: 'midnight1q8u3a94e02r97zkd58d9v38xlqnswkxp095gskv9u3d2p84x9q7s8c5v (Local Deployment)',
};

export const MOCK_WALLET_CONFIG = {
  lace: {
    admin: {
      address: 'cloak_admin1p6x9u82r47zkd58d9v38xlqnswkxp095gskv9u',
      balance: '12,450.50 tADA'
    },
    user: {
      address: 'cloak_user1q3r4xk9v05gskv9uxlqnswkxp095gskv9u3d2p',
      balance: '520.40 tADA'
    }
  },
  freighter: {
    admin: {
      address: 'GBADMINFreighterStellarPublicKeyX7V2R89P',
      balance: '8,540.25 XLM'
    },
    user: {
      address: 'GBMEMBERFreighterStellarPublicKey4X9P78Q3',
      balance: '160.50 XLM'
    }
  },
  mock: {
    admin: {
      address: 'mock_admin_key_12345',
      balance: '9,999.00 DEV'
    },
    user: {
      address: 'mock_user_key_54321',
      balance: '100.00 DEV'
    }
  }
};
