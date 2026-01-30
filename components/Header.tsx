
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-16 px-4 text-center">
      <div className="inline-block">
        <span className="text-sm font-bold tracking-[0.3em] uppercase text-sky-400 mb-4 block animate-pulse">
          Neural System Architecture Active
        </span>
        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-none">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-600">
            TECHMASTER
          </span>
          <br />
          <span className="text-white text-glow">GENIUS</span>
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-gray-400 font-light leading-relaxed">
          Siêu hệ thống kiến tạo nội dung công nghệ tối thượng. Biến tri thức phức tạp thành những bản blueprint thực chiến đẳng cấp thế giới.
        </p>
      </div>
    </header>
  );
};

export default Header;
