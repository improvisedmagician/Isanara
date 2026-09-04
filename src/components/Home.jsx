import { BookOpen, Calculator } from 'lucide-react';

export default function Home({ onSelectSubject }) {
  return (
    <div className="quiz-card animate-fade-in" style={{ padding: '60px 40px', maxWidth: '600px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: 'var(--primary-color)' }}>
        Super Desafio!
      </h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '40px', color: 'var(--text-dark)' }}>
        Escolha uma matéria para começar a diversão:
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
        <button 
          className="option-btn animate-bounce" 
          style={{ 
            backgroundColor: '#4ecdc4', 
            color: 'white', 
            fontSize: '1.5rem', 
            padding: '20px',
            border: 'none',
            display: 'flex',
            justifyContent: 'center',
            gap: '15px'
          }}
          onClick={() => onSelectSubject('portugues')}
        >
          <BookOpen size={30} />
          Simulado de Português
        </button>

        <button 
          className="option-btn animate-bounce" 
          style={{ 
            backgroundColor: '#ff6b6b', 
            color: 'white', 
            fontSize: '1.5rem', 
            padding: '20px',
            border: 'none',
            display: 'flex',
            justifyContent: 'center',
            gap: '15px'
          }}
          onClick={() => onSelectSubject('matematica')}
        >
          <Calculator size={30} />
          Simulado de Matemática
        </button>
      </div>
    </div>
  );
}
