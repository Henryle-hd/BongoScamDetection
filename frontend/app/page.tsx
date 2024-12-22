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
        <div className="flex flex-col md:flex-row min-h-screen">
          {/* left side */}
          <div className="md:w-1/2 flex items-center justify-center py-8 bg-gradient-to-b from-purple-50 to-white">
            <div className="text-center max-w-2xl px-4">
              <h1 className='text-6xl md:text-7xl p-5 animate-bounce'>🛡️</h1>
              <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 tracking-tight hover:scale-105 transition-transform duration-300">
                SMS CHECKER
              </h2>
              <p className="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500 mt-4 leading-relaxed hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 text-left">
                Scammers often use SMS to steal money by pretending to be people you trust, such as close friends or relatives, or by continuing fake conversations about money transfers. These scams are commonly recognized with phrases like NI TUMIE KWA NAMBA HII, or they claim to be agents like Freemasons, landlords, or employers offering fake jobs.

                <br />
                To address this problem, I created a dataset of 1,000 Tanzania Swahili-based SMS examples, showcasing various scam patterns. The dataset is available on <a href=" https://www.kaggle.com/datasets/henrydioniz/swahili-sms-detection-dataset/data">Kaggle</a>, and this project also includes a basic machine learning model to detect and predict such fraudulent messages.
              </p>
              <div className="mt-8 space-y-4">
                <a href="https://github.com/Henryle-hd/BongoScamDetection" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full font-bold hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  View GitHub Project
                </a>
                <a href="https://www.kaggle.com/datasets/henrydioniz/swahili-sms-detection-dataset/data" target="_blank" rel="noopener noreferrer" className="block px-6 py-3 bg-white text-purple-600 rounded-full font-bold border-2 border-purple-600 hover:bg-purple-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Explore Dataset on Kaggle
                </a>
              </div>
            </div>
          </div>

          {/* right side */}
          <div className="md:w-1/2 container max-w-md mx-auto mt-10 px-4 pb-8">
            {!prediction}
              <div className="mb-8 transform hover:scale-102 transition-all duration-300">
                  <h1 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Ingiza Ujumbe Uliopokea</h1>
                  
                  <form onSubmit={handleSubmit} className="flex items-center gap-3 bg-white p-4 rounded-full shadow-xl border border-purple-100 hover:shadow-2xl transition-all duration-300">
                      <input
                          className="flex-1 bg-transparent border-none focus:ring-0 placeholder-purple-300 p-3 outline-none text-purple-700 text-lg"
                          placeholder="Andika ujumbe wako hapa..."
                          value={sms}
                          onChange={(e) => setSms(e.target.value)}
                      />
                      <button
                          title='send'
                          type="submit"
                          className="rounded-full w-14 h-14 flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-600 text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                          <Send size={24} />
                      </button>
                  </form>
              </div>

              <div className="bg-white rounded-[40px] p-8 shadow-2xl border border-purple-100 hover:shadow-3xl transition-all duration-300">
                  <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full p-4 w-48 mx-auto mb-8 shadow-lg transform hover:scale-105 transition-all duration-300">
                      <h2 className="text-center text-xl font-bold text-white"></h2>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-6 min-h-[500px] flex flex-col shadow-inner">
                      <div className="flex-1 space-y-4 overflow-y-auto max-h-[400px] mb-4 scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-purple-100">
                          {messages.map((message, index) => (
                              <div key={index} className="animate-fadeIn transition-all duration-300">
                                  <div
                                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                  >
                                      <div
                                          className={`max-w-[80%] p-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 ${
                                              message.sender === 'user'
                                                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-br-sm'
                                                  : 'bg-white text-purple-800 rounded-bl-sm border border-purple-100'
                                          }`}
                                      >
                                          {message.text}
                                      </div>
                                  </div>
                                  {message.sender === 'ai' && (
                                      <div className={`mt-4 mb-6 rounded-2xl p-6 border shadow-lg transition-all duration-300 hover:shadow-xl ${message.text === 'scam' ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
                                          <div className="flex items-center">
                                              <AlertCircle className={`${message.text === 'scam' ? 'text-red-500' : 'text-green-500'} h-7 w-7`} />
                                              <h3 className="ml-4 font-bold text-lg">
                                                  {message.text === 'scam' ? 'Tahadhari! Ujumbe wa Uwizi!' : 'Ujumbe Salama'}
                                              </h3>
                                          </div>
                                          <p className="ml-11 mt-3 text-gray-700 text-base leading-relaxed">
                                              {message.text === 'scam' 
                                                  ? 'TAHADHARI: Huu ni ujumbe wa uwizi! Usifanye chochote! Usijibu wala kubofya viungo vyovyote!' 
                                                  : 'Hongera! Ujumbe huu ni salama na wa kuaminika. Unaweza kuendelea na mawasiliano'}
                                          </p>
                                      </div>
                                  )}
                              </div>
                          ))}
                          <div ref={messagesEndRef} />
                      </div>
                  </div>

                  <div className="mt-8 text-center">
                      <p className="text-base text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500 font-semibold">Protected by BongoScam • ML Project</p>
                  </div>
              </div>
          </div>
        </div>
      );
  };

  export default CheckSms;