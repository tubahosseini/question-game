import axios from "axios";
import { useState } from "react";
import { useData } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";

export interface dataType {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export default function Setup() {
  const { data, setData } = useData();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const navigate = useNavigate();

  const start = async () => {
    await getData();
    navigate("/quiz");
  };
  //test
  console.log(data);

  async function getData() {
    const response = await axios.get(
      `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
    );
    setData(response.data.results);
    console.log(response.data.results[0]);
    setAmount("");
    setCategory("");
    setDifficulty("");
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[640px] bg-white text-[#262626] rounded-xl py-[40px] px-[50px] flex flex-col gap-5">
        <h1 className="text-4xl text-center font-serif">Setup Quiz</h1>
        <hr className="border-none h-[2px] bg-[#707070]" />
        <div className="mt-4">
          <p className="font-semibold">Number of questions:</p>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full outline-none border p-1 mt-1"
            type="number"
            placeholder="Between 5 and 10"
          />
        </div>
        <div>
          <p className="font-semibold">Category :</p>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-1 border mt-1 outline-none"
            name="category"
          >
            <option value="">category</option>
            <option value="10">Books</option>
            <option value="21">Sport</option>
            <option value="27">Animals</option>
          </select>
        </div>
        <div>
          <p className="font-semibold">Difficulty :</p>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full p-1 border mt-1 outline-none"
            name="category"
          >
            <option value="">difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <button
          onClick={start}
          type="submit"
          className="bg-[#2E1437] text-white m-auto w-[150px] h-[50px] font-semibold rounded-md"
        >
          Start
        </button>
      </div>
    </div>
  );
}
