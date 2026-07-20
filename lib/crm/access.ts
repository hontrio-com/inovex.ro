import type { SessionUser } from '@/lib/auth';

/**
 * Reguli de acces CRM (enforce server-side, in rutele API).
 * Matricea de roluri: owner/admin vad si editeaza tot; agentul vede si
 * editeaza doar resursele alocate lui (assigned_to). Stergerea de clienti
 * e permisa doar owner/admin.
 */

export function isPrivileged(user: SessionUser): boolean {
  return user.role === 'owner' || user.role === 'admin';
}

export function canDeleteClient(user: SessionUser): boolean {
  return isPrivileged(user);
}

/** Agentul vede/editeaza doar clientii alocati lui. */
export function canAccessClient(user: SessionUser, assignedTo: string | null): boolean {
  if (isPrivileged(user)) return true;
  return assignedTo != null && assignedTo === user.id;
}
