exports.getRecommendation = (difficultyScore) => {

  let recommendation = "";
  let revisionDays = 0;

  if (difficultyScore < 50) {
    recommendation = "Review the concept notes once.";
    revisionDays = 3;
  }
  else if (difficultyScore < 100) {
    recommendation = "Practice additional MCQ questions for this topic.";
    revisionDays = 2;
  }
  else {
    recommendation = "Immediate revision required. Study material and solve practice questions daily.";
    revisionDays = 1;
  }

  return {
    recommendation,
    revisionAfterDays: revisionDays
  };
};
