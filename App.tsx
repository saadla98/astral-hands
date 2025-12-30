
import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { ParticleSystem } from './ParticleSystem';
import { GestureState } from './types';
import { detectGesture } from './GestureEngine';
import { Camera, RefreshCw, Hand, Info, Sparkles, HelpCircle, X, Github } from 'lucide-react';

const GESTURE_GUIDE = [
  { name: 'Peace', icon: '✌️', desc: 'Blooms into a Flower' },
  { name: 'One Finger', icon: '☝️', desc: 'Forms a beating Heart' },
  { name: 'Fist', icon: '✊', desc: 'Saturn with rings' },
  { name: 'Open Palm', icon: '✋', desc: 'Floating Sphere' },
  { name: 'Thumbs Up', icon: '👍', desc: 'Fireworks explosion' },
  { name: 'Rock On', icon: '🤘', desc: 'Galaxy Spiral' },
  { name: 'Okay', icon: '👌', desc: 'Shining Star' },
  { name: 'Point Down', icon: '👇', desc: 'Ocean Wave' },
];

const App: React.FC = () => {
  const [gestureState, setGestureState] = useState<GestureState>({
    gesture: 'none',
    expansion: 0.5,
    color: '#00f2ff',
    shape: 'sphere'
  });
  const [isCapturing, setIsCapturing] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
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
    <div className="relative w-full h-screen bg-[#020205] text-white overflow-hidden font-sans selection:bg-purple-500/30">
      {/* Hidden Video/Canvas for processing */}
      <video ref={videoRef} autoPlay playsInline muted className="hidden" />
      <canvas ref={canvasRef} className="hidden" />

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

      {/* Header UI */}
      <div className="absolute top-0 left-0 w-full p-6 z-10 flex justify-between items-start pointer-events-none">
        <div className="pointer-events-auto">
          <h1 className="text-5xl font-black tracking-tighter flex items-center gap-3 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-purple-400 drop-shadow-lg">
            <Sparkles className="text-purple-400 w-10 h-10" />
            COSMIC HANDS
          </h1>
          <p className="text-purple-200/60 mt-2 text-sm uppercase tracking-[0.2em] font-medium ml-1">
            Interactive AI Particle Experience
          </p>
        </div>

        <div className="flex flex-col items-end gap-4 pointer-events-auto">
          <button 
            onClick={() => setShowHelp(true)}
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <HelpCircle className="w-5 h-5 text-purple-300 group-hover:text-white transition-colors" />
            <span className="text-sm font-medium text-purple-200 group-hover:text-white">Gesture Guide</span>
          </button>

          <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-5 rounded-2xl flex flex-col gap-4 shadow-2xl min-w-[200px]">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className={`w-3 h-3 rounded-full ${isCapturing ? 'bg-yellow-400' : 'bg-green-500'} transition-colors duration-300`} />
                {isCapturing && <div className="absolute inset-0 w-3 h-3 rounded-full bg-yellow-400 animate-ping opacity-75" />}
              </div>
              <span className="text-xs font-mono uppercase tracking-wider text-gray-300">
                {isCapturing ? 'AI Analyzing...' : 'System Ready'}
              </span>
            </div>
            
            <div className="space-y-1 pt-2 border-t border-white/5">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Current Gesture</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 capitalize">
                  {gestureState.gesture}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Help Modal */}
      {showHelp && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-[#0a0a10]/90 border border-purple-500/20 rounded-3xl p-8 max-w-4xl w-full shadow-2xl relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />

            <button 
              onClick={() => setShowHelp(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6 text-gray-400 hover:text-white" />
            </button>

            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <Hand className="text-purple-400" />
              <span>Gesture Guide</span>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {GESTURE_GUIDE.map((g) => (
                <div key={g.name} className="bg-white/5 border border-white/5 rounded-xl p-4 hover:bg-white/10 transition-all hover:scale-105 hover:border-purple-500/30 group">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{g.icon}</div>
                  <h3 className="font-bold text-lg text-purple-200 mb-1">{g.name}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{g.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center text-sm text-gray-500 border-t border-white/5 pt-6">
              <p>Show these gestures to your camera to control the particles.</p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-red-500/10 border border-red-500/20 text-red-200 px-6 py-3 rounded-full backdrop-blur-md flex items-center gap-3">
          <Info className="w-5 h-5" />
          {error}
        </div>
      )}
    </div>
  );
};

export default App;
