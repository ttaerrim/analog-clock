import { useEffect, useRef } from 'react';
import './App.css';
import Tooltip from './Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { updateHour, updateMinute, updateSecond } from './store/timerSlice';

function App() {
  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);
  const secondRef = useRef<HTMLDivElement>(null);

  const hour = useSelector((state: RootState) => state.timers.hour);
  const minute = useSelector((state: RootState) => state.timers.minute);
  const second = useSelector((state: RootState) => state.timers.second);
  const dispatch = useDispatch();

  useEffect(() => {
    const setSeconds = () => {
      dispatch(updateSecond(new Date().getSeconds()));
    };
    const secInterval = setInterval(setSeconds, 1000);

    return () => clearInterval(secInterval);
  }, [dispatch]);

  useEffect(() => {
    const secondsDegrees = (second / 60) * 360 + 90;

    if (secondRef.current) {
      secondRef.current.style.transform = `rotate(${secondsDegrees}deg)`;
    }

    if (second === 0) {
      dispatch(updateMinute(new Date().getMinutes()));
    }
  }, [dispatch, second]);

  useEffect(() => {
    const minutesDegrees = (minute / 60) * 360 + 90;

    if (minuteRef.current) {
      minuteRef.current.style.transform = `rotate(${minutesDegrees}deg)`;
    }

    if (minute === 0) {
      dispatch(updateHour(new Date().getHours()));
    }
  }, [minute, dispatch]);

  useEffect(() => {
    const hoursDegrees = (hour / 12) * 360 + 90;

    if (hourRef.current) {
      hourRef.current.style.transform = `rotate(${hoursDegrees}deg)`;
    }
  }, [hour]);

  return (
    <div className='clock'>
      <div className='clock-face'>
        <div className='hand hour' ref={hourRef}></div>
        <div className='hand minute' ref={minuteRef}></div>
        <div className='hand second' ref={secondRef}></div>
        <Tooltip />
      </div>
    </div>
  );
}

export default App;
