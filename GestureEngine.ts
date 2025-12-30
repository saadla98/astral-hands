
import { GoogleGenAI, Type } from "@google/genai";
import { GestureState } from "./types";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

// Demo mode - cycles through gestures when API quota is exceeded
const DEMO_MODE = false;
const DEMO_GESTURES: GestureState[] = [
  { gesture: 'peace', expansion: 0.8, color: '#ff69b4', shape: 'flower' },
  { gesture: 'one', expansion: 0.6, color: '#ff4444', shape: 'heart' },
  { gesture: 'fist', expansion: 0.2, color: '#ffd700', shape: 'saturn' },
  { gesture: 'palm', expansion: 1.0, color: '#00f2ff', shape: 'sphere' },
  { gesture: 'thumbs_up', expansion: 0.7, color: '#ff6600', shape: 'fireworks' },
  { gesture: 'rock', expansion: 0.5, color: '#9900ff', shape: 'spiral' },
  { gesture: 'okay', expansion: 0.6, color: '#ffff00', shape: 'star' },
  { gesture: 'point_down', expansion: 0.4, color: '#00ff88', shape: 'wave' },
];
let demoIndex = 0;

const GESTURE_PROMPT = `Analyze the hand gesture in this image. 
Categorize it into one of: 'peace', 'one', 'fist', 'palm', 'thumbs_up', 'rock', 'point_down', 'okay', or 'none'.
Also determine an 'expansion' factor from 0.0 to 1.0 (0 is a tight fist, 1 is wide open palm).
Return a JSON object.

Mapping to shapes:
- 'peace' -> 'flower'
- 'one' -> 'heart'
- 'fist' -> 'saturn'
- 'palm' -> 'sphere'
- 'thumbs_up' -> 'fireworks'
- 'rock' -> 'spiral' (rock/metal hand gesture - index and pinky up)
- 'point_down' -> 'wave' (pointing down gesture)
- 'okay' -> 'star' (okay sign - thumb and index forming circle)
- 'none' -> 'sphere'`;

export async function detectGesture(base64Image: string): Promise<GestureState> {
  // Use demo mode when API quota is exceeded
  if (DEMO_MODE) {
    const gesture = DEMO_GESTURES[demoIndex];
    demoIndex = (demoIndex + 1) % DEMO_GESTURES.length;
    return gesture;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: base64Image } },
          { text: GESTURE_PROMPT }
        ]
      },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            gesture: { type: Type.STRING, description: "The detected gesture name" },
            expansion: { type: Type.NUMBER, description: "0.0 to 1.0 expansion factor" },
            color: { type: Type.STRING, description: "A vibrant hex color based on the gesture" },
            shape: { type: Type.STRING, description: "One of: sphere, heart, flower, saturn, fireworks, spiral, star, wave" }
          },
          required: ["gesture", "expansion", "color", "shape"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    return {
      gesture: (result.gesture as any) || 'none',
      expansion: result.expansion ?? 0.5,
      color: result.color || '#ffffff',
      shape: result.shape || 'sphere'
    };
  } catch (error) {
    console.error("Gesture detection failed:", error);
    return { gesture: 'none', expansion: 0.5, color: '#4444ff', shape: 'sphere' };
  }
}
