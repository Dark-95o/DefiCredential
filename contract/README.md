# CloakPass Smart Contract Subsystem

Compact-based smart contract implementation for decentralized, zero-knowledge anonymous access passes on the Midnight network.

## Gas Metering Guidelines
- **Proof Verification**: Midnight zk-SNARK verification operates with fixed execution cost per circuit leaf verification.
- **Nullifier Checking**: Set lookups for spent nullifiers utilize state tree indexing for O(log N) gas efficiency.
- **Allowlist Additions**: Admin-authenticated commitment insertions are metered based on incremental Merkle tree root updates.

## Local Compilation
```bash
npm run compile
```

## Artifact Generation
Running the compiler generates the TypeScript runtime bindings and witness interfaces under `contract/build/` and exports verification circuits.
