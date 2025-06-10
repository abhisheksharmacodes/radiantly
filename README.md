# React MCQ Game

A dynamic multiple-choice quiz application built with React and powered by Google's Gemini AI. The game features computer knowledge questions, a timer, and an interactive UI.

## Features

- 🎯 Dynamic questions generated using Gemini AI
- ⏱️ 30-second timer per question
- 🎨 Modern and responsive UI
- 📊 Detailed score summary
- 🔄 New questions on each play
- ✅ Answer review with correct solutions

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

## Setup

1. Clone the repository:
```bash
git clone <your-repository-url>
cd <repository-name>
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Gemini API key:
```
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Technologies Used

- React
- Vite
- Google Gemini AI
- CSS3

## How to Play

1. Start the quiz
2. Answer each question within 30 seconds
3. View your score and review answers
4. Click "Play Again" for a new set of questions

## License

MIT
