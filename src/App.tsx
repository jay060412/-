import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';
import { detectHardware } from './lib/hardware';
import { HardwareInfo, UsageType, Step } from './types';

// Import components
import { StepIntro } from './components/StepIntro';
import { StepServiceType } from './components/StepServiceType';
import { StepPurpose } from './components/StepPurpose';
import { StepEnvCheck } from './components/StepEnvCheck';
import { StepDetection } from './components/StepDetection';
import { StepRefine } from './components/StepRefine';
import { StepAnalysis } from './components/StepAnalysis';
import { StepResult } from './components/StepResult';
import { StepOptions } from './components/StepOptions';

export default function App() {
  const [step, setStep] = useState<Step>('intro');
  const [hw, setHw] = useState<HardwareInfo | null>(null);
  const [tempHw, setTempHw] = useState<HardwareInfo>({
    cpuModel: '',
    cpuCores: '',
    ramGB: '',
    ramClock: '',
    ramType: '',
    gpu: '',
    resolution: '',
    monitorHz: ''
  });
  const [isEditingDetected, setIsEditingDetected] = useState(false);
  const [selectedUsage, setSelectedUsage] = useState<UsageType | null>(null);
  const [serviceType, setServiceType] = useState<'upgrade' | 'new' | null>(null);
  const [budgetIndex, setBudgetIndex] = useState<number | null>(null);
  const [isCurrentPC, setIsCurrentPC] = useState<boolean | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [region, setRegion] = useState('');
  const [canVisit, setCanVisit] = useState<boolean | null>(null);

  const startDiagnosis = () => {
    setStep('service_type');
  };

  const handleUsageSelect = (usage: UsageType) => {
    setSelectedUsage(usage);
    if (serviceType === 'new') {
      let index = 1;
      if (usage === 'office') index = 0;
      if (['gaming_aaa', 'video_editing', '3d_work'].includes(usage)) index = 2;
      if (['ai_ml', 'streaming'].includes(usage)) index = 3;
      
      setBudgetIndex(index);
      setStep('analysis');
      setTimeout(() => setStep('result'), 2000);
    } else {
      setStep('env_check');
    }
  };

  const handleServiceTypeSelect = (type: 'upgrade' | 'new') => {
    setServiceType(type);
    setStep('purpose');
  };

  const handleBudgetSelect = (index: number | null, skipLoading = false) => {
    setBudgetIndex(index);
    if (skipLoading) return;
    
    setStep('analysis');
    setTimeout(() => setStep('result'), 2000);
  };

  const handleEnvCheck = async (isThisPC: boolean) => {
    setIsCurrentPC(isThisPC);
    if (isThisPC) {
      setStep('detection');
      setIsDetecting(true);
      const info = await detectHardware();
      setTimeout(() => {
        setHw(info);
        setTempHw({
          ...info,
          cpuModel: '', 
          ramClock: '',
          ramType: '',
          resolution: '',
          monitorHz: ''
        });
        setIsDetecting(false);
        setStep('refine');
      }, 1500);
    } else {
      setHw(null);
      setTempHw({
        cpuModel: '',
        cpuCores: '',
        ramGB: '',
        ramClock: '',
        ramType: '',
        gpu: '',
        resolution: '',
        monitorHz: ''
      });
      setIsEditingDetected(true);
      setStep('refine');
    }
  };

  const handleRefineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempHw.cpuModel && tempHw.ramClock && tempHw.ramType) {
      setHw(tempHw);
      setStep('analysis');
      setTimeout(() => setStep('result'), 2000);
    }
  };

  const checkRegion = () => {
    const possible = ['서울', '경기', '인천', '부산'].some(r => region.includes(r));
    setCanVisit(possible);
    setStep('options');
  };

  const handleRestart = () => {
    setStep('intro');
    setServiceType(null);
    setSelectedUsage(null);
    setBudgetIndex(null);
    setRegion('');
    setCanVisit(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-primary/30">
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <div className="w-8 h-8 flex items-center justify-center overflow-hidden rounded-lg">
              <img src="/logo.png" alt="컴닥터 로고" className="w-full h-full object-contain" />
            </div>
            <span>컴닥터</span>
          </div>
          <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
            MVP Prototype v0.1
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {step === 'intro' && <StepIntro onStart={startDiagnosis} />}
          
          {step === 'purpose' && <StepPurpose onSelect={handleUsageSelect} />}

          {step === 'service_type' && <StepServiceType onSelect={handleServiceTypeSelect} />}

          {step === 'env_check' && <StepEnvCheck onCheck={handleEnvCheck} />}

          {step === 'detection' && <StepDetection />}

          {step === 'refine' && (
            <StepRefine 
              isCurrentPC={isCurrentPC}
              tempHw={tempHw}
              setTempHw={setTempHw}
              isEditingDetected={isEditingDetected}
              setIsEditingDetected={setIsEditingDetected}
              onSubmit={handleRefineSubmit}
              onCancel={() => setStep('intro')}
            />
          )}

          {step === 'analysis' && <StepAnalysis />}

          {step === 'result' && (
            <StepResult 
              serviceType={serviceType}
              budgetIndex={budgetIndex}
              selectedUsage={selectedUsage}
              onBudgetSelect={handleBudgetSelect}
              onNextStep={() => setStep('options')}
            />
          )}

          {step === 'options' && (
            <StepOptions 
              region={region}
              setRegion={setRegion}
              canVisit={canVisit}
              onCheckRegion={checkRegion}
              onRestart={handleRestart}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
