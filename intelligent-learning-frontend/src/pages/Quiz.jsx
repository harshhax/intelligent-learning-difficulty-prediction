import { useEffect, useState } from "react";
import API from "../services/api";

const TOPIC_ID = "699688f257c8200807b56df0";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [startTime, setStartTime] = useState(Date.now());
  const [quizFinished, setQuizFinished] = useState(false);

  // fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await API.get(`/questions/topic/${TOPIC_ID}`);
        setQuestions(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchQuestions();
  }, []);

  // reset timer when question changes
  useEffect(() => {
    setStartTime(Date.now());
  }, [current]);

  // loading screen
  if (questions.length === 0) {
    return (
      <div className="text-white p-10 bg-gray-900 min-h-screen">
        Loading quiz...
      </div>
    );
  }

  // quiz completed
  if (quizFinished) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <h1 className="text-3xl font-bold text-green-400">
          Quiz Completed 🎉
        </h1>
      </div>
    );
  }

  const question = questions[current];

  // handle next question
  const handleNext = async () => {

    if (selected === null) {
      alert("Please select an option");
      return;
    }

    // calculate time taken
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);

    try {
      await API.post("/attempts", {
        questionId: question._id,
        selectedOption: selected,
        timeTaken: timeTaken,
      });
    } catch (error) {
      console.log(error);
    }

    setSelected(null);

    // last question
    if (current + 1 >= questions.length) {
      setQuizFinished(true);
    } else {
      setCurrent(current + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-3xl mb-6 font-bold">Stack Quiz</h1>

      <div className="bg-gray-800 p-6 rounded-lg">

        <h2 className="text-xl mb-4">
          Q{current + 1}. {question.questionText}
        </h2>

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => setSelected(index)}
              className={`block w-full text-left p-3 rounded 
              ${
                selected === index
                  ? "bg-blue-500"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          className="mt-6 bg-green-500 px-6 py-2 rounded hover:bg-green-600"
        >
          Next
        </button>

      </div>
    </div>
  );
}

export default Quiz;
