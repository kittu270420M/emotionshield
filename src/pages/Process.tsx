import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../lib/theme';
import Background from '../components/Background';
import { getEmotionById, Emotion } from '../lib/emotions';
import { 
  Wind, 
  BookOpen, 
  Footprints, 
  GlassWater,
  HandHeart,
  Sparkles,
  ArrowLeft
} from 'lucide-react';

interface SupportActivity {
  icon: React.ReactNode;
  title: string;
  description: string;
  duration: string;
  action: string;
  link?: string;
}

export default function Process() {
  const { emotionId } = useParams<{ emotionId: string }>();
  const { theme } = useTheme();
  const [emotion, setEmotion] = useState<Emotion | null>(null);

  useEffect(() => {
    if (emotionId) {
      const found = getEmotionById(emotionId);
      setEmotion(found || null);
    }
  }, [emotionId]);

  if (!emotion) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        theme === 'dark' ? 'bg-[#0a0a0f] text-white' : 'bg-white text-gray-900'
      }`}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
            Emotion not found. Please select from the wheel.
          </p>
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4 px-6 py-2 rounded-xl bg-violet-500 text-white"
            >
              Go Back
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  const getActivities = (): SupportActivity[] => {
    const baseActivities: SupportActivity[] = [
      {
        icon: <Wind className="w-5 h-5" />,
        title: 'Breathing Exercise',
        description: 'Guided breathing to calm your nervous system',
        duration: '5-10 min',
        action: 'Start Breathing',
        link: '/breathing',
      },
      {
        icon: <BookOpen className="w-5 h-5" />,
        title: 'Journal Your Thoughts',
        description: 'Express and process your feelings through writing',
        duration: '10-15 min',
        action: 'Open Journal',
        link: `/journal?emotion=${emotion.id}`,
      },
    ];

    // Add emotion-specific activities
    const specificActivities: Record<string, SupportActivity[]> = {
      anger: [
        {
          icon: <Footprints className="w-5 h-5" />,
          title: 'Take a Walk',
          description: 'Physical movement helps release tension',
          duration: '15-20 min',
          action: 'Go Outside',
        },
        {
          icon: <GlassWater className="w-5 h-5" />,
          title: 'Hydrate',
          description: 'Drink water to help your body process stress hormones',
          duration: '1 min',
          action: 'Drink Water',
        },
      ],
      anxiety: [
        {
          icon: <HandHeart className="w-5 h-5" />,
          title: 'Grounding Exercise',
          description: '5-4-3-2-1 technique to reconnect with your surroundings',
          duration: '5 min',
          action: 'Start Grounding',
        },
        {
          icon: <Sparkles className="w-5 h-5" />,
          title: 'Positive Visualization',
          description: 'Imagine a safe, peaceful place',
          duration: '5 min',
          action: 'Visualize',
        },
      ],
      sadness: [
        {
          icon: <HandHeart className="w-5 h-5" />,
          title: 'Self-Reflection',
          description: 'Gentle exploration of what you need right now',
          duration: '10 min',
          action: 'Reflect',
        },
        {
          icon: <Sparkles className="w-5 h-5" />,
          title: 'Connect with Someone',
          description: 'Reach out to a friend or loved one',
          duration: 'Varies',
          action: 'Reach Out',
        },
      ],
      fear: [
        {
          icon: <HandHeart className="w-5 h-5" />,
          title: 'Safety Check',
          description: 'Assess your current environment and safety',
          duration: '2 min',
          action: 'Check Safety',
        },
        {
          icon: <Sparkles className="w-5 h-5" />,
          title: 'Challenge Thoughts',
          description: 'Examine the evidence for your fears',
          duration: '5 min',
          action: 'Challenge',
        },
      ],
    };

    const additional = specificActivities[emotion.id] || specificActivities[emotion.parent || ''] || [];
    return [...baseActivities, ...additional];
  };

  const activities = getActivities();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
      <Background />
      
      <div className="relative z-10 pt-24 pb-8 px-4 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl mb-6 transition-all ${
                theme === 'dark' 
                  ? 'bg-white/5 text-gray-400 hover:bg-white/10' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Wheel
            </motion.button>
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: emotion.color }}
            />
            <div>
              <h1 className={`text-3xl font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Processing {emotion.name}
              </h1>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {emotion.description}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Emotion context */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`p-6 rounded-2xl mb-8 ${
            theme === 'dark' 
              ? 'bg-[#16161f] border border-gray-800' 
              : 'bg-white border border-gray-200 shadow-sm'
          }`}
        >
          <h2 className={`font-medium mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Understanding Your Feeling</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className={`text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>Common Triggers</h3>
              <ul className={`space-y-1 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {emotion.triggers.map((trigger) => (
                  <li key={trigger} className="flex items-center gap-2 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: emotion.color }} />
                    {trigger}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className={`text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>Related Emotions</h3>
              <div className="flex flex-wrap gap-2">
                {emotion.relatedEmotions.map((related) => (
                  <span
                    key={related}
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{ 
                      backgroundColor: theme === 'dark' ? `${emotion.color}20` : `${emotion.color}15`,
                      color: emotion.color
                    }}
                  >
                    {related}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className={`font-medium mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Recommended Activities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activities.map((activity, i) => (
              <motion.div
                key={activity.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.05 }}
                className={`p-5 rounded-2xl ${
                  theme === 'dark' 
                    ? 'bg-[#16161f] border border-gray-800' 
                    : 'bg-white border border-gray-200 shadow-sm'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    theme === 'dark' 
                      ? 'bg-violet-500/20 text-violet-400' 
                      : 'bg-violet-100 text-violet-500'
                  }`}
                  style={activity.title.includes(emotion.name) ? { backgroundColor: `${emotion.color}20`, color: emotion.color } : {}}
                  >
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-medium mb-1 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{activity.title}</h3>
                    <p className={`text-sm mb-2 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>{activity.description}</p>
                    <p className={`text-xs ${
                      theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                    }`}>~ {activity.duration}</p>
                  </div>
                </div>
                {activity.link ? (
                  <Link to={activity.link} className="block mt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-2 rounded-xl text-sm font-medium transition-all"
                      style={{ backgroundColor: emotion.color, color: 'white' }}
                    >
                      {activity.action}
                    </motion.button>
                  </Link>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-2 rounded-xl text-sm font-medium mt-4 transition-all ${
                      theme === 'dark' 
                        ? 'bg-white/10 text-white hover:bg-white/15' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {activity.action}
                  </motion.button>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`mt-8 p-6 rounded-2xl text-center ${
            theme === 'dark' 
              ? 'bg-gradient-to-br from-violet-500/10 to-purple-600/10 border border-violet-500/20' 
              : 'bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200'
          }`}
        >
          <p className={`text-sm leading-relaxed ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Remember: processing emotions takes time. Be patient with yourself.
            Every step you take is progress. You're doing great.
          </p>
        </motion.div>
      </div>
    </div>
  );
}