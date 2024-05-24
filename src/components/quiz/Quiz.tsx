import { useState } from "react";
import { useNavigate } from "react-router";
import { useData } from "../../context/DataContext";

export const Quiz = () => {
  const { data } = useData();
  let [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  let [result, setResult] = useState(false);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  const checkAns = (e: any): void => {
    if (!lock) {
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
      if (index === data.length - 1) {
        setResult(true);
        return;
      }
      const answerOptions = document.querySelectorAll(".flex.cursor-pointer");
      answerOptions.forEach((item) => {
        item.classList.remove("correct", "wrong");
      });
      setIndex(++index);
      setQuestion(data[index]);
      setLock(false); // reset lock for the next question
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
    navigate("/setup");
  };

  return (
    <div className="flex items-center justify-center h-screen px-4">
      <div className="w-full max-w-[640px] bg-white text-[#262626] rounded-xl py-8 px-6 flex flex-col gap-4 md:gap-5">
        <h1 className="text-3xl md:text-4xl text-center font-serif">
          Quiz App
        </h1>
        <hr className="border-none h-[2px] bg-[#707070]" />
        {result ? (
          <>
            <h2 className="text-2xl md:text-3xl mt-4 md:mt-6 text-center">
              Your Score: {(score / data.length) * 100}%
            </h2>
            <button
              onClick={reset}
              className="m-auto w-full max-w-[150px] h-[50px] bg-[#2E1437] text-white text-[20px] md:text-[25px] cursor-pointer rounded-lg font-semibold mt-4 md:mt-6"
            >
              Reset
            </button>
          </>
        ) : (
          <>
            <h2 className="text-xl md:text-[27px] font-medium my-4">
              {index + 1}. {question.question}
            </h2>
            <ul>
              {question.incorrect_answers.map((answer, idx) => (
                <li
                  key={idx}
                  onClick={checkAns}
                  className="flex items-center h-[50px] md:h-[70px] pl-4 md:pl-[15px] border border-[#686868] rounded-md mb-2 md:mb-[20px] text-[16px] md:text-[20px] cursor-pointer"
                >
                  {answer}
                </li>
              ))}
              <li
                onClick={checkAns}
                className="flex items-center h-[50px] md:h-[70px] pl-4 md:pl-[15px] border border-[#686868] rounded-md mb-2 md:mb-[20px] text-[16px] md:text-[20px] cursor-pointer"
              >
                {question.correct_answer}
              </li>
            </ul>
            <button
              onClick={next}
              className="m-auto w-full max-w-[250px] h-[50px] md:h-[65px] bg-[#2E1437] text-white text-[20px] md:text-[25px] cursor-pointer rounded-lg font-semibold"
            >
              Next
            </button>
            <div className="m-auto text-[16px] md:text-[18px] mt-4 md:mt-6">
              {index + 1} of {data.length} questions
            </div>
          </>
        )}
      </div>
    </div>
  );
};
