import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../lib/theme';
import { Emotion } from '../lib/emotions';
import { X, Sparkles, BookOpen, Lightbulb, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EmotionDrawerProps {
  emotion: Emotion | null;
  onClose: () => void;
}

export default function EmotionDrawer({ emotion, onClose }: EmotionDrawerProps) {
  const { theme } = useTheme();

  if (!emotion) return null;

  return (
    <AnimatePresence>
      {emotion && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={`fixed right-0 top-0 h-full w-full max-w-md z-50 overflow-y-auto ${
              theme === 'dark' 
                ? 'bg-[#0f0f14] border-l border-gray-800' 
                : 'bg-white border-l border-gray-200'
            }`}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 backdrop-blur-xl">
              <div className="flex items-center justify-between p-6">
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: emotion.color }}
                  />
                  <h2 className={`text-xl font-semibold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {emotion.name}
                  </h2>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className={`p-2 rounded-xl transition-colors ${
                    theme === 'dark' 
                      ? 'hover:bg-white/10 text-gray-400' 
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 pt-0 space-y-6">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`p-4 rounded-2xl ${
                  theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'
                }`}
              >
                <p className={`text-sm leading-relaxed ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {emotion.description}
                </p>
              </motion.div>

              {/* Triggers */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className={`w-4 h-4 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <h3 className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Possible Triggers
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {emotion.triggers.map((trigger, i) => (
                    <motion.span
                      key={trigger}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.25 + i * 0.05 }}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                        theme === 'dark' 
                          ? 'bg-white/10 text-gray-300' 
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {trigger}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Related Emotions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className={`w-4 h-4 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <h3 className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Related Emotions
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {emotion.relatedEmotions.map((related, i) => (
                    <motion.span
                      key={related}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.35 + i * 0.05 }}
                      className="px-3 py-1.5 rounded-full text-xs font-medium"
                      style={{ 
                        backgroundColor: theme === 'dark' ? `${emotion.color}20` : `${emotion.color}15`,
                        color: emotion.color
                      }}
                    >
                      {related}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Recommendations */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className={`w-4 h-4 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <h3 className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Calming Recommendations
                  </h3>
                </div>
                <ul className="space-y-2">
                  {emotion.recommendations.map((rec, i) => (
                    <motion.li
                      key={rec}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.45 + i * 0.05 }}
                      className={`flex items-center gap-2 text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: emotion.color }} />
                      {rec}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-3 pt-4"
              >
                <Link 
                  to={`/process/${emotion.id}`}
                  onClick={onClose}
                  className="block"
                >
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full py-3 px-4 rounded-xl font-medium text-white transition-all"
                    style={{ backgroundColor: emotion.color }}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Help Me Process This
                    </span>
                  </motion.button>
                </Link>

                <Link 
                  to={`/journal?emotion=${emotion.id}`}
                  onClick={onClose}
                  className="block"
                >
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`w-full py-3 px-4 rounded-xl font-medium transition-all ${
                      theme === 'dark' 
                        ? 'bg-white/10 text-white hover:bg-white/15' 
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Journal This
                    </span>
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}