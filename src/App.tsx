import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);
  const secondRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const [time, setTime] = useState(new Date().toLocaleTimeString());

  const updateTime = () => {
    setTime(new Date().toLocaleTimeString());
  };

  const [mousePosition, setMousePosition] = useState<{ x: null | number; y: null | number }>({ x: null, y: null });

  const setSeconds = () => {
    const now = new Date();

    const hours = now.getHours() % 12;
    const hoursDegrees = (hours / 12) * 360 + 90;

    if (hourRef.current) {
      hourRef.current.style.transform = `rotate(${hoursDegrees}deg)`;
    }

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

    updateTime();
  };

  useEffect(() => {
    setSeconds();
    const secInterval = setInterval(setSeconds, 1000);

    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      clearInterval(secInterval);
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  useEffect(() => {
    if (tooltipRef.current && mousePosition.x && mousePosition.y) {
      tooltipRef.current.style.top = mousePosition.y - 20 + 'px';
      tooltipRef.current.style.left = mousePosition.x + 20 + 'px';
    }
  }, [mousePosition, tooltipRef]);

  return (
    <div className='clock'>
      <div className='clock-face'>
        <div className='hand hour' ref={hourRef}></div>
        <div className='hand minute' ref={minuteRef}></div>
        <div className='hand second' ref={secondRef}></div>
        <div className='tooltip' ref={tooltipRef}>
          {time}
        </div>
      </div>
    </div>
  );
}

export default App;
