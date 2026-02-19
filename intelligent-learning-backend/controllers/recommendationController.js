const Attempt = require("../models/Attempt");
const Topic = require("../models/Topic");
const { calculateDifficulty } = require("../services/analyticsService");
const { getRecommendation } = require("../services/recommendationService");

// Get recommendations for student
exports.getRecommendations = async (req, res) => {
  try {

    const studentId = req.user._id;

    const topicIds = await Attempt.distinct("topic", { student: studentId });

    const recommendations = [];

    for (let topicId of topicIds) {

      const analysis = await calculateDifficulty(studentId, topicId);

      if (analysis.isWeak) {

        const topic = await Topic.findById(topicId).select("name");

        const rec = getRecommendation(analysis.difficultyScore);

        recommendations.push({
          topicName: topic.name,
          difficultyScore: analysis.difficultyScore,
          action: rec.recommendation,
          reviseAfterDays: rec.revisionAfterDays
        });
      }
    }

    res.json({
      recommendations
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
