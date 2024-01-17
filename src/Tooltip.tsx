import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store';

function Tooltip() {
  const hour = useSelector((state: RootState) => state.timers.hour);
  const minute = useSelector((state: RootState) => state.timers.minute);
  const second = useSelector((state: RootState) => state.timers.second);

  const time = `${hour}:${minute}:${second >= 10 ? second : `0${second}`}`;

  const tooltipRef = useRef<HTMLDivElement>(null);

  const [mousePosition, setMousePosition] = useState<{ x: null | number; y: null | number }>({ x: null, y: null });

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => window.removeEventListener('mousemove', updateMousePosition);
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
