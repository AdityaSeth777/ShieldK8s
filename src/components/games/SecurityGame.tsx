import React, { useState, useEffect } from 'react';
import { Shield, XCircle, CheckCircle } from 'lucide-react';

interface Threat {
  id: number;
  x: number;
  y: number;
  speed: number;
  isMalicious: boolean;
}

const SecurityGame: React.FC = () => {
  const [score, setScore] = useState(0);
  const [threats, setThreats] = useState<Threat[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const startGame = () => {
    setScore(0);
    setThreats([]);
    setGameOver(false);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setThreats(current => {
        // Move existing threats down
        const movedThreats = current
          .map(threat => ({
            ...threat,
            y: threat.y + threat.speed
          }))
          .filter(threat => threat.y < 400);

        // Add new threat if needed
        if (Math.random() < 0.1) {
          movedThreats.push({
            id: Date.now(),
            x: Math.random() * 360,
            y: 0,
            speed: 2 + Math.random() * 2,
            isMalicious: Math.random() > 0.5
          });
        }

        // Check for game over
        if (movedThreats.some(threat => threat.y >= 380 && threat.isMalicious)) {
          setGameOver(true);
          setIsPlaying(false);
        }

        return movedThreats;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleThreatClick = (threat: Threat) => {
    if (gameOver) return;

    setThreats(current => current.filter(t => t.id !== threat.id));
    
    if (threat.isMalicious) {
      setScore(s => s + 10);
    } else {
      setScore(s => Math.max(0, s - 5));
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="bg-black/60 p-4 rounded-lg mb-4 flex justify-between items-center">
        <div className="text-cyber-blue font-bold">Score: {score}</div>
        <button
          onClick={startGame}
          className="px-4 py-2 bg-cyber-blue text-black rounded hover:bg-cyber-blue/90 transition-colors"
        >
          {isPlaying ? 'Restart' : 'Start Game'}
        </button>
      </div>

      <div className="relative w-full h-[400px] bg-black/40 rounded-lg overflow-hidden border border-cyber-blue/20">
        {gameOver ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80">
            <h3 className="text-2xl font-bold text-cyber-blue mb-4">Game Over!</h3>
            <p className="text-white mb-4">Final Score: {score}</p>
            <button
              onClick={startGame}
              className="px-6 py-3 bg-cyber-blue text-black rounded-lg hover:bg-cyber-blue/90 transition-colors"
            >
              Play Again
            </button>
          </div>
        ) : (
          threats.map(threat => (
            <button
              key={threat.id}
              onClick={() => handleThreatClick(threat)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-colors"
              style={{ left: threat.x, top: threat.y }}
            >
              {threat.isMalicious ? (
                <XCircle className="w-6 h-6 text-red-500 animate-pulse" />
              ) : (
                <CheckCircle className="w-6 h-6 text-green-500" />
              )}
            </button>
          ))
        )}

        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80">
            <Shield className="w-16 h-16 text-cyber-blue mb-4" />
            <h3 className="text-xl font-bold text-white mb-4">Security Defense Game</h3>
            <p className="text-gray-400 text-center mb-6 max-w-md px-4">
              Click the malicious threats (red) to eliminate them. Avoid clicking legitimate traffic (green). Don't let malicious threats reach the bottom!
            </p>
            <button
              onClick={startGame}
              className="px-6 py-3 bg-cyber-blue text-black rounded-lg hover:bg-cyber-blue/90 transition-colors"
            >
              Start Game
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecurityGame;