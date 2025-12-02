// Service IDs for the 5 AI tools
export type ServiceID =
  | 'tema360'
  | 'raioxLanding'
  | 'brandSnapshot'
  | 'landingBlueprint'
  | 'qrCode';

// Form field definition
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'url' | 'select' | 'email';
  required: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  description?: string;
}

// Service definition
export interface AIServiceDefinition {
  id: ServiceID;
  name: string; // Display name (e.g., "Tema 360" - no "IA" suffix)
  priceBRL: number; // Price in cents
  shortDescription: string;
  fullDescription: string;
  inputFields: FormField[];
  previewDescription: string;
  finalDeliverables: string[];
  supportsRounds?: boolean; // For Brand Snapshot and QR Code
  maxRounds?: number; // Max 2 for those that support rounds
}

// Preview responses

// Tema 360 Preview
export interface Tema360Preview {
  title: string;
  outline: string[];
  excerpt: string;
}

// Raio-X Landing Preview
export interface RaioxLandingPreview {
  mainIssues: string[];
  suggestedHero: {
    headline: string;
    subheadline: string;
    cta: string;
  };
}

// Brand Snapshot Preview (with rounds)
export interface BrandSnapshotOption {
  id: string;
  logoUrl: string;
  palette: string[];
}

export interface BrandSnapshotPreview {
  round: 1 | 2;
  options: BrandSnapshotOption[];
}

// Landing Blueprint Preview
export interface LandingBlueprintPreview {
  sections: string[];
  hero: {
    headline: string;
    subheadline: string;
    cta: string;
  };
}

// QR Code Preview (with rounds)
export interface QRCodeOption {
  id: string;
  imageUrl: string;
}

export interface QRCodePreview {
  round: 1 | 2;
  options: QRCodeOption[];
}

// Final deliveries

export interface Tema360Final {
  article: string; // Markdown content
  socialPosts: string[];
  hooks: string[];
  titleVariations: string[];
  downloadUrl: string;
}

export interface RaioxLandingFinal {
  analysisBySection: { section: string; feedback: string }[];
  recommendations: string[];
  heroVariations: Array<{
    headline: string;
    subheadline: string;
    cta: string;
  }>;
  downloadUrl: string;
}

export interface BrandSnapshotFinal {
  logoUrls: {
    png512: string;
    png1024: string;
    png2048: string;
    svg?: string;
  };
  palette: {
    primary: string;
    secondary: string;
    accent: string;
    neutral: string[];
  };
  fonts: {
    heading: string;
    body: string;
  };
  mockups: string[];
  downloadUrl: string;
}

export interface LandingBlueprintFinal {
  structure: string; // Markdown
  copySections: { section: string; content: string }[];
  layoutSuggestions: string;
  htmlSnippet?: string;
  downloadUrl: string;
}

export interface QRCodeFinal {
  qrUrls: {
    png512: string;
    png1024: string;
    png2048: string;
  };
  usageSuggestions: string;
  downloadUrl: string;
}

// API request/response types

// Input data type for form submissions
export type ServiceInputData = Record<string, string | number | boolean | undefined>;

export interface PreviewRequest {
  serviceId: ServiceID;
  inputs: ServiceInputData;
  round?: 1 | 2;
  feedback?: string;
  previousOptions?: string[]; // For rounds 2
}

export interface PreviewResponse<T> {
  success: boolean;
  preview?: T;
  error?: string;
}

export interface FinalRequest {
  serviceId: ServiceID;
  inputs: ServiceInputData;
  selectedOptionId?: string; // For services with rounds
  paymentIntentId: string; // Stripe payment ID
}

export interface FinalResponse<T> {
  success: boolean;
  delivery?: T;
  error?: string;
}

// Stripe checkout session
export interface CheckoutSessionRequest {
  serviceId: ServiceID;
  inputs: ServiceInputData;
  selectedOptionId?: string;
}

export interface CheckoutSessionResponse {
  success: boolean;
  checkoutUrl?: string;
  sessionId?: string;
  error?: string;
}
