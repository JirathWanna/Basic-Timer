import { useEffect, useRef, useState } from "react";
import './App.css'


function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const startRef = useRef(0);
  const intervalIdRef = useRef(0);

  const [hin, sethin] = useState(1);
  const [min, setmin] = useState(30);
  const [sin, setsin] = useState(0);

  

  useEffect(() => {
    if(isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startRef.current);
      }, 10)
    }

    

    return () => {
      clearInterval(intervalIdRef.current)
    }
    
  }, [isRunning])
  

  function start() {
    setIsRunning(true);
    startRef.current = Date.now() - elapsedTime;
  }

  function stop() {
    setIsRunning(false);
  }

  function reset() {
    setIsRunning(false);
    setElapsedTime(0);
  }

  function formatTime() {
    let display = ((hin * 60 * 60 * 1000) + (min * 60 * 1000) + (sin * 1000)) - elapsedTime;

    if(display < 0) {
      alert("Time's up!")
      reset()
    }


    let hour = Math.floor(display/(1000 * 60 * 60));
    let minute = Math.floor(display/(1000 * 60)%60);
    let second = Math.floor(display/1000%60);

    return `${hour} : ${minute} : ${second}`;
  }

  return (
    <>
      <div className="container">
        <div style={{fontSize:'150px', color: 'rgb(240, 233, 224)'}}>{formatTime()}</div>
        
        <div>
          <button className="btn" onClick={start}>start</button>
          <button className="btn" onClick={stop}>stop</button>
          <button className="btn" onClick={reset}>reset</button>
        </div>

        <div className="input-container">
          <input disabled={isRunning || elapsedTime > 0} value={hin} onChange={(e) => {sethin(Number(e.target.value))}} placeholder="hours" className="num-input" type="number" />
          <input disabled={isRunning || elapsedTime > 0} value={min} onChange={(e) => {setmin(Number(e.target.value))}} placeholder="minutes" className="num-input" type="number" />
          <input disabled={isRunning || elapsedTime > 0} value={sin} onChange={(e) => {setsin(Number(e.target.value))}} placeholder="seconds" className="num-input" type="number" />
        </div>
        <div className="text-container">
          <div className="text">hours</div>
          <div className="text">minutes</div>
          <div className="text">seconds</div>
        </div>
      </div>
       
    </>
  )
}

export default App
