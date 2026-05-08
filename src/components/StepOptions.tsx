import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Package, RotateCcw } from 'lucide-react';

interface StepOptionsProps {
  region: string;
  setRegion: (value: string) => void;
  canVisit: boolean | null;
  onCheckRegion: () => void;
  onRestart: () => void;
}

export const StepOptions: React.FC<StepOptionsProps> = ({
  region,
  setRegion,
  canVisit,
  onCheckRegion,
  onRestart
}) => {
  return (
    <motion.div key="options" className="max-w-3xl mx-auto space-y-12 py-10">
      <div className="text-center">
        <h2 className="text-4xl font-black mb-4 text-slate-900 leading-tight">거의 다 왔습니다!</h2>
        <p className="text-slate-500 text-lg">어떤 방식으로 구매와 조립을 도와드릴까요?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-8 rounded-[2rem] bg-white border-2 border-primary border-dashed flex flex-col gap-6">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
            <MapPin size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black mb-2">출장 조립/업그레이드</h3>
            <p className="text-xs text-slate-500 mb-6">전문 기사가 직접 방문하여 부품을 교체하고 최적화해 드립니다.</p>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="지역을 입력해 주세요 (예: 서울 강남구)" 
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
              />
              <button 
                onClick={onCheckRegion}
                className="w-full py-3 bg-primary text-white rounded-xl font-bold text-sm"
              >
                서비스 가능 지역 확인
              </button>
            </div>
            {canVisit !== null && (
              <div className={`mt-4 p-4 rounded-xl text-xs font-bold ${canVisit ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                {canVisit ? '✓ 해당 지역은 기사님 방문이 가능합니다!' : '✗ 죄송합니다. 해당 지역은 현재 택배 수령만 가능합니다.'}
              </div>
            )}
          </div>
        </div>

        <div className="p-8 rounded-[2rem] bg-white border-2 border-slate-100 flex flex-col gap-6 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center">
            <Package size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black mb-2">부품 택배 수령 (DIY)</h3>
            <p className="text-xs text-slate-500 mb-6">최저가 부품들을 집으로 보내드립니다. 직접 조립하실 분들께 추천합니다.</p>
            <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm">
              최저가 부품 구매 대행 신청
            </button>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button 
          onClick={onRestart}
          className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors font-bold text-sm"
        >
          <RotateCcw size={16} /> 처음부터 다시 하기
        </button>
      </div>
    </motion.div>
  );
};
