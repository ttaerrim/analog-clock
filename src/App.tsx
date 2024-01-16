import { useEffect, useRef } from 'react';
import './App.css';

function App() {
  const secondRef = useRef<HTMLDivElement>(null);

  const setDate = () => {
    const now = new Date();
    const seconds = now.getSeconds();
    const secondsDegrees = (seconds / 60) * 360 + 90;
    if (secondRef.current) {
      secondRef.current.style.transform = `rotate(${secondsDegrees}deg)`;
    }
  };

  useEffect(() => {
    const interval = setInterval(setDate, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='clock'>
      <div className='clock-face'>
        <div className='hand hour'></div>
        <div className='hand minute'></div>
        <div className='hand second' ref={secondRef}></div>
      </div>
    </div>
  );
}

export default App;
