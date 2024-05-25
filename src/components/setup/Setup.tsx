import axios from "axios";
import { useState } from "react";
import { useData } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const start = async () => {
    if (validate()) {
      setLoading(true);
      await getData();
      navigate("/quiz");
      setLoading(false);
    }
  };

  async function getData() {
    try {
      const response = await axios.get(
        `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
      );
      setData(response.data.results);
      setAmount("");
      setCategory("");
      setDifficulty("");
    } catch (error) {
      console.error("Error fetching data", error);
      setLoading(false); // Reset loading in case of error
    }
  }

  const validate = () => {
    let tempErrors: { [key: string]: string } = {};

    if (!amount) {
      tempErrors.amount = "This field can't be empty";
    } else if (parseInt(amount) < 5 || parseInt(amount) > 10) {
      tempErrors.amount = "Please enter a valid number between 5 and 10";
    }

    if (!category) {
      tempErrors.category = "Please select a category";
    }

    if (!difficulty) {
      tempErrors.difficulty = "Please select a difficulty";
    }

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  console.log(data); //test

  return (
    <div className="flex items-center justify-center h-screen px-4 md:px-8 lg:px-16">
      <div className="w-full max-w-lg bg-white text-[#262626] rounded-xl py-8 px-6 md:py-12 md:px-10 lg:py-16 lg:px-16 flex flex-col gap-5">
        {loading ? (
          <div className="flex items-center justify-center h-1/2">
            <Loading />
          </div>
        ) : (
          <>
            <h1 className="text-3xl md:text-4xl text-center font-serif">
              Setup Quiz
            </h1>
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
              {errors.amount && (
                <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
              )}
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
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}
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
              {errors.difficulty && (
                <p className="text-red-500 text-sm mt-1">{errors.difficulty}</p>
              )}
            </div>
            <button
              onClick={start}
              type="submit"
              className="bg-[#2E1437] hover:bg-[#2e1437dc] text-white m-auto w-full max-w-[150px] h-[50px] font-semibold rounded-md"
            >
              Start
            </button>
          </>
        )}
      </div>
    </div>
  );
}