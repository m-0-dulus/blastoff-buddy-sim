import { useState } from "react";
import { 
  Box, 
  Circle, 
  Triangle, 
  Zap, 
  ChevronDown, 
  ChevronRight,
  Package,
  Wrench
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface ComponentCategory {
  name: string;
  icon: React.ReactNode;
  components: Array<{
    name: string;
    type: string;
    icon: React.ReactNode;
  }>;
}

const componentCategories: ComponentCategory[] = [
  {
    name: "Nose Cones",
    icon: <Triangle className="h-4 w-4" />,
    components: [
      { name: "Conical", type: "nosecone", icon: <Triangle className="h-3 w-3" /> },
      { name: "Ogive", type: "nosecone", icon: <Triangle className="h-3 w-3" /> },
      { name: "Parabolic", type: "nosecone", icon: <Triangle className="h-3 w-3" /> },
    ]
  },
  {
    name: "Body Tubes",
    icon: <Box className="h-4 w-4" />,
    components: [
      { name: "Standard Tube", type: "body", icon: <Box className="h-3 w-3" /> },
      { name: "Coupler", type: "body", icon: <Box className="h-3 w-3" /> },
      { name: "Transition", type: "body", icon: <Box className="h-3 w-3" /> },
    ]
  },
  {
    name: "Fins",
    icon: <Package className="h-4 w-4" />,
    components: [
      { name: "Trapezoidal", type: "fins", icon: <Package className="h-3 w-3" /> },
      { name: "Elliptical", type: "fins", icon: <Package className="h-3 w-3" /> },
      { name: "Delta", type: "fins", icon: <Package className="h-3 w-3" /> },
    ]
  },
  {
    name: "Motors",
    icon: <Zap className="h-4 w-4" />,
    components: [
      { name: "A8-3", type: "motor", icon: <Zap className="h-3 w-3" /> },
      { name: "B6-4", type: "motor", icon: <Zap className="h-3 w-3" /> },
      { name: "C6-5", type: "motor", icon: <Zap className="h-3 w-3" /> },
      { name: "D12-5", type: "motor", icon: <Zap className="h-3 w-3" /> },
      { name: "E9-6", type: "motor", icon: <Zap className="h-3 w-3" /> },
      { name: "F15-8", type: "motor", icon: <Zap className="h-3 w-3" /> },
      { name: "G80-10", type: "motor", icon: <Zap className="h-3 w-3" /> },
      { name: "H128-14", type: "motor", icon: <Zap className="h-3 w-3" /> },
    ]
  },
  {
    name: "Recovery",
    icon: <Circle className="h-4 w-4" />,
    components: [
      { name: "Parachute", type: "recovery", icon: <Circle className="h-3 w-3" /> },
      { name: "Streamer", type: "recovery", icon: <Circle className="h-3 w-3" /> },
      { name: "Drogue", type: "recovery", icon: <Circle className="h-3 w-3" /> },
    ]
  }
];

export const Sidebar = () => {
  const [openCategories, setOpenCategories] = useState<string[]>(["Nose Cones"]);

  const toggleCategory = (categoryName: string) => {
    setOpenCategories(prev => 
      prev.includes(categoryName) 
        ? prev.filter(name => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  const handleDragStart = (e: React.DragEvent, component: any) => {
    e.dataTransfer.setData("application/json", JSON.stringify(component));
  };

  return (
    <div className="w-80 border-r border-border/50 bg-card/50 backdrop-blur-sm h-full overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Wrench className="h-5 w-5 text-primary" />
          <h2 className="font-semibold text-card-foreground">Component Library</h2>
        </div>

        <div className="space-y-2">
          {componentCategories.map((category) => (
            <Card key={category.name} className="bg-surface/50 border-border/30">
              <Collapsible
                open={openCategories.includes(category.name)}
                onOpenChange={() => toggleCategory(category.name)}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-start h-auto p-3 hover:bg-surface-elevated/50"
                  >
                    {openCategories.includes(category.name) ? (
                      <ChevronDown className="h-4 w-4 mr-2" />
                    ) : (
                      <ChevronRight className="h-4 w-4 mr-2" />
                    )}
                    {category.icon}
                    <span className="ml-2 font-medium">{category.name}</span>
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="px-3 pb-3">
                  <div className="space-y-1">
                    {category.components.map((component) => (
                      <div
                        key={component.name}
                        draggable
                        onDragStart={(e) => handleDragStart(e, component)}
                        className="rocket-component p-2 flex items-center gap-2 text-sm"
                      >
                        {component.icon}
                        <span>{component.name}</span>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};