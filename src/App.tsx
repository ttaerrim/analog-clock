import { useEffect, useRef } from 'react';
import './App.css';

function App() {
  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);
  const secondRef = useRef<HTMLDivElement>(null);

  const setSeconds = () => {
    const now = new Date();

    const hours = now.getHours() % 12;
    const hoursDegrees = (hours / 12) * 360 + 90;

    if (hourRef.current) {
      hourRef.current.style.transform = `rotate(${hoursDegrees}deg)`;
    }
    console.log(hours);

    const minutes = now.getMinutes();
    const minutesDegrees = (minutes / 60) * 360 + 90;

    if (minuteRef.current) {
      minuteRef.current.style.transform = `rotate(${minutesDegrees}deg)`;
    }

    const seconds = now.getSeconds();
    const secondsDegrees = (seconds / 60) * 360 + 90;

    if (secondRef.current) {
      secondRef.current.style.transform = `rotate(${secondsDegrees}deg)`;
    }
  };

  useEffect(() => {
    setSeconds();
    const secInterval = setInterval(setSeconds, 1000);
    return () => clearInterval(secInterval);
  }, []);

  return (
    <div className='clock'>
      <div className='clock-face'>
        <div className='hand hour' ref={hourRef}></div>
        <div className='hand minute' ref={minuteRef}></div>
        <div className='hand second' ref={secondRef}></div>
      </div>
    </div>
  );
}

export default App;
