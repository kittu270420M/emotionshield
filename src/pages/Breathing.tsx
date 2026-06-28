import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../lib/theme';
import Background from '../components/Background';
import { Wind, Timer, Play, Pause, RotateCcw } from 'lucide-react';

interface BreathingPattern {
  name: string;
  description: string;
  inhale: number;
  hold1?: number;
  exhale: number;
  hold2?: number;
  color: string;
}

const patterns: BreathingPattern[] = [
  {
    name: 'Box Breathing',
    description: '4-4-4-4 pattern for calm and focus',
    inhale: 4,
    hold1: 4,
    exhale: 4,
    hold2: 4,
    color: '#8B5CF6',
  },
  {
    name: '4-7-8 Relaxation',
    description: 'Deep relaxation and sleep preparation',
    inhale: 4,
    hold1: 7,
    exhale: 8,
    color: '#34D399',
  },
  {
    name: 'Simple Calm',
    description: 'Easy 4-6 pattern for quick relief',
    inhale: 4,
    exhale: 6,
    color: '#FBBF24',
  },
];

type Phase = 'inhale' | 'hold1' | 'exhale' | 'hold2' | 'idle';

export default function Breathing() {
  const { theme } = useTheme();
  const [selectedPattern, setSelectedPattern] = useState<BreathingPattern>(patterns[0]);
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<Phase>('idle');
  const [countdown, setCountdown] = useState(0);
  const [cycles, setCycles] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    let timer: NodeJS.Timeout;
    const runPhase = () => {
      if (phase === 'idle') {
        setPhase('inhale');
        setCountdown(selectedPattern.inhale);
        return;
      }

      if (countdown > 1) {
        setCountdown(countdown - 1);
        return;
      }

      // Transition to next phase
      switch (phase) {
        case 'inhale':
          if (selectedPattern.hold1) {
            setPhase('hold1');
            setCountdown(selectedPattern.hold1);
          } else {
            setPhase('exhale');
            setCountdown(selectedPattern.exhale);
          }
          break;
        case 'hold1':
          setPhase('exhale');
          setCountdown(selectedPattern.exhale);
          break;
        case 'exhale':
          if (selectedPattern.hold2) {
            setPhase('hold2');
            setCountdown(selectedPattern.hold2);
          } else {
            setCycles(c => c + 1);
            setPhase('inhale');
            setCountdown(selectedPattern.inhale);
          }
          break;
        case 'hold2':
          setCycles(c => c + 1);
          setPhase('inhale');
          setCountdown(selectedPattern.inhale);
          break;
      }
    };

    timer = setInterval(runPhase, 1000);
    return () => clearInterval(timer);
  }, [isActive, phase, countdown, selectedPattern]);

  const handleStart = () => {
    setIsActive(true);
    setPhase('idle');
    setCycles(0);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setPhase('idle');
    setCountdown(0);
    setCycles(0);
  };

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale': return 'Breathe In';
      case 'hold1': return 'Hold';
      case 'exhale': return 'Breathe Out';
      case 'hold2': return 'Hold';
      default: return 'Ready';
    }
  };

  const getCircleScale = () => {
    if (!isActive) return 1;
    if (phase === 'inhale') return 1.3;
    if (phase === 'hold1' || phase === 'hold2') return 1.3;
    if (phase === 'exhale') return 1;
    return 1;
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
      <Background />
      
      <div className="relative z-10 pt-24 pb-8 px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Wind className={`w-8 h-8 ${theme === 'dark' ? 'text-violet-400' : 'text-violet-500'}`} />
            <h1 className={`text-3xl font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Breathing Exercises
            </h1>
          </div>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            Guided breathing patterns to help you find calm and clarity
          </p>
        </motion.div>

        {/* Pattern Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          {patterns.map((pattern) => (
            <motion.button
              key={pattern.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedPattern(pattern);
                handleReset();
              }}
              className={`p-4 rounded-2xl text-left transition-all ${
                selectedPattern.name === pattern.name
                  ? theme === 'dark'
                    ? 'bg-[#16161f] border-2'
                    : 'bg-white border-2 shadow-md'
                  : theme === 'dark'
                    ? 'bg-[#16161f]/50 border border-gray-800 hover:bg-[#16161f]'
                    : 'bg-gray-50 border border-gray-200 hover:bg-white'
              }`}
              style={{ borderColor: selectedPattern.name === pattern.name ? pattern.color : undefined }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: pattern.color }} />
                <h3 className={`font-medium ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{pattern.name}</h3>
              </div>
              <p className={`text-xs ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>{pattern.description}</p>
            </motion.button>
          ))}
        </motion.div>

        {/* Breathing Circle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center justify-center py-8"
        >
          <div className="relative">
            {/* Outer glow */}
            <motion.div
              animate={{ scale: getCircleScale(), opacity: isActive ? 0.3 : 0.1 }}
              transition={{ duration: selectedPattern.inhale, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-full blur-xl"
              style={{ backgroundColor: selectedPattern.color }}
            />

            {/* Main circle */}
            <motion.div
              animate={{ scale: getCircleScale() }}
              transition={{ duration: selectedPattern.inhale, ease: 'easeInOut' }}
              className={`relative w-48 h-48 md:w-64 md:h-64 rounded-full flex items-center justify-center ${
                theme === 'dark' ? 'bg-[#16161f]' : 'bg-white'
              }`}
              style={{
                boxShadow: `0 0 60px ${selectedPattern.color}40`,
                border: `2px solid ${selectedPattern.color}30`,
              }}
            >
              <div className="text-center">
                {isActive ? (
                  <>
                    <motion.p
                      key={phase}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`text-xl md:text-2xl font-medium mb-2 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}
                      style={{ color: selectedPattern.color }}
                    >
                      {getPhaseText()}
                    </motion.p>
                    <motion.p
                      key={countdown}
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={`text-4xl md:text-5xl font-light ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      {countdown}
                    </motion.p>
                  </>
                ) : (
                  <div className="flex items-center justify-center">
                    <Timer className={`w-12 h-12 ${
                      theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                    }`} />
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Cycles counter */}
          {isActive && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`mt-4 text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              Cycle {cycles + 1}
            </motion.p>
          )}

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-4 mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={isActive ? handlePause : handleStart}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                theme === 'dark'
                  ? 'bg-violet-600 text-white hover:bg-violet-500'
                  : 'bg-violet-500 text-white hover:bg-violet-600'
              }`}
            >
              {isActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleReset}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                theme === 'dark'
                  ? 'bg-white/10 text-gray-400 hover:bg-white/15'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <RotateCcw className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`mt-8 p-6 rounded-2xl ${
            theme === 'dark' ? 'bg-[#16161f]/50' : 'bg-gray-50'
          }`}
        >
          <h3 className={`font-medium mb-3 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>How to Practice</h3>
          <ul className={`space-y-2 text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full mt-1.5" style={{ backgroundColor: selectedPattern.color }} />
              Find a comfortable seated position
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full mt-1.5" style={{ backgroundColor: selectedPattern.color }} />
              Relax your shoulders and jaw
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full mt-1.5" style={{ backgroundColor: selectedPattern.color }} />
              Follow the circle's rhythm
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full mt-1.5" style={{ backgroundColor: selectedPattern.color }} />
              Focus on your breath, let thoughts pass
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}