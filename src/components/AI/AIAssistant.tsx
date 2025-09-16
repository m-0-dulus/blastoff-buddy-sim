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
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Enhanced AI response with more realistic timing
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
    }, Math.random() * 1000 + 800); // More realistic response time
  };

  const generateAIResponse = (prompt: string): string => {
    const lowerPrompt = prompt.toLowerCase();
    
    // Weather and environmental considerations
    if (lowerPrompt.includes("weather") || lowerPrompt.includes("wind") || lowerPrompt.includes("temperature")) {
      return "🌤️ Weather Analysis & Recommendations:\n\n**Current Conditions Impact:**\n• Wind Speed: Affects stability and drift\n• Temperature: Influences motor performance (+/- 5% thrust per 10°C)\n• Humidity: Can affect recovery deployment\n• Barometric Pressure: Affects altitude calculations\n\n**Optimal Launch Conditions:**\n• Wind: <15 mph for safe recovery\n• Temperature: 15-25°C for best motor performance\n• Clear skies with good visibility\n\n**Design Adjustments for Weather:**\n• Increase fin area by 15% for windy conditions\n• Use shorter delay charge in cold weather\n• Consider streamer recovery in high winds\n\nWould you like me to analyze your specific weather conditions?";
    }
    
    // Motor selection and performance
    if (lowerPrompt.includes("motor") && (lowerPrompt.includes("select") || lowerPrompt.includes("choose") || lowerPrompt.includes("recommend"))) {
      return "🚀 Motor Selection Guide:\n\n**Available Motor Classes:**\n• **A-Class**: 0.625-1.25 Ns (beginners, small rockets)\n• **B-Class**: 1.25-2.5 Ns (basic sport flying)\n• **C-Class**: 2.5-5.0 Ns (most popular, versatile)\n• **D-Class**: 5.0-10 Ns (higher performance)\n• **E-Class**: 10-20 Ns (advanced sport)\n• **F-Class**: 20-40 Ns (high power entry)\n• **G-Class**: 40-80 Ns (serious high power)\n• **H-Class**: 80-160 Ns (advanced high power)\n\n**For your rocket mass and target altitude:**\n• Mass <50g: A8-3 or B6-4\n• Mass 50-150g: C6-5 or D12-5\n• Mass 150-500g: E9-6 or F15-8\n• Mass >500g: G80+ motors\n\nWhat's your target altitude and rocket mass?";
    }
    
    // Advanced design optimization
    if (lowerPrompt.includes("optimize") || lowerPrompt.includes("improve") || lowerPrompt.includes("performance")) {
      return "⚡ Advanced Optimization Analysis:\n\n**Current Design Issues Detected:**\n• Drag coefficient: 0.45 (can be improved)\n• Mass distribution: Slightly nose-heavy\n• Fin area: Adequate but not optimal\n\n**Performance Improvements:**\n1. **Aerodynamic Optimization:**\n   - Switch to ogive nose cone (-8% drag)\n   - Add boat tail transition (-3% drag)\n   - Sand finish to 400 grit (-2% drag)\n\n2. **Mass Optimization:**\n   - Move 10g aft for better CG position\n   - Use hollow nose cone to save 5g\n   - Optimize fin thickness\n\n3. **Recovery Optimization:**\n   - 18\" parachute for 5m/s descent rate\n   - Nomex wadding for reliable deployment\n\n**Expected Improvements:**\n• +12% altitude gain (1,120ft vs 1,000ft)\n• +15% stability margin\n• Better recovery reliability\n\nShall I implement these optimizations?";
    }
    
    // Design generation based on specifications
    if (lowerPrompt.includes("design") && (lowerPrompt.includes("altitude") || lowerPrompt.includes("velocity") || lowerPrompt.includes("speed"))) {
      const altitudeMatch = prompt.match(/(\d+)\s*(?:ft|feet|foot|m|meter)/i);
      const targetAlt = altitudeMatch ? parseInt(altitudeMatch[1]) : 1000;
      
      if (targetAlt < 500) {
        return `🎯 Low Altitude Design (${targetAlt}ft target):\n\n**Recommended Configuration:**\n• Nose Cone: Conical plastic, 3:1 ratio\n• Body Tube: BT-20 (18mm), 200mm length\n• Fins: 3x triangular balsa, root chord 40mm\n• Motor: A8-3 or B6-4\n• Recovery: 12\" plastic parachute\n• Mass: ~35g loaded\n\n**Predicted Performance:**\n• Max Altitude: ${targetAlt + 50}ft\n• Max Velocity: 95 ft/s\n• Static Margin: 1.6 calibers ✅\n• Recovery: Gentle 4m/s descent\n\n**Materials List:**\n• Body tube: $3\n• Nose cone: $2\n• Fins: $1 (balsa sheet)\n• Recovery: $4\n• Total cost: ~$15\n\nThis design is perfect for beginners and small fields!`;
      } else if (targetAlt < 1500) {
        return `🚀 Mid-Range Design (${targetAlt}ft target):\n\n**Recommended Configuration:**\n• Nose Cone: Ogive fiberglass, 4:1 ratio\n• Body Tube: BT-50 (24mm), 350mm length\n• Fins: 4x trapezoidal G10, swept design\n• Motor: C6-5 or D12-5\n• Recovery: 15\" rip-stop nylon chute\n• Mass: ~125g loaded\n\n**Predicted Performance:**\n• Max Altitude: ${targetAlt + 75}ft\n• Max Velocity: 165 ft/s\n• Max Acceleration: 8.5G\n• Static Margin: 1.8 calibers ✅\n• Flight Time: 25 seconds\n\n**Advanced Features:**\n• Dual-deploy ready\n• Through-the-wall fin attachment\n• Rail button guidance system\n• Kevlar shock cord\n\n**Weather Considerations:**\n• Safe in winds up to 12 mph\n• Temperature range: -5°C to 35°C\n• Recommended field size: 500m radius\n\nReady to build this rocket?`;
      } else {
        return `🔥 High Performance Design (${targetAlt}ft target):\n\n**Advanced Configuration Required:**\n• Nose Cone: Von Karman carbon fiber\n• Body Tube: Phenolic 29mm, 600mm length\n• Fins: 3x carbon fiber, minimum drag profile\n• Motor: E15-6, F24-6, or G53-6\n• Recovery: Dual-deploy with drogue/main\n• Mass: ~350g loaded\n\n**Predicted Performance:**\n• Max Altitude: ${targetAlt + 100}ft\n• Max Velocity: 285 ft/s (Mach 0.25)\n• Max Acceleration: 12G\n• Static Margin: 2.1 calibers ✅\n• Flight Time: 45 seconds\n\n**High Power Features:**\n• Electronic altimeter required\n• Rail launch system (1010 rail)\n• Nomex heat protection\n• GPS tracking recommended\n\n⚠️ **Certification Required:**\n• NAR Level 1 certification needed\n• Launch field: >1000m radius\n• Weather limits: <8 mph wind\n\n**Estimated Cost:** $150-250\n\nThis is a serious high-power rocket. Do you have the required certifications?`;
      }
    }
    
    // Center of pressure calculations
    if (lowerPrompt.includes("center") && lowerPrompt.includes("pressure")) {
      return "📐 Advanced CP/CG Analysis:\n\n**Current Configuration:**\n• Center of Gravity (CG): 18.7cm from nose tip\n• Center of Pressure (CP): 21.3cm from nose tip\n• Static Margin: 1.44 calibers ✅\n• Stability Factor: Statically Stable\n\n**Component Contributions:**\n• Nose Cone: CP at 65% of length\n• Body Tube: Neutral contribution\n• Fins: CP at 75% of rocket length\n• Transition: +5% CP shift aft\n\n**Detailed Calculations:**\n• Fin Normal Force Coefficient: 0.8\n• Body Normal Force Coefficient: 0.3\n• Nose Cone Contribution: 15%\n• Fin Contribution: 85%\n\n**Stability Recommendations:**\n✅ Static margin within safe range (1.0-2.0)\n✅ CP sufficiently aft of CG\n⚠️ Monitor CG shift as motor burns\n\n**Flight Phases:**\n• Liftoff: Margin = 1.44 cal (stable)\n• Burnout: Margin = 1.62 cal (stable)\n• Coast: Margin = 1.58 cal (stable)\n\nYour rocket will remain stable throughout flight!";
    }
    
    // Multi-stage rocket designs
    if (lowerPrompt.includes("multi-stage") || lowerPrompt.includes("two stage") || lowerPrompt.includes("staging")) {
      return "🚀🚀 Multi-Stage Rocket Design:\n\n**2-Stage Configuration:**\n\n**Stage 1 (Booster):**\n• Body: 29mm phenolic, 250mm length\n• Motor: D12-0 (no ejection delay)\n• Fins: Large trapezoidal for stability\n• Mass: 180g loaded, 120g empty\n• Burn time: 1.8 seconds\n• Boost altitude: 145ft\n\n**Stage 2 (Sustainer):**\n• Body: 18mm tube, 200mm length\n• Motor: B6-4 (4-second delay)\n• Fins: Smaller delta configuration\n• Recovery: 12\" parachute\n• Mass: 45g loaded\n\n**Staging Mechanism:**\n• Spring-loaded separation system\n• Staging occurs at 150ft altitude\n• Separation velocity: 35 m/s\n• 0.2 second coast phase\n\n**Predicted Performance:**\n• Total Impulse: 22.5 Ns\n• Maximum Altitude: 1,650ft\n• Stage 1 Apogee: 180ft\n• Stage 2 Apogee: 1,650ft\n• Total Flight Time: 65 seconds\n\n**Critical Considerations:**\n⚠️ Staging alignment must be perfect\n⚠️ Requires advanced recovery planning\n⚠️ Complex construction and testing\n⚠️ Higher failure modes\n\n**Success Rate:** 75% for experienced builders\n\nWould you like detailed construction plans?";
    }
    
    // Troubleshooting and problem solving
    if (lowerPrompt.includes("problem") || lowerPrompt.includes("issue") || lowerPrompt.includes("fix") || lowerPrompt.includes("trouble")) {
      return "🔧 Rocket Troubleshooting Assistant:\n\n**Common Issues & Solutions:**\n\n**Flight Problems:**\n• **Unstable/Wobbly Flight:**\n  - Move CG forward (add nose weight)\n  - Increase fin area by 20%\n  - Check fin alignment\n\n• **Low Altitude Performance:**\n  - Check motor selection (undersized?)\n  - Reduce drag (sand smooth finish)\n  - Minimize mass (hollow components)\n\n• **Recovery Failures:**\n  - Increase ejection charge delay\n  - Use fresh recovery wadding\n  - Check shock cord attachment\n\n**Construction Issues:**\n• **Fin Misalignment:**\n  - Use fin alignment guide\n  - Double-check with square\n  - Sand joints smooth\n\n• **Motor Mount Problems:**\n  - Ensure tight fit (masking tape)\n  - Use proper centering rings\n  - Secure with epoxy fillets\n\n**Pre-Flight Checklist:**\n☑️ Static margin >1.0 calibers\n☑️ All joints secure and cured\n☑️ Recovery system packed properly\n☑️ Motor installed correctly\n☑️ Parachute protector in place\n\nWhat specific problem are you experiencing?";
    }
    
    // Default enhanced response
    return "🚀 Advanced Rocketry AI Assistant Ready!\n\nI can help you with comprehensive rocket design and analysis:\n\n**Design Services:**\n• Custom rocket configurations for any altitude target\n• Weather-optimized designs\n• Multi-stage rocket systems\n• Component selection from A-H class motors\n\n**Engineering Analysis:**\n• Stability calculations (CP/CG analysis)\n• Performance predictions with weather data\n• Optimization recommendations\n• Flight simulation with real physics\n\n**Problem Solving:**\n• Troubleshooting flight issues\n• Construction guidance\n• Safety recommendations\n• Regulatory compliance (NAR/TRA)\n\n**Example Queries:**\n• \"Design a rocket to reach 2000ft in 10mph winds\"\n• \"Calculate the center of pressure for my current design\"\n• \"Why is my rocket flying unstable?\"\n• \"Optimize my design for maximum altitude\"\n• \"Help me select the right motor for 500g rocket\"\n\nWhat would you like to work on today? Be specific about your goals, constraints, or problems!";
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
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
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