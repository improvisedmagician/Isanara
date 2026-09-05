import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Star, Trophy, RefreshCcw, Home } from 'lucide-react';

export default function Quiz({ quizData, onGoHome }) {
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
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button className="restart-btn" onClick={restartQuiz}>
              <RefreshCcw size={20} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} />
              Jogar Novamente
            </button>
            <button className="restart-btn" onClick={onGoHome} style={{ backgroundColor: '#95a5a6' }}>
              <Home size={20} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} />
              Menu Principal
            </button>
          </div>
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

          {question.images && (
            <div className="images-container animate-fade-in" style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
              {question.images.map((imgSrc, idx) => (
                <img key={idx} src={imgSrc} alt="Imagem da questão" className="question-image" style={{ marginBottom: 0, maxHeight: '150px' }} />
              ))}
            </div>
          )}

          {question.textQuote && (
            <div className="text-quote animate-fade-in">
              {question.textQuote}
            </div>
          )}

          {question.questionPart2 && (
            <h2 className="question-text" style={{ marginTop: '0' }}>{question.questionPart2}</h2>
          )}

          <div className="options-list">
            {question.options.map((option, index) => {
              let btnClass = "option-btn option-list-btn";
              if (hasAnswered) {
                if (option.isCorrect) btnClass += " correct";
                else if (selectedOption === option && !option.isCorrect) btnClass += " incorrect";
              }

              const letter = String.fromCharCode(97 + index);

              return (
                <button
                  key={index}
                  className={btnClass}
                  onClick={() => handleOptionClick(option)}
                  disabled={hasAnswered}
                >
                  <span className="option-letter">{letter})</span>
                  {option.image ? (
                    <img src={option.image} alt="Opção" style={{ maxHeight: '100px', marginLeft: '10px' }} />
                  ) : (
                    <span className="option-text">{option.text}</span>
                  )}
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
