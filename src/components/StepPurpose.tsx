import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { UsageType } from '../types';
import { USAGE_LABELS } from '../constants';

interface StepPurposeProps {
  onSelect: (usage: UsageType) => void;
}

export const StepPurpose: React.FC<StepPurposeProps> = ({ onSelect }) => {
  return (
    <motion.div 
      key="purpose"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12"
    >
      <div className="text-center">
        <h2 className="text-4xl font-black mb-4 text-slate-900 leading-tight">어떤 작업이 더 빨라지길 원하시나요?</h2>
        <p className="text-slate-500 text-lg">가장 자주 하시는 작업에 맞춰 최적의 가성비 업그레이드 계획을 세워드립니다.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(Object.keys(USAGE_LABELS) as UsageType[]).map((u) => (
          <button
            key={u}
            onClick={() => onSelect(u)}
            className="p-8 rounded-3xl bg-white border-2 border-slate-100 hover:border-primary hover:bg-primary/5 transition-all text-left flex flex-col gap-4 group shadow-sm hover:shadow-xl"
          >
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-colors">
              <Zap size={24} />
            </div>
            <span className="font-bold text-lg text-slate-900">{USAGE_LABELS[u]}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
};
