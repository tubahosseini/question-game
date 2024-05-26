import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useData } from "../../context/DataContext";

export const Quiz = () => {
  const { data } = useData();

  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [sortedAnswers, setSortedAnswers] = useState<string[]>([]);
  const [result, setResult] = useState(false); // if true, show the result page
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  // sorting the answers to shuffle them
  useEffect(() => {
    setQuestion(data[index]);
    setSortedAnswers(
      [...data[index].incorrect_answers, data[index].correct_answer].sort()
    );
  }, [index, data]);

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
      setIndex(index + 1);
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
    <div className="flex items-center justify-center px-2 h-screen">
      <div className="w-full max-w-[600px] bg-white text-[#262626] rounded-xl py-6 px-4 flex flex-col gap-3 md:gap-4">
        <h1 className="text-2xl md:text-3xl text-center font-serif">
          Quiz App
        </h1>
        <hr className="border-none h-[2px] bg-[#707070]" />
        {result ? (
          <>
            <h2 className="text-xl md:text-2xl mt-3 md:mt-4 text-center">
              Your Score: {Math.floor((score / data.length) * 100)}%
              <p>
                ({score} out of {data.length})
              </p>
            </h2>
            <button
              onClick={reset}
              className="m-auto w-full max-w-[140px] h-[45px] bg-[#2E1437] hover:bg-[#2e1437dc] text-white text-[18px] md:text-[22px] cursor-pointer rounded-lg font-semibold mt-3 md:mt-4"
            >
              Reset
            </button>
          </>
        ) : (
          <>
            <h2 className="text-lg md:text-xl font-medium my-3">
              {index + 1}. {question.question}
            </h2>
            <ul className="flex-grow overflow-y-auto">
              {sortedAnswers.map((answer) => (
                <li
                  key={answer}
                  onClick={checkAns}
                  className="flex items-center h-[45px] md:h-[60px] pl-3 md:pl-[12px] border border-[#686868] rounded-md mb-2 md:mb-[18px] text-[14px] md:text-[18px] cursor-pointer"
                >
                  {answer}
                </li>
              ))}
            </ul>
            <button
              onClick={next}
              className="m-auto w-full max-w-[220px] h-[45px] md:h-[55px] bg-[#2E1437] text-white text-[18px] md:text-[22px] rounded-lg font-semibold hover:bg-[#2e1437dc]"
            >
              Next
            </button>
            <div className="m-auto text-[14px] md:text-[16px] mt-2 md:mt-3">
              {index + 1} of {data.length} questions
            </div>
          </>
        )}
      </div>
    </div>
  );
};
