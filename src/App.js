import React, { useState, useCallback, useEffect } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

function App() {
  const [inputTime, setInputTime] = useState("");
  const [timeLeft, setTimeLeft] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalPosition, setModalPosition] = useState({
    top: "20%",
    left: "20%",
  });
  const [moveCount, setMoveCount] = useState(0);
  const [modalText, setModalText] = useState("오늘");
  const [showNotice, setShowNotice] = useState(false);

  const modalMessages = [
    "오빠가",
    "바쁘니까",
    "힘내구",
    "화이팅!!!",
    "저녁도 잘 놀구!!",
  ];

  // const noticeMessage = `
  // - 🧸 평일날 오면: +500점 (🚗 회사까지 +250점 , 먼저 와서 기다려주기 +100점추가)
  // - 💯 금/토/일 (기본* = 와야되는날): +200점 (🚗 회사까지오면 +100점)
  // - ❤️‍🩹 힘들때/울때/아플때 나타나면: +1000점
  // - 🍴 골뱅이/슬러시 사주기: +500점
  // - 🍻 조개구이 같이 먹으러 가기: +700점
  // - 🎈 선물주면 : +500점
  // - ❌ 금/토/일 안오면: -500점
  // - 🤦‍♀️ 약속취소하면 (이유없이): -500점
  // - 🤬 말투 띠겁게 느껴지면: -300점
  // - 🐯 삐지게 해주면/카톡 아무말없이 사라지면: -1000점
  // - 😢 서운하게 해주면: -2000점
  // - 💻 30분이상 카톡 읽씹: -500점
  // - 📵 술 먹을 때 전화/카톡 잘 안 하면 (1시간 넘게 답장/응답 없으면): -2000점
  // - 🤷‍♀️ 술 먹을 때 옆에 여자가 있으면: -500점
  // - 🆘 마지막 바람피면: ✂️
  // ❗️🔞 나머지 상황에 따라 +/- 적용 🚫 아님 "RESET"
  // 점수기준 만든사람 기분따라서 점수 변경가능합니다. 이상!
  // `;

  const noticeMessage = `
  한국어능력시험 5급 받으면 여수 벚꽃 보러 가기
  `;

  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/criteria");
  };

  const handleInputChange = (event) => {
    setInputTime(event.target.value);
  };

  const moveModal = () => {
    if (moveCount < 5) {
      const modalWidth = 300;
      const modalHeight = 200;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      const maxTop = screenHeight - modalHeight - 20;
      const maxLeft = screenWidth - modalWidth - 20;

      const newTop = `${Math.floor(
        Math.random() * (maxTop / screenHeight) * 100
      )}%`;
      const newLeft = `${Math.floor(
        Math.random() * (maxLeft / screenWidth) * 100
      )}%`;

      setModalPosition({ top: newTop, left: newLeft });
      setModalText(modalMessages[moveCount]);
      setMoveCount(moveCount + 1);
    } else {
      setShowModal(false);
      setMoveCount(0);
    }
  };

  const handleCloseModal = () => {
    moveModal();
  };

  ////////////// count time left //////////////
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

  ////////////// count time pass (만난지) //////////////
  const [timePassed, setTimePassed] = useState("");

  const calculateTimePassed = useCallback(() => {
    const currentTime = new Date();
    const startTime = new Date("2024-06-29T00:00:00");

    const timeDifference = currentTime - startTime;

    if (timeDifference <= 0) {
      setTimePassed("선택한 날짜가 미래입니다!");
      return;
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    setTimePassed(`${days}일 ${hours}시간 ${minutes}분 ${seconds}초`);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      calculateTimePassed();
    }, 1000);

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 해제
  }, [calculateTimePassed]);

  useEffect(() => {
    // Show the notice modal automatically after 1 second
    const timer = setTimeout(() => {
      setShowNotice(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      <h1>카운트다운 타이머</h1>
      <button className="scorePageBtn" onClick={handleButtonClick}>
        점수 기준 상세 보기
      </button>
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

      {/* <button onClick={() => setShowModal(true)}>오늘 내가 하고싶은 말</button> */}

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
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            {modalText}
          </div>
        </div>
      )}
      {/* Notice Modal */}
      {showNotice && (
        <div className="notice-modal">
          <div className="notice-modal-wrap">
            <div className="notice-content">
              <p className="notice-title">약속 공지</p>
              {noticeMessage.split("\n").map((line, index) => {
                const [boldText, regularText] = line.split(":");
                return (
                  <p className="notice-desc" key={index}>
                    <strong>{boldText.trim()}</strong>
                    {regularText ? `: ${regularText.trim()}` : ""}
                  </p>
                );
              })}
              {/* <p className="notice-sub-desc">
                {" "}
                🎀 1만: 내가 학교앞에 찾으러 가기 🎫 1.5만:소원 쿠픈 (🍕
                먹고싶은거, 📍가고싶은데 등등) 🧗‍♂️ 2만점: 등산 쿠픈
              </p>
              <p className="notice-sub-desc">
                <strong>
                  점수 마이너스 상태 3주이상 되어있으면 🚫 RESET 적용합니다!
                </strong>
              </p> */}
            </div>
            <button
              className="notice-close-btn"
              onClick={() => setShowNotice(false)}
            >
              X
            </button>
          </div>
        </div>
      )}

      <div className="time-container">
        <p className="time-heading">♥ ♡ 2024년 6월 29일부터 지난 시간 : </p>
        {timePassed && (
          <p className="time-text">
            <strong>{timePassed}</strong>♡ ♥
          </p>
        )}
      </div>
      <div className="score-wrap">
        <p className="score-heading">현재 점수 : 15,900 점</p>
        <p className="score-date">updated : 2024.12.29 </p>
      </div>
      <div className="slider">
        {Array.from({ length: 10 }, (_, i) => (
          <img
            key={i}
            src={`/${i + 1}.png`}
            alt={`Slide ${i + 1}`}
            className="slider-image"
          />
        ))}
      </div>

      {/* <div className="progress-input-container">
        <label>
          Set Progress:
          <input
            type="number"
            value={progress}
            onChange={handleProgressChange}
            min="0"
            max="100"
          />
        </label>
      </div> */}

      {/* <div className="horangi-tab">
        <span>🐯</span>
        <div className="progress-tab-container">
          <div className="progress-tab" style={{ width: `${progress}%` }}>
            <span className="progress-tab-text">{`${Math.round(
              progress
            )}%`}</span>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default App;
