import { Card } from "@/components/ui/card";

interface RocketComponent {
  id: string;
  name: string;
  type: string;
  position: { x: number; y: number };
  properties: Record<string, any>;
}

interface RocketViewer2DProps {
  components: RocketComponent[];
}

export const RocketViewer2D = ({ components }: RocketViewer2DProps) => {
  const getComponentSVG = (component: RocketComponent, index: number) => {
    const y = index * 40 + 50;
    const width = 120;
    const height = 30;
    
    switch (component.type) {
      case "nosecone":
        return (
          <g key={component.id} transform={`translate(140, ${y})`}>
            <polygon 
              points={`0,${height/2} ${width},0 ${width},${height}`}
              fill="hsl(var(--primary))"
              stroke="hsl(var(--primary-foreground))"
              strokeWidth="1"
            />
            <text x={width/2} y={height/2 + 4} textAnchor="middle" className="fill-primary-foreground text-xs">
              {component.name}
            </text>
          </g>
        );
      case "body":
        return (
          <g key={component.id} transform={`translate(140, ${y})`}>
            <rect 
              width={width} 
              height={height}
              fill="hsl(var(--secondary))"
              stroke="hsl(var(--secondary-foreground))"
              strokeWidth="1"
            />
            <text x={width/2} y={height/2 + 4} textAnchor="middle" className="fill-secondary-foreground text-xs">
              {component.name}
            </text>
          </g>
        );
      case "fins":
        return (
          <g key={component.id} transform={`translate(140, ${y})`}>
            <rect 
              width={width} 
              height={height}
              fill="hsl(var(--accent))"
              stroke="hsl(var(--accent-foreground))"
              strokeWidth="1"
            />
            <polygon 
              points={`${width-20},0 ${width+20},${height/2} ${width-20},${height}`}
              fill="hsl(var(--accent))"
              stroke="hsl(var(--accent-foreground))"
              strokeWidth="1"
            />
            <text x={width/2} y={height/2 + 4} textAnchor="middle" className="fill-accent-foreground text-xs">
              {component.name}
            </text>
          </g>
        );
      case "motor":
        return (
          <g key={component.id} transform={`translate(140, ${y})`}>
            <rect 
              width={width} 
              height={height}
              fill="hsl(var(--thrust))"
              stroke="hsl(var(--thrust-foreground))"
              strokeWidth="1"
            />
            <circle 
              cx={width/2} 
              cy={height/2} 
              r={8}
              fill="hsl(var(--thrust-foreground))"
            />
            <text x={width/2} y={height/2 + 4} textAnchor="middle" className="fill-thrust-foreground text-xs">
              {component.name}
            </text>
          </g>
        );
      case "recovery":
        return (
          <g key={component.id} transform={`translate(140, ${y})`}>
            <rect 
              width={width} 
              height={height}
              fill="hsl(var(--muted))"
              stroke="hsl(var(--muted-foreground))"
              strokeWidth="1"
            />
            <circle 
              cx={width-15} 
              cy={height/2} 
              r={10}
              fill="none"
              stroke="hsl(var(--muted-foreground))"
              strokeWidth="2"
            />
            <text x={width/2} y={height/2 + 4} textAnchor="middle" className="fill-muted-foreground text-xs">
              {component.name}
            </text>
          </g>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="h-full bg-surface/20 border-border/50 overflow-hidden">
      <div className="h-full w-full relative">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 400 600"
          className="bg-surface/10"
        >
          {/* Center line */}
          <line 
            x1="200" 
            y1="0" 
            x2="200" 
            y2="600"
            stroke="hsl(var(--primary))"
            strokeWidth="1"
            strokeDasharray="5,5"
            opacity="0.5"
          />
          
          {/* Grid */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path 
                d="M 20 0 L 0 0 0 20" 
                fill="none" 
                stroke="hsl(var(--border))" 
                strokeWidth="0.5"
                opacity="0.3"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Components */}
          {components.map((component, index) => getComponentSVG(component, index))}
          
          {/* Empty state */}
          {components.length === 0 && (
            <g>
              <text x="200" y="280" textAnchor="middle" className="fill-muted-foreground text-sm font-semibold">
                2D Schematic View
              </text>
              <text x="200" y="300" textAnchor="middle" className="fill-muted-foreground text-xs">
                Components will appear here as you add them
              </text>
            </g>
          )}
        </svg>
        
        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-card/80 backdrop-blur-sm rounded-lg p-3 border border-border/50">
          <h3 className="font-semibold text-sm mb-2">2D View</h3>
          <div className="text-xs text-muted-foreground space-y-1">
            <p>• Schematic representation</p>
            <p>• Center line for alignment</p>
            <p>• Component dimensions</p>
          </div>
        </div>
      </div>
    </Card>
  );
};