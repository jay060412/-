import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Database, Monitor, Zap, Wrench, CheckCircle2, ArrowRight, Search, AlertCircle } from 'lucide-react';
import { HardwareInfo } from '../types';
import { RESOLUTIONS, REFRESH_RATES, HARDWARE_GUIDES } from '../constants';

interface StepRefineProps {
  isCurrentPC: boolean | null;
  tempHw: HardwareInfo;
  setTempHw: React.Dispatch<React.SetStateAction<HardwareInfo>>;
  isEditingDetected: boolean;
  setIsEditingDetected: (value: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export const StepRefine: React.FC<StepRefineProps> = ({
  isCurrentPC,
  tempHw,
  setTempHw,
  isEditingDetected,
  setIsEditingDetected,
  onSubmit,
  onCancel
}) => {
  const isInfoComplete = tempHw.cpuModel && tempHw.ramClock && tempHw.ramType && tempHw.resolution;

  return (
    <motion.div 
      key="refine"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h2 className="text-4xl font-black mb-2 tracking-tight">
          {!isCurrentPC ? "사양 정보 직접 입력" : "정확한 업그레이드 진단을 위해"}
        </h2>
        <p className="text-slate-500">
          {!isCurrentPC 
            ? "분석할 PC의 사양을 입력해 주세요. 우측 가이드를 참고하면 복사가 가능합니다." 
            : "감지된 정보를 확인하고, 부족한 모델명을 입력해 주시면 최적의 업그레이드 조합을 찾아드립니다."}
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-8">
            {/* CPU 섹션 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b">
                <div className="flex items-center gap-2">
                  <Cpu className="text-primary" size={20} />
                  <h3 className="font-bold text-lg">CPU 정보</h3>
                </div>
                <button 
                  onClick={() => setIsEditingDetected(!isEditingDetected)}
                  className="text-xs font-bold text-primary flex items-center gap-1 hover:underline"
                >
                  <Wrench size={12} /> {isEditingDetected ? "수정 완료" : "감지 정보 수정"}
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-primary uppercase flex items-center gap-1">
                    상세 모델명 <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  </label>
                  <input 
                    type="text" 
                    required
                    value={tempHw.cpuModel}
                    onChange={(e) => setTempHw({ ...tempHw, cpuModel: e.target.value })}
                    placeholder="예: Intel i5-12400"
                    className="w-full bg-primary/5 border-2 border-primary/20 rounded-xl px-4 py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-slate-400 font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">감지된 코어 수</label>
                  <div className="relative group">
                    <input 
                      type="text"
                      disabled={!isEditingDetected}
                      value={tempHw.cpuCores}
                      onChange={(e) => setTempHw({ ...tempHw, cpuCores: e.target.value })}
                      className={`w-full border rounded-xl px-4 py-4 font-medium transition-all ${
                        isEditingDetected 
                          ? "bg-white border-primary border-2 text-slate-900" 
                          : "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
                      }`}
                    />
                    {!isEditingDetected && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <CheckCircle2 size={16} className="text-emerald-500" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* RAM 섹션 */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b">
                <Database className="text-primary" size={20} />
                <h3 className="font-bold text-lg">메모리 상세 정보</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">총 용량</label>
                  <div className="relative">
                    <input 
                      type="text"
                      disabled={!isEditingDetected}
                      value={tempHw.ramGB}
                      onChange={(e) => setTempHw({ ...tempHw, ramGB: e.target.value })}
                      className={`w-full border rounded-xl px-4 py-4 font-medium transition-all ${
                        isEditingDetected 
                          ? "bg-white border-primary border-2 text-slate-900" 
                          : "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
                      }`}
                    />
                    {!isEditingDetected && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <CheckCircle2 size={16} className="text-emerald-500" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-primary uppercase flex items-center gap-1">
                    속도 (MT/s) <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  </label>
                  <input 
                    type="text" 
                    required
                    value={tempHw.ramClock}
                    onChange={(e) => setTempHw({ ...tempHw, ramClock: e.target.value })}
                    placeholder="예: 3200"
                    className="w-full bg-primary/5 border-2 border-primary/20 rounded-xl px-4 py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-slate-400 font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-primary uppercase flex items-center gap-1">
                    DDR 타입 <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  </label>
                  <select 
                    required
                    value={tempHw.ramType}
                    onChange={(e) => setTempHw({ ...tempHw, ramType: e.target.value })}
                    className="w-full bg-primary/5 border-2 border-primary/20 rounded-xl px-4 py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold scrollbar-hide appearance-none"
                  >
                    <option value="">선택</option>
                    <option value="DDR3">DDR3</option>
                    <option value="DDR4">DDR4</option>
                    <option value="DDR5">DDR5</option>
                    <option value="Other">기타</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 모니터 섹션 */}
            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-center justify-between pb-2">
                <div className="flex items-center gap-2">
                  <Monitor className="text-primary" size={20} />
                  <h3 className="font-bold text-lg">사용할 모니터 정보</h3>
                </div>
                <button 
                  onClick={() => setTempHw({ ...tempHw, resolution: "잘 모르겠음", monitorHz: "잘 모르겠음" })}
                  className="text-xs text-slate-400 hover:text-slate-600 transition-colors bg-slate-50 px-3 py-1 rounded-full border border-slate-200"
                >
                  잘 모르겠음
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-primary uppercase flex items-center gap-1">
                    목표 해상도 <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  </label>
                  <div className="relative">
                    <select 
                      required
                      value={tempHw.resolution}
                      onChange={(e) => setTempHw({ ...tempHw, resolution: e.target.value })}
                      className="w-full bg-primary/5 border-2 border-primary/20 rounded-xl px-4 py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold appearance-none"
                    >
                      <option value="">해상도 선택</option>
                      {RESOLUTIONS.map(res => (
                        <option key={res} value={res}>{res}</option>
                      ))}
                      <option value="잘 모르겠음">잘 모르겠음</option>
                    </select>
                    {tempHw.resolution === "기타 (직접 입력)" && (
                      <input 
                        type="text"
                        placeholder="예: 5120 x 1440"
                        onChange={(e) => setTempHw({ ...tempHw, resolution: e.target.value })}
                        className="mt-2 w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none"
                      />
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
                    주사율 (Hz)
                  </label>
                  <select 
                    value={tempHw.monitorHz}
                    onChange={(e) => setTempHw({ ...tempHw, monitorHz: e.target.value })}
                    className="w-full bg-slate-50 border-2 border-primary/20 rounded-xl px-4 py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold appearance-none"
                  >
                    <option value="">주사율 선택 (선택사항)</option>
                    {REFRESH_RATES.map(hz => (
                      <option key={hz} value={hz}>{hz}</option>
                    ))}
                    <option value="잘 모르겠음">잘 모르겠음</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 그래픽카드 */}
            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-2">
                  <Zap className="text-primary" size={20} />
                  <h3 className="font-bold text-lg text-slate-800">기존 그래픽카드 (GPU)</h3>
                </div>
              </div>
              <input 
                type="text" 
                value={tempHw.gpu}
                onChange={(e) => setTempHw({ ...tempHw, gpu: e.target.value })}
                placeholder="예: RTX 3060 (모르면 비워두세요)"
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-4 focus:border-primary outline-none text-sm transition-all"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={onCancel}
              className="px-8 py-4 rounded-full font-bold text-slate-400 hover:bg-slate-100 transition-all"
            >
              취소
            </button>
            <button 
              disabled={!isInfoComplete}
              onClick={onSubmit}
              className={`flex-1 px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-xl ${
                isInfoComplete 
                  ? 'bg-slate-900 text-white hover:bg-slate-800 ring-4 ring-primary/10' 
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              }`}
            >
              진단 리포트 생성하기 <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden ring-1 ring-white/10">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <Search size={150} />
            </div>
            <h3 className="font-bold flex items-center gap-2 mb-6 text-primary relative z-10 text-lg">
              <AlertCircle size={22} /> Windows 확인 가이드
            </h3>
            <div className="space-y-8 relative z-10">
              {Object.values(HARDWARE_GUIDES).map((guide, idx) => (
                <div key={idx} className="space-y-3 p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-primary/30 transition-colors">
                  <div className="text-sm font-bold text-slate-200 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-primary/20 text-primary text-xs flex items-center justify-center border border-primary/30 font-mono">
                      {idx + 1}
                    </div>
                    {guide.title}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed pl-1">{guide.desc}</p>
                  <div className="pl-1">
                    <div className="px-2 py-1.5 bg-white/5 rounded-md text-[10px] text-primary/80 font-mono italic inline-block border border-white/10">
                      {guide.example}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 bg-blue-50 border border-blue-100 rounded-3xl text-xs text-blue-700 space-y-3">
            <div className="font-bold flex items-center gap-2 text-sm">
              <CheckCircle2 size={16} /> 팁
            </div>
            <p className="leading-relaxed">
              자동 감지 정보가 정확하지 않다면 상단의 <b>'감지 정보 수정'</b> 버튼을 눌러 직접 변경할 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
