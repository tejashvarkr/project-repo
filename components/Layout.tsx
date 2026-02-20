
// import React from 'react';
// import { Link } from 'react-router-dom';
// import App from './aibot';


// const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <header className="bg-white border-b sticky top-0 z-50">
//         <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
//           <Link to="/" className="flex items-center gap-2">
//             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
//               S
//             </div>
//             <span className="text-xl font-bold text-gray-800">Incluno<span className="text-blue-600">WordsASL</span></span>
//           </Link>
//           <nav className="hidden sm:flex gap-6">
//              <Link to="http://localhost:8080/" className="text-gray-600 hover:text-blue-600 font-medium">Back to Home </Link>
//             {/* <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">Flashcards</a>
//             <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">Learning Path</a> */} 
//           </nav>

          
//         </div>
//       </header>

//       <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
//         {children}
//       </main>

     
//     </div>
//   );
// };

// export default Layout;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquareText, X, Home } from 'lucide-react';
import App from './aibot'; // This is your AI Bot component

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isBotOpen, setIsBotOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfd]">
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
              I
            </div>
            <span className="text-xl font-bold text-gray-800">
              Incluno<span className="text-indigo-600">WordsASL</span>
            </span>
          </Link>

          <nav className="flex items-center gap-4 sm:gap-8">
            <Link 
              to="http://localhost:8080/" 
              className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 font-medium transition-colors text-sm"
            >
              <Home size={18} />
              <span className="hidden sm:inline">Back to Home</span>
            </Link>
            
            {/* The AI Bot Toggle Button */}
            <button 
              onClick={() => setIsBotOpen(!isBotOpen)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all text-sm border ${
                isBotOpen 
                ? 'bg-red-50 text-red-600 border-red-100 hover:bg-red-100' 
                : 'bg-indigo-50 text-indigo-700 border-indigo-100 hover:bg-indigo-100'
              }`}
            >
              {isBotOpen ? <X size={18} /> : <MessageSquareText size={18} />}
              <span>{isBotOpen ? "Close Assistant" : "AI Assistant"}</span>
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1 w-full relative">
        {/* If bot is open, show it as an overlay; otherwise show children */}
        {isBotOpen ? (
          <div className="absolute inset-0 z-40 bg-white">
            <App /> 
          </div>
        ) : (
          <div className="max-w-4xl mx-auto px-4 py-8">
            {children}
          </div>
        )}
      </main>
    </div>
  );
};

export default Layout;

