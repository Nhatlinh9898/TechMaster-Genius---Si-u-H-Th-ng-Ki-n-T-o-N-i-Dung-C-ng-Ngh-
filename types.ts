
export enum TechDomain {
  SAAS_LAUNCH = 'SaaS Product Launch',
  API_DOCS = 'Tài Liệu API',
  CYBER_SECURITY = 'Cyber Security',
  PROMPT_ENGINEERING = 'AI Prompt Engineering',
  BLOCKCHAIN = 'Blockchain Dev',
  UX_WRITING = 'UX Writing',
  SYSTEM_DESIGN = 'System Design',
  AGILE_SCRUM = 'Agile & Scrum',
  CLOUD_COMPUTING = 'Cloud Computing',
  DATA_ANALYSIS = 'Data Analysis'
}

export enum ContentType {
  STANDARD_PROCESS = 'Quy trình chuẩn thực chiến',
  NICHE_STRATEGY = 'Chiến lược ngách chuyên sâu',
  PLAN_30_DAYS = 'Kế hoạch 30 ngày thần tốc',
  DEEP_ARTICLE = 'Bài viết chuyên môn (Deep Dive)',
  EMAIL_MARKETING = 'Chuỗi Email Marketing',
  VIDEO_SCRIPT = 'Kịch bản Video Viral/Expert',
  TREND_ANALYSIS = 'Phân tích xu hướng thị trường',
  STEP_BY_STEP = 'Hướng dẫn từng bước (Tutorial)',
  DETAILED_REVIEW = 'Review chi tiết giải pháp',
  HIGH_CONV_ADS = 'Quảng cáo chuyển đổi cao'
}

export interface GeneratorConfig {
  domains: TechDomain[];
  contentTypes: ContentType[];
  targetAudience: string;
  tone: string;
  techStack: string;
  goal: string;
  extraDetails: string;
}

export interface VoiceConfig {
  pitch: number;
  rate: number;
  voiceName: string;
}
