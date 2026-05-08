import { Recommendation, UsageType, NewPCRecommendation } from './types';

export const USAGE_LABELS: Record<UsageType, string> = {
  office: '사무 및 문서 작업',
  gaming_online: '온라인 게임 (LoL/발로란트)',
  gaming_aaa: '스팀/고사양 게임 (배그/사이버펑크)',
  video_editing: '영상 편집 및 유튜브 제작',
  '3d_work': '3D 모델링 및 렌더링',
  development: '소프트웨어 개발',
  ai_ml: 'AI 딥러닝 및 데이터 분석',
  streaming: '실시간 방송 및 송출'
};

export const MOCK_REC: Record<UsageType, Recommendation[]> = {
  gaming_aaa: [
    {
      tier: 'minimal',
      parts: [{ id: 'u1', name: 'RTX 4060', category: 'GPU', score: 65, price: 420000 }],
      reason: '현재 CPU 성능은 충분하나 GPU가 최신 게임의 텍스트 부하를 견디지 못합니다. 그래픽카드 교체만으로도 체감 성능이 크게 향상됩니다.',
      expectedPerformanceGain: 40,
      estimatedTotal: 420000,
      warnings: ['파워 서플라이 500W 이상 권장']
    },
    {
      tier: 'value',
      parts: [
        { id: 'u2', name: 'RTX 4070 Super', category: 'GPU', score: 85, price: 890000 },
        { id: 'u3', name: '16GB DDR4 RAM (추가)', category: 'RAM', score: 70, price: 55000 }
      ],
      reason: 'QHD 해상도에서 원활한 플레이를 위한 가장 합리적인 선택입니다. 메모리 증설을 통해 스터터링을 방지할 수 있습니다.',
      expectedPerformanceGain: 85,
      estimatedTotal: 945000,
      warnings: ['케이스 길이 확인 필수', '650W 이상 파워 권장']
    },
    {
      tier: 'high_perf',
      parts: [
        { id: 'u4', name: 'RTX 4080 Super', category: 'GPU', score: 95, price: 1550000 },
        { id: 'u5', name: 'Ryzen 7800X3D', category: 'CPU', score: 98, price: 580000 }
      ],
      reason: '4K 게이밍의 끝판왕 조합입니다. 현존하는 모든 게임을 풀옵션으로 즐기기에 충분한 성능을 제공합니다.',
      expectedPerformanceGain: 180,
      estimatedTotal: 2130000,
      warnings: ['메인보드 소켓 호환성 확인', '수냉 쿨러 권장']
    }
  ],
  office: [],
  gaming_online: [],
  video_editing: [],
  '3d_work': [],
  development: [],
  ai_ml: [],
  streaming: []
};

export const NEW_PC_REC: NewPCRecommendation[] = [
  {
    range: "50-80만원",
    desc: "가성비 사무/가정용",
    parts: [
      { id: 'n1', name: 'Ryzen 4600G', category: 'CPU', price: 110000 },
      { id: 'n2', name: 'A520M 메인보드', category: 'MB', price: 80000 },
      { id: 'n3', name: '16GB DDR4 RAM', category: 'RAM', price: 50000 },
      { id: 'n4', name: '500GB NVMe SSD', category: 'SSD', price: 60000 },
      { id: 'n5', name: '500W 정격 파워', category: 'PSU', price: 45000 }
    ],
    total: 625000
  },
  {
    range: "100-150만원",
    desc: "FHD 게이밍 최강자",
    parts: [
      { id: 'n6', name: 'Ryzen 7500F', category: 'CPU', price: 210000 },
      { id: 'n7', name: 'RTX 4060 Ti', category: 'GPU', price: 550000 },
      { id: 'n8', name: 'B650M 메인보드', category: 'MB', price: 160000 },
      { id: 'n9', name: '32GB DDR5 RAM', category: 'RAM', price: 140000 },
      { id: 'n10', name: '1TB NVMe Gen4', category: 'SSD', price: 120000 }
    ],
    total: 1350000
  },
  {
    range: "150-250만원",
    desc: "QHD 하이엔드 게이밍",
    parts: [
      { id: 'n11', name: 'Core i7-14700K', category: 'CPU', price: 580000 },
      { id: 'n12', name: 'RTX 4070 Ti Super', category: 'GPU', price: 1150000 },
      { id: 'n13', name: 'Z790 메인보드', category: 'MB', price: 320000 },
      { id: 'n14', name: '32GB RGB RAM', category: 'RAM', price: 180000 },
      { id: 'n15', name: '2TB NVMe Gen4', category: 'SSD', price: 210000 }
    ],
    total: 2440000
  },
  {
    range: "300만원 이상",
    desc: "익스트림 4K 머신",
    parts: [
      { id: 'n16', name: 'Ryzen 7800X3D', category: 'CPU', price: 580000 },
      { id: 'n17', name: 'RTX 4090', category: 'GPU', price: 2800000 },
      { id: 'n18', name: 'X670E 메인보드', category: 'MB', price: 450000 },
      { id: 'n19', name: '64GB DDR5 RAM', category: 'RAM', price: 320000 },
      { id: 'n20', name: '4TB NVMe Gen5', category: 'SSD', price: 650000 }
    ],
    total: 4800000
  }
];

export const BUDGET_OPTIONS = [
  { range: "50-80만원", label: "엔트리(Entry)", desc: "사무용 문서 작업, 가벼운 온라인 게임(LoL, 발로란트)", icon: "🌱" },
  { range: "100-150만원", label: "메인스트림(Mainstream)", desc: "배그/스팀 게임 원활, FHD 게이밍, 입문용 영상 편집", icon: "💎" },
  { range: "150-250만원", label: "하이엔드(High-end)", desc: "QHD 게이밍, 전문 고화질 영상 편집 및 3D 작업", icon: "⚡" },
  { range: "300만원 이상", label: "익스트림(Extreme)", desc: "4K 환경 풀옵션, AI 딥러닝, 최고 성능 커스텀 PC", icon: "🔥" }
];

export const RESOLUTIONS = [
  "1920 x 1080 (FHD)",
  "2560 x 1440 (QHD)",
  "3840 x 2160 (4K UHD)",
  "5120 x 1440 (울트라와이드)",
  "기타 (직접 입력)"
];

export const REFRESH_RATES = [
  "60Hz",
  "75Hz",
  "144Hz",
  "165Hz",
  "240Hz",
  "기타"
];

export const HARDWARE_GUIDES = {
  cpu: {
    title: "CPU 모델 확인 (복사 가능)",
    desc: "윈도우 설정 > 시스템 > 정보 > [장치 사양]에서 '프로세서' 옆의 텍스트를 복사해 주세요.",
    example: "예: 13th Gen Intel(R) Core(TM) i7-13700K"
  },
  ramSpeed: {
    title: "RAM 속도 확인",
    desc: "작업 관리자 > 성능 > 메모리 탭 하단 '속도' 숫자를 입력해 주세요. (가장 중요한 업그레이드 지표입니다)",
    example: "예: 3200, 5600"
  },
  ramType: {
    title: "RAM 타입 확인",
    desc: "PowerShell에서 명령어 입력 (24:DDR3, 26:DDR4, 34:DDR5) 또는 제품 상세 페이지를 참고해 주세요.",
    example: "예: DDR4, DDR5"
  },
  gpu: {
    title: "GPU 정보 확인 (복사 가능)",
    desc: "윈도우 설정 > 시스템 > 디스플레이 > 고급 디스플레이에서 표시되는 정보를 복사해 주세요.",
    example: "예: NVIDIA GeForce RTX 4070 SUPER"
  }
};
