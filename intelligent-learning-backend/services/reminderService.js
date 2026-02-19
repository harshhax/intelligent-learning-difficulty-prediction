const cron = require("node-cron");
const User = require("../models/User");
const Attempt = require("../models/Attempt");
const Topic = require("../models/Topic");
const { calculateDifficulty } = require("./analyticsService");
const { getRecommendation } = require("./recommendationService");
const { sendReminderEmail } = require("./emailService");

// Every 1 minute (for testing)
cron.schedule("*/1 * * * *", async () => {
  console.log("⏰ Running daily reminder job...");

  try {
    const students = await User.find({ role: "student" });

    console.log("Students found:", students.length);

    for (let student of students) {

      const topicIds = await Attempt.distinct("topic", { student: student._id });

      for (let topicId of topicIds) {

        const analysis = await calculateDifficulty(student._id, topicId);

        if (analysis.isWeak) {

          const topic = await Topic.findById(topicId);
          const rec = getRecommendation(analysis.difficultyScore);

          console.log(`Sending email to ${student.email} about ${topic.name}`);

          await sendReminderEmail(
            student.email,
            topic.name,
            rec.recommendation
          );
        }
      }
    }

    console.log("✅ Reminder job finished.\n");

  } catch (error) {
    console.error("❌ Reminder job failed:", error);
  }
});
