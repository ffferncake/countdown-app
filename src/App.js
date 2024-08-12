import React, { useState } from "react";
import "./App.css";

function App() {
  const [inputTime, setInputTime] = useState("");
  const [timeLeft, setTimeLeft] = useState("");

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
      <h1>Countdown Timer</h1>
      <input
        type="datetime-local"
        value={inputTime}
        onChange={handleInputChange}
      />
      <button onClick={calculateTimeLeft}>Calculate Time Left</button>
      <div>
        {timeLeft && (
          <p>
            오빠 기다려야 되는 시간은: <strong>{timeLeft}</strong> 남았습니다!
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
