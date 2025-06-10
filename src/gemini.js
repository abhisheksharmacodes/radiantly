import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI('AIzaSyB93aLRiw665YkUrtWFXj1HPdJ84VazsVU');

export async function generateQuestions() {
  try {

    const geminiConfig = {
        temperature: 0.9,
        topP: 1,
        topK: 1,
        maxOutputTokens: 4096,
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash", geminiConfig });

    const prompt = `Generate 5 multiple choice questions about computer knowledge. 
    Format each question as a JSON object with the following structure:
    {
      "question": "The question text",
      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
      "answer": "The correct answer"
    }
    Return only the JSON array of questions. output an array (enclosed in [ and ]. don't put '\`' sign anywhere) of 5 valid json strings (separated by commas).`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    const text = (response.text().startsWith('```')) ? response.text().slice(7,response.text().length-3) : response.text()
    
    // Parse the JSON response
    const questions = JSON.parse(text);
    return questions;
  } catch (error) {
    console.error('Error generating questions:', error);
    // Return default questions if API fails
    return [
      {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: "Paris",
      },
      {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: "Mars",
      },
      {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: "Pacific Ocean",
      },
      {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
        answer: "Leonardo da Vinci",
      },
      {
        question: "What is the chemical symbol for water?",
        options: ["O2", "H2O", "CO2", "N2"],
        answer: "H2O",
      },
    ];
  }
} 