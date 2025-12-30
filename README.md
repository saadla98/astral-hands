# Celestial Particle Hands 🌌✋

An interactive, AI-powered hand tracking experience that transforms your gestures into mesmerizing 3D celestial particle systems in real-time.

![Project Banner](https://images.unsplash.com/photo-1534239143101-1b1c627395c5?q=80&w=2574&auto=format&fit=crop)

## ✨ Overview

**Celestial Particle Hands** fuses computer vision, generative AI, and 3D graphics to create a magical interactive display. By using your webcam, the application captures your hand gestures and uses Google's Gemini AI to analyze them. Each gesture is then mapped to a unique, dynamic 3D particle formation (like a heart, a planet, or a galaxy) with specific colors and behaviors.

This project demonstrates the power of integrating **Multimodal AI** with **Reactive 3D Web Graphics**.

## 🚀 Features

-   **Real-time Gesture Recognition:** Uses Google Gemini 1.5 Flash/Pro to interpret hand gestures from video frames.
-   **Dynamic 3D Particles:** Thousands of particles react and reform into shapes based on the detected gesture.
-   **Interactive Visuals:**
    -   ✌️ **Peace Sign:** Blooms into a pink Flower.
    -   ☝️ **One Finger:** Forms a beating Heart.
    -   ✊ **Fist:** Condenses into a Saturn-like planet with rings.
    -   ✋ **Open Palm:** Relaxes into a floating Sphere.
    -   👍 **Thumbs Up:** Explodes into Fireworks.
    -   🤘 **Rock/Metal:** Spirals into a Galaxy.
    -   👌 **Okay Sign:** Forms a Star.
    -   👇 **Point Down:** Creates a Wave effect.
-   **Modern UI:** A sleek, glassmorphism-inspired interface with animated indicators.

## 🛠️ Tech Stack

-   **Frontend Framework:** [React 19](https://react.dev/)
-   **Build Tool:** [Vite](https://vitejs.dev/)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **3D Graphics:** [Three.js](https://threejs.org/) & [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber)
-   **AI Model:** [Google Gemini API](https://ai.google.dev/) (@google/genai)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **Icons:** [Lucide React](https://lucide.dev/)

## 📦 Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/celestial-particle-hands.git
    cd celestial-particle-hands
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment:**
    Create a `.env` file in the root directory and add your Google Gemini API key:
    ```env
    VITE_GEMINI_API_KEY=your_api_key_here
    ```
    > You can get an API key from [Google AI Studio](https://aistudio.google.com/).

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  **Open in Browser:**
    Navigate to `http://localhost:5173` (or the URL shown in the terminal).

## 🎮 How to Use

1.  Allow camera access when prompted.
2.  Stand in a well-lit area.
3.  Show different hand gestures to the camera.
4.  Watch the particles transform!
    *   *Note: The AI analyzes frames every few seconds to optimize performance and API usage.*

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Built with ❤️ by [Your Name]
