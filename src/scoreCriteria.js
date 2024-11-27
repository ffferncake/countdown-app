import React from "react";
import "./ScoreCriteria.css";

const ScoreCriteria = () => {
  const criteria = [
    {
      icon: "🧸",
      text: "평일날 오면",
      score: "+500점 (🚗 회사까지 +250점 , 먼저 와서 기다려주기 +100점추가)",
    },
    {
      icon: "💯",
      text: "금/토/일 (기본* = 와야되는날)",
      score: "+200점 (🚗 회사까지오면 +100점)",
    },
    { icon: "🌨", text: "오는길에 비/눈 오면", score: "+50/100점" },
    { icon: "❤️‍🩹", text: "힘들때/울때/아플때 나타나면", score: "+1000점" },
    { icon: "🍴", text: "골뱅이/슬러시 사주기", score: "+500점" },
    { icon: "🍻", text: "조개구이 같이 먹으러 가기", score: "+700점" },
    { icon: "🎈", text: "선물주면/꽃", score: "+500점" },
    { icon: "🚙", text: "출근 시켜주면", score: "+500점" },
    { icon: "🌭", text: "소세지빵 사주면", score: "+300점" },
    { icon: "🏖", text: "바다 놀러면 ", score: "+500점" },
    { icon: "❌", text: "금/토/일 안오면", score: "-500점" },
    { icon: "🤦‍♀️", text: "약속취소하면 (이유없이)", score: "-500점" },
    { icon: "🤬", text: "말투 띠겁게 느껴지면", score: "-300점" },
    {
      icon: "🐯",
      text: "삐지게 해주면/카톡 아무말 없이 읽으면",
      score: "-300점",
    },
    { icon: "😢", text: "서운하게 해주면", score: "-2000점" },
    { icon: "💻", text: "30분이상 카톡 읽씹", score: "-500점" },
    {
      icon: "📵",
      text: "술 먹을 때 전화/카톡 잘 안 하면 (1시간 넘게 답장/응답 없으면)",
      score: "-2000점",
    },
    { icon: "🤷‍♀️", text: "술 먹을 때 옆에 여자가 있으면", score: "-500점" },
    { icon: "🆘", text: "마지막 바람피면", score: "✂️" },
  ];

  return (
    <div className="score-criteria-container">
      <p className="score-criteria-title">점수 기준</p>
      {/* <div className="score-criteria-table">
        {criteria.map((item, index) => (
          <div className="score-criteria-row" key={index}>
            <div className="score-criteria-icon">{item.icon}</div>
            <div className="score-criteria-text">{item.text}</div>
            <div
              className={`score ${
                item.score.includes("-") ? "negative" : "positive"
              }`}
            >
              {item.score}
            </div>{" "}
          </div>
        ))}
      </div> */}
      <div className="positive-scores">
        {criteria
          .filter((item) => item.score.startsWith("+"))
          .map((item, index) => (
            <div key={index} className="score-item positive">
              <div className="icon">{item.icon}</div>
              <div className="text">{item.text}</div>
              <div className="score">{item.score}</div>
            </div>
          ))}
      </div>
      <div className="negative-scores">
        {criteria
          .filter((item) => item.score.startsWith("-"))
          .map((item, index) => (
            <div key={index} className="score-item negative">
              <div className="icon">{item.icon}</div>
              <div className="text">{item.text}</div>
              <div className="score">{item.score}</div>
            </div>
          ))}
      </div>
      <p className="score-criteria-desc">
        {" "}
        🎀 1만: 내가 학교앞에 찾으러 가기 🎫 1.5만:소원 쿠픈 (🍕 먹고싶은거,
        📍가고싶은데 등등) 🧗‍♂️ 2만점: 등산 쿠픈
      </p>
      <p className="score-criteria-desc">
        <strong>
          점수 마이너스 상태 3주이상 되어있으면 🚫 RESET 적용합니다! + 소원
        </strong>
      </p>
    </div>
  );
};

export default ScoreCriteria;
