import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import PerformanceChart from "../components/PerformanceChart";

function Dashboard() {

  const navigate = useNavigate();

  const [weakTopics, setWeakTopics] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const [user, setUser] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // fetch weak topics + recommendations
  useEffect(() => {

    const fetchWeakTopics = async () => {
      try {
        const res = await API.get("/analytics/weak-topics");
        setWeakTopics(res.data.weakTopics);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRecommendations = async () => {
      try {
        const res = await API.get("/recommendations");
        setRecommendations(res.data.recommendations);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchUser = async () => {
        try {
            const res = await API.get("/auth/me");
            setUser(res.data);
        } catch (error) {
            console.log(error);
        }
     };


    fetchWeakTopics();
    fetchRecommendations();
    fetchUser();

  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
            <h1 className="text-3xl font-bold">Student Dashboard</h1>
            {user && (
                <p className="text-green-400 mt-1">
                Welcome, {user.name} 👋
                </p>
            )}
        </div>


        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Weak Topics Section */}
      <h2 className="text-xl mb-4 text-green-400">Your Weak Topics</h2>

      {weakTopics.length === 0 ? (
        <p className="text-gray-400">No weak topics detected 🎉</p>
      ) : (
        <div className="grid gap-4">
          {weakTopics.map((topic, index) => (
            <div
              key={index}
              className="bg-gray-800 p-4 rounded-lg border border-red-500"
            >
              <h3 className="text-lg font-semibold text-red-400">
                {topic.topicName}
              </h3>
              <p>Difficulty Score: {topic.difficultyScore.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}

      {/* Chart */}
      {weakTopics.length > 0 && <PerformanceChart data={weakTopics} />}

      {/* Recommendation Section */}
      {recommendations.length > 0 && (
        <div className="bg-gray-800 p-6 rounded-lg mt-8 border border-green-500">
          <h2 className="text-xl text-green-400 mb-4">
            Recommended Study Plan
          </h2>

          {recommendations.map((rec, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold text-white">
                {rec.topicName}
              </h3>

              <p className="text-yellow-300">
                {rec.action}
              </p>

              <p className="text-gray-400">
                Revise after: {rec.reviseAfterDays} day(s)
              </p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default Dashboard;
