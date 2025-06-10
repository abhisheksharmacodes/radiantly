import { useState, useEffect } from 'react'
import { generateQuestions } from './gemini'
import './App.css'

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedAnswers, setSelectedAnswers] = useState([])
  const [timeLeft, setTimeLeft] = useState(30) // 30 seconds per question

  const loadQuestions = async () => {
    setLoading(true)
    try {
      const generatedQuestions = await generateQuestions()
      setQuestions(generatedQuestions)
    } catch (error) {
      console.error('Error loading questions:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadQuestions()
  }, [])

  useEffect(() => {
    if (!showScore && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    } else if (timeLeft === 0 && !showScore) {
      handleAnswerOptionClick(false)
    }
  }, [timeLeft, showScore])

  const handleAnswerOptionClick = (isCorrect) => {
    setSelectedAnswers([...selectedAnswers, { 
      question: questions[currentQuestion].question,
      selected: isCorrect,
      correctAnswer: questions[currentQuestion].answer
    }])

    if (isCorrect) {
      setScore(score + 1)
    }

    const nextQuestion = currentQuestion + 1
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion)
      setTimeLeft(30)
    } else {
      setShowScore(true)
    }
  }

  const resetGame = async () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowScore(false)
    setSelectedAnswers([])
    setTimeLeft(30)
    await loadQuestions()
  }

  if (loading) {
    return (
      <div className='app'>
        <div className='loading'>
          <div className='spinner'></div>
        </div>
      </div>
    )
  }

  return (
    <div className='app'>
      {showScore ? (
        <div className='score-section'>
          <h2>Quiz Complete!</h2>
          <div className='score-details'>
            <div className='score-circle'>
              <span className='score-number'>{score}</span>
              <span className='score-total'> / {questions.length}</span>
            </div>
          </div>
          <div className='answers-review'>
            <h3>Your Answers:</h3>
            {selectedAnswers.map((answer, index) => (
              <div key={index} className={`answer-item ${answer.selected ? 'correct' : 'incorrect'}`}>
                <p className='question-text'>{answer.question}</p>
                <p className='answer-result'>
                  {answer.selected ? '✓ Correct' : '✗ Incorrect'}
                </p>
                {!answer.selected && (
                  <p className='correct-answer'>
                    Correct answer: {answer.correctAnswer}
                  </p>
                )}
              </div>
            ))}
          </div>
          <button className='play-again-btn' onClick={resetGame}>
            Play Again
          </button>
        </div>
      ) : (
        <>
          <div className='question-section'>
            <div className='question-count'>
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className='timer'>
              Time Left: {timeLeft}s
            </div>
            <div className='question-text'>{questions[currentQuestion].question}</div>
          </div>
          <div className='answer-section'>
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerOptionClick(option === questions[currentQuestion].answer)}
                className='answer-button'
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default App
