import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../lib/theme';
import Background from '../components/Background';
import { coreEmotions, Emotion } from '../lib/emotions';
import { Calendar, Clock, Save, Trash2, ChevronDown } from 'lucide-react';

interface JournalEntry {
  id: string;
  title: string;
  body: string;
  emotion_id: string;
  created_at: string;
}

export default function Journal() {
  const { theme } = useTheme();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState<string>('');
  const [showEmotionPicker, setShowEmotionPicker] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const res = await fetch('/api/journal');
      const data = await res.json();
      setEntries(data || []);
    } catch (err) {
      console.error('Failed to fetch entries:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!title.trim() || !body.trim()) return;
    
    setSaving(true);
    try {
      const res = await fetch('/api/journal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          body: body.trim(),
          emotion_id: selectedEmotion || null,
        }),
      });
      if (res.ok) {
        setTitle('');
        setBody('');
        setSelectedEmotion('');
        fetchEntries();
      }
    } catch (err) {
      console.error('Failed to save entry:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch('/api/journal', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        fetchEntries();
      }
    } catch (err) {
      console.error('Failed to delete entry:', err);
    }
  };

  const getEmotion = (id: string): Emotion | undefined => {
    return coreEmotions.find(e => e.id === id);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit'
    });
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
          <h1 className={`text-3xl font-semibold mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Journal
          </h1>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            Express your thoughts and feelings in a safe, private space
          </p>
        </motion.div>

        {/* New Entry */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`rounded-2xl p-6 mb-8 ${
            theme === 'dark' 
              ? 'bg-[#16161f] border border-gray-800' 
              : 'bg-white border border-gray-200 shadow-sm'
          }`}
        >
          <div className="mb-4">
            <input
              type="text"
              placeholder="Title your entry..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full text-xl font-medium bg-transparent border-none outline-none placeholder:opacity-40 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            />
          </div>

          <div className="mb-4">
            <textarea
              placeholder="What's on your mind today?"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={6}
              className={`w-full bg-transparent border-none outline-none resize-none placeholder:opacity-40 leading-relaxed ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Emotion Picker */}
            <div className="relative">
              <button
                onClick={() => setShowEmotionPicker(!showEmotionPicker)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  theme === 'dark' 
                    ? 'bg-white/5 hover:bg-white/10 text-gray-300' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {selectedEmotion ? (
                  <>
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getEmotion(selectedEmotion)?.color }}
                    />
                    <span className="text-sm">{getEmotion(selectedEmotion)?.name}</span>
                  </>
                ) : (
                  <span className="text-sm">Tag emotion</span>
                )}
                <ChevronDown className="w-4 h-4" />
              </button>

              {showEmotionPicker && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`absolute top-full left-0 mt-2 p-2 rounded-xl shadow-lg z-20 max-h-64 overflow-y-auto ${
                    theme === 'dark' 
                      ? 'bg-[#1a1a24] border border-gray-800' 
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  <div className="grid grid-cols-2 gap-1">
                    {coreEmotions.map((emotion) => (
                      <button
                        key={emotion.id}
                        onClick={() => {
                          setSelectedEmotion(emotion.id);
                          setShowEmotionPicker(false);
                        }}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm transition-all ${
                          theme === 'dark' 
                            ? 'hover:bg-white/10 text-gray-300' 
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: emotion.color }}
                        />
                        {emotion.name}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Save Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              disabled={!title.trim() || !body.trim() || saving}
              className={`flex items-center gap-2 px-6 py-2 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                theme === 'dark'
                  ? 'bg-violet-600 text-white hover:bg-violet-500'
                  : 'bg-violet-500 text-white hover:bg-violet-600'
              }`}
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save Entry'}
            </motion.button>
          </div>
        </motion.div>

        {/* Past Entries */}
        <div>
          <h2 className={`text-lg font-medium mb-4 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Past Entries
          </h2>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`animate-pulse rounded-2xl p-6 ${
                    theme === 'dark' ? 'bg-[#16161f]' : 'bg-gray-100'
                  }`}
                >
                  <div className={`h-4 rounded w-1/3 mb-4 ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
                  }`} />
                  <div className={`h-3 rounded w-full mb-2 ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
                  }`} />
                  <div className={`h-3 rounded w-2/3 ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
                  }`} />
                </div>
              ))}
            </div>
          ) : entries.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-center py-12 rounded-2xl ${
                theme === 'dark' ? 'bg-[#16161f]/50' : 'bg-gray-50'
              }`}
            >
              <p className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}>
                No journal entries yet. Start writing above.
              </p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {entries.map((entry, i) => {
                const emotion = entry.emotion_id ? getEmotion(entry.emotion_id) : null;
                return (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`rounded-2xl p-6 ${
                      theme === 'dark' 
                        ? 'bg-[#16161f] border border-gray-800' 
                        : 'bg-white border border-gray-200 shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className={`font-medium mb-1 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          {entry.title}
                        </h3>
                        <div className={`flex items-center gap-3 text-xs ${
                          theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                        }`}>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(entry.created_at)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatTime(entry.created_at)}
                          </span>
                          {emotion && (
                            <span className="flex items-center gap-1">
                              <span
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: emotion.color }}
                              />
                              {emotion.name}
                            </span>
                          )}
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(entry.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          theme === 'dark' 
                            ? 'hover:bg-red-500/20 text-gray-500 hover:text-red-400' 
                            : 'hover:bg-red-50 text-gray-400 hover:text-red-500'
                        }`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                    <p className={`text-sm leading-relaxed whitespace-pre-wrap ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {entry.body}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}