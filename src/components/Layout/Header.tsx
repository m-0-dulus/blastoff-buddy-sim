import { Rocket, Settings, Share2, Download, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="border-b border-border/50 bg-card/80 backdrop-blur-md panel-shadow">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Rocket className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                RocketLab AI
              </h1>
              <p className="text-xs text-muted-foreground">Virtual Rocketry Laboratory</p>
            </div>
          </div>
        </div>

        <nav className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="ghost" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </nav>
      </div>
    </header>
  );
};