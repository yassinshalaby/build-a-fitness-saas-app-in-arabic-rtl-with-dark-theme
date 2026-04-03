import { useState, useRef, useEffect } from "react";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const initialMessages: Message[] = [
  {
    role: "assistant",
    content: "مرحبًا! 👋 أنا مساعدك الرياضي الذكي. يمكنني مساعدتك في:\n\n- **تخطيط التمارين** المناسبة لك\n- **نصائح التغذية** لتحقيق أهدافك\n- **الإجابة عن أسئلتك** حول اللياقة البدنية\n\nكيف يمكنني مساعدتك اليوم؟",
  },
];

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulated AI response
    setTimeout(() => {
      const responses = [
        "أنصحك بالبدء بتمارين الإحماء لمدة 5 دقائق قبل أي تمرين رئيسي. هذا يقلل من خطر الإصابة ويحسن أدائك! 💪",
        "للحصول على أفضل النتائج، حاول تناول وجبة غنية بالبروتين خلال 30 دقيقة بعد التمرين. مثل:\n\n- **صدر دجاج مشوي** مع خضروات\n- **شيك بروتين** مع موز\n- **بيض مسلوق** مع خبز أسمر",
        "بناءً على مستواك، أقترح عليك هذا البرنامج الأسبوعي:\n\n1. **السبت**: صدر + ترايسبس\n2. **الأحد**: ظهر + بايسبس\n3. **الاثنين**: راحة\n4. **الثلاثاء**: أكتاف + بطن\n5. **الأربعاء**: أرجل\n6. **الخميس**: كارديو\n7. **الجمعة**: راحة",
      ];
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: responses[Math.floor(Math.random() * responses.length)] },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col pb-20">
      {/* Header */}
      <div className="p-6 pt-12 border-b border-border">
        <h1 className="text-2xl font-bold text-foreground">المساعد الذكي</h1>
        <p className="text-sm text-muted-foreground">مدربك الشخصي بالذكاء الاصطناعي</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 animate-fade-in ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              msg.role === "assistant" ? "gradient-primary" : "bg-secondary"
            }`}>
              {msg.role === "assistant" ? <Bot className="w-4 h-4 text-primary-foreground" /> : <User className="w-4 h-4 text-foreground" />}
            </div>
            <div className={`max-w-[80%] rounded-xl p-3 text-sm ${
              msg.role === "assistant"
                ? "bg-card border border-border text-foreground"
                : "gradient-primary text-primary-foreground"
            }`}>
              {msg.role === "assistant" ? (
                <div className="prose prose-sm prose-invert max-w-none">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-3 animate-fade-in">
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="bg-card border border-border rounded-xl p-3 text-muted-foreground text-sm">
              جارٍ الكتابة...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border bg-card/50 backdrop-blur-md mb-16">
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="اكتب رسالتك..."
            className="flex-1"
          />
          <Button type="submit" variant="hero" size="icon" disabled={!input.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>

      <BottomNav />
    </div>
  );
};

export default AIChat;
