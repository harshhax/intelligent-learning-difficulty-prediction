const Topic = require("../models/Topic");
const Subject = require("../models/Subject");

// Create Topic (Admin only)
exports.createTopic = async (req, res) => {
  try {
    const { name, subjectId, description } = req.body;

    // check if subject exists
    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    // create topic
    const topic = await Topic.create({
      name,
      subject: subjectId,
      description,
      createdBy: req.user._id,
    });

    res.status(201).json(topic);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
