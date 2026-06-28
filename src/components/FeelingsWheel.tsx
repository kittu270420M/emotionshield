import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../lib/theme';
import { coreEmotions, Emotion } from '../lib/emotions';

interface FeelingsWheelProps {
  onEmotionSelect: (emotion: Emotion) => void;
}

export default function FeelingsWheel({ onEmotionSelect }: FeelingsWheelProps) {
  const { theme } = useTheme();
  const [hoveredEmotion, setHoveredEmotion] = useState<Emotion | null>(null);
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const centerX = 400;
  const centerY = 400;
  const innerRadius = 80;
  const outerRadius = 340;

  const polarToCartesian = (cx: number, cy: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: cx + radius * Math.cos(angleInRadians),
      y: cy + radius * Math.sin(angleInRadians),
    };
  };

  const getEmotionPath = (emotion: Emotion, layer: number) => {
    const innerR = layer === 0 ? innerRadius : layer === 1 ? innerRadius + 90 : innerRadius + 180;
    const outerR = layer === 0 ? innerRadius + 90 : layer === 1 ? innerRadius + 180 : outerRadius;
    
    const angleSpan = layer === 0 ? 45 : 22.5;
    const startAngle = emotion.angle - angleSpan / 2;
    const endAngle = emotion.angle + angleSpan / 2;

    const innerStart = polarToCartesian(centerX, centerY, innerR, startAngle);
    const innerEnd = polarToCartesian(centerX, centerY, innerR, endAngle);
    const outerStart = polarToCartesian(centerX, centerY, outerR, startAngle);
    const outerEnd = polarToCartesian(centerX, centerY, outerR, endAngle);

    const largeArcFlag = angleSpan > 180 ? 1 : 0;

    return [
      `M ${innerStart.x} ${innerStart.y}`,
      `A ${innerR} ${innerR} 0 ${largeArcFlag} 1 ${innerEnd.x} ${innerEnd.y}`,
      `L ${outerEnd.x} ${outerEnd.y}`,
      `A ${outerR} ${outerR} 0 ${largeArcFlag} 0 ${outerStart.x} ${outerStart.y}`,
      'Z'
    ].join(' ');
  };

  const handleEmotionClick = (emotion: Emotion) => {
    setSelectedEmotion(emotion);
    onEmotionSelect(emotion);
  };

  const layer0Emotions = coreEmotions.filter(e => e.layer === 0);
  const layer1Emotions = coreEmotions.filter(e => e.layer === 1);

  return (
    <div className="relative flex items-center justify-center w-full h-full">
      {/* Ambient glow behind wheel */}
      <motion.div
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div 
          className="w-[600px] h-[600px] rounded-full blur-3xl"
          style={{
            background: theme === 'dark' 
              ? 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, rgba(167,139,250,0.2) 40%, transparent 70%)'
              : 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(167,139,250,0.1) 40%, transparent 70%)'
          }}
        />
      </motion.div>

      <motion.svg
        ref={svgRef}
        viewBox="0 0 800 800"
        className="w-full h-full relative z-10"
        initial={{ opacity: 0, scale: 0.9, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        {/* Gradient definitions */}
        <defs>
          {coreEmotions.map((emotion) => (
            <radialGradient
              key={`gradient-${emotion.id}`}
              id={`gradient-${emotion.id}`}
              cx="50%"
              cy="50%"
              r="70%"
              fx="30%"
              fy="30%"
            >
              <stop offset="0%" stopColor={emotion.color} stopOpacity="1" />
              <stop offset="70%" stopColor={emotion.color} stopOpacity="0.85" />
              <stop offset="100%" stopColor={emotion.darkColor} stopOpacity="0.75" />
            </radialGradient>
          ))}
          
          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          {/* Soft shadow */}
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.15" />
          </filter>
          
          {/* Inner shadow for depth */}
          <filter id="innerShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feOffset dx="0" dy="2" />
            <feGaussianBlur stdDeviation="3" result="offset-blur" />
            <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
            <feFlood floodColor="black" floodOpacity="0.2" result="color" />
            <feComposite operator="in" in="color" in2="inverse" result="shadow" />
            <feComposite operator="over" in="shadow" in2="SourceGraphic" />
          </filter>

          {/* Center gradient */}
          <radialGradient id="centerGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={theme === 'dark' ? '#1a1a24' : '#ffffff'} stopOpacity="1" />
            <stop offset="100%" stopColor={theme === 'dark' ? '#0f0f14' : '#f8f8f8'} stopOpacity="1" />
          </radialGradient>
        </defs>

        {/* Outer decorative ring */}
        <motion.circle
          cx={centerX}
          cy={centerY}
          r={outerRadius + 15}
          fill="none"
          stroke={theme === 'dark' ? 'rgba(139,92,246,0.1)' : 'rgba(139,92,246,0.08)'}
          strokeWidth="2"
          strokeDasharray="10 5"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: `${centerX}px ${centerY}px` }}
        />

        {/* Layer 1 - Secondary emotions (outer ring) */}
        {layer1Emotions.map((emotion, i) => {
          const isHovered = hoveredEmotion?.id === emotion.id;
          const isSelected = selectedEmotion?.id === emotion.id;
          const isParentHovered = hoveredEmotion?.id === emotion.parent;
          
          return (
            <motion.path
              key={emotion.id}
              d={getEmotionPath(emotion, 1)}
              fill={isHovered || isSelected ? emotion.color : `url(#gradient-${emotion.id})`}
              stroke={theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.95)'}
              strokeWidth={isHovered ? 3 : 1.5}
              filter={isHovered || isParentHovered ? 'url(#glow)' : 'url(#softShadow)'}
              className="cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: isParentHovered ? 0.9 : isHovered ? 1 : 0.75,
                scale: isHovered ? 1.03 : 1
              }}
              transition={{ duration: 0.3, delay: i * 0.02 }}
              style={{ transformOrigin: `${centerX}px ${centerY}px` }}
              onMouseEnter={() => setHoveredEmotion(emotion)}
              onMouseLeave={() => setHoveredEmotion(null)}
              onClick={() => handleEmotionClick(emotion)}
            />
          );
        })}

        {/* Separator ring between layers */}
        <circle
          cx={centerX}
          cy={centerY}
          r={innerRadius + 90}
          fill="none"
          stroke={theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.5)'}
          strokeWidth="2"
        />

        {/* Layer 0 - Core emotions (inner ring) */}
        {layer0Emotions.map((emotion, i) => {
          const isHovered = hoveredEmotion?.id === emotion.id;
          const isSelected = selectedEmotion?.id === emotion.id;
          const isChildHovered = hoveredEmotion?.parent === emotion.id;
          
          return (
            <motion.path
              key={emotion.id}
              d={getEmotionPath(emotion, 0)}
              fill={isHovered || isSelected ? emotion.color : `url(#gradient-${emotion.id})`}
              stroke={theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.9)'}
              strokeWidth={isHovered ? 3 : 2}
              filter={isHovered || isChildHovered ? 'url(#glow)' : 'url(#softShadow)'}
              className="cursor-pointer"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: isHovered ? 1 : 0.9,
                scale: isHovered ? 1.05 : 1
              }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              style={{ transformOrigin: `${centerX}px ${centerY}px` }}
              onMouseEnter={() => setHoveredEmotion(emotion)}
              onMouseLeave={() => setHoveredEmotion(null)}
              onClick={() => handleEmotionClick(emotion)}
            />
          );
        })}

        {/* Inner separator ring */}
        <circle
          cx={centerX}
          cy={centerY}
          r={innerRadius}
          fill="none"
          stroke={theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.6)'}
          strokeWidth="2"
        />

        {/* Center circle with gradient */}
        <motion.circle
          cx={centerX}
          cy={centerY}
          r={innerRadius - 5}
          fill="url(#centerGradient)"
          stroke={theme === 'dark' ? 'rgba(139,92,246,0.3)' : 'rgba(139,92,246,0.2)'}
          strokeWidth="2"
          filter="url(#softShadow)"
          animate={{ 
            scale: [1, 1.02, 1],
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{ transformOrigin: `${centerX}px ${centerY}px` }}
        />

        {/* Center glow effect */}
        <motion.circle
          cx={centerX}
          cy={centerY}
          r={innerRadius - 15}
          fill="none"
          stroke={theme === 'dark' ? 'rgba(139,92,246,0.4)' : 'rgba(139,92,246,0.3)'}
          strokeWidth="1"
          animate={{ 
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{ transformOrigin: `${centerX}px ${centerY}px` }}
        />

        {/* Center text */}
        <motion.text
          x={centerX}
          y={centerY - 8}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={theme === 'dark' ? '#ffffff' : '#1f2937'}
          style={{ fontSize: '22px', fontWeight: '500', letterSpacing: '0.02em' }}
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          How are you
        </motion.text>
        <motion.text
          x={centerX}
          y={centerY + 20}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={theme === 'dark' ? '#a78bfa' : '#7c3aed'}
          style={{ fontSize: '24px', fontWeight: '600' }}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        >
          feeling?
        </motion.text>

        {/* Core emotion labels */}
        {layer0Emotions.map((emotion) => {
          const labelRadius = innerRadius + 45;
          const pos = polarToCartesian(centerX, centerY, labelRadius, emotion.angle);
          const isHovered = hoveredEmotion?.id === emotion.id || hoveredEmotion?.parent === emotion.id;
          
          return (
            <motion.text
              key={`label-${emotion.id}`}
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              style={{ 
                fontSize: '15px', 
                fontWeight: '600',
                textShadow: '0 2px 4px rgba(0,0,0,0.5), 0 0 8px rgba(0,0,0,0.3)',
                transformOrigin: `${pos.x}px ${pos.y}px`
              }}
              animate={{ scale: isHovered ? 1.15 : 1 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-none select-none"
            >
              {emotion.name}
            </motion.text>
          );
        })}

        {/* Secondary emotion labels */}
        {layer1Emotions.map((emotion) => {
          const labelRadius = innerRadius + 135;
          const pos = polarToCartesian(centerX, centerY, labelRadius, emotion.angle);
          const isHovered = hoveredEmotion?.id === emotion.id;
          
          return (
            <motion.text
              key={`label-${emotion.id}`}
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              style={{ 
                fontSize: '12px', 
                fontWeight: '500',
                textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                transformOrigin: `${pos.x}px ${pos.y}px`
              }}
              animate={{ 
                scale: isHovered ? 1.2 : 1,
                opacity: isHovered ? 1 : 0.85
              }}
              transition={{ duration: 0.2 }}
              className="pointer-events-none select-none"
            >
              {emotion.name}
            </motion.text>
          );
        })}
      </motion.svg>

      {/* Hover tooltip */}
      <AnimatePresence>
        {hoveredEmotion && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
          >
            <div 
              className="px-6 py-3 rounded-2xl shadow-xl backdrop-blur-xl"
              style={{
                background: theme === 'dark' 
                  ? 'rgba(22,22,31,0.9)' 
                  : 'rgba(255,255,255,0.95)',
                border: `2px solid ${hoveredEmotion.color}`,
                boxShadow: `0 8px 32px ${hoveredEmotion.color}30`
              }}
            >
              <div className="flex items-center gap-3">
                <motion.div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: hoveredEmotion.color }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <p 
                  className="text-base font-semibold"
                  style={{ color: hoveredEmotion.color }}
                >
                  {hoveredEmotion.name}
                </p>
              </div>
              <p 
                className="text-xs mt-1 text-center"
                style={{ color: theme === 'dark' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)' }}
              >
                Click to explore
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}