import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, CheckCircle2, ArrowRight, ChevronRight } from 'lucide-react';

interface StepEnvCheckProps {
  onCheck: (isThisPC: boolean) => void;
}

export const StepEnvCheck: React.FC<StepEnvCheckProps> = ({ onCheck }) => {
  return (
    <motion.div 
      key="env_check"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto space-y-12 py-12"
    >
      <div className="text-center">
        <div className="inline-flex p-3 rounded-2xl bg-amber-50 text-amber-600 mb-6 border border-amber-100">
          <Monitor size={32} />
        </div>
        <h2 className="text-4xl font-black mb-4 text-slate-900">지금 이 컴퓨터를 <br/> 진단하시나요?</h2>
        <p className="text-slate-500 text-lg">진단 방식에 따라 분석 정확도가 달라질 수 있습니다.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <button
          onClick={() => onCheck(true)}
          className="p-8 rounded-3xl bg-white border-2 border-slate-100 hover:border-primary hover:bg-primary/5 transition-all text-left flex items-center justify-between group shadow-sm"
        >
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">네, 지금 이 컴퓨터입니다</h3>
              <p className="text-sm text-slate-500">하드웨어 정보 자동 감지 기능을 활성화합니다.</p>
            </div>
          </div>
          <ChevronRight className="text-slate-300 group-hover:translate-x-1 transition-transform" />
        </button>
        <button
          onClick={() => onCheck(false)}
          className="p-8 rounded-3xl bg-white border-2 border-slate-100 hover:border-primary hover:bg-primary/5 transition-all text-left flex items-center justify-between group shadow-sm"
        >
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary">
              <ArrowRight size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">아니요, 다른 컴퓨터입니다</h3>
              <p className="text-sm text-slate-500">사양 정보를 직접 수동으로 입력하겠습니다.</p>
            </div>
          </div>
          <ChevronRight className="text-slate-300 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};
