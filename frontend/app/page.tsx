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
          <div className="container max-w-md mx-auto mt-10 px-4">
            {!prediction}
              <div className="mb-8">
                  <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">Ingiza Ujumbe wa SMS</h1>
                  <p className="text-center mb-6 text-gray-600">Angalia kama ni ujumbe wa uwizi au halali</p>
                  <form onSubmit={handleSubmit} className="flex items-center gap-3 bg-white p-3 rounded-full shadow-lg border border-gray-200">
                      <input
                          className="flex-1 bg-transparent border-none focus:ring-0 placeholder-gray-400 p-2 outline-none text-gray-700"
                          placeholder="Andika ujumbe wako hapa..."
                          value={sms}
                          onChange={(e) => setSms(e.target.value)}
                      />
                      <button
                      title='send'
                          type="submit"
                          className="rounded-full w-12 h-12 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200 shadow-md"
                      >
                          <Send size={20} />
                      </button>
                  </form>
              </div>

              <div className="bg-white rounded-[30px] p-6 shadow-2xl border border-gray-100">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-full p-3 w-44 mx-auto mb-6 shadow-md">
                      <h2 className="text-center text-lg font-bold text-white">BongoScam</h2>
                  </div>

                  <div className="bg-gray-50 rounded-3xl p-5 min-h-[500px] flex flex-col shadow-inner">
                      <div className="flex-1 space-y-4 overflow-y-auto max-h-[400px] mb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                          {messages.map((message, index) => (
                              <div key={index} className="animate-fadeIn">
                                  <div
                                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                  >
                                      <div
                                          className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${
                                              message.sender === 'user'
                                                  ? 'bg-blue-600 text-white rounded-br-sm'
                                                  : 'bg-white text-gray-800 rounded-bl-sm border border-gray-200'
                                          }`}
                                      >
                                          {message.text}
                                      </div>
                                  </div>
                                  {message.sender === 'ai' && (
                                      <div className={`mt-3 mb-5 rounded-xl p-5 border shadow-md ${message.text === 'scam' ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
                                          <div className="flex items-center">
                                              <AlertCircle className={`${message.text === 'scam' ? 'text-red-500' : 'text-green-500'} h-6 w-6`} />
                                              <h3 className="ml-3 font-bold text-lg">
                                                  {message.text === 'scam' ? 'Tahadhari! Ujumbe wa Uwizi!' : 'Ujumbe Salama'}
                                              </h3>
                                          </div>
                                          <p className="ml-9 mt-2 text-gray-700">
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

                  <div className="mt-6 text-center text-sm text-gray-500">
                      <p>Inalindwa na BongoScam • Uchambuzi wa AI</p>
                  </div>
              </div>
          </div>
      );
  };

  export default CheckSms;