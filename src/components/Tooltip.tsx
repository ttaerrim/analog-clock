import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import useMousePosition from '../hooks/useMousePosition';

function Tooltip() {
  const hour = useSelector((state: RootState) => state.timers.hour);
  const minute = useSelector((state: RootState) => state.timers.minute);
  const second = useSelector((state: RootState) => state.timers.second);

  const time = `${hour}:${minute}:${second >= 10 ? second : `0${second}`}`;

  const tooltipRef = useRef<HTMLDivElement>(null);

  const mousePosition = useMousePosition();

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
