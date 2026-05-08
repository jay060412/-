import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Zap } from 'lucide-react';

interface StepIntroProps {
  onStart: () => void;
}

export const StepIntro: React.FC<StepIntroProps> = ({ onStart }) => {
  return (
    <motion.div 
      key="intro"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center py-20"
    >
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-slate-900 leading-tight">
        내 PC를 위한 <br /> <span className="text-primary italic">최적의 업그레이드</span>
      </h1>
      <p className="text-slate-500 text-lg md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed">
        전문 AI 컨설턴트가 당신의 하드웨어를 정밀 분석하여, <br />
        불필요한 지출 없이 <b>꼭 필요한 부품만</b> 처방해 드립니다.
      </p>
      <div className="flex flex-col items-center gap-6">
        <button 
          onClick={onStart}
          id="btn-start"
          className="group relative px-10 py-5 bg-primary text-white rounded-3xl font-black text-xl overflow-hidden transition-all hover:ring-8 hover:ring-primary/10 active:scale-95 shadow-2xl shadow-primary/30"
        >
          <span className="relative z-10 flex items-center gap-3">
            <CheckCircle2 size={24} /> 맞춤형 업그레이드 진단 시작 <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
        <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
          <Zap size={14} className="text-amber-500 fill-amber-500" /> 분석 소요 시간: 약 5분
        </div>
      </div>
    </motion.div>
  );
};
