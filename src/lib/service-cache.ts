import { serviceOfferings, type ServiceOffering } from '@/data';

import type { SaaSSnapshot, ServiceSyncPayload, SaaSSource } from './contracts';

const snapshotStore = new Map<string, ServiceOffering>(
  serviceOfferings.map((service) => [service.id, { ...service }]),
);

let lastUpdatedAt = new Date().toISOString();
let lastSource: SaaSSource = 'static';

export function listServiceSnapshot(): SaaSSnapshot {
  return {
    services: Array.from(snapshotStore.values()),
    updatedAt: lastUpdatedAt,
    source: lastSource,
  };
}

export function updateServiceSnapshot(
  updates: ServiceSyncPayload[],
  options: { source?: SaaSSource } = {},
): SaaSSnapshot {
  if (!updates.length) {
    return listServiceSnapshot();
  }

  updates.forEach((payload) => {
    const existing = snapshotStore.get(payload.id);
    if (!existing) {
      snapshotStore.set(payload.id, {
        id: payload.id,
        name: payload.name ?? payload.id,
        headline: payload.headline ?? '',
        description: payload.description ?? '',
        status: payload.status ?? 'Disponível',
        href: '#',
        category: payload.category ?? 'Serviço',
        price: payload.price,
        highlight: payload.highlight,
        tags: payload.tags,
      });
      return;
    }

    snapshotStore.set(payload.id, {
      ...existing,
      ...payload,
      tags: payload.tags ?? existing.tags,
      highlight: payload.highlight ?? existing.highlight,
    });
  });

  lastUpdatedAt = new Date().toISOString();
  lastSource = options.source ?? 'webhook';

  return listServiceSnapshot();
}

export function resetServiceSnapshot() {
  snapshotStore.clear();
  serviceOfferings.forEach((service) => {
    snapshotStore.set(service.id, { ...service });
  });
  lastUpdatedAt = new Date().toISOString();
  lastSource = 'static';
}
