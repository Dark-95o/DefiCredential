import { useState, useRef, useCallback } from 'react';
import type { TerminalEvent, ProofExecutionState } from '../types';
import { CloakPassContract, hashValues, pad32 } from '../services/cloakpass';
import { ADMIN_PK, ADMIN_SK } from '../constants/config';

export function useCloakPass() {
  const contractRef = useRef<CloakPassContract>(new CloakPassContract(ADMIN_PK));
  const [commitments, setCommitments] = useState<string[]>(contractRef.current.commitments.leaves);
  const [accessCount, setAccessCount] = useState<number>(contractRef.current.access_granted_count);
  const [terminalEvents, setTerminalEvents] = useState<TerminalEvent[]>([]);

  const [provingState, setProvingState] = useState<ProofExecutionState>({
    currentSecret: '',
    isGenerating: false,
    step: 0,
    isVerified: false,
    lastEventId: '',
  });

  const logEvent = useCallback((type: 'access' | 'registration', details: string) => {
    const newEvent: TerminalEvent = {
      id: Math.random().toString(),
      blockNumber: 1542000 + Math.floor(Math.random() * 50),
      txHash: '0x' + crypto.randomUUID().replace(/-/g, '').substring(0, 40),
      timestamp: new Date().toLocaleTimeString(),
      type,
      details,
    };
    setTerminalEvents((prev) => [newEvent, ...prev]);
  }, []);

  const registerCommitment = useCallback(async (secret: string): Promise<{ success: boolean; commitment?: string; error?: string }> => {
    try {
      const commitment = hashValues([pad32('cloakpass:commitment:v1'), secret]);

      contractRef.current.registerWitnesses({
        get_admin_secret: () => ADMIN_SK,
        get_secret: () => '',
        get_membership_proof: () => ({ leaf: '', path: [] })
      });

      contractRef.current.register_commitment(commitment);
      setCommitments([...contractRef.current.commitments.leaves]);
      logEvent('registration', `Admin registered new commitment leaf: ${commitment.substring(0, 16)}...`);
      return { success: true, commitment };
    } catch (e: any) {
      return { success: false, error: e.message || 'Failed to register commitment' };
    }
  }, [logEvent]);

  const proveMembership = useCallback(async (secret: string): Promise<{ success: boolean; eventId?: string; error?: string }> => {
    setProvingState({
      currentSecret: secret,
      isGenerating: true,
      step: 1,
      isVerified: false,
      lastEventId: '',
    });

    await new Promise((r) => setTimeout(r, 1200));
    setProvingState((prev) => ({ ...prev, step: 2 }));

    await new Promise((r) => setTimeout(r, 1500));
    setProvingState((prev) => ({ ...prev, step: 3 }));

    try {
      const commitment = hashValues([pad32('cloakpass:commitment:v1'), secret]);
      const leafIndex = contractRef.current.commitments.leaves.findIndex((c) => c === commitment);

      if (leafIndex === -1) {
        throw new Error('Secret is not registered in the allowlist commitments tree.');
      }

      const path = contractRef.current.commitments.getPath(leafIndex);

      contractRef.current.registerWitnesses({
        get_admin_secret: () => '',
        get_secret: () => secret,
        get_membership_proof: () => path
      });

      const eventId = hashValues([`session-${Date.now()}`]);
      contractRef.current.prove_membership(eventId);

      setAccessCount(contractRef.current.access_granted_count);
      setProvingState({
        currentSecret: secret,
        isGenerating: false,
        step: 0,
        isVerified: true,
        lastEventId: eventId,
      });

      logEvent('access', `Verification successful. Anonymous Event Granted: ${eventId.substring(0, 16)}...`);
      return { success: true, eventId };
    } catch (err: any) {
      setProvingState({
        currentSecret: '',
        isGenerating: false,
        step: 0,
        isVerified: false,
        lastEventId: '',
      });
      return { success: false, error: err.message || 'ZK proof validation failed' };
    }
  }, [logEvent]);

  const clearLedgerState = useCallback(() => {
    contractRef.current.commitments.leaves = contractRef.current.commitments.leaves.map(
      () => '0000000000000000000000000000000000000000000000000000000000000000'
    );
    contractRef.current.access_granted_events.clear();
    contractRef.current.access_granted_count = 0;

    setCommitments([...contractRef.current.commitments.leaves]);
    setAccessCount(0);
    setTerminalEvents([]);
    setProvingState({
      currentSecret: '',
      isGenerating: false,
      step: 0,
      isVerified: false,
      lastEventId: '',
    });
    logEvent('registration', 'Contract ledger re-initialized to initial empty state.');
  }, [logEvent]);

  return {
    commitments,
    accessCount,
    terminalEvents,
    provingState,
    logEvent,
    registerCommitment,
    proveMembership,
    clearLedgerState,
  };
}
