  'use client'
  import { useState, useRef, useEffect } from 'react';
  import { AlertCircle, Send } from "lucide-react";

  const CheckSms = () => {
      const [sms, setSms] = useState('');
      const [prediction, setPrediction] = useState('');
      const [messages, setMessages] = useState<{ sender: string, text: string }[]>([]);
      const messagesEndRef = useRef<HTMLDivElement>(null);

      const scrollToBottom = () => {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      };

      useEffect(() => {
          scrollToBottom();
      }, [messages]);

      const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          if (!sms.trim()) return;
          setMessages(prev => [...prev, { sender: 'user', text: sms }]);
        
          try {
              const response = await fetch('https://bongoscamdetection.onrender.com/api/predict', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ sms }),
              });
              const data = await response.json();
              const aiResponse = data.prediction;
              setPrediction(aiResponse);
              setMessages(prev => [...prev, { sender: 'ai', text: aiResponse }]);
          } catch (error) {
              console.error('Error:', error);
          }
        
          setSms('');
      };

      return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 gap-20 md:gap-0">
          {/* left side */}
          <div className="md:w-1/2 flex items-center justify-center py-8 bg-gradient-to-b from-gray-800 to-gray-900">
            <div className="text-center max-w-2xl px-8">
              <h1 className='text-6xl md:text-7xl p-5'>🛡️</h1>
              <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-400 tracking-tight mb-8 hover:scale-105 transition-transform duration-300">
                SMS CHECKER
              </h2>
              <div className="bg-gray-800 rounded-3xl p-8 shadow-md border-gray-700 hover:shadow-2xl transition-all duration-300 mb-8">
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed text-left">
                Tanzania 🇹🇿, Scammers often use SMS to steal money by pretending to be people you trust, such as close friends or relatives, or by continuing fake conversations about money transfers. These scams are commonly recognized with phrases like NI TUMIE KWA NAMBA HII, or they claim to be agents like Freemasons, local healer, landlords, or employers offering fake jobs.

                <br /><br />
                To address this problem, I created a dataset of 1,508 Tanzania Swahili-based SMS examples, showcasing various scam patterns. The dataset is available on <a href="https://www.kaggle.com/datasets/henrydioniz/swahili-sms-detection-dataset/data" className="text-purple-400 hover:text-purple-300 underline">Kaggle</a>, and this project also includes a simple basic machine learning model to detect and predict such fraudulent messages.
                </p>
            </div>
            <div className="mt-8 space-y-4">
                <a href="https://github.com/Henryle-hd/BongoScamDetection" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full font-bold hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                View GitHub Project
                </a>
                <a href="https://www.kaggle.com/datasets/henrydioniz/swahili-sms-detection-dataset/data" target="_blank" rel="noopener noreferrer" className="block px-8 py-4 bg-gray-800 text-purple-400 rounded-full font-bold border-2 border-purple-500 hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Explore Dataset on Kaggle
                </a>
            </div>
            </div>
        </div>

          {/* right side */}
        <div className="md:w-1/2 flex items-center justify-center bg-gray-900">
          <div className="w-full max-w-2xl px-2 md:px-8 pb-4 md:pb-8">
            {!prediction}
              <div className="mb-4 md:mb-8 transform hover:scale-102 transition-all duration-300">
                  <h1 className="text-2xl md:text-3xl font-bold text-center mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Ingiza Ujumbe Uliopokea</h1>
                  
                  <form onSubmit={handleSubmit} className="flex items-center gap-2 md:gap-3 bg-gray-800 p-2 md:p-4 rounded-2xl md:rounded-3xl shadow-lg border border-gray-700 hover:shadow-xl transition-all duration-300">
                      <input
                          className="flex-1 bg-transparent border-none focus:ring-0 placeholder-purple-300 p-2 md:p-3 outline-none text-purple-300 text-base md:text-lg"
                          placeholder="Weka ujumbe wako hapa..."
                          value={sms}
                          onChange={(e) => setSms(e.target.value)}
                      />
                      <button
                          title='send'
                          type="submit"
                          className="rounded-2xl md:rounded-3xl w-10 h-10 md:w-14 md:h-14 flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        <Send size={20} className="md:w-6 md:h-6" />
                      </button>
                  </form>
              </div>

              <div className="bg-gray-800 rounded-[20px] md:rounded-[40px] p-3 md:p-8 shadow-2xl border border-gray-700 hover:shadow-3xl transition-all duration-300">
                  <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full p-3 md:p-4 w-36 md:w-48 mx-auto mb-3 md:mb-5 shadow-lg transform scale-95 hover:scale-100 transition-all duration-300">
                      <h2 className="text-center text-lg md:text-xl font-bold text-white"></h2>
                  </div>

                  <div className="bg-gradient-to-br from-gray-900 to-gray-900 rounded-2xl md:rounded-3xl p-3 md:p-6 min-h-[400px] md:min-h-[500px] flex flex-col shadow-inner">
                      <div className="flex-1 space-y-3 md:space-y-4 overflow-y-auto max-h-[400px] md:max-h-[480px] mb-1 scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-gray-700 no-scrollbar">
                          {messages.map((message, index) => (
                              <div key={index} className="animate-fadeIn transition-all duration-300">
                                  <div
                                      className={`flex ${message.sender !== 'user' ? 'justify-end' : 'justify-start'}`}
                                  >
                                      <div
                                          className={`max-w-[80%] p-3 md:p-4 rounded-2xl shadow-md hover:shadow-lg transition-all text-xs md:text-sm lg:text-xl duration-300 ${
                                              message.sender !== 'user'
                                                  ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-br-sm'
                                                  : 'bg-gray-700 text-purple-200 rounded-bl-sm border border-gray-600'
                                          }`}
                                      >
                                          {message.text}
                                      </div>
                                  </div>
                                  {message.sender === 'ai' && (
                                      <div className={`mt-3 md:mt-4 mb-4 md:mb-6 rounded-xl md:rounded-2xl p-3 md:p-6 border shadow-lg transition-all duration-300 hover:shadow-xl ${message.text === 'scam' ? 'bg-red-900/25 border-red-700' : 'bg-green-900/25 border-green-700'}`}>
                                          <div className="flex items-center">
                                              <AlertCircle className={`${message.text === 'scam' ? 'text-red-400' : 'text-green-400'} h-5 w-5 md:h-7 md:w-7`} />
                                              <h3 className="ml-2 md:ml-4 font-bold text-base md:text-lg text-gray-200">
                                                  {message.text === 'scam' ? 'Ujumbe Sio Salama!' : 'Ujumbe Salama'}
                                              </h3>
                                          </div>
                                          <p className="ml-1 mt-2 md:mt-3 text-gray-300 leading-relaxed text-xs md:text-sm lg:text-base">
                                              {message.text === 'scam'
                                                  ? 'TAHADHARI: Huu ni kma ujumbe wa uwizi! Usifanye chochote! Usijibu wala kubofya Link yoyote!'
                                                  : 'Ujumbe huu ni salama na wa kuaminika. Unaweza kuendelea na mawasiliano'}
                                          </p>
                                      </div>
                                  )}
                              </div>
                          ))}
                          <div ref={messagesEndRef} />
                      </div>
                  </div>

                  <div className="mt-4 md:mt-8 text-center">
                      <p className="text-sm md:text-base text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 font-semibold">Protected by BongoScam • ML Project</p>
                  </div>
              </div>
          </div>
        </div>
        </div>
      );
  };

  export default CheckSms;