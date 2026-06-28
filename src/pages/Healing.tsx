import { motion } from 'framer-motion';
import { useTheme } from '../lib/theme';
import Background from '../components/Background';
import { 
  Eye, 
  HandHeart, 
  Compass, 
  Shield, 
  Map, 
  Rocket,
  CheckCircle2
} from 'lucide-react';

interface HealingStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string[];
}

const healingSteps: HealingStep[] = [
  {
    id: 1,
    title: 'Identify Your Feelings',
    description: 'The first step is recognizing and naming what you feel',
    icon: <Eye className="w-5 h-5" />,
    details: [
      'Use the feelings wheel to pinpoint your emotion',
      'Notice physical sensations in your body',
      'Ask yourself: "What am I feeling right now?"',
      'Be specific - move from general to specific emotions',
    ],
  },
  {
    id: 2,
    title: 'Acknowledge Your Emotions',
    description: 'Accept your feelings without judgment',
    icon: <HandHeart className="w-5 h-5" />,
    details: [
      'Validate that your feelings are real and important',
      'Avoid criticizing yourself for having emotions',
      'Remember: all emotions are temporary visitors',
      "Say to yourself: \"It's okay to feel this way\"",
    ],
  },
  {
    id: 3,
    title: 'Get Curious',
    description: 'Explore the source and meaning of your emotions',
    icon: <Compass className="w-5 h-5" />,
    details: [
      'Ask: "What triggered this emotion?"',
      'Look for patterns in when this feeling arises',
      'Consider what this emotion might be telling you',
      'Explore underlying needs or unmet desires',
    ],
  },
  {
    id: 4,
    title: 'Build Confidence',
    description: 'Trust in your ability to handle emotions',
    icon: <Shield className="w-5 h-5" />,
    details: [
      'Remind yourself of past emotional challenges you overcame',
      'Practice self-compassion and patience',
      'Build a toolkit of coping strategies',
      'Celebrate small progress along the way',
    ],
  },
  {
    id: 5,
    title: 'Prepare a Plan',
    description: 'Create strategies for future emotional moments',
    icon: <Map className="w-5 h-5" />,
    details: [
      'Identify your personal triggers',
      'Plan specific actions for each emotion',
      'Create a support network you can reach out to',
      'Establish healthy boundaries and routines',
    ],
  },
  {
    id: 6,
    title: 'Take Action',
    description: 'Implement your plan and move forward',
    icon: <Rocket className="w-5 h-5" />,
    details: [
      'Start with small, manageable steps',
      'Use breathing exercises when emotions arise',
      'Reach out for support when needed',
      'Reflect and adjust your approach as you learn',
    ],
  },
];

export default function Healing() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
      <Background />
      
      <div className="relative z-10 pt-24 pb-8 px-4 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className={`text-3xl font-semibold mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Healing Steps
          </h1>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            A gentle framework for emotional growth and self-regulation
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className={`absolute left-8 top-0 bottom-0 w-0.5 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
          }`} />

          {/* Steps */}
          <div className="space-y-8">
            {healingSteps.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                className="relative pl-20"
              >
                {/* Step number/icon */}
                <div className={`absolute left-0 w-16 h-16 rounded-2xl flex items-center justify-center ${
                  theme === 'dark' 
                    ? 'bg-gradient-to-br from-violet-500/20 to-purple-600/20 border border-violet-500/30' 
                    : 'bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200'
                }`}>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    theme === 'dark' 
                      ? 'bg-violet-500/30 text-violet-400' 
                      : 'bg-violet-100 text-violet-500'
                  }`}>
                    {step.icon}
                  </div>
                </div>

                {/* Content */}
                <div className={`rounded-2xl p-6 ${
                  theme === 'dark' 
                    ? 'bg-[#16161f] border border-gray-800' 
                    : 'bg-white border border-gray-200 shadow-sm'
                }`}>
                  <div className="flex items-start gap-4 mb-3">\n                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          theme === 'dark' 
                            ? 'bg-violet-500/20 text-violet-400' 
                            : 'bg-violet-100 text-violet-600'
                        }`}>
                          Step {step.id}
                        </span>
                      </div>
                      <h3 className={`text-lg font-medium ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>{step.title}</h3>
                    </div>
                  </div>
                  <p className={`text-sm mb-4 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>{step.description}</p>
                  <ul className="space-y-2">
                    {step.details.map((detail, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.15 + j * 0.05 }}
                        className={`flex items-start gap-3 text-sm ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`}
                      >
                        <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                          theme === 'dark' ? 'text-violet-400' : 'text-violet-500'
                        }`} />
                        {detail}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className={`mt-12 p-6 rounded-2xl text-center ${
            theme === 'dark' 
              ? 'bg-gradient-to-br from-violet-500/10 to-purple-600/10 border border-violet-500/20' 
              : 'bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200'
          }`}
        >
          <p className={`text-sm leading-relaxed ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Remember: healing is not linear. You may revisit steps multiple times.
            Each cycle brings deeper understanding and growth. Be patient with yourself.
          </p>
        </motion.div>
      </div>
    </div>
  );
}