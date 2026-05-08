import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

export const StepAnalysis: React.FC = () => {
  return (
    <motion.div 
      key="analysis"
      className="flex flex-col items-center justify-center py-20 gap-8"
    >
      <RefreshCw className="animate-spin text-primary" size={48} />
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2 text-slate-900">전문 알고리즘 분석 중...</h3>
        <p className="text-slate-500">병목 현상 및 호환성을 체크하고 있습니다.</p>
      </div>
    </motion.div>
  );
};
