import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../lib/theme';
import FeelingsWheel from '../components/FeelingsWheel';
import EmotionDrawer from '../components/EmotionDrawer';
import Background from '../components/Background';
import { Emotion } from '../lib/emotions';

export default function Home() {
  const { theme } = useTheme();
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);

  return (
    <div className={`min-h-screen ${
      theme === 'dark' ? 'text-white' : 'text-gray-900'
    }`}>
      <Background />
      
      <div className="relative z-10 pt-20 pb-8 px-4 min-h-screen flex flex-col">
        {/* Main content */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className={`text-3xl md:text-4xl font-light tracking-tight mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Welcome to <span className="font-semibold bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent">EmotiCalm</span>
            </h1>
            <p className={`text-sm md:text-base ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Select an emotion to begin your journey to emotional wellness
            </p>
          </motion.div>

          {/* Feelings Wheel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-3xl md:max-w-4xl lg:max-w-5xl aspect-square"
          >
            <FeelingsWheel onEmotionSelect={setSelectedEmotion} />
          </motion.div>

          {/* Quick tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            {['Breathe deeply', 'Stay present', 'Be kind to yourself'].map((tip, i) => (
              <motion.div
                key={tip}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className={`px-4 py-2 rounded-full text-xs font-medium ${
                  theme === 'dark' 
                    ? 'bg-white/5 text-gray-300 border border-white/10' 
                    : 'bg-gray-50 text-gray-600 border border-gray-200'
                }`}
              >
                {tip}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Emotion Drawer */}
      <EmotionDrawer 
        emotion={selectedEmotion} 
        onClose={() => setSelectedEmotion(null)} 
      />
    </div>
  );
}