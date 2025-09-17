import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid, Environment } from "@react-three/drei";
import { Suspense } from "react";
import { RocketModel } from "./RocketModel";

export const RocketViewer = () => {
  return (
    <div className="h-full w-full bg-surface/20 rounded-lg border border-border/50 overflow-hidden">
      <Canvas
        camera={{ position: [5, 5, 5], fov: 50 }}
        style={{ height: "100%", width: "100%" }}
      >
        <Suspense fallback={null}>
          <Environment preset="sunset" />
          
          {/* Lighting setup */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          
          {/* Grid for reference */}
          <Grid
            args={[20, 20]}
            cellSize={1}
            cellThickness={0.5}
            cellColor="#3B82F6"
            sectionSize={5}
            sectionThickness={1}
            sectionColor="#10B981"
            fadeDistance={25}
            fadeStrength={1}
            followCamera={false}
            infiniteGrid={true}
          />
          
          {/* Rocket model */}
          <RocketModel />
          
          {/* Controls */}
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={2}
            maxDistance={20}
          />
        </Suspense>
      </Canvas>
      
      {/* 3D Viewer overlay info */}
      <div className="absolute bottom-4 left-4 bg-card/80 backdrop-blur-sm rounded-lg p-3 border border-border/50">
        <h3 className="font-semibold text-sm mb-2">3D Controls</h3>
        <div className="text-xs text-muted-foreground space-y-1">
          <p>• Drag to rotate</p>
          <p>• Scroll to zoom</p>
          <p>• Right-click to pan</p>
        </div>
      </div>
    </div>
  );
};