/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface HardwareInfo {
  cpuModel: string;
  cpuCores: number | string;
  ramGB: number | string;
  ramClock: string;
  ramType: string;
  gpu: string;
  resolution: string;
  monitorHz: string;
}

export type Step = 'intro' | 'purpose' | 'service_type' | 'env_check' | 'detection' | 'refine' | 'analysis' | 'result' | 'options';

export type UsageType = 
  | 'office'
  | 'gaming_online'
  | 'gaming_aaa'
  | 'video_editing'
  | '3d_work'
  | 'development'
  | 'ai_ml'
  | 'streaming';

export interface Component {
  id: string;
  name: string;
  category: string;
  score?: number; // 0-100 normalized score
  price: number; // estimate in KRW
}

export interface Recommendation {
  tier: 'minimal' | 'value' | 'high_perf';
  parts: Component[];
  reason: string;
  expectedPerformanceGain: number; // percentage
  estimatedTotal: number;
  warnings: string[];
}

export interface BenchmarkItem {
  name: string;
  category: 'CPU' | 'GPU';
  score: number;
  price: number;
  brand: 'Intel' | 'AMD' | 'NVIDIA';
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface NewPCRecommendation {
  range: string;
  desc: string;
  parts: Component[];
  total: number;
}
