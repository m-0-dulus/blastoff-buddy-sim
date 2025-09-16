import { Header } from "@/components/Layout/Header";
import { Sidebar } from "@/components/Layout/Sidebar";
import { DesignWorkspace } from "@/components/Design/DesignWorkspace";
import { RocketViewer } from "@/components/3D/RocketViewer";
import { RocketViewer2D } from "@/components/2D/RocketViewer2D";
import { AIAssistant } from "@/components/AI/AIAssistant";
import spaceBackground from "@/assets/space-background.jpg";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${spaceBackground})` }}
      />
      <div className="fixed inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-screen">
        <Header />
        
        <div className="flex-1 flex overflow-hidden">
          {/* Component Library Sidebar */}
          <Sidebar />
          
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col gap-4 p-4">
            {/* Top Row - Design Workspace */}
            <div className="flex gap-4 h-1/2">
              <div className="flex-1">
                <DesignWorkspace />
              </div>
              <div className="w-80">
                <AIAssistant />
              </div>
            </div>
            
            {/* Bottom Row - 3D Viewer */}
            <div className="flex-1">
              <RocketViewer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;