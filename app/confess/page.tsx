'use client';

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const phrases = [
  "No",
  "Are you sure?",
  "Really sure?",
  "Think again!",
  "Last chance!",
  "Giỡn nữa?",
  "Thật hả?",
  "Suy nghĩ lại đi!",
  "Chắc chưa?",
  "Không đùa nữa",
  "Đừng lạnh lùng vậy chứ",
  "Có hối hận không?",
  "Suy nghĩ kỹ nha",
  "Plsss? :((",
];

export default function ConfessPage() {
  const [view, setView] = useState<'LETTER' | 'QUESTION' | 'SUCCESS'>('LETTER');
  const [noCount, setNoCount] = useState(0);
  const yesButtonSize = noCount * 20 + 16;

  const handleNoClick = () => {
    setNoCount(noCount + 1);
  };

  const getNoButtonText = () => {
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  const handleYesClick = () => {
    setView('SUCCESS');
  };

  if (view === 'LETTER') {
    return (
      <div className="flex flex-col items-center justify-center min-h-dvh bg-pink-100 p-4 font-serif text-center relative">
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl border-2 border-pink-300 w-full max-w-sm md:max-w-2xl animate-fade-in-up relative">
          <h1 className="text-2xl md:text-4xl font-bold text-pink-600 mb-4 md:mb-6">Dear Vy,</h1>
          <p className="text-lg md:text-xl text-gray-800 leading-relaxed mb-4">
            I love you Vy,
          </p>
          <p className="text-base md:text-lg text-gray-700">
            Anh rất mong tụi mình có thể đồng hành với nhau đi đến đoạn xa nhất của con đường.  
          </p>
          <div className="mt-6 md:mt-8 text-4xl md:text-6xl text-center">
            ❤️
          </div>
          
          <button 
            onClick={() => setView('QUESTION')}
            className="absolute bottom-4 right-4 bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-full shadow-lg transition-transform hover:scale-110"
            aria-label="Continue"
          >
            <ArrowRight size={24} />
          </button>
        </div>
      </div>
    );
  }

  if (view === 'SUCCESS') {
    return (
      <div className="flex flex-col items-center justify-center min-h-dvh bg-pink-100 p-4 text-center">
        <div className="bg-white p-8 rounded-3xl shadow-xl border-4 border-pink-400 animate-bounce">
          <h1 className="text-4xl md:text-6xl font-bold text-pink-600 mb-4">Yaaay! 🎉</h1>
          <p className="text-xl md:text-2xl text-gray-700">
            Cảm ơn Vy đã đồng ý làm người yêu của anh ❤️
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh bg-pink-50 overflow-hidden relative p-4">
      <h1 className="text-2xl md:text-5xl font-bold text-pink-600 mb-8 md:mb-12 text-center animate-bounce leading-tight">
        Will you be my girl friend?
      </h1>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <button
          className="bg-green-500 hover:bg-green-600 border-2 border-black text-white font-bold rounded-full transition-all duration-200"
          style={{ fontSize: yesButtonSize, padding: '0.5em 1.5em' }}
          onClick={handleYesClick}
        >
          Yes
        </button>
        <button
          onClick={handleNoClick}
          className="bg-red-500 hover:bg-red-600 text-white border-2 border-black font-bold py-3 px-8 rounded-full text-xl shadow-lg"
        >
          {noCount === 0 ? "No" : getNoButtonText()}
        </button>
      </div>
    </div>
  );
}
