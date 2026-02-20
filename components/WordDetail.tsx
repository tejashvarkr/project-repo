
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SIGN_DATABASE } from '../constants';

const WordDetail: React.FC = () => {
  const { word } = useParams<{ word: string }>();
  const signInfo = word ? SIGN_DATABASE[word.toLowerCase()] : null;

  if (!signInfo) {
    return (
      <div className="max-w-2xl mx-auto py-24 text-center space-y-6">
        <div className="bg-gray-50 p-12 rounded-3xl border border-gray-100">
          <i className="fa-solid fa-circle-question text-6xl text-gray-200 mb-4 block"></i>
          <h2 className="text-2xl font-bold text-gray-800">Word not found</h2>
          <p className="text-gray-500 mb-8">We haven't added the manual video for "{word}" yet.</p>
          <Link to="/" className="px-8 py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-colors">
            Return to Dictionary
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Header */}
      <div className="text-center space-y-2">
        <Link to="/" className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
          <i className="fa-solid fa-arrow-left mr-2"></i> Back to Dictionary
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          How to sign: <span className="italic">"{word}"</span>
        </h1>
      </div>

      {/* Video Player - Local or YouTube */}
      <div className="relative">
        <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/10 border border-gray-800 flex items-center justify-center relative group">
          {signInfo.videoSrc ? (
            <video
              className="w-full h-full"
              controls
              autoPlay
              muted
              loop
              title={`How to sign ${word} in ASL`}
            >
              <source src={signInfo.videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${signInfo.youtubeId}?autoplay=1&rel=0`}
              title={`How to sign ${word} in ASL`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
          
          <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white tracking-widest uppercase border border-white/20">
            Video Tutorial
          </div>
        </div>
      </div>

      {/* Details Sections */}
      <div className="space-y-8 px-4">
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-1 bg-blue-600 rounded-full"></div>
            <h2 className="text-xl font-bold text-gray-900">Sign Description</h2>
          </div>
          <div className="bg-white p-7 rounded-2xl border border-gray-100 shadow-sm leading-relaxed text-gray-700 text-lg">
            {signInfo.description}
          </div>
        </section>

        {/* Quick Reference Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 shadow-sm">
            <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Handshape</span>
            <span className="text-gray-900 font-bold text-base">{signInfo.handshape}</span>
          </div>
          <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 shadow-sm">
            <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Movement</span>
            <span className="text-gray-900 font-bold text-base">{signInfo.movement}</span>
          </div>
          <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 shadow-sm">
            <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Location</span>
            <span className="text-gray-900 font-bold text-base">{signInfo.location}</span>
          </div>
        </div>

        {/* Practice Notes */}
        <section className="bg-blue-600 rounded-3xl p-8 text-white shadow-xl shadow-blue-500/20">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-3">
            <i className="fa-solid fa-lightbulb text-yellow-300"></i> Learning Tips
          </h3>
          <div className="space-y-4">
            {signInfo.tips.map((tip, idx) => (
              <div key={idx} className="flex gap-4 items-start bg-white/10 p-4 rounded-xl border border-white/10">
                <div className="w-6 h-6 bg-white text-blue-600 rounded-full flex items-center justify-center shrink-0 text-xs font-bold">
                  {idx + 1}
                </div>
                <p className="font-medium text-blue-50 leading-snug">{tip}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default WordDetail;
