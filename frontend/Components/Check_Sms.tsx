  'use client'
  import { useState, useRef, useEffect } from 'react';
  import { AlertCircle } from "lucide-react";
  import { Card } from './ui/card';
  import { Input } from './ui/input';
  import { Button } from './ui/button';
  import { Alert, AlertDescription, AlertTitle } from './ui/alert';

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
          <div className="container max-w-md mx-auto mt-10">
            {!prediction}
              <div className="mb-8">
                  <h1 className="text-2xl font-bold text-center mb-4">Ingiza Ujumbe wa SMS</h1>
                  <p className="text-center mb-4">Angalia kama ni ujumbe wa uwizi au halali</p>
                  <form onSubmit={handleSubmit} className="flex items-center gap-2 bg-gray-100 p-2 rounded-full">
                      <Input
                          className="flex-1 bg-transparent border-none focus:ring-0 placeholder-gray-500"
                          placeholder="Andika ujumbe wako hapa..."
                          value={sms}
                          onChange={(e) => setSms(e.target.value)}
                      />
                      <Button
                          type="submit"
                          className="rounded-full w-10 h-10 p-0 bg-blue-500 hover:bg-blue-600"
                      >
                          ↑
                      </Button>
                  </form>
              </div>

              <Card className="bg-gray-100 rounded-[40px] p-6 shadow-xl">
                  <div className="bg-gray-200 rounded-full p-2 w-40 mx-auto mb-4">
                      <h2 className="text-center text-lg font-semibold">BongoScam</h2>
                  </div>

                  <div className="bg-white rounded-3xl p-4 min-h-[500px] flex flex-col">
                      <div className="flex-1 space-y-4 overflow-y-auto max-h-[400px] mb-4">
                          {messages.map((message, index) => (
                              <div key={index}>
                                  <div
                                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                  >
                                      <div
                                          className={`max-w-[80%] p-3 rounded-2xl ${
                                              message.sender === 'user'
                                                  ? 'bg-blue-500 text-white rounded-br-sm'
                                                  : 'bg-gray-200 text-black rounded-bl-sm'
                                          }`}
                                      >
                                          {message.text}
                                      </div>
                                  </div>
                                  {message.sender === 'ai' && (
                                      <Alert className={`mt-2 mb-4 rounded-xl ${message.text === 'scam' ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
                                          <AlertCircle className={message.text === 'scam' ? 'text-red-500' : 'text-green-500'} />
                                          <AlertTitle className="ml-2">
                                              {message.text === 'scam' ? 'Tahadhari! Ujumbe wa Uwizi!' : 'Ujumbe Salama'}
                                          </AlertTitle>
                                          <AlertDescription className="ml-2">
                                              {message.text === 'scam' 
                                                  ? 'TAHADHARI: Huu ni ujumbe wa uwizi! Usifanye chochote! Usijibu wala kubofya viungo vyovyote!' 
                                                  : 'Hongera! Ujumbe huu ni salama na wa kuaminika. Unaweza kuendelea na mawasiliano'}
                                          </AlertDescription>
                                      </Alert>
                                  )}
                              </div>
                          ))}
                          <div ref={messagesEndRef} />
                      </div>
                  </div>

                  <div className="mt-4 text-center text-xs text-gray-500">
                      <p>Inalindwa na BongoScam • Uchambuzi wa AI</p>
                  </div>
              </Card>
          </div>
      );
  };

  export default CheckSms;