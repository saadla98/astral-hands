
import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { ParticleSystem } from './ParticleSystem';
import { GestureState } from './types';
import { detectGesture } from './GestureEngine';
import { Camera, RefreshCw, Hand, Info, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [gestureState, setGestureState] = useState<GestureState>({
    gesture: 'none',
    expansion: 0.5,
    color: '#00f2ff',
    shape: 'sphere'
  });
  const [isCapturing, setIsCapturing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { width: 640, height: 480, facingMode: 'user' } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        setError("Camera access denied. Please enable camera permissions.");
        console.error(err);
      }
    };
    startCamera();
  }, []);

  useEffect(() => {
    let interval: number;
    if (videoRef.current) {
      interval = window.setInterval(async () => {
        if (!videoRef.current || !canvasRef.current || isCapturing) return;
        
        setIsCapturing(true);
        const context = canvasRef.current.getContext('2d');
        if (context) {
          canvasRef.current.width = 320;
          canvasRef.current.height = 240;
          context.drawImage(videoRef.current, 0, 0, 320, 240);
          const base64 = canvasRef.current.toDataURL('image/jpeg', 0.6).split(',')[1];
          
          const newState = await detectGesture(base64);
          setGestureState(newState);
        }
        setIsCapturing(false);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isCapturing]);

  return (
    <div className="relative w-full h-screen bg-black text-white overflow-hidden">
      {/* 3D Scene */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <color attach="background" args={['#020205']} />
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <ParticleSystem state={gestureState} />
          <EffectComposer>
            <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} radius={0.4} />
          </EffectComposer>
        </Canvas>
      </div>

      {/* UI Overlay */}
      <div className="absolute top-0 left-0 p-8 z-10 pointer-events-none w-full flex justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tighter flex items-center gap-2">
            <Sparkles className="text-purple-400" /> COSMIC <span className="text-purple-400">GESTURES</span>
          </h1>
          <p className="text-gray-400 mt-2 max-w-xs text-sm uppercase tracking-widest font-semibold">
            Interactive AI-Powered Hand Tracking Experience
          </p>
        </div>

        <div className="bg-black/40 backdrop-blur-md border border-white/10 p-4 rounded-xl pointer-events-auto flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${isCapturing ? 'bg-yellow-400 animate-pulse' : 'bg-green-500'}`} />
            <span className="text-xs font-mono uppercase tracking-wider">
              {isCapturing ? 'AI Analyzing...' : 'System Active'}
            </span>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Detected Gesture</p>
            <p className="text-xl font-bold text-cyan-400 capitalize">{gestureState.gesture}</p>
          </div>
        </div>
      </div>

      {/* Camera Preview */}
      <div className="absolute bottom-8 right-8 z-20">
        <div className="relative group">
          <video 
            ref={videoRef} 
            autoPlay 
            muted 
            playsInline 
            className="w-48 h-36 rounded-lg border-2 border-white/20 object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-500"
          />
          <div className="absolute inset-0 rounded-lg border border-white/10 pointer-events-none group-hover:border-cyan-400/50 transition-colors" />
          <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 rounded text-[10px] uppercase font-bold tracking-widest flex items-center gap-1">
            <Camera size={10} /> Live Feed
          </div>
        </div>
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {/* Legend */}
      <div className="absolute bottom-8 left-8 z-20 flex gap-4">
        {[
          { label: 'Peace', shape: 'Flower', icon: '✌️' },
          { label: 'One', shape: 'Heart', icon: '☝️' },
          { label: 'Fist', shape: 'Saturn', icon: '✊' },
          { label: 'Palm', shape: 'Sphere', icon: '🖐️' },
          { label: 'Thumb', shape: 'Fireworks', icon: '👍' },
          { label: 'Rock', shape: 'Spiral', icon: '🤘' },
          { label: 'Point Down', shape: 'Wave', icon: '👇' },
          { label: 'Okay', shape: 'Star', icon: '👌' },
        ].map((item) => (
          <div key={item.label} className={`flex flex-col items-center p-3 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm transition-all duration-300 ${gestureState.gesture === item.label.toLowerCase().replace(/ /g, '_') ? 'border-cyan-400 scale-110 bg-cyan-400/10' : 'opacity-60'}`}>
            <span className="text-xl mb-1">{item.icon}</span>
            <span className="text-[9px] uppercase font-bold tracking-tighter text-gray-300">{item.shape}</span>
          </div>
        ))}
      </div>

      {error && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/80 backdrop-blur-sm">
          <div className="bg-red-900/20 border border-red-500/50 p-6 rounded-2xl max-w-sm text-center">
            <h2 className="text-xl font-bold text-red-400 mb-2">Access Error</h2>
            <p className="text-gray-300 text-sm mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-500 hover:bg-red-400 text-white rounded-lg font-bold text-sm flex items-center gap-2 mx-auto transition-colors"
            >
              <RefreshCw size={16} /> Retry Access
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
