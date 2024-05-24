import { useState } from "react";
import { useNavigate } from "react-router";
import { realData } from "../../constants/mock-data";

export const Quiz = () => {
  let [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(realData[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  let [result, setResult] = useState(false);
  const navigate = useNavigate();

  const checkAns = (e: any): void => {
    if (!lock) {
      console.log(e.target.innerText);
      if (question.correct_answer === e.target.innerText) {
        e.target.classList.add("correct");
        setLock(true);
        setScore(score + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
      }
    }
  };

  const next = () => {
    if (lock) {
      if (index === realData.length - 1) {
        setResult(true);
        return 0;
      }
      const answerOptions = document.querySelectorAll(".flex.cursor-pointer");
      answerOptions.forEach((item) => {
        item.classList.remove("correct", "wrong");
      });
    }
    if (lock) {
      setIndex(++index);
      setQuestion(realData[index]);
      setLock(false); // why here????
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(realData[0]);
    setScore(0);
    setLock(false);
    setResult(false);
    navigate("/setup");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[640px] bg-white text-[#262626] rounded-xl py-[40px] px-[50px] flex flex-col gap-2">
        <h1 className="text-4xl text-center font-serif">Quiz App</h1>
        <hr className="border-none h-[2px] bg-[#707070]" />
        {result ? (
          <>
            <h2 className="text-3xl mt-6 text-center">
              Your Score : {(score / realData.length) * 100}%
            </h2>
            <button
              onClick={reset}
              className="m-auto w-[150px] h-[50px] bg-[#2E1437] text-white text-[25px] cursor-pointer rounded-lg font=[500px] mt-6"
            >
              Reset
            </button>
          </>
        ) : (
          <>
            <h2 className="text-[27px] font-[500] my-4">
              {index + 1}. {question.question}
            </h2>
            <ul>
              <li
                onClick={checkAns}
                className="flex items-center h-[70px] pl-[15px] border border-[#686868] rounded-md mb-[20px] text-[20px] cursor-pointer"
              >
                {question.incorrect_answers[0]}
              </li>
              <li
                onClick={checkAns}
                className="flex items-center h-[70px] pl-[15px] border border-[#686868] rounded-md mb-[20px] text-[20px] cursor-pointer"
              >
                {question.incorrect_answers[1]}
              </li>
              <li
                onClick={checkAns}
                className="flex items-center h-[70px] pl-[15px] border border-[#686868] rounded-md mb-[20px] text-[20px] cursor-pointer"
              >
                {question.incorrect_answers[2]}
              </li>
              <li
                onClick={checkAns}
                className="flex items-center h-[70px] pl-[15px] border border-[#686868] rounded-md mb-[20px] text-[20px] cursor-pointer"
              >
                {question.correct_answer}
              </li>
            </ul>
            <button
              onClick={next}
              className="m-auto w-[250px] h-[65px] bg-[#2E1437] text-white text-[25px] cursor-pointer rounded-lg font=[500px]"
            >
              Next
            </button>
            <div className="m-auto text-[18px]">
              {index + 1} of {realData.length} questions
            </div>
          </>
        )}
      </div>
    </div>
  );
};
