import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Star, Trophy, RefreshCcw } from 'lucide-react';
import { quizData } from '../data/quizData';

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const question = quizData[currentQuestion];

  const handleOptionClick = (option) => {
    if (hasAnswered) return;
    
    setSelectedOption(option);
    setHasAnswered(true);

    if (option.isCorrect) {
      setIsCorrect(true);
      setScore(score + 10);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff6b6b', '#4ecdc4', '#ffe66d']
      });
      playAudio('/sounds/correct.mp3'); // We'll mock this or just rely on visuals
    } else {
      setIsCorrect(false);
      playAudio('/sounds/incorrect.mp3');
    }
  };

  const playAudio = (path) => {
    // Basic implementation for sound if assets are present
    // const audio = new Audio(path);
    // audio.play().catch(e => console.log('Audio play prevented', e));
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedOption(null);
      setIsCorrect(null);
      setHasAnswered(false);
    } else {
      setShowScore(true);
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#ff6b6b', '#4ecdc4', '#ffe66d']
      });
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption(null);
    setIsCorrect(null);
    setHasAnswered(false);
  };

  const progress = ((currentQuestion + 1) / quizData.length) * 100;

  return (
    <div className="quiz-card animate-fade-in">
      {showScore ? (
        <div className="result-container animate-bounce">
          <Trophy className="trophy-icon" size={80} />
          <h2 style={{ fontSize: '2.5rem' }}>Fim de Jogo!</h2>
          <p style={{ fontSize: '1.5rem', marginTop: '10px' }}>
            Você fez <strong style={{ color: 'var(--primary-color)' }}>{score}</strong> pontos!
          </p>
          <button className="restart-btn" onClick={restartQuiz}>
            <RefreshCcw size={20} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} />
            Jogar Novamente
          </button>
        </div>
      ) : (
        <>
          <div className="header">
            <span>Questão {currentQuestion + 1} de {quizData.length}</span>
            <div className="score">
              <Star size={24} fill="#ffe66d" color="#f1c40f" /> {score} pts
            </div>
          </div>
          
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>

          <h2 className="question-text">{question.question}</h2>
          
          {question.image && (
            <img src={question.image} alt="Imagem da questão" className="question-image animate-fade-in" />
          )}

          <div className="options-grid">
            {question.options.map((option, index) => {
              let btnClass = "option-btn";
              if (hasAnswered) {
                if (option.isCorrect) btnClass += " correct";
                else if (selectedOption === option && !option.isCorrect) btnClass += " incorrect";
              }

              return (
                <button
                  key={index}
                  className={btnClass}
                  onClick={() => handleOptionClick(option)}
                  disabled={hasAnswered}
                >
                  {option.text}
                </button>
              );
            })}
          </div>

          <div className={`feedback ${isCorrect !== null ? (isCorrect ? 'correct' : 'incorrect') : ''}`}>
            {hasAnswered && (
              isCorrect ? "✨ Muito bem! Você acertou! ✨" : "Oops! Não foi dessa vez."
            )}
          </div>

          {hasAnswered && (
            <button className="next-btn animate-fade-in" onClick={handleNextQuestion}>
              {currentQuestion + 1 === quizData.length ? "Ver Resultado" : "Próxima Pergunta"}
            </button>
          )}
        </>
      )}
    </div>
  );
}
