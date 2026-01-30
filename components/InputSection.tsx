
import React from 'react';
import { TechDomain, ContentType, GeneratorConfig } from '../types';

interface Props {
  config: GeneratorConfig;
  onChange: (config: GeneratorConfig) => void;
  onGenerate: () => void;
  loading: boolean;
}

const SUGGESTED_STACKS = [
  { label: "Modern Fullstack", value: "Next.js 15 (App Router), Tailwind CSS, Prisma, PostgreSQL, Clerk Auth, Shadcn UI" },
  { label: "AI Native", value: "Python, FastAPI, LangChain, OpenAI API, Pinecone Vector DB, Streamlit" },
  { label: "Mobile Pro", value: "React Native, Expo, Firebase, Redux Toolkit, React Navigation" },
  { label: "Enterprise Scale", value: "Java Spring Boot, Microservices, Kubernetes, Docker, Redis, Kafka" },
  { label: "High-Perf Backend", value: "Golang, Gin Gonic, gRPC, MongoDB, Prometheus, Grafana" },
  { label: "Web3/Blockchain", value: "Solidity, Hardhat, Ethers.js, IPFS, The Graph, Polygon" },
  { label: "Data Engineering", value: "Apache Spark, Airflow, Snowflake, DBT, Python (Pandas/Polars)" },
  { label: "Cybersecurity Tech", value: "Rust, Wireshark API, OWASP ZAP, Metasploit Framework, Kali Linux Tools" }
];

const InputSection: React.FC<Props> = ({ config, onChange, onGenerate, loading }) => {
  const toggleDomain = (domain: TechDomain) => {
    const newDomains = config.domains.includes(domain)
      ? config.domains.filter(d => d !== domain)
      : [...config.domains, domain];
    onChange({ ...config, domains: newDomains });
  };

  const selectAllDomains = () => {
    const all = Object.values(TechDomain);
    onChange({ ...config, domains: config.domains.length === all.length ? [] : all });
  };

  const toggleContentType = (type: ContentType) => {
    const newTypes = config.contentTypes.includes(type)
      ? config.contentTypes.filter(t => t !== type)
      : [...config.contentTypes, type];
    onChange({ ...config, contentTypes: newTypes });
  };

  const selectAllContentTypes = () => {
    const all = Object.values(ContentType);
    onChange({ ...config, contentTypes: config.contentTypes.length === all.length ? [] : all });
  };

  const handleStackSelect = (stack: string) => {
    const current = config.techStack.trim();
    const newValue = current ? (current.includes(stack) ? current : `${current}, ${stack}`) : stack;
    onChange({ ...config, techStack: newValue });
  };

  return (
    <div className="glass-panel rounded-3xl p-8 shadow-2xl space-y-10">
      {/* Domains Multi-select */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-sky-400 uppercase tracking-widest">Chuyên Ngành (Chọn nhiều)</label>
          <button 
            onClick={selectAllDomains}
            className="text-[10px] px-3 py-1 rounded-full border border-sky-500/30 text-sky-400 hover:bg-sky-500/10 transition-all"
          >
            {config.domains.length === Object.values(TechDomain).length ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.values(TechDomain).map((d) => (
            <button
              key={d}
              onClick={() => toggleDomain(d)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                config.domains.includes(d)
                ? 'bg-sky-500 border-sky-400 text-white shadow-lg shadow-sky-500/20'
                : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/30'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Content Types Multi-select */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Loại Hình Nội Dung (Chọn nhiều)</label>
          <button 
            onClick={selectAllContentTypes}
            className="text-[10px] px-3 py-1 rounded-full border border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/10 transition-all"
          >
            {config.contentTypes.length === Object.values(ContentType).length ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.values(ContentType).map((c) => (
            <button
              key={c}
              onClick={() => toggleContentType(c)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                config.contentTypes.includes(c)
                ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-500/20'
                : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/30'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        {/* Target Audience */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-purple-400 uppercase tracking-widest">Đối Tượng Độc Giả</label>
          <select 
            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-white"
            value={config.targetAudience}
            onChange={(e) => onChange({ ...config, targetAudience: e.target.value })}
          >
            <option value="Junior Developers">Lập trình viên mới vào nghề</option>
            <option value="Senior Engineers">Kỹ sư dày dạn kinh nghiệm</option>
            <option value="CTOs / Tech Leads">Lãnh đạo công nghệ (CTO/Lead)</option>
            <option value="Product Managers">Quản lý sản phẩm (PM)</option>
            <option value="Non-tech Founders">Founders không chuyên Tech</option>
            <option value="Venture Capitalists">Nhà đầu tư mạo hiểm</option>
            <option value="End Users">Người dùng cuối</option>
          </select>
        </div>

        {/* Tone Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Phong Cách Truyền Tải</label>
          <select 
            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-white"
            value={config.tone}
            onChange={(e) => onChange({ ...config, tone: e.target.value })}
          >
            <option value="Expert & Authoritative">Chuyên gia & Uy tín</option>
            <option value="FOMO & High Energy">Gấp gáp & Năng lượng cao</option>
            <option value="Storytelling & Narrative">Kể chuyện & Truyền cảm hứng</option>
            <option value="Technical & Precise">Kỹ thuật & Chính xác tuyệt đối</option>
            <option value="Friendly & Engaging">Thân thiện & Kết nối</option>
            <option value="Critical & Deep Dive">Phân tích sâu & Phản biện</option>
          </select>
        </div>
      </div>

      {/* Tech Stack / Context */}
      <div className="space-y-4">
        <label className="text-xs font-bold text-sky-400 uppercase tracking-widest block">Tech Stack / Công Nghệ Chính (Tùy chỉnh hoặc chọn nhanh)</label>
        <div className="flex flex-wrap gap-2 mb-3">
          {SUGGESTED_STACKS.map((stack) => (
            <button
              key={stack.label}
              onClick={() => handleStackSelect(stack.value)}
              className="px-3 py-1.5 rounded-lg text-[11px] font-bold bg-white/5 border border-white/10 text-sky-300 hover:bg-sky-500/20 hover:border-sky-500/50 transition-all"
            >
              + {stack.label}
            </button>
          ))}
        </div>
        <input 
          type="text"
          placeholder="VD: Next.js 14, AWS, Kubernetes, Rust, Solana, etc."
          className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all text-white"
          value={config.techStack}
          onChange={(e) => onChange({ ...config, techStack: e.target.value })}
        />
      </div>

      {/* Conversion Goal */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-sky-400 uppercase tracking-widest">Mục Tiêu Chuyển Đổi</label>
        <input 
          type="text"
          placeholder="VD: Đăng ký Waitlist, Click link mua hàng, Đặt lịch Demo..."
          className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all text-white"
          value={config.goal}
          onChange={(e) => onChange({ ...config, goal: e.target.value })}
        />
      </div>

      {/* Extra Details */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-sky-400 uppercase tracking-widest">Yêu Cầu Chi Tiết Bổ Sung</label>
        <textarea 
          placeholder="Nhập bất kỳ ghi chú đặc biệt nào bạn muốn AI tập trung vào..."
          className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 h-32 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all text-white resize-none"
          value={config.extraDetails}
          onChange={(e) => onChange({ ...config, extraDetails: e.target.value })}
        />
      </div>

      {/* Action Button */}
      <button 
        onClick={onGenerate}
        disabled={loading}
        className={`w-full py-6 rounded-2xl font-black text-xl uppercase tracking-[0.2em] transition-all shadow-2xl 
          ${loading ? 'bg-gray-800 cursor-not-allowed opacity-50' : 'bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:scale-[1.01] active:scale-95 hover:shadow-sky-500/40'}`}
      >
        {loading ? (
          <div className="flex items-center justify-center space-x-3">
            <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
            <span>ĐANG KHỞI TẠO MA TRẬN...</span>
          </div>
        ) : (
          "KÍCH HOẠT KIẾN TRÚC SƯ AI"
        )}
      </button>
    </div>
  );
};

export default InputSection;
