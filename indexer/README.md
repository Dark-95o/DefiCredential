# CloakPass Event Indexer

Real-time indexing service for CloakPass on-chain events on Midnight network.

## Architecture
- Subscribes to contract ledger events (`accessGranted`, `commitmentRegistered`).
- Maintains an in-memory synchronized cache for low-latency dApp state queries.
- Exposes REST endpoints for recent audit logs and proof verification streams.
