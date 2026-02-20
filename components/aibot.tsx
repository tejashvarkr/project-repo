// import React, { useState, useEffect, useRef } from 'react';
// import { 
//   Send, 
//   Bot, 
//   User, 
//   Eraser, 
//   Loader2, 
//   Search,
//   HelpCircle,
//   Globe,
//   Info,
//   ShieldCheck,
//   Sparkles // Fixed: Added missing import
// } from 'lucide-react';

// // --- Gemini API Configuration ---
// const apiKey = "AIzaSyCtzVRbYjxszPruLyNgNETXy1I0ekDGwok";
// const GEMINI_MODEL = "gemini-2.5-flash-preview-09-2025";

// // Unified Persona for the Incluno Search & Help Core
// const SYSTEM_PROMPT = `
// You are the "Incluno Central Intelligence" — the primary search and help gateway for the Incluno assistive ecosystem.
// Your capabilities include:
// 1. Search Engine: Provide accurate information about American Sign Language (ASL), deaf culture, and accessibility standards.
// 2. Platform Support: Answer questions about how to use Incluno's modules (SignTranslate, WordASL, and the AI Learning Platform).
// 3. Technical Troubleshooting: Help users with webcam setup, audio transcription issues (Whisper model), or 3D rendering (Three.js) within the app.
// 4. General Querying: Act as a helpful, inclusive assistant for any user needs.

// Maintain a professional, accessible, and high-tech tone. Use formatting like bullet points and bold text to make answers easy to read.
// `;

// export default function App() {
//   const [messages, setMessages] = useState([
//     { role: 'bot', text: "Welcome to Incluno Central. I can help you search for ASL information, navigate our modules, or answer any questions you have. What are you looking for?" }
//   ]);
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages, isLoading]);

//   const handleSend = async (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     const userMessage = input.trim();
//     setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
//     setInput('');
//     setIsLoading(true);

//     try {
//       const response = await fetch(
//         `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
//         {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             contents: [
//               { role: "user", parts: [{ text: `System Context: ${SYSTEM_PROMPT}` }] },
//               ...messages.map(m => ({
//                 role: m.role === 'bot' ? 'model' : 'user',
//                 parts: [{ text: m.text }]
//               })),
//               { role: 'user', parts: [{ text: userMessage }] }
//             ],
//             tools: [{ "google_search": {} }]
//           })
//         }
//       );

//       const data = await response.json();
//       const botText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't retrieve that information right now.";
      
//       setMessages(prev => [...prev, { role: 'bot', text: botText }]);
//     } catch (error) {
//       setMessages(prev => [...prev, { role: 'bot', text: "Connection error. Please try your search again." }]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const clearChat = () => {
//     setMessages([{ role: 'bot', text: "Search history cleared. How else can I help you today?" }]);
//   };

//   return (
//     <div className="flex flex-col h-screen bg-[#fcfcfd] text-slate-900 font-sans">
//       {/* Search-Oriented Header */}
//       <header className="bg-white border-b border-slate-200 p-4 md:px-8 flex justify-between items-center sticky top-0 z-10 shadow-sm">
//         <div className="flex items-center gap-4">
//           <div className="bg-indigo-600 p-2.5 rounded-2xl shadow-lg shadow-indigo-200">
//             <Search size={22} className="text-white" />
//           </div>
//           <div>
//             <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
//               Incluno <span className="text-indigo-600">Search</span>
//             </h1>
//             <div className="flex items-center gap-1.5">
//               <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
//               <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Global Intelligence Active</p>
//             </div>
//           </div>
//         </div>
//         <div className="flex items-center gap-3">
//            <button 
//             onClick={clearChat}
//             className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-400 border border-transparent hover:border-slate-200"
//             title="Clear Search"
//           >
//             <Eraser size={20} />
//           </button>
//         </div>
//       </header>

//       {/* Main Experience Feed */}
//       <main className="flex-1 overflow-y-auto px-4 py-8 md:px-20 lg:px-64 space-y-8">
//         {/* Help Suggestions (Empty state/Initial view helper) */}
//         {messages.length === 1 && (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
//             {[
//               { icon: <HelpCircle className="text-orange-500" />, title: "How do I use WordASL?", text: "Learn how to search the sign dictionary." },
//               { icon: <Globe className="text-blue-500" />, title: "What is ASL?", text: "History and basics of American Sign Language." },
//               { icon: <ShieldCheck className="text-green-500" />, title: "Webcam Issues?", text: "Troubleshoot MediaPipe detection." },
//               { icon: <Sparkles className="text-purple-500" />, title: "SignTranslate Features", text: "Audio-to-Sign animation guide." }
//             ].map((card, i) => (
//               <button 
//                 key={i}
//                 onClick={() => { setInput(card.title); }}
//                 className="text-left p-4 bg-white border border-slate-200 rounded-2xl hover:border-indigo-500 hover:shadow-md transition-all group"
//               >
//                 <div className="flex items-center gap-3 mb-2">
//                   {card.icon}
//                   <h3 className="font-bold text-sm text-slate-800 group-hover:text-indigo-600">{card.title}</h3>
//                 </div>
//                 <p className="text-xs text-slate-500">{card.text}</p>
//               </button>
//             ))}
//           </div>
//         )}

//         {messages.map((msg, idx) => (
//           <div 
//             key={idx} 
//             className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
//           >
//             <div className={`flex gap-4 max-w-full md:max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
//               <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
//                 msg.role === 'bot' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
//               }`}>
//                 {msg.role === 'bot' ? <Bot size={18} /> : <User size={18} />}
//               </div>
//               <div className={`p-4 md:p-6 rounded-3xl text-sm md:text-base leading-relaxed ${
//                 msg.role === 'bot' 
//                   ? 'bg-white border border-slate-200 text-slate-800 shadow-sm' 
//                   : 'bg-indigo-50 border border-indigo-100 text-indigo-900 font-medium'
//               }`}>
//                 {msg.text.split('\n').map((line, i) => (
//                   <p key={i} className={i > 0 ? 'mt-3' : ''}>{line}</p>
//                 ))}
//               </div>
//             </div>
//           </div>
//         ))}
        
//         {isLoading && (
//           <div className="flex justify-start">
//             <div className="bg-white border border-slate-200 p-4 rounded-3xl flex items-center gap-3 shadow-sm">
//               <Loader2 size={16} className="animate-spin text-indigo-600" />
//               <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Searching Incluno Database...</span>
//             </div>
//           </div>
//         )}
//         <div ref={messagesEndRef} />
//       </main>

//       {/* Floating Search Input */}
//       <footer className="p-4 md:p-8 bg-gradient-to-t from-white via-white to-transparent">
//         <div className="max-w-4xl mx-auto">
//           <form onSubmit={handleSend} className="relative group shadow-2xl rounded-3xl overflow-hidden">
//             <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400">
//               <Search size={20} />
//             </div>
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Search for ASL help, platform features, or general info..."
//               className="w-full bg-white border-2 border-slate-100 py-5 pl-14 pr-20 text-sm md:text-lg focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-400"
//             />
//             <button 
//               type="submit" 
//               disabled={isLoading || !input.trim()}
//               className="absolute right-3 top-3 bottom-3 bg-indigo-600 text-white px-6 rounded-2xl hover:bg-indigo-700 transition-all disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed flex items-center justify-center font-bold text-sm shadow-lg shadow-indigo-200"
//             >
//               Search
//             </button>
//           </form>
          
//           <div className="flex items-center justify-center gap-6 mt-6 px-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
//              <div className="flex items-center gap-1.5">
//                <Info size={12} className="text-indigo-400" /> 
//                Grounded in Google Search
//              </div>
//              <div className="flex items-center gap-1.5">
//                <Globe size={12} className="text-indigo-400" /> 
//                10M+ ASL Context Points
//              </div>
//              <div className="flex items-center gap-1.5">
//                <Sparkles size={12} className="text-indigo-400" /> 
//                Incluno Core v2.0
//              </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Eraser, 
  Loader2, 
  Search,
  HelpCircle,
  Globe,
  Info,
  ShieldCheck,
  Sparkles,
  Home,
  MessageSquareText // Added for the AI Bot link icon
} from 'lucide-react';

/**
 * Note: Since you provided a Layout component structure and asked how to add a link 
 * to this specific AI Bot, I am integrating the logic below.
 * * In a real-world multi-page React app, you would use this Layout component
 * to wrap your pages. I've added the "AI Bot" link to the navigation bar.
 */

// --- Gemini API Configuration ---
const apiKey = "AIzaSyCtzVRbYjxszPruLyNgNETXy1I0ekDGwok";
const GEMINI_MODEL = "gemini-2.5-flash";

const SYSTEM_PROMPT = `
You are the "Incluno Central Intelligence" — the primary search and help gateway for the Incluno assistive ecosystem.
Please be polite and respectful , responsive and also dont answer questions that are not related to incluno and tell consult to doctor or professional if any medical queries are asked
Your capabilities include:
1. Search Engine: Provide accurate information about American Sign Language (ASL), deaf culture, and accessibility standards.
2. Platform Support: Answer questions about how to use Incluno's modules (SignTranslate, WordASL, and the AI Learning Platform).Just stay limited to this
3. Technical Troubleshooting: Help users with webcam setup, audio transcription issues (Whisper model), or 3D rendering (Three.js) within the app.
4. General Querying: Act as a helpful, inclusive assistant for any user needs.
`;

// --- The Layout Component with the new AI Bot Link ---
export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfd]">
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
              I
            </div>
            <span className="text-xl font-bold text-gray-800">
              Incluno<span className="text-indigo-600">WordsASL</span>
            </span>
          </div>

          <nav className="flex items-center gap-4 sm:gap-8">
        
           
            <button 
              className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl hover:bg-indigo-100 font-semibold transition-all text-sm border border-indigo-100"
            >
              <MessageSquareText size={18} />
              <span>AI Assistant</span>
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1 w-full flex flex-col">
        {children}
      </main>
    </div>
  );
};

export default function App() {
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Welcome to Incluno Central. I can help you search for ASL information, navigate our modules, or answer any questions you have. What are you looking for?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              { role: "user", parts: [{ text: `System Context: ${SYSTEM_PROMPT}` }] },
              ...messages.map(m => ({
                role: m.role === 'bot' ? 'model' : 'user',
                parts: [{ text: m.text }]
              })),
              { role: 'user', parts: [{ text: userMessage }] }
            ],
            tools: [{ "google_search": {} }]
          })
        }
      );

      const data = await response.json();
      const botText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't retrieve that information right now.";
      
      setMessages(prev => [...prev, { role: 'bot', text: botText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: "Connection error. Please try your search again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([{ role: 'bot', text: "Search history cleared. How else can I help you today?" }]);
  };

  return (
  
    <div className="flex flex-col h-full bg-[#fcfcfd]"> 
      {/* Removed <Layout> wrapper from here */}
      <div className="flex-1 flex flex-col h-[calc(100vh-64px)]"> 
        {/* Header inside the Chat area */}
        <div className="px-4 py-4 md:px-8 flex justify-center border-b border-slate-100 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-indigo-500 animate-pulse" />
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-[0.2em]">Incluno Global Intelligence Active</span>
          </div>
        </div>

        {/* Main Experience Feed */}
        <main className="flex-1 overflow-y-auto px-4 py-8 md:px-20 lg:px-64 space-y-8">
          {messages.length === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
              {[
                { icon: <HelpCircle className="text-orange-500" />, title: "How do I use WordASL?", text: "Learn how to search the sign dictionary." },
                { icon: <Globe className="text-blue-500" />, title: "What is ASL?", text: "History and basics of American Sign Language." },
                { icon: <ShieldCheck className="text-green-500" />, title: "Webcam Issues?", text: "Troubleshoot MediaPipe detection." },
                { icon: <Sparkles className="text-purple-500" />, title: "SignTranslate Features", text: "Audio-to-Sign animation guide." }
              ].map((card, i) => (
                <button 
                  key={i}
                  onClick={() => { setInput(card.title); }}
                  className="text-left p-4 bg-white border border-slate-200 rounded-2xl hover:border-indigo-500 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    {card.icon}
                    <h3 className="font-bold text-sm text-slate-800 group-hover:text-indigo-600">{card.title}</h3>
                  </div>
                  <p className="text-xs text-slate-500">{card.text}</p>
                </button>
              ))}
            </div>
          )}

          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-4 max-w-full md:max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                  msg.role === 'bot' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {msg.role === 'bot' ? <Bot size={18} /> : <User size={18} />}
                </div>
                <div className={`p-4 md:p-6 rounded-3xl text-sm md:text-base leading-relaxed ${
                  msg.role === 'bot' 
                    ? 'bg-white border border-slate-200 text-slate-800 shadow-sm' 
                    : 'bg-indigo-50 border border-indigo-100 text-indigo-900 font-medium'
                }`}>
                  {msg.text.split('\n').map((line, i) => (
                    <p key={i} className={i > 0 ? 'mt-3' : ''}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-200 p-4 rounded-3xl flex items-center gap-3 shadow-sm">
                <Loader2 size={16} className="animate-spin text-indigo-600" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Searching Incluno Database...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </main>

        {/* Floating Search Input */}
        <footer className="p-4 md:p-8 bg-gradient-to-t from-white via-white to-transparent">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-end mb-2">
              <button 
                onClick={clearChat}
                className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-red-500 transition-colors"
              >
                <Eraser size={12} />
                Clear Chat
              </button>
            </div>
            <form onSubmit={handleSend} className="relative group shadow-2xl rounded-3xl overflow-hidden border border-slate-100">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400">
                <Search size={20} />
              </div>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about ASL, WordASL, or project features..."
                className="w-full bg-white py-5 pl-14 pr-20 text-sm md:text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder:text-slate-400"
              />
              <button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                className="absolute right-3 top-3 bottom-3 bg-indigo-600 text-white px-6 rounded-2xl hover:bg-indigo-700 transition-all disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed flex items-center justify-center font-bold text-sm shadow-lg shadow-indigo-200"
              >
                Search
              </button>
            </form>
            
            <div className="flex items-center justify-center gap-6 mt-6 px-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
               <div className="flex items-center gap-1.5"><Info size={12} className="text-indigo-400" /> AI Grounding Active</div>
               <div className="flex items-center gap-1.5"><Globe size={12} className="text-indigo-400" /> Searchable Index</div>
               <div className="flex items-center gap-1.5"><Sparkles size={12} className="text-indigo-400" /> Incluno Core v2.0</div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}