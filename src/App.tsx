import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTheme } from './lib/theme';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Journal from './pages/Journal';
import Breathing from './pages/Breathing';
import Healing from './pages/Healing';
import Process from './pages/Process';
import Emergency from './pages/Emergency';

function App() {
  const { theme } = useTheme();

  return (
    <BrowserRouter>
      <div className={`min-h-screen transition-colors duration-500 ${
        theme === 'dark' 
          ? 'bg-[#0a0a0f] text-white' 
          : 'bg-white text-gray-900'
      }`}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/breathing" element={<Breathing />} />
          <Route path="/healing" element={<Healing />} />
          <Route path="/process/:emotionId" element={<Process />} />
          <Route path="/emergency" element={<Emergency />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
