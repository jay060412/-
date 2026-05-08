import React from 'react';
import { motion } from 'framer-motion';

export const StepDetection: React.FC = () => {
  return (
    <motion.div 
      key="detection"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-12 py-12"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 text-slate-900">하드웨어 정보 분석 중...</h2>
        <div className="w-64 h-1 bg-slate-200 mx-auto rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5 }}
          />
        </div>
      </div>
    </motion.div>
  );
};
