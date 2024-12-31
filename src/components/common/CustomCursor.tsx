import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
    };

    window.addEventListener('mousemove', updateCursor);
    return () => window.removeEventListener('mousemove', updateCursor);
  }, []);

  return (
    <>
      {/* Main cursor - Kubernetes wheel */}
      <div 
        className="fixed pointer-events-none z-50"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className={`
          relative transition-all duration-200
          ${isPointer ? 'scale-125' : 'scale-100'}
        `}>
          {/* Kubernetes wheel segments */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((rotation) => (
            <div
              key={rotation}
              className="absolute w-6 h-1 bg-cyber-blue/30"
              style={{
                transform: `rotate(${rotation}deg)`,
                transformOrigin: 'center',
                left: '-12px',
                top: '6px'
              }}
            />
          ))}
          {/* Center dot */}
          <div className={`
            absolute rounded-full bg-cyber-blue transition-all duration-200
            ${isPointer ? 'w-4 h-4 -left-2 -top-2' : 'w-2 h-2 -left-1 -top-1'}
          `} />
        </div>
      </div>

      {/* Outer ring - Pod indicator */}
      <div 
        className="fixed pointer-events-none z-50"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className={`
          rounded-full border-2 border-cyber-blue/20 transition-all duration-500
          ${isPointer ? 'w-16 h-16 animate-spin-slow' : 'w-8 h-8'}
        `}>
          {/* Pod indicators */}
          {isPointer && (
            <>
              <div className="absolute w-2 h-2 bg-cyber-blue/40 rounded-full -top-1 left-1/2 transform -translate-x-1/2" />
              <div className="absolute w-2 h-2 bg-cyber-blue/40 rounded-full top-1/2 -right-1 transform -translate-y-1/2" />
              <div className="absolute w-2 h-2 bg-cyber-blue/40 rounded-full -bottom-1 left-1/2 transform -translate-x-1/2" />
              <div className="absolute w-2 h-2 bg-cyber-blue/40 rounded-full top-1/2 -left-1 transform -translate-y-1/2" />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CustomCursor;