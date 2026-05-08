import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";
import { CPU_BENCHMARKS, GPU_BENCHMARKS } from "../lib/benchmarkData";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function askExpert(messages: ChatMessage[], context: string) {
  try {
    const hwContext = `
참고 하드웨어 데이터:
CPU: ${CPU_BENCHMARKS.map(c => `${c.name}(점수:${c.score}, 가격:${c.price})`).join(', ')}
GPU: ${GPU_BENCHMARKS.map(g => `${g.name}(점수:${g.score}, 가격:${g.price})`).join(', ')}
`;

    const systemInstruction = `당신은 PC 하드웨어 전문가입니다. 사용자의 질문에 전문적이고 친절하게 답변해 주세요.
하드웨어 사양 추천 시 성능 점수(score)와 가격(price) 정보를 참고하여 합리적인 선택을 도와주세요.
성능 점수는 0-100 사이이며 100에 가까울수록 좋습니다. 가격은 한국 원(KRW) 기준입니다.

현재 사용자의 상황: ${context}
${hwContext}

답변은 한국어로 해주세요.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: messages.map(m => ({
        role: m.role === 'assistant' ? 'model' : m.role,
        parts: [{ text: m.content }]
      })),
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("AI Error:", error);
    return "죄송합니다. 인공지능 상담 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.";
  }
}
