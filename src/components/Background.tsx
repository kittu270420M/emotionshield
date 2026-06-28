import { motion } from 'framer-motion';
import { useTheme } from '../lib/theme';

export default function Background() {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Gradient background */}
      <div className={`absolute inset-0 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-[#0a0a0f] via-[#0f0f18] to-[#0a0a0f]'
          : 'bg-gradient-to-br from-violet-50/50 via-white to-rose-50/50'
      }`} />

      {/* Mesh gradient overlays */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full blur-3xl ${
          theme === 'dark'
            ? 'bg-violet-600/20'
            : 'bg-violet-200/40'
        }`}
      />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`absolute top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full blur-3xl ${
          theme === 'dark'
            ? 'bg-purple-600/15'
            : 'bg-purple-200/30'
        }`}
      />

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`absolute -bottom-1/4 left-1/4 w-1/2 h-1/2 rounded-full blur-3xl ${
          theme === 'dark'
            ? 'bg-indigo-600/15'
            : 'bg-indigo-200/30'
        }`}
      />

      {/* Subtle grid pattern */}
      <div
        className={`absolute inset-0 ${
          theme === 'dark' ? 'opacity-[0.02]' : 'opacity-[0.03]'
        }`}
        style={{
          backgroundImage: `
            linear-gradient(${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'} 1px, transparent 1px),
            linear-gradient(90deg, ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'} 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating orbs */}
      <motion.div
        animate={{
          y: [-20, 20, -20],
          x: [-10, 10, -10],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`absolute top-1/4 left-1/3 w-64 h-64 rounded-full blur-3xl ${
          theme === 'dark'
            ? 'bg-violet-500/10'
            : 'bg-violet-300/20'
        }`}
      />

      <motion.div
        animate={{
          y: [20, -20, 20],
          x: [10, -10, 10],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl ${
          theme === 'dark'
            ? 'bg-purple-500/10'
            : 'bg-purple-300/15'
        }`}
      />
    </div>
  );
}