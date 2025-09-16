import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, TrendingUp, Gauge, AlertTriangle, CheckCircle } from "lucide-react";

interface RocketComponent {
  id: string;
  name: string;
  type: string;
  position: { x: number; y: number };
  properties: Record<string, any>;
}

interface AnalysisPanelProps {
  components: RocketComponent[];
  isOpen: boolean;
  onClose: () => void;
}

export const AnalysisPanel = ({ components, isOpen, onClose }: AnalysisPanelProps) => {
  if (!isOpen) return null;

  const calculateAnalysis = () => {
    const totalMass = components.length * 25 + 50; // Simplified calculation
    const centerOfGravity = components.length > 0 ? 150 + components.length * 30 : 0;
    const centerOfPressure = components.length > 0 ? 180 + components.length * 35 : 0;
    const staticMargin = centerOfPressure > centerOfGravity ? 
      ((centerOfPressure - centerOfGravity) / 50).toFixed(2) : 0;
    
    const stability = parseFloat(staticMargin.toString());
    const isStable = stability >= 1.0 && stability <= 3.0;
    
    return {
      totalMass,
      centerOfGravity,
      centerOfPressure,
      staticMargin,
      isStable,
      estimatedAltitude: Math.round(800 + components.length * 150),
      maxVelocity: Math.round(45 + components.length * 8),
      maxAcceleration: Math.round(8 + components.length * 2)
    };
  };

  const analysis = calculateAnalysis();

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-card border-border">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Rocket Analysis</h2>
            </div>
            <Button variant="ghost" onClick={onClose}>
              ✕
            </Button>
          </div>

          <Tabs defaultValue="stability" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="stability">Stability</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="trajectory">Trajectory</TabsTrigger>
              <TabsTrigger value="recovery">Recovery</TabsTrigger>
            </TabsList>

            <TabsContent value="stability" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 bg-surface/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Gauge className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold">Stability Analysis</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Static Margin:</span>
                      <Badge variant={analysis.isStable ? "default" : "destructive"}>
                        {analysis.staticMargin} cal
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Center of Gravity:</span>
                      <span className="font-mono">{analysis.centerOfGravity}mm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Center of Pressure:</span>
                      <span className="font-mono">{analysis.centerOfPressure}mm</span>
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      {analysis.isStable ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      )}
                      <span className={`text-sm ${analysis.isStable ? 'text-green-500' : 'text-red-500'}`}>
                        {analysis.isStable ? 'Stable Configuration' : 'Unstable - Needs Adjustment'}
                      </span>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 bg-surface/50">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-accent" />
                    <h3 className="font-semibold">Mass Properties</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Mass:</span>
                      <span className="font-mono">{analysis.totalMass}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Loaded Mass:</span>
                      <span className="font-mono">{analysis.totalMass + 15}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Empty Mass:</span>
                      <span className="font-mono">{analysis.totalMass - 15}g</span>
                    </div>
                  </div>
                </Card>
              </div>

              {!analysis.isStable && (
                <Card className="p-4 bg-destructive/10 border-destructive/20">
                  <h3 className="font-semibold text-destructive mb-2">Stability Recommendations</h3>
                  <div className="text-sm space-y-1">
                    <p>• Add nose weight to move CG forward</p>
                    <p>• Increase fin area to move CP backward</p>
                    <p>• Consider moving fins further aft</p>
                    <p>• Target static margin: 1.0 - 2.0 calibers</p>
                  </div>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="performance" className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <Card className="p-4 bg-surface/50 text-center">
                  <div className="text-2xl font-bold text-primary">{analysis.estimatedAltitude}</div>
                  <div className="text-sm text-muted-foreground">Estimated Altitude (ft)</div>
                </Card>
                <Card className="p-4 bg-surface/50 text-center">
                  <div className="text-2xl font-bold text-accent">{analysis.maxVelocity}</div>
                  <div className="text-sm text-muted-foreground">Max Velocity (m/s)</div>
                </Card>
                <Card className="p-4 bg-surface/50 text-center">
                  <div className="text-2xl font-bold text-thrust">{analysis.maxAcceleration}</div>
                  <div className="text-sm text-muted-foreground">Max Acceleration (G)</div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="trajectory" className="space-y-4">
              <Card className="p-4 bg-surface/50">
                <h3 className="font-semibold mb-4">Flight Trajectory Simulation</h3>
                <div className="space-y-2 text-sm">
                  <p>• Boost Phase: 0-2.5s, reaching {analysis.maxVelocity}m/s</p>
                  <p>• Coast Phase: 2.5-8.2s, decelerating to apogee</p>
                  <p>• Recovery Phase: 8.2-45s, descent under parachute</p>
                  <p>• Landing Velocity: ~5m/s (safe recovery)</p>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="recovery" className="space-y-4">
              <Card className="p-4 bg-surface/50">
                <h3 className="font-semibold mb-4">Recovery System Analysis</h3>
                <div className="space-y-2 text-sm">
                  <p>• Recommended parachute diameter: 30cm</p>
                  <p>• Ejection delay: 4-6 seconds</p>
                  <p>• Descent rate: 4-6 m/s</p>
                  <p>• Recovery wadding: 3-4 sheets</p>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  );
};