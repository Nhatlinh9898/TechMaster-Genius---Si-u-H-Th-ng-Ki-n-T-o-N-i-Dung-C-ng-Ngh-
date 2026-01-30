
import React, { useState, useEffect } from 'react';

interface Props {
  text: string;
}

const VoiceStudio: React.FC<Props> = ({ text }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [rate, setRate] = useState(1.0);
  const [voiceType, setVoiceType] = useState<'male' | 'female'>('male');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const updateVoices = () => {
      setVoices(window.speechSynthesis.getVoices());
    };
    window.speechSynthesis.onvoiceschanged = updateVoices;
    updateVoices();
  }, []);

  const handleSpeak = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.lang = 'vi-VN';
    
    // Attempt to find a suitable voice
    const filteredVoices = voices.filter(v => v.lang.includes('vi'));
    if (filteredVoices.length > 0) {
      // Logic for male/female is limited by browser availability, but we try
      utterance.voice = voiceType === 'male' ? filteredVoices[0] : (filteredVoices[1] || filteredVoices[0]);
    }
    
    // Fake male/female by pitch if only one voice available
    utterance.pitch = voiceType === 'male' ? 0.8 : 1.2;

    utterance.onend = () => setIsPlaying(false);
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  if (!text) return null;

  return (
    <div className="glass-panel rounded-3xl p-8 mt-12 gradient-border">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">VOICE STUDIO PRO</h3>
          <p className="text-gray-400 text-sm">Chuyển đổi nội dung thành âm thanh chuyên nghiệp với AI.</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {/* Rate Selection */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-gray-500 uppercase font-bold">Tốc độ</label>
            <select 
              className="bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
            >
              <option value="0.5">0.5x</option>
              <option value="1.0">1.0x</option>
              <option value="1.5">1.5x</option>
              <option value="2.0">2.0x</option>
            </select>
          </div>

          {/* Voice Type */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-gray-500 uppercase font-bold">Giọng đọc</label>
            <div className="flex bg-black border border-white/10 rounded-lg p-1">
              <button 
                onClick={() => setVoiceType('male')}
                className={`px-3 py-1 rounded-md text-sm transition-all ${voiceType === 'male' ? 'bg-sky-500 text-white' : 'text-gray-400'}`}
              >
                Nam
              </button>
              <button 
                onClick={() => setVoiceType('female')}
                className={`px-3 py-1 rounded-md text-sm transition-all ${voiceType === 'female' ? 'bg-purple-500 text-white' : 'text-gray-400'}`}
              >
                Nữ
              </button>
            </div>
          </div>

          {/* Speak Action */}
          <button 
            onClick={handleSpeak}
            className={`flex items-center space-x-2 px-8 py-3 rounded-xl font-bold transition-all shadow-lg 
              ${isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-sky-500 hover:bg-sky-600'}`}
          >
            {isPlaying ? (
              <>
                <div className="flex space-x-1">
                  <div className="w-1 h-4 bg-white animate-bounce" style={{animationDelay: '0s'}} />
                  <div className="w-1 h-4 bg-white animate-bounce" style={{animationDelay: '0.1s'}} />
                  <div className="w-1 h-4 bg-white animate-bounce" style={{animationDelay: '0.2s'}} />
                </div>
                <span>DỪNG NGHE</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" /></svg>
                <span>NGHE THỬ NGAY</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoiceStudio;
