import SplashPage from './components/Splashpage';
import './index.css';
import { useRef } from 'react';

function App() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div ref={scrollContainerRef} className="w-full h-screen snap-y snap-mandatory">
      {/* CRT scanlines */}
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.1)_50%,transparent_50%)] bg-[length:100%_10px] animate-scan z-40" /> 

      <SplashPage />
    </div>
  );
}



export default App;
