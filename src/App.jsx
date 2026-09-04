import React, { useState } from 'react';
import Home from './components/Home';
import Quiz from './components/Quiz';
import { quizData as portuguesData } from './data/quizData';
import { mathQuizData } from './data/mathQuizData';
import './App.css';

function App() {
  const [activeQuiz, setActiveQuiz] = useState(null); // 'portugues' | 'matematica' | null

  const getActiveData = () => {
    if (activeQuiz === 'portugues') return portuguesData;
    if (activeQuiz === 'matematica') return mathQuizData;
    return [];
  };

  return (
    <div className="app-container">
      {activeQuiz === null ? (
        <Home onSelectSubject={setActiveQuiz} />
      ) : (
        <Quiz 
          quizData={getActiveData()} 
          onGoHome={() => setActiveQuiz(null)} 
        />
      )}
    </div>
  );
}

export default App;
