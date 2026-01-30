
import React from 'react';

interface Props {
  content: string;
  onCopy: () => void;
}

const OutputSection: React.FC<Props> = ({ content, onCopy }) => {
  if (!content) return null;

  return (
    <div className="glass-panel rounded-3xl p-8 border-t-4 border-t-sky-500 animate-in fade-in slide-in-from-bottom-10 duration-700">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold flex items-center space-x-3">
          <span className="w-2 h-8 bg-sky-500 rounded-full block" />
          <span>BẢN THIẾT KẾ NỘI DUNG TỐI THƯỢNG</span>
        </h2>
        <button 
          onClick={onCopy}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-all border border-white/10"
        >
          Sao chép văn bản
        </button>
      </div>
      
      <div className="prose prose-invert max-w-none prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10 prose-headings:text-sky-400">
        <div className="whitespace-pre-wrap leading-relaxed text-gray-300 text-lg">
          {content}
        </div>
      </div>
    </div>
  );
};

export default OutputSection;
