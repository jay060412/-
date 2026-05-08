import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Package } from 'lucide-react';

interface StepServiceTypeProps {
  onSelect: (type: 'upgrade' | 'new') => void;
}

export const StepServiceType: React.FC<StepServiceTypeProps> = ({ onSelect }) => {
  return (
    <motion.div 
      key="service_type"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-3xl mx-auto space-y-12 py-10"
    >
      <div className="text-center">
        <h2 className="text-4xl font-black mb-4 text-slate-900 italic uppercase">Choose Your Path</h2>
        <p className="text-slate-500 text-lg">기존 컴퓨터를 고쳐 쓸까요, 아니면 새로 장만할까요?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => onSelect('upgrade')}
          className="p-10 rounded-[2.5rem] bg-white border-2 border-slate-100 hover:border-primary transition-all text-left group shadow-sm hover:shadow-2xl flex flex-col gap-6"
        >
          <div className="w-16 h-16 rounded-3xl bg-primary/10 text-primary flex items-center justify-center ring-4 ring-primary/5">
            <RefreshCw size={32} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">기존 PC 업그레이드</h3>
            <p className="text-slate-500 leading-relaxed text-sm">최소 비용으로 최대 효과를! <br />병목 현상이 발생하는 핵심 부품만 교체 처방합니다.</p>
          </div>
        </button>
        <button
          onClick={() => onSelect('new')}
          className="p-10 rounded-[2.5rem] bg-slate-900 border-2 border-slate-800 hover:border-primary transition-all text-left group shadow-2xl flex flex-col gap-6 text-white"
        >
          <div className="w-16 h-16 rounded-3xl bg-white/10 text-white flex items-center justify-center ring-4 ring-white/5">
            <Package size={32} />
          </div>
          <div>
            <h3 className="text-2xl font-black mb-2 italic">신규 PC 구매 조립</h3>
            <p className="text-slate-400 leading-relaxed text-sm">처음부터 끝까지 완벽하게! <br />당신의 목적에 100% 최적화된 새로운 견적을 제안합니다.</p>
          </div>
        </button>
      </div>
    </motion.div>
  );
};
