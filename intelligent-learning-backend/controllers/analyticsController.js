const Attempt = require("../models/Attempt");
const Topic = require("../models/Topic");
const { calculateDifficulty } = require("../services/analyticsService");

// Get weak topics for logged-in student
exports.getWeakTopics = async (req, res) => {
  try {

    const studentId = req.user._id;

    // get unique topics attempted by student
    const topicIds = await Attempt.distinct("topic", { student: studentId });

    const weakTopics = [];

    for (let topicId of topicIds) {

      const analysis = await calculateDifficulty(studentId, topicId);

      if (analysis.isWeak) {
        const topic = await Topic.findById(topicId).select("name");

        weakTopics.push({
          topicId,
          topicName: topic.name,
          difficultyScore: analysis.difficultyScore,
          stats: analysis,
        });
      }
    }

    res.json({
      weakTopicCount: weakTopics.length,
      weakTopics,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
