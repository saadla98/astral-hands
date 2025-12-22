<div align="center">

# 🌌 Celestial Particle Hands

### *AI-Powered Hand Gesture Particle System*

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React"/>
  <img src="https://img.shields.io/badge/Three.js-0.182.0-000000?style=for-the-badge&logo=three.js&logoColor=white" alt="Three.js"/>
  <img src="https://img.shields.io/badge/TypeScript-5.8.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Gemini_AI-8E75B2?style=for-the-badge&logo=google&logoColor=white" alt="Gemini AI"/>
  <img src="https://img.shields.io/badge/Vite-6.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
</p>

<p align="center">
  <strong>Transform your hand gestures into mesmerizing 3D particle formations powered by Google's Gemini AI</strong>
</p>

</div>

---

## ✨ Features

🎨 **Real-time Gesture Recognition** - Powered by Google Gemini AI to detect hand gestures with precision  
🌟 **Dynamic Particle Systems** - 8+ unique particle formations (sphere, heart, flower, saturn, fireworks, spiral, star, wave)  
🎭 **Gesture-to-Shape Mapping** - Each hand gesture triggers a unique visual experience  
💫 **Bloom Effects** - Professional-grade post-processing with bloom and glow effects  
🎨 **Adaptive Colors** - AI-generated vibrant colors that match detected gestures  
📹 **Live Camera Feed** - Real-time hand tracking through your webcam  
⚡ **Smooth Animations** - Fluid particle transformations using React Three Fiber  
🎯 **Demo Mode** - Test without API limits using pre-programmed gesture sequences  

---

## 🎮 Gesture Controls

| Gesture | Shape | Description |
|---------|-------|-------------|
| ✌️ **Peace** | Flower | Two fingers up creates a blooming flower pattern |
| ☝️ **One** | Heart | Single finger forms a romantic heart shape |
| ✊ **Fist** | Saturn | Closed fist generates planetary rings |
| ✋ **Palm** | Sphere | Open palm creates a perfect particle sphere |
| 👍 **Thumbs Up** | Fireworks | Thumbs up triggers explosive firework particles |
| 🤘 **Rock** | Spiral | Rock sign generates a mesmerizing spiral |
| 👌 **Okay** | Star | OK gesture forms a brilliant star |
| 👇 **Point Down** | Wave | Pointing down creates flowing wave patterns |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **Gemini API Key** ([Get one free here](https://aistudio.google.com/apikey))
- **Webcam** (for real-time gesture detection)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/celestial-particle-hands.git

# Navigate to project directory
cd celestial-particle-hands

# Install dependencies
npm install
```

### Configuration

1. Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

2. Replace `your_api_key_here` with your actual Gemini API key

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser

---

## 🏗️ Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

---

## 🛠️ Tech Stack

- **Frontend Framework:** React 19.2.3
- **3D Graphics:** Three.js 0.182.0 + React Three Fiber 9.4.2
- **AI Engine:** Google Generative AI (Gemini) 1.34.0
- **Post-Processing:** @react-three/postprocessing 3.0.4
- **Language:** TypeScript 5.8.2
- **Build Tool:** Vite 6.2.0
- **Icons:** Lucide React 0.562.0

---

## 📁 Project Structure

```
celestial-particle-hands/
├── App.tsx                 # Main application component
├── GestureEngine.ts        # AI gesture detection logic
├── ParticleSystem.tsx      # 3D particle rendering system
├── types.ts                # TypeScript type definitions
├── index.tsx               # Application entry point
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
├── .env.local              # Environment variables (create this)
└── package.json            # Project dependencies
```

---

## ⚙️ Configuration Options

### Demo Mode

To enable demo mode (useful when API quota is exceeded):

```typescript
// In GestureEngine.ts
const DEMO_MODE = true;  // Set to true for demo mode
```

Demo mode cycles through all gesture shapes automatically every 4 seconds.

### Capture Interval

Adjust gesture detection frequency in `App.tsx`:

```typescript
// Change interval time (in milliseconds)
interval = window.setInterval(async () => {
  // ...
}, 4000);  // 4 seconds (adjust as needed)
```

---

## 🎯 How It Works

1. **Camera Capture** - The app accesses your webcam and captures frames
2. **AI Analysis** - Each frame is sent to Gemini AI for gesture recognition
3. **Gesture Detection** - AI identifies the hand gesture and calculates expansion factor
4. **Shape Mapping** - Detected gesture maps to a specific particle shape
5. **Particle Rendering** - Three.js renders thousands of particles in the mapped formation
6. **Color Generation** - AI suggests vibrant colors matching the gesture
7. **Post-Processing** - Bloom effects add magical glow to particles

---

## 🐛 Troubleshooting

### Issue: "Camera access denied"
**Solution:** Enable camera permissions in your browser settings

### Issue: "429 Too Many Requests"
**Solution:** You've exceeded the API rate limit. Enable demo mode or wait 24 hours

### Issue: "RESOURCE_EXHAUSTED"
**Solution:** Free tier quota exceeded. Enable demo mode or upgrade to paid tier

### Issue: Port 3000 already in use
**Solution:** Vite will automatically use port 3001. Check terminal output for the correct URL

---

## 📝 License

This project is open source and available under the MIT License.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🌟 Show Your Support

Give a ⭐️ if this project helped or inspired you!

---

## 👨‍💻 Author

**Your Name**

- GitHub: [@yourusername](https://github.com/yourusername)
- Twitter: [@yourhandle](https://twitter.com/yourhandle)

---

## 🙏 Acknowledgments

- Google Gemini AI for powerful gesture recognition
- Three.js community for amazing 3D graphics capabilities
- React Three Fiber for seamless React integration

---

<div align="center">

**Made with ❤️ and lots of ✨**

[⬆ Back to Top](#-celestial-particle-hands)

</div>
