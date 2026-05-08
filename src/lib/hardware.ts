import { HardwareInfo } from '../types';

export async function detectHardware(): Promise<HardwareInfo> {
  const info: HardwareInfo = {
    cpuModel: "알 수 없음",
    cpuCores: navigator.hardwareConcurrency || "알 수 없음",
    ramGB: (navigator as any).deviceMemory || "알 수 없음",
    ramClock: "알 수 없음",
    ramType: "알 수 없음",
    gpu: "알 수 없음",
    resolution: `${window.screen.width} x ${window.screen.height}`,
    monitorHz: "알 수 없음"
  };

  try {
    const canvas = document.createElement('canvas');
    const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext;
    if (gl) {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        info.gpu = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      }
    }
  } catch (e) {
    console.warn("GPU 감지 실패", e);
  }

  // 매핑 로직 간단 예시
  if (info.gpu.includes("NVIDIA")) {
     const match = info.gpu.match(/(RTX\s?\d{4}|GTX\s?\d{3,4})/i);
     if (match) info.gpu = match[0];
  } else if (info.gpu.includes("AMD")) {
     const match = info.gpu.match(/(RX\s?\d{4})/i);
     if (match) info.gpu = match[0];
  }

  return info;
}
