import { BenchmarkItem } from '../types';

export const CPU_BENCHMARKS: BenchmarkItem[] = [
  { name: 'Core i9-14900K', category: 'CPU', brand: 'Intel', score: 100, price: 820000 },
  { name: 'Ryzen 9 7950X3D', category: 'CPU', brand: 'AMD', score: 98, price: 950000 },
  { name: 'Core i7-14700K', category: 'CPU', brand: 'Intel', score: 88, price: 580000 },
  { name: 'Ryzen 7 7800X3D', category: 'CPU', brand: 'AMD', score: 95, price: 580000 },
  { name: 'Core i5-14600K', category: 'CPU', brand: 'Intel', score: 75, price: 420000 },
  { name: 'Ryzen 5 7500F', category: 'CPU', brand: 'AMD', score: 68, price: 210000 },
  { name: 'Ryzen 5 7600', category: 'CPU', brand: 'AMD', score: 70, price: 260000 },
  { name: 'Core i5-13400F', category: 'CPU', brand: 'Intel', score: 60, price: 240000 },
  { name: 'Ryzen 5 5600', category: 'CPU', brand: 'AMD', score: 50, price: 140000 },
  { name: 'Core i3-12100F', category: 'CPU', brand: 'Intel', score: 35, price: 110000 },
];

export const GPU_BENCHMARKS: BenchmarkItem[] = [
  { name: 'RTX 4090', category: 'GPU', brand: 'NVIDIA', score: 100, price: 2800000 },
  { name: 'RTX 4080 Super', category: 'GPU', brand: 'NVIDIA', score: 85, price: 1550000 },
  { name: 'RTX 4070 Ti Super', category: 'GPU', brand: 'NVIDIA', score: 72, price: 1150000 },
  { name: 'RTX 4070 Super', category: 'GPU', brand: 'NVIDIA', score: 65, price: 890000 },
  { name: 'RTX 4060 Ti', category: 'GPU', brand: 'NVIDIA', score: 48, price: 550000 },
  { name: 'RTX 4060', category: 'GPU', brand: 'NVIDIA', score: 38, price: 420000 },
  { name: 'RTX 3060', category: 'GPU', brand: 'NVIDIA', score: 30, price: 380000 },
  { name: 'RX 7800 XT', category: 'GPU', brand: 'AMD', score: 62, price: 750000 },
  { name: 'RX 7600', category: 'GPU', brand: 'AMD', score: 35, price: 390000 },
];
