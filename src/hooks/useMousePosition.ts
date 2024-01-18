import { useEffect, useState } from 'react';

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState<{ x: null | number; y: null | number }>({ x: null, y: null });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return mousePosition;
};
export default useMousePosition;
