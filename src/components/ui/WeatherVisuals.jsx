import { motion } from 'framer-motion';
import { useMemo } from 'react';

const WeatherVisuals = ({ weatherCondition, intensity = 0.5 }) => {
  const condition = weatherCondition?.toLowerCase() || '';
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  const visualConfig = useMemo(() => {
    if (prefersReducedMotion) {
      return { type: 'none', particles: [] };
    }

    if (condition.includes('rain') || condition.includes('drizzle')) {
      return {
        type: 'rain',
        particles: Array.from({ length: Math.floor(20 * intensity) }, (_, i) => ({
          id: i,
          x: Math.random() * 100,
          delay: Math.random() * 2,
          duration: 1 + Math.random() * 0.5,
          opacity: 0.3 + Math.random() * 0.4
        }))
      };
    }
    
    if (condition.includes('snow')) {
      return {
        type: 'snow',
        particles: Array.from({ length: Math.floor(15 * intensity) }, (_, i) => ({
          id: i,
          x: Math.random() * 100,
          delay: Math.random() * 3,
          duration: 3 + Math.random() * 2,
          size: 2 + Math.random() * 3,
          opacity: 0.4 + Math.random() * 0.4
        }))
      };
    }
    
    if (condition.includes('cloud')) {
      return {
        type: 'clouds',
        particles: Array.from({ length: 3 }, (_, i) => ({
          id: i,
          x: -20 + i * 40,
          y: 10 + i * 15,
          scale: 0.8 + Math.random() * 0.4,
          duration: 20 + Math.random() * 10
        }))
      };
    }
    
    if (condition.includes('clear') || condition.includes('sunny')) {
      return {
        type: 'sun',
        particles: [{
          id: 0,
          rays: Array.from({ length: 8 }, (_, i) => ({
            angle: i * 45,
            length: 20 + Math.random() * 10
          }))
        }]
      };
    }

    return { type: 'none', particles: [] };
  }, [condition, intensity, prefersReducedMotion]);

  if (visualConfig.type === 'none') return null;

  const renderRain = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {visualConfig.particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-0.5 h-8 bg-gradient-to-b from-blue-400/60 to-transparent"
          style={{
            left: `${particle.x}%`,
            top: '-2rem'
          }}
          animate={{
            y: ['0vh', '110vh'],
            opacity: [0, particle.opacity, particle.opacity, 0]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      ))}
    </div>
  );

  const renderSnow = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {visualConfig.particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${particle.x}%`,
            top: '-1rem',
            width: `${particle.size}px`,
            height: `${particle.size}px`
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, Math.sin(particle.id) * 50, 0],
            opacity: [0, particle.opacity, particle.opacity, 0]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );

  const renderClouds = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {visualConfig.particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            transform: `scale(${particle.scale})`
          }}
          animate={{
            x: ['0vw', '120vw'],
            opacity: [0, 0.3, 0.3, 0]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          <svg width="80" height="40" viewBox="0 0 80 40" className="fill-gray-400/30">
            <ellipse cx="20" cy="25" rx="15" ry="10" />
            <ellipse cx="35" cy="20" rx="20" ry="12" />
            <ellipse cx="55" cy="25" rx="18" ry="10" />
            <ellipse cx="65" cy="30" rx="12" ry="8" />
          </svg>
        </motion.div>
      ))}
    </div>
  );

  const renderSun = () => (
    <div className="absolute top-8 right-8 pointer-events-none">
      <motion.div
        className="relative"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        {/* Sun rays */}
        {visualConfig.particles[0]?.rays.map((ray, index) => (
          <motion.div
            key={index}
            className="absolute w-1 bg-gradient-to-r from-yellow-400/60 to-transparent"
            style={{
              height: `${ray.length}px`,
              left: '50%',
              top: '50%',
              transformOrigin: '0 0',
              transform: `rotate(${ray.angle}deg) translateX(-50%)`
            }}
            animate={{
              opacity: [0.4, 0.8, 0.4],
              scaleY: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 2,
              delay: index * 0.1,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        ))}
        
        {/* Sun core */}
        <motion.div
          className="w-8 h-8 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            boxShadow: [
              '0 0 20px rgba(251, 191, 36, 0.4)',
              '0 0 30px rgba(251, 191, 36, 0.6)',
              '0 0 20px rgba(251, 191, 36, 0.4)'
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </motion.div>
    </div>
  );

  return (
    <div className="absolute inset-0 pointer-events-none">
      {visualConfig.type === 'rain' && renderRain()}
      {visualConfig.type === 'snow' && renderSnow()}
      {visualConfig.type === 'clouds' && renderClouds()}
      {visualConfig.type === 'sun' && renderSun()}
    </div>
  );
};

export default WeatherVisuals;