import { useEffect, useRef, useState } from 'react';

function Tooltip() {
  const tooltipRef = useRef<HTMLDivElement>(null);

  const [time, setTime] = useState(new Date().toLocaleTimeString());

  const updateTime = () => {
    setTime(new Date().toLocaleTimeString());
  };

  const [mousePosition, setMousePosition] = useState<{ x: null | number; y: null | number }>({ x: null, y: null });

  useEffect(() => {
    const secInterval = setInterval(updateTime, 1000);

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
    <div className='tooltip' ref={tooltipRef}>
      {time}
    </div>
  );
}

export default Tooltip;
