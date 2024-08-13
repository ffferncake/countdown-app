import React, { useState, useEffect, useCallback } from "react";
import "./App.css";

function App() {
  const [inputTime, setInputTime] = useState("");
  const [timeLeft, setTimeLeft] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalPosition, setModalPosition] = useState({
    top: "40%",
    left: "40%",
  });
  const [moveCount, setMoveCount] = useState(0);
  const [modalText, setModalText] = useState("오늘");

  const modalMessages = [
    "시간이 왜 이렇게 느려!!",
    "닫지마! 더 할말 있어",
    "서울 당장 오라구!!",
    "더 있어!",
    "비와! 당장 출발하라구 나 젖으면 안 돼!",
  ];

  const calculateTimeLeft = useCallback(() => {
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
  }, [inputTime]);

  useEffect(() => {
    if (!inputTime) return;

    const interval = setInterval(() => {
      calculateTimeLeft();
    }, 1000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [inputTime, calculateTimeLeft]);

  const handleInputChange = (event) => {
    setInputTime(event.target.value);
  };

  const moveModal = () => {
    if (moveCount < 5) {
      // Updated to 5 because 0-based index
      const modalWidth = 300; // Adjust this to match your modal's actual width
      const modalHeight = 200; // Adjust this to match your modal's actual height
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      const maxTop = screenHeight - modalHeight - 20; // 20px padding
      const maxLeft = screenWidth - modalWidth - 20; // 20px padding

      const newTop = `${Math.floor(
        Math.random() * (maxTop / screenHeight) * 100
      )}%`;
      const newLeft = `${Math.floor(
        Math.random() * (maxLeft / screenWidth) * 100
      )}%`;

      setModalPosition({ top: newTop, left: newLeft });
      setModalText(modalMessages[moveCount]); // Update the text based on move count
      setMoveCount(moveCount + 1);
    } else {
      setShowModal(false); // Immediately close the modal
      setMoveCount(0); // Reset move count
    }
  };

  const handleCloseModal = () => {
    moveModal();
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

      <button onClick={() => setShowModal(true)}>오늘 내가 하고싶은 말</button>

      {showModal && (
        <div
          className="modal"
          style={{
            top: modalPosition.top,
            left: modalPosition.left,
          }}
        >
          <button onClick={handleCloseModal} className="closeModal">
            &times;
          </button>
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            {modalText}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
