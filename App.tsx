
import React, { useState } from 'react';
import Header from './components/Header';
import InputSection from './components/InputSection';
import OutputSection from './components/OutputSection';
import VoiceStudio from './components/VoiceStudio';
import { TechDomain, ContentType, GeneratorConfig } from './types';
import { generateTechContent } from './geminiService';

const App: React.FC = () => {
  const [config, setConfig] = useState<GeneratorConfig>({
    domains: [TechDomain.SAAS_LAUNCH],
    contentTypes: [ContentType.PLAN_30_DAYS],
    targetAudience: 'Senior Engineers',
    tone: 'Expert & Authoritative',
    techStack: '',
    goal: '',
    extraDetails: ''
  });
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (config.domains.length === 0 || config.contentTypes.length === 0) {
      alert("Vui lòng chọn ít nhất một Chuyên Ngành và một Loại Hình Nội Dung.");
      return;
    }
    if (!config.techStack && !config.extraDetails) {
      alert("Vui lòng cung cấp thêm chi tiết về Tech Stack hoặc yêu cầu bổ sung để AI có đủ dữ kiện.");
      return;
    }
    setLoading(true);
    try {
      const generatedText = await generateTechContent(config);
      setResult(generatedText || '');
    } catch (error) {
      alert("Đã có lỗi xảy ra trong quá trình kiến tạo. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    alert("Đã sao chép nội dung vào bộ nhớ tạm!");
  };

  return (
    <div className="min-h-screen bg-black pb-32">
      {/* Decorative background elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full" />
      </div>

      <Header />

      <main className="max-w-6xl mx-auto px-4 space-y-12">
        <InputSection 
          config={config} 
          onChange={setConfig} 
          onGenerate={handleGenerate} 
          loading={loading}
        />

        {result && (
          <>
            <OutputSection content={result} onCopy={handleCopy} />
            <VoiceStudio text={result} />
          </>
        )}
      </main>

      {/* Persistent Call to Action Area */}
      {result && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/20 transition-all flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            <span>Quay lại đầu trang</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
