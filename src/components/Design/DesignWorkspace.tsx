import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, BarChart3, Settings, RefreshCw, Eye, Box } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { RocketViewer2D } from "@/components/2D/RocketViewer2D";
import { AnalysisPanel } from "@/components/Analysis/AnalysisPanel";
import { SimulationPanel } from "@/components/Simulation/SimulationPanel";

interface RocketComponent {
  id: string;
  name: string;
  type: string;
  position: { x: number; y: number };
  properties: Record<string, any>;
}

export const DesignWorkspace = () => {
  const [components, setComponents] = useState<RocketComponent[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"2d" | "3d">("3d");
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showSimulation, setShowSimulation] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const componentData = JSON.parse(e.dataTransfer.getData("application/json"));
    const rect = e.currentTarget.getBoundingClientRect();
    
    const newComponent: RocketComponent = {
      id: Date.now().toString(),
      name: componentData.name,
      type: componentData.type,
      position: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      },
      properties: {}
    };

    setComponents(prev => [...prev, newComponent]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const simulateRocket = () => {
    // Placeholder for simulation logic
    console.log("Running simulation with components:", components);
  };

  const getComponentIcon = (type: string) => {
    const iconMap: Record<string, string> = {
      nosecone: "🔺",
      body: "🟫",
      fins: "🔹",
      motor: "⚡",
      recovery: "🪂"
    };
    return iconMap[type] || "⚙️";
  };

  return (
    <Card className="h-full bg-surface/30 border-border/50 overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-border/50">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">Design Workspace</h3>
          <Badge variant="secondary">{components.length} components</Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex border rounded-lg">
            <Button 
              variant={viewMode === "3d" ? "default" : "ghost"} 
              size="sm"
              onClick={() => setViewMode("3d")}
              className="rounded-r-none"
            >
              <Box className="h-4 w-4 mr-1" />
              3D
            </Button>
            <Button 
              variant={viewMode === "2d" ? "default" : "ghost"} 
              size="sm"
              onClick={() => setViewMode("2d")}
              className="rounded-l-none"
            >
              <Eye className="h-4 w-4 mr-1" />
              2D
            </Button>
          </div>
          <Button variant="outline" size="sm" onClick={() => setComponents([])}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Clear
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Properties
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShowAnalysis(true)}>
            <BarChart3 className="h-4 w-4 mr-2" />
            Analysis
          </Button>
          <Button onClick={() => setShowSimulation(true)} className="cosmic-glow">
            <Play className="h-4 w-4 mr-2" />
            Simulate
          </Button>
        </div>
      </div>

      {viewMode === "3d" ? (
        <div
          className="flex-1 relative grid-pattern"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
        {/* Center line for rocket alignment */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary/30 transform -translate-x-1/2" />
        
        {/* Components */}
        {components.map((component) => (
          <div
            key={component.id}
            className={`absolute p-3 rounded-lg border-2 cursor-pointer transition-all ${
              selectedComponent === component.id
                ? "border-primary bg-primary/20 cosmic-glow"
                : "border-border/50 bg-surface/70 hover:border-primary/50"
            }`}
            style={{
              left: component.position.x - 50,
              top: component.position.y - 25,
              width: 100,
              height: 50,
            }}
            onClick={() => setSelectedComponent(component.id)}
          >
            <div className="text-center">
              <div className="text-lg">{getComponentIcon(component.type)}</div>
              <div className="text-xs font-medium">{component.name}</div>
            </div>
          </div>
        ))}

        {/* Drop zone hint */}
        {components.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <h3 className="text-lg font-semibold mb-2">Start Building Your Rocket</h3>
              <p className="text-sm">
                Drag components from the sidebar to design your rocket
              </p>
            </div>
          </div>
        )}

        {/* Performance indicators */}
        {components.length > 0 && (
          <div className="absolute top-4 right-4 space-y-2">
            <Card className="p-3 bg-surface/80 backdrop-blur-sm border-border/50">
              <div className="text-xs text-muted-foreground mb-1">Quick Stats</div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Est. Altitude:</span>
                  <span className="font-mono text-accent">843 ft</span>
                </div>
                <div className="flex justify-between">
                  <span>Stability:</span>
                  <span className="font-mono text-primary">1.4 cal</span>
                </div>
                <div className="flex justify-between">
                  <span>Mass:</span>
                  <span className="font-mono text-thrust">142 g</span>
                </div>
              </div>
            </Card>
          </div>
        )}
        </div>
      ) : (
        <div className="flex-1">
          <RocketViewer2D components={components} />
        </div>
      )}

      {/* Analysis Panel */}
      <AnalysisPanel 
        components={components}
        isOpen={showAnalysis}
        onClose={() => setShowAnalysis(false)}
      />

      {/* Simulation Panel */}
      <SimulationPanel 
        components={components}
        isOpen={showSimulation}
        onClose={() => setShowSimulation(false)}
      />
    </Card>
  );
};