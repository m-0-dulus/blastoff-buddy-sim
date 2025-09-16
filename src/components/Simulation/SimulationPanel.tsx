import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Play, Pause, RotateCcw, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RocketComponent {
  id: string;
  name: string;
  type: string;
  position: { x: number; y: number };
  properties: Record<string, any>;
}

interface SimulationPanelProps {
  components: RocketComponent[];
  isOpen: boolean;
  onClose: () => void;
}

export const SimulationPanel = ({ components, isOpen, onClose }: SimulationPanelProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [conditions, setConditions] = useState({
    windSpeed: 5,
    temperature: 20,
    pressure: 1013,
    humidity: 60,
    launchAngle: 90
  });

  if (!isOpen) return null;

  const runSimulation = () => {
    setIsRunning(true);
    setCurrentTime(0);
    
    // Simulate flight progress
    const interval = setInterval(() => {
      setCurrentTime(prev => {
        const newTime = prev + 0.1;
        if (newTime >= 45) {
          setIsRunning(false);
          clearInterval(interval);
          return 45;
        }
        return newTime;
      });
    }, 100);
  };

  const resetSimulation = () => {
    setIsRunning(false);
    setCurrentTime(0);
  };

  const getFlightPhase = (time: number) => {
    if (time < 2.5) return "Boost";
    if (time < 8.2) return "Coast";
    if (time < 45) return "Recovery";
    return "Landed";
  };

  const getCurrentAltitude = (time: number) => {
    if (time < 2.5) {
      // Boost phase - accelerating
      return Math.round(50 * time * time);
    } else if (time < 8.2) {
      // Coast phase - decelerating to apogee
      const boostAlt = 50 * 2.5 * 2.5;
      const coastTime = time - 2.5;
      const remainingAlt = 700 - boostAlt;
      return Math.round(boostAlt + remainingAlt * (1 - Math.pow(coastTime / 5.7, 2)));
    } else {
      // Recovery phase - descending
      const recoveryTime = time - 8.2;
      const maxAlt = 850 + components.length * 150;
      return Math.round(Math.max(0, maxAlt - 5 * recoveryTime * recoveryTime));
    }
  };

  const getCurrentVelocity = (time: number) => {
    if (time < 2.5) {
      return Math.round(40 * time);
    } else if (time < 8.2) {
      const maxVel = 100;
      const coastTime = time - 2.5;
      return Math.round(maxVel * (1 - coastTime / 5.7));
    } else {
      return -5; // Descent under parachute
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-5xl w-full max-h-[90vh] overflow-y-auto bg-card border-border">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Play className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Flight Simulation</h2>
            </div>
            <Button variant="ghost" onClick={onClose}>
              ✕
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Simulation Controls */}
            <div className="col-span-1 space-y-4">
              <Card className="p-4 bg-surface/50">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Play className="h-4 w-4" />
                  Simulation Controls
                </h3>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Button 
                      onClick={runSimulation} 
                      disabled={isRunning}
                      className="flex-1"
                    >
                      {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      {isRunning ? "Running" : "Start"}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={resetSimulation}
                      disabled={isRunning}
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Time:</span>
                      <span className="font-mono">{currentTime.toFixed(1)}s</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Phase:</span>
                      <Badge variant="outline">{getFlightPhase(currentTime)}</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Altitude:</span>
                      <span className="font-mono">{getCurrentAltitude(currentTime)}ft</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Velocity:</span>
                      <span className="font-mono">{getCurrentVelocity(currentTime)}m/s</span>
                    </div>
                  </div>
                  
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-200"
                      style={{ width: `${(currentTime / 45) * 100}%` }}
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-surface/50">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Launch Conditions
                </h3>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="windSpeed" className="text-xs">Wind Speed (m/s)</Label>
                    <Input 
                      id="windSpeed"
                      type="number" 
                      value={conditions.windSpeed}
                      onChange={(e) => setConditions(prev => ({...prev, windSpeed: Number(e.target.value)}))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="temperature" className="text-xs">Temperature (°C)</Label>
                    <Input 
                      id="temperature"
                      type="number" 
                      value={conditions.temperature}
                      onChange={(e) => setConditions(prev => ({...prev, temperature: Number(e.target.value)}))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="launchAngle" className="text-xs">Launch Angle (°)</Label>
                    <Input 
                      id="launchAngle"
                      type="number" 
                      value={conditions.launchAngle}
                      onChange={(e) => setConditions(prev => ({...prev, launchAngle: Number(e.target.value)}))}
                      className="mt-1"
                    />
                  </div>
                </div>
              </Card>
            </div>

            {/* Simulation Display */}
            <div className="col-span-2">
              <Tabs defaultValue="trajectory" className="h-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="trajectory">Trajectory</TabsTrigger>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                  <TabsTrigger value="events">Events</TabsTrigger>
                </TabsList>

                <TabsContent value="trajectory" className="mt-4">
                  <Card className="p-4 bg-surface/50 h-96">
                    <h3 className="font-semibold mb-4">Flight Path Visualization</h3>
                    <div className="relative h-full bg-gradient-to-b from-blue-50 to-green-50 rounded-lg border">
                      {/* Simple trajectory visualization */}
                      <div className="absolute bottom-4 left-4 w-2 h-2 bg-red-500 rounded-full" />
                      <div className="absolute bottom-4 left-6 text-xs text-muted-foreground">Launch Pad</div>
                      
                      {currentTime > 0 && (
                        <div 
                          className="absolute w-3 h-3 bg-primary rounded-full transition-all duration-200"
                          style={{
                            bottom: `${(getCurrentAltitude(currentTime) / 1000) * 80 + 20}px`,
                            left: `${20 + (currentTime / 45) * 200}px`
                          }}
                        />
                      )}
                      
                      {/* Grid lines for altitude reference */}
                      {[200, 400, 600, 800, 1000].map(alt => (
                        <div 
                          key={alt}
                          className="absolute left-0 right-0 border-t border-muted text-xs text-muted-foreground pl-2"
                          style={{ bottom: `${(alt / 1000) * 80 + 20}px` }}
                        >
                          {alt}ft
                        </div>
                      ))}
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="performance" className="mt-4">
                  <Card className="p-4 bg-surface/50 h-96">
                    <h3 className="font-semibold mb-4">Performance Graphs</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-primary">
                            {getCurrentAltitude(currentTime)}ft
                          </div>
                          <div className="text-sm text-muted-foreground">Current Altitude</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-accent">
                            {Math.abs(getCurrentVelocity(currentTime))}m/s
                          </div>
                          <div className="text-sm text-muted-foreground">Current Speed</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-thrust">
                            {850 + components.length * 150}ft
                          </div>
                          <div className="text-sm text-muted-foreground">Max Altitude</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-primary">
                            {100 + components.length * 10}m/s
                          </div>
                          <div className="text-sm text-muted-foreground">Max Velocity</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="events" className="mt-4">
                  <Card className="p-4 bg-surface/50 h-96 overflow-y-auto">
                    <h3 className="font-semibold mb-4">Flight Events Log</h3>
                    <div className="space-y-2 text-sm">
                      {currentTime >= 0 && <div className="flex justify-between">
                        <span>T+0.0s: Ignition</span>
                        <Badge variant="outline">✓</Badge>
                      </div>}
                      {currentTime >= 0.5 && <div className="flex justify-between">
                        <span>T+0.5s: Liftoff</span>
                        <Badge variant="outline">✓</Badge>
                      </div>}
                      {currentTime >= 2.5 && <div className="flex justify-between">
                        <span>T+2.5s: Burnout</span>
                        <Badge variant="outline">✓</Badge>
                      </div>}
                      {currentTime >= 8.2 && <div className="flex justify-between">
                        <span>T+8.2s: Apogee</span>
                        <Badge variant="outline">✓</Badge>
                      </div>}
                      {currentTime >= 8.5 && <div className="flex justify-between">
                        <span>T+8.5s: Ejection</span>
                        <Badge variant="outline">✓</Badge>
                      </div>}
                      {currentTime >= 45 && <div className="flex justify-between">
                        <span>T+45.0s: Landing</span>
                        <Badge variant="outline">✓</Badge>
                      </div>}
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};