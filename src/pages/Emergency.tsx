import { motion } from 'framer-motion';
import { useTheme } from '../lib/theme';
import Background from '../components/Background';
import { AlertTriangle, Phone, Heart, ExternalLink, MessageCircle } from 'lucide-react';

const crisisResources = [
  {
    name: 'National Suicide Prevention Lifeline',
    description: '24/7, free and confidential support for people in distress',
    contact: '988',
    type: 'phone',
  },
  {
    name: 'Crisis Text Line',
    description: 'Text HOME to 741741 from anywhere in the USA, anytime, about any type of crisis',
    contact: '741741',
    type: 'text',
  },
  {
    name: 'SAMHSA National Helpline',
    description: '24/7, 365-day-a-year treatment referral and information service',
    contact: '1-800-662-4357',
    type: 'phone',
  },
  {
    name: 'International Association for Suicide Prevention',
    description: 'Find crisis centers and resources outside the US',
    contact: 'https://www.iasp.info/resources/Crisis_Centres/',
    type: 'link',
  },
];

export default function Emergency() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
      <Background />
      
      <div className="relative z-10 pt-24 pb-8 px-4 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br from-red-500 to-orange-500"
            >
              <AlertTriangle className="w-6 h-6 text-white" />
            </motion.div>
            <h1 className={`text-3xl font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Emergency Help
            </h1>
          </div>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            If you're in crisis or need immediate support, these resources are here for you 24/7
          </p>
        </motion.div>

        {/* Warning message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`p-6 rounded-2xl mb-8 border-2 ${
            theme === 'dark' 
              ? 'bg-red-500/10 border-red-500/30' 
              : 'bg-red-50 border-red-200'
          }`}
        >
          <div className="flex items-start gap-4">
            <Heart className={`w-6 h-6 flex-shrink-0 ${
              theme === 'dark' ? 'text-red-400' : 'text-red-500'
            }`} />
            <div>
              <h2 className={`font-medium mb-2 ${
                theme === 'dark' ? 'text-red-400' : 'text-red-700'
              }`}>You Are Not Alone</h2>
              <p className={`text-sm leading-relaxed ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                If you're experiencing a mental health emergency or feeling suicidal, please reach out for help immediately.
                These resources are free, confidential, and available 24/7. There are people who care and want to support you.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Resources */}
        <div className="space-y-4">
          {crisisResources.map((resource, i) => (
            <motion.div
              key={resource.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
              className={`p-6 rounded-2xl ${
                theme === 'dark' 
                  ? 'bg-[#16161f] border border-gray-800' 
                  : 'bg-white border border-gray-200 shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className={`font-medium mb-1 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>{resource.name}</h3>
                  <p className={`text-sm mb-3 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>{resource.description}</p>
                  <div className={`flex items-center gap-2 text-lg font-semibold ${
                    theme === 'dark' ? 'text-violet-400' : 'text-violet-600'
                  }`}>
                    {resource.type === 'phone' && <Phone className="w-5 h-5" />}
                    {resource.type === 'text' && <MessageCircle className="w-5 h-5" />}
                    {resource.type === 'link' && <ExternalLink className="w-5 h-5" />}
                    {resource.contact}
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-xl font-medium transition-all flex-shrink-0 ${
                    theme === 'dark'
                      ? 'bg-violet-600 text-white hover:bg-violet-500'
                      : 'bg-violet-500 text-white hover:bg-violet-600'
                  }`}
                  onClick={() => {
                    if (resource.type === 'phone') {
                      window.open(`tel:${resource.contact}`, '_self');
                    } else if (resource.type === 'link') {
                      window.open(resource.contact, '_blank');
                    } else {
                      // For text lines, show info
                      alert(`Text HOME to ${resource.contact}`);
                    }
                  }}
                >
                  {resource.type === 'phone' ? 'Call' : resource.type === 'link' ? 'Visit' : 'Text'}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`mt-8 p-6 rounded-2xl text-center ${
            theme === 'dark' 
              ? 'bg-gradient-to-br from-violet-500/10 to-purple-600/10 border border-violet-500/20' 
              : 'bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200'
          }`}
        >
          <p className={`text-sm leading-relaxed ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            If you're not in immediate danger but need support, try our Breathing Exercises or Journal.
            Remember: seeking help is a sign of strength, not weakness.
          </p>
        </motion.div>
      </div>
    </div>
  );
}