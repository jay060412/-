import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ArrowDown, ArrowUp, ArrowRight, MessageSquare, Send, User, Bot, Loader2, Sparkles } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Recommendation, NewPCRecommendation, UsageType, ChatMessage } from '../types';
import { BUDGET_OPTIONS, NEW_PC_REC, MOCK_REC, USAGE_LABELS } from '../constants';
import { askExpert } from '../services/geminiService';

interface StepResultProps {
  serviceType: 'upgrade' | 'new' | null;
  budgetIndex: number | null;
  selectedUsage: UsageType | null;
  onBudgetSelect: (index: number | null, skipLoading: boolean) => void;
  onNextStep: () => void;
}

export const StepResult: React.FC<StepResultProps> = ({
  serviceType,
  budgetIndex,
  selectedUsage,
  onBudgetSelect,
  onNextStep
}) => {
  const [activeTab, setActiveTab] = useState<'report' | 'ai'>('report');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const radarData = [
    { subject: 'CPU', A: 45, fullMark: 100 },
    { subject: 'GPU', A: 30, fullMark: 100 },
    { subject: 'RAM', A: 60, fullMark: 100 },
    { subject: 'STORAGE', A: 50, fullMark: 100 },
    { subject: 'DISPLAY', A: 70, fullMark: 100 },
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isTyping) return;

    const userMsg: ChatMessage = { role: 'user', content: inputMessage };
    setChatMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    const context = `용도: ${selectedUsage ? USAGE_LABELS[selectedUsage] : '미지정'}, 서비스: ${serviceType === 'new' ? '신규 견적' : '업그레이드'}, 선택 예산: ${budgetIndex !== null ? BUDGET_OPTIONS[budgetIndex].range : '미지정'}`;
    
    const response = await askExpert([...chatMessages, userMsg], context);
    
    setChatMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsTyping(false);
  };

  return (
    <motion.div key="result" className="space-y-8">
      {/* Tab Navigation */}
      <div className="flex bg-slate-100 p-1.5 rounded-2xl w-fit mx-auto">
        <button
          onClick={() => setActiveTab('report')}
          className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'report' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Zap size={16} /> 분석 리포트
        </button>
        <button
          onClick={() => setActiveTab('ai')}
          className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'ai' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <MessageSquare size={16} /> AI 전문가 상담
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'report' ? (
          <motion.div
            key="tab-report"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-2 space-y-8">
              <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-slate-900">
                  <Zap className="text-amber-500" /> {serviceType === 'new' ? '신규 PC 추천 견적 리포트' : '맞춤 업그레이드 진단 리포트'}
                </h3>
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="w-full md:w-1/2 h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                        <PolarGrid stroke="#e2e8f0" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                        <Radar
                          name="Current"
                          dataKey="A"
                          stroke="#7189FF"
                          fill="#7189FF"
                          fillOpacity={0.6}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100">
                      <div className="text-sm font-bold text-amber-700 mb-1">핵심 병목 구간</div>
                      <div className="text-lg font-black text-slate-900">그래픽카드(GPU) 성능 부족</div>
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                        현재 시스템에서 그래픽카드가 CPU의 처리 속도를 따라가지 못하고 있습니다. 
                        이로 인해 게임 시 간헐적 끊김 현상이 발생하며, 업그레이드 1순위 부품입니다.
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                      <div className="text-sm font-bold text-emerald-700 mb-1">양호한 부품</div>
                      <div className="text-lg font-black text-slate-900">메모리(RAM) 용량 충분</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-xl font-bold flex items-center gap-2 text-slate-900">
                     {serviceType === 'new' ? '추천 신규 견적 플랜' : '추천 업그레이드 플랜'}
                  </h4>
                  {selectedUsage && (
                    <span className="px-4 py-1.5 bg-slate-900 text-white rounded-full text-xs font-bold tracking-tight">
                      {USAGE_LABELS[selectedUsage]} 전용
                    </span>
                  )}
                </div>

                {serviceType === 'new' && budgetIndex !== null && (
                  <div className="p-6 rounded-[2rem] bg-slate-50 border-2 border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl border border-slate-100">
                        {BUDGET_OPTIONS[budgetIndex].icon}
                      </div>
                      <div>
                        <div className="text-sm text-slate-400 font-bold uppercase tracking-wider">{BUDGET_OPTIONS[budgetIndex].label}</div>
                        <div className="text-xl font-black text-slate-900">{BUDGET_OPTIONS[budgetIndex].range}</div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button
                        disabled={budgetIndex === 0}
                        onClick={() => onBudgetSelect(budgetIndex - 1, true)}
                        className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 text-sm font-bold hover:bg-slate-50 transition-all disabled:opacity-30 flex items-center gap-2"
                      >
                        <ArrowDown size={14} /> 가격 낮추기
                      </button>
                      <button
                        disabled={budgetIndex === BUDGET_OPTIONS.length - 1}
                        onClick={() => onBudgetSelect(budgetIndex + 1, true)}
                        className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-all disabled:opacity-30 flex items-center gap-2"
                      >
                        <ArrowUp size={14} /> 성능 높이기
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-4">
                  {serviceType === 'new' ? (
                    budgetIndex !== null ? (
                      <div className="p-8 rounded-3xl bg-white border-2 border-primary/20 shadow-xl space-y-6">
                        <div className="flex justify-between items-center">
                          <h5 className="text-2xl font-black text-slate-900">{NEW_PC_REC[budgetIndex].desc}</h5>
                          <div className="text-2xl font-black text-primary">약 {NEW_PC_REC[budgetIndex].total.toLocaleString()}원</div>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                          {NEW_PC_REC[budgetIndex].parts.map(p => (
                            <div key={p.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-xs text-primary">
                                  {p.category}
                                </div>
                                <span className="font-bold text-slate-900">{p.name}</span>
                              </div>
                              <div className="text-sm font-mono text-slate-400">{p.price.toLocaleString()}원</div>
                            </div>
                          ))}
                        </div>
                        <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                          <p className="text-sm text-slate-500">※ 위 사양은 시장 수급 상황에 따라 변동될 수 있습니다.</p>
                          <button 
                            onClick={onNextStep}
                            className="px-10 py-4 bg-primary text-white rounded-2xl font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20"
                          >
                            이 견적으로 구매/조립 <ArrowRight className="inline ml-2" size={20} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-10 text-slate-400">예산 옵션을 선택해 주세요.</div>
                    )
                  ) : (
                    MOCK_REC.gaming_aaa.map((rec) => (
                      <div key={rec.tier} className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-primary/30 transition-colors shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                          <div className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-bold uppercase tracking-wider">
                            {rec.tier === 'minimal' ? '최소 비용' : rec.tier === 'value' ? '가성비 추천' : '끝판왕 성능'}
                          </div>
                          <div className="text-xl font-bold text-slate-900">약 {rec.estimatedTotal.toLocaleString()}원</div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex flex-wrap gap-2">
                            {rec.parts.map(p => (
                              <span key={p.id} className="px-3 py-1 bg-slate-100 rounded-lg text-sm font-medium text-slate-700">
                                {p.category}: {p.name}
                              </span>
                            ))}
                          </div>
                          <p className="text-slate-500 text-sm leading-relaxed">{rec.reason}</p>
                          <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                            <div className="text-sm text-slate-600">
                              <span className="text-emerald-600 font-bold">+{rec.expectedPerformanceGain}%</span> 성능 향상 예상
                            </div>
                            <button 
                              onClick={onNextStep}
                              className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/80 transition-colors shadow-md"
                            >
                              선택하기
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-xl">
                <h4 className="text-xl font-bold mb-4">전문가 한줄평</h4>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex-shrink-0" />
                    <p className="text-sm text-slate-300 leading-relaxed italic">
                      "현재 고객님의 CPU는 꽤 고성능이지만, GPU가 전세대 보급형 모델이라서 병목이 심합니다. 
                      RTX 4070급으로만 바꿔주셔도 완전히 다른 게임이 될 거예요."
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
                <h4 className="text-lg font-bold mb-4 text-slate-900">예상 퍼포먼스 변화</h4>
                <div className="space-y-6">
                  {[
                    { label: '배그 (QHD 울트라)', cur: 45, next: 120 },
                    { label: '로스트아크', cur: 80, next: 165 },
                    { label: '디아블로4', cur: 50, next: 110 },
                  ].map(item => (
                    <div key={item.label} className="space-y-2">
                      <div className="flex justify-between text-xs font-bold uppercase tracking-wide">
                        <span className="text-slate-500">{item.label}</span>
                        <span className="text-primary">{item.next} FPS</span>
                      </div>
                      <div className="h-2 bg-slate-50 rounded-full overflow-hidden flex gap-0.5">
                        <div className="h-full bg-slate-200" style={{ width: `${item.cur}%` }} />
                        <div className="h-full bg-primary" style={{ width: `${item.next - item.cur}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="tab-ai"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-3xl mx-auto h-[600px] flex flex-col bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden"
          >
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <Sparkles size={20} className="fill-white" />
                </div>
                <div>
                  <h3 className="font-bold">AI 전문 상담사</h3>
                  <p className="text-[10px] text-slate-400">당신의 견적에 대해 무엇이든 물어보세요</p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
              {chatMessages.length === 0 && (
                <div className="text-center py-10 space-y-4">
                  <div className="text-4xl">👋</div>
                  <p className="text-slate-500 font-medium whitespace-pre-wrap">
                    안녕하세요! 현재 견적에 대해 궁금한 점이 있으신가요?{"\n"}
                    부품 호환성이나 가성비, 혹은 게임 프레임에 대해 물어보세요.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {[
                      "이 견적의 가성비는 어떤가요?",
                      "RTX 4060으로 배그 프레임 얼마나 나올까요?",
                      "파워는 몇 W가 적당할까요?",
                      "CPU를 한 단계 낮춰도 괜찮을까요?"
                    ].map(hint => (
                      <button
                        key={hint}
                        onClick={() => setInputMessage(hint)}
                        className="px-4 py-2 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-600 hover:border-primary hover:text-primary transition-all shadow-sm"
                      >
                        {hint}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.role === 'user' ? 'bg-slate-200' : 'bg-primary/10 text-primary'
                    }`}>
                      {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                    </div>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-slate-900 text-white rounded-tr-none shadow-lg' 
                        : 'bg-white border border-slate-200 rounded-tl-none shadow-sm text-slate-800'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-3 items-center text-slate-400">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                      <Bot size={16} />
                    </div>
                    <Loader2 size={16} className="animate-spin" />
                    <span className="text-xs font-bold">생각하는 중...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="p-4 bg-white border-t border-slate-100">
              <div className="relative">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="메시지를 입력하세요..."
                  className="w-full pl-6 pr-14 py-4 bg-slate-100 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-primary/90 disabled:opacity-30 transition-all shadow-lg shadow-primary/20"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
