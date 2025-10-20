import type { ServiceOffering, ServiceStage } from '@/data';

export type SaaSSource = 'static' | 'webhook';

export interface ServiceSyncPayload {
  id: string;
  name?: string;
  headline?: string;
  description?: string;
  status?: ServiceStage;
  price?: string;
  tags?: string[];
  category?: ServiceOffering['category'];
  highlight?: boolean;
}

export interface SaaSWebhookPayload {
  secret?: string;
  source?: string;
  triggeredAt?: string;
  services?: ServiceSyncPayload[];
}

export interface SaaSSnapshot {
  services: ServiceOffering[];
  updatedAt: string;
  source: SaaSSource;
}
