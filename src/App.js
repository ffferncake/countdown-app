import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [inputTime, setInputTime] = useState("");
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!inputTime) return;

    const interval = setInterval(() => {
      calculateTimeLeft();
    }, 1000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [inputTime]);

  const handleInputChange = (event) => {
    setInputTime(event.target.value);
  };

  const calculateTimeLeft = () => {
    const currentTime = new Date();
    const targetTime = new Date(inputTime);

    const timeDifference = targetTime - currentTime;

    if (timeDifference <= 0) {
      setTimeLeft("The selected time is in the past!");
      return;
    }

    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
  };

  return (
    <div className="App">
      <h1>카운트다운 타이머</h1>
      <input
        type="datetime-local"
        value={inputTime}
        onChange={handleInputChange}
      />
      <div>
        {timeLeft && (
          <p>
            오빠 기다려야 되는 시간은: <strong>{timeLeft}</strong> 남았습니다!
          </p>
        )}
      </div>
      <div className="hearts-container">
        {[...Array(10)].map((_, index) => (
          <div key={index} className={`heart heart-${index + 1}`}></div>
        ))}
      </div>
    </div>
  );
}

export default App;
