import { useEffect, useRef, useCallback, useState } from 'react';
import { cn } from '../../../lib/utils';
import {
  TrendingUp,
  DollarSign,
  PieChart,
  Lightbulb,
  SendIcon,
  LoaderIcon,
  Sparkles,
  UserIcon,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import * as React from 'react';

const API_URL = "https://financeaiapi.runasp.net/api/Chat/ask";



//  Textarea Components 
function useAutoResizeTextarea({ minHeight, maxHeight }) {
  const textareaRef = useRef(null);

  const adjustHeight = useCallback(
    (reset) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      if (reset) {
        textarea.style.height = `${minHeight}px`;
        return;
      }

      textarea.style.height = `${minHeight}px`;
      const newHeight = Math.max(
        minHeight,
        Math.min(textarea.scrollHeight, maxHeight ?? Number.POSITIVE_INFINITY),
      );

      textarea.style.height = `${newHeight}px`;
    },
    [minHeight, maxHeight],
  );

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = `${minHeight}px`;
    }
  }, [minHeight]);

  useEffect(() => {
    const handleResize = () => adjustHeight();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [adjustHeight]);

  return { textareaRef, adjustHeight };
}

const Textarea = React.forwardRef(
  ({ className, containerClassName, showRing = true, ...props }, ref) => {
    const [isFocused, ReactSetIsFocused] = React.useState(false);

    return (
      <div className={cn('relative', containerClassName)}>
        <textarea
          className={cn(
            'border-gray-200 bg-white flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm',
            'transition-all duration-200 ease-in-out',
            'placeholder:text-gray-400',
            'disabled:cursor-not-allowed disabled:opacity-50',
            showRing
              ? 'focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none'
              : '',
            className,
          )}
          ref={ref}
          onFocus={() => ReactSetIsFocused(true)}
          onBlur={() => ReactSetIsFocused(false)}
          {...props}
        />

        {showRing && isFocused && (
          <motion.span
            className="ring-blue-300/50 pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </div>
    );
  },
);
Textarea.displayName = 'Textarea';

//  Main Chat Component 
export default function AnimatedAIChat() {
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState([]); // State to hold chat history
  const [isTyping, setIsTyping] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [inputFocused, setInputFocused] = useState(false);
  
  const messagesEndRef = useRef(null); // Ref for auto-scrolling
  
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 60,
    maxHeight: 200,
  });

  const financeSuggestions = [
    {
      icon: <DollarSign className="h-4 w-4" />,
      label: 'Explain ROI',
      prompt: 'Explain what ROI means in finance?',
    },
    {
      icon: <TrendingUp className="h-4 w-4" />,
      label: 'Market Trends',
      prompt: 'What are the current trends in the stock market?',
    },
    {
      icon: <PieChart className="h-4 w-4" />,
      label: 'Budgeting',
      prompt: 'Give me a simple 50/30/20 budgeting plan.',
    },
    {
      icon: <Lightbulb className="h-4 w-4" />,
      label: 'Compound Interest',
      prompt: 'How does compound interest work?',
    },
  ];

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim()) {
        handleSendMessage();
      }
    }
  };

  const formatMessageText = (text) => {
    
    return text
      .replace(/([.!?])\s+/g, '$1\n') 
      .replace(/\n+/g, '\n'); 
  };

  const typeOutMessage = (fullText) => {
    const formattedText = formatMessageText(fullText);
    const msgId = Date.now() + Math.random();
    
    
    setMessages((prev) => [...prev, { id: msgId, role: 'assistant', content: '' }]);
    
    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (charIndex >= formattedText.length) {
        clearInterval(typeInterval);
        setIsTyping(false);
        return;
      }
      charIndex++;
      
     
      setMessages((prev) => {
        const updated = [...prev];
        const msgIndex = updated.findIndex(m => m.id === msgId);
        if (msgIndex !== -1) {
          updated[msgIndex].content = formattedText.substring(0, charIndex);
        }
        return updated;
      });
    }, 10);
  };

  const handleSendMessage = async () => {
    if (!value.trim()) return;

    const currentPrompt = value;
    
    setMessages((prev) => [...prev, { id: Date.now(), role: 'user', content: currentPrompt }]);
    setValue('');
    adjustHeight(true);
    setIsTyping(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': '*/*'
        },
        body: JSON.stringify({ message: currentPrompt })
      });

      if (response.ok) {
        const data = await response.json().catch(() => null);
        let responseText = "";

        if (data) {
          // API returns { response: "system\n...\nassistant\n<content>" }
          if (typeof data.response === 'string') {
            const raw = data.response;
            if (raw.includes('\nassistant\n')) {
              responseText = raw.split('\nassistant\n').pop().trim();
            } else {
              // strip role prefixes if present
              responseText = raw.replace(/(^|\n)(system|user|assistant)[:]?\n/gi, '').trim();
            }
          } else if (typeof data.answer === 'string') {
            responseText = data.answer;
          } else if (data.responseText) {
            responseText = data.responseText;
          } else {
            responseText = JSON.stringify(data);
          }
        } else {
          responseText = "No response from the server.";
        }

        typeOutMessage(responseText);
      } else {
        // try to read error body for debugging
        let errText = '';
        try {
          errText = await response.text();
        } catch (e) {
          // ignore
        }
        console.error('Chat API error', response.status, errText);
        typeOutMessage("Sorry, an error occurred while connecting to the server.");
      }
    } catch (error) {
      typeOutMessage("There is a network issue, and we couldn't reach the server.");
    } finally {
      setIsTyping(false);
    }
  };

  const selectSuggestion = (index) => {
    const selected = financeSuggestions[index];
    setValue(selected.prompt);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="flex w-screen overflow-x-hidden bg-white">
      <div className={cn(
        "text-gray-900 relative flex min-h-screen w-full flex-col overflow-hidden px-4 md:px-6",
        hasMessages ? "justify-between py-6" : "items-center justify-center p-6"
      )}>
        
        {/* Background Effects */}
        <div className="absolute inset-0 h-full w-full overflow-hidden pointer-events-none">
          <div className="bg-blue-100/30 absolute top-0 left-1/4 h-96 w-96 animate-pulse rounded-full mix-blend-normal blur-[128px] filter" />
          <div className="bg-indigo-100/30 absolute right-1/4 bottom-0 h-96 w-96 animate-pulse rounded-full mix-blend-normal blur-[128px] filter delay-700" />
        </div>

        {/* Chat History Area (Only visible if there are messages) */}
        {hasMessages && (
          <div className="flex-1 w-full max-w-3xl mx-auto overflow-y-auto z-10 space-y-6 py-4">
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex gap-4",
                    msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  {/* Avatar */}
                  <div className={cn(
                    "flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center",
                    msg.role === 'user' ? "bg-gray-100 text-gray-500" : "bg-blue-600 text-white shadow-md shadow-blue-200"
                  )}>
                    {msg.role === 'user' ? <UserIcon className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
                  </div>
                  
                  {/* Message Bubble */}
                  <div className={cn(
                    "px-5 py-3 rounded-2xl max-w-[80%] text-sm leading-relaxed break-words",
                    msg.role === 'user' 
                      ? "bg-gray-100 text-gray-800 rounded-tr-none" 
                      : "bg-white border border-gray-100 shadow-sm text-gray-800 rounded-tl-none"
                  )}
                  style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Interactive / Input Area */}
        <div className={cn(
          "relative w-full max-w-3xl z-10 transition-all duration-500",
          hasMessages ? "mx-auto mt-auto" : "mx-auto"
        )}>
          
          {/* Header & Suggestions (Only visible if NO messages) */}
          {!hasMessages && (
            <motion.div
              className="space-y-12 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="space-y-3 text-center">
                <div className="inline-block">
                  <h1 className="pb-1 text-3xl font-medium tracking-tight text-gray-900">
                    How can I help you financially today?
                  </h1>
                  <div className="via-blue-300/50 h-px bg-gradient-to-r from-transparent to-transparent w-full" />
                </div>
                <p className="text-gray-500 text-sm">
                  Ask any question about finance, investments, or budget.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2">
                {financeSuggestions.map((suggestion, index) => (
                  <motion.button
                    key={suggestion.label}
                    onClick={() => selectSuggestion(index)}
                    className="group bg-blue-50/50 text-gray-600 hover:bg-blue-100 hover:text-gray-900 relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all"
                  >
                    {suggestion.icon}
                    <span>{suggestion.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Input Box */}
          <motion.div
            className="border-gray-200 bg-white/90 relative rounded-2xl border shadow-lg backdrop-blur-2xl"
            layout // This makes the transition smooth when moving to bottom
          >
            <div className="p-4">
              <Textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  adjustHeight();
                }}
                onKeyDown={handleKeyDown}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                placeholder={isTyping ? "AI is typing..." : "Ask Finance AI a question..."}
                disabled={isTyping}
                containerClassName="w-full"
                className={cn(
                  'w-full px-4 py-3',
                  'resize-none',
                  'bg-transparent',
                  'border-none',
                  'text-gray-900 text-sm',
                  'focus:outline-none',
                  'placeholder:text-gray-400',
                  'min-h-[60px]',
                )}
                style={{ overflow: 'hidden' }}
                showRing={false}
              />
            </div>

            <div className="border-gray-100 flex items-center justify-end gap-4 border-t p-3 bg-gray-50/50 rounded-b-2xl">
              <motion.button
                type="button"
                onClick={handleSendMessage}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isTyping || !value.trim()}
                className={cn(
                  'rounded-lg px-4 py-2 text-sm font-medium transition-all flex items-center gap-2',
                  value.trim() && !isTyping
                    ? 'bg-blue-600 text-white shadow-blue-200/50 shadow-md hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed',
                )}
              >
                {isTyping ? (
                  <LoaderIcon className="h-4 w-4 animate-[spin_2s_linear_infinite]" />
                ) : (
                  <SendIcon className="h-4 w-4" />
                )}
                <span>Send</span>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Thinking Indicator Overlay (Shows at bottom when typing) */}
        <AnimatePresence>
          {isTyping && hasMessages && (
            <motion.div
              className="fixed bottom-32 left-1/2 -translate-x-1/2 z-20 border-gray-200 bg-white/90 rounded-full border px-4 py-2 shadow-sm backdrop-blur-md"
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
            >
              <div className="flex items-center gap-3">
                <Sparkles className="text-blue-500 h-4 w-4" />
                <div className="text-gray-500 text-sm flex items-center gap-1">
                  Analyzing <TypingDots />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Glow Effect */}
        {inputFocused && !hasMessages && (
          <motion.div
            className="from-blue-400 via-blue-300/60 to-indigo-300 pointer-events-none fixed z-0 h-[50rem] w-[50rem] rounded-full bg-gradient-to-r opacity-[0.06] blur-[96px]"
            animate={{
              x: mousePosition.x - 400,
              y: mousePosition.y - 400,
            }}
            transition={{ type: 'spring', damping: 25, stiffness: 150 }}
          />
        )}
      </div>
    </div>
  );
}

// Typing Dots Component 
function TypingDots() {
  return (
    <div className="ml-1 flex items-center">
      {[1, 2, 3].map((dot) => (
        <motion.div
          key={dot}
          className="bg-blue-500 mx-0.5 h-1 w-1 rounded-full"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: dot * 0.2,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}