import { useEffect, useState } from "react";

const Stopwatch = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  function onToggle() {
    setIsActive(!isActive);
  }

  function onReset() {
    setSeconds(0);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <div className="stopwatch">
      <h3>Stopwatch</h3>
      <div className="stopwatch-group">
        <span className="stopwatch-time">{seconds}s</span>
        <button className={`btn btn--start`} onClick={onToggle}>
          {isActive ? "Pause" : "Start"}
        </button>
        <button className="btn btn--reset" onClick={onReset}>
          Reset
        </button>
      </div>
    </div>
  );
};
export default Stopwatch;
