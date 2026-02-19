const Attempt = require("../models/Attempt");

// Calculate difficulty score for a topic & student
exports.calculateDifficulty = async (studentId, topicId) => {

  // get all attempts for this topic by student
  const attempts = await Attempt.find({
    student: studentId,
    topic: topicId,
  });

  if (attempts.length === 0) {
    return { difficultyScore: 0, isWeak: false };
  }

  // wrong answers
  const wrongAnswers = attempts.filter(a => !a.isCorrect).length;

  // average time taken
  const totalTime = attempts.reduce((sum, a) => sum + a.timeTaken, 0);
  const avgTime = totalTime / attempts.length;

  // repeated attempts
  const repeatedAttempts = attempts.filter(a => a.attemptNumber > 1).length;

  // inactivity days
  const lastAttemptDate = attempts[attempts.length - 1].createdAt;
  const currentDate = new Date();
  const inactivityDays = Math.floor(
    (currentDate - lastAttemptDate) / (1000 * 60 * 60 * 24)
  );

  // difficulty score formula
  const difficultyScore =
    (wrongAnswers * 3) +
    (avgTime * 2) +
    (repeatedAttempts * 4) +
    (inactivityDays * 1);

  // threshold (we can tune later)
  const isWeak = difficultyScore > 25;

  return {
    wrongAnswers,
    avgTime,
    repeatedAttempts,
    inactivityDays,
    difficultyScore,
    isWeak
  };
};
