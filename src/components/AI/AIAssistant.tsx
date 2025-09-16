import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Zap, Calculator, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  category?: "design" | "calculation" | "optimization" | "general";
}

const suggestedPrompts = [
  {
    text: "Design a rocket to reach 1000ft altitude",
    icon: <Target className="h-3 w-3" />,
    category: "design" as const
  },
  {
    text: "Calculate center of pressure",
    icon: <Calculator className="h-3 w-3" />,
    category: "calculation" as const
  },
  {
    text: "Optimize for stability",
    icon: <Zap className="h-3 w-3" />,
    category: "optimization" as const
  },
  {
    text: "Multi-stage rocket design",
    icon: <Sparkles className="h-3 w-3" />,
    category: "design" as const
  }
];

export const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "assistant",
      content: "Welcome to RocketLab AI! I'm your virtual rocketry co-pilot. I can help you design rockets, perform complex calculations, optimize your designs, and solve any technical challenges. What would you like to work on today?",
      timestamp: new Date(),
      category: "general"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: generateAIResponse(input),
        timestamp: new Date(),
        category: categorizePrompt(input)
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (prompt: string): string => {
    const lowerPrompt = prompt.toLowerCase();
    
    if (lowerPrompt.includes("design") && lowerPrompt.includes("altitude")) {
      return "Based on your altitude target, I recommend starting with a single-stage rocket design:\n\n• Nose Cone: Ogive shape for better aerodynamics\n• Body Tube: 24mm diameter, 300mm length\n• Fins: 3x trapezoidal fins for stability\n• Motor: C6-5 for 1000ft target altitude\n• Recovery: 12-inch parachute\n\nThis configuration should achieve approximately 985ft with excellent stability (margin >2.0). Would you like me to add these components to your design?";
    }
    
    if (lowerPrompt.includes("center") && lowerPrompt.includes("pressure")) {
      return "I'll calculate the center of pressure (CP) for your rocket:\n\nCP Location: 45.2cm from nose tip\nCG Location: 38.7cm from nose tip\nStatic Margin: 1.8 calibers\n\n✅ Your rocket is statically stable! The CP is behind the CG with a good safety margin. For optimal flight characteristics, aim for a static margin between 1.0-2.0 calibers.";
    }
    
    if (lowerPrompt.includes("optimize") && lowerPrompt.includes("stability")) {
      return "Here are my stability optimization recommendations:\n\n🔧 Current Issues:\n• Static margin too low (0.8 calibers)\n• CP too close to CG\n\n💡 Solutions:\n1. Move fins 2cm aft to shift CP backward\n2. Add 15g nose weight to move CG forward\n3. Increase fin area by 20% for better control\n\nThese changes will improve your static margin to 1.5 calibers, ensuring stable flight.";
    }
    
    if (lowerPrompt.includes("multi-stage")) {
      return "Excellent choice! Multi-stage rockets are complex but rewarding. Here's a recommended 2-stage design:\n\n🚀 Stage 1 (Booster):\n• Body: 29mm tube, 200mm length\n• Motor: D12-0 (no delay)\n• Fins: Large delta fins for stability\n\n🚀 Stage 2 (Sustainer):\n• Body: 18mm tube, 150mm length  \n• Motor: B6-4 (4-second delay)\n• Recovery: Streamer recovery\n\nStaging occurs at 150ft. Predicted apogee: 1,450ft. Want me to simulate this design?";
    }
    
    return "I understand you're asking about rocket design. Could you be more specific about what aspect you'd like help with? I can assist with:\n\n• Component selection and sizing\n• Stability and performance calculations\n• Design optimization\n• Flight simulation analysis\n• Multi-stage configurations\n• Recovery system design\n\nWhat specific challenge are you facing?";
  };

  const categorizePrompt = (prompt: string): Message["category"] => {
    const lowerPrompt = prompt.toLowerCase();
    if (lowerPrompt.includes("design") || lowerPrompt.includes("rocket") || lowerPrompt.includes("component")) return "design";
    if (lowerPrompt.includes("calculate") || lowerPrompt.includes("center") || lowerPrompt.includes("pressure")) return "calculation";
    if (lowerPrompt.includes("optimize") || lowerPrompt.includes("improve") || lowerPrompt.includes("stability")) return "optimization";
    return "general";
  };

  const handleSuggestedPrompt = (prompt: string) => {
    setInput(prompt);
  };

  const getCategoryColor = (category?: Message["category"]) => {
    switch (category) {
      case "design": return "bg-primary/20 text-primary border-primary/30";
      case "calculation": return "bg-accent/20 text-accent border-accent/30";
      case "optimization": return "bg-thrust/20 text-thrust border-thrust/30";
      default: return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  return (
    <Card className="h-full flex flex-col bg-surface/50 border-border/50">
      <div className="flex items-center gap-2 p-4 border-b border-border/50">
        <Bot className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">AI Rocketry Assistant</h3>
        <Badge variant="secondary" className="ml-auto">
          <Sparkles className="h-3 w-3 mr-1" />
          Advanced
        </Badge>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.type === "assistant" && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
              )}
              
              <div className={`max-w-[80%] ${message.type === "user" ? "order-first" : ""}`}>
                {message.category && message.type === "assistant" && (
                  <Badge className={`mb-2 text-xs ${getCategoryColor(message.category)}`}>
                    {message.category}
                  </Badge>
                )}
                <div
                  className={`rounded-lg p-3 ${
                    message.type === "user"
                      ? "bg-primary text-primary-foreground ml-auto"
                      : "bg-surface-elevated text-card-foreground"
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>

              {message.type === "user" && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                  <User className="h-4 w-4 text-accent" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Bot className="h-4 w-4 text-primary animate-pulse" />
              </div>
              <div className="bg-surface-elevated rounded-lg p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                  <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Suggested prompts */}
      <div className="p-3 border-t border-border/50">
        <div className="flex flex-wrap gap-2 mb-3">
          {suggestedPrompts.map((prompt, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handleSuggestedPrompt(prompt.text)}
              className="text-xs h-auto py-1 px-2"
            >
              {prompt.icon}
              <span className="ml-1">{prompt.text}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Input area */}
      <div className="p-4 border-t border-border/50">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about rocket design, calculations, or optimization..."
            onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            className="flex-1"
          />
          <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};