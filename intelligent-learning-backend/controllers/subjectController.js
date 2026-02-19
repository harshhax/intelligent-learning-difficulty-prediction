const Subject = require("../models/Subject");
const Course = require("../models/Course");

// Create Subject (Admin only)
exports.createSubject = async (req, res) => {
  try {
    const { name, courseId } = req.body;

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Create subject
    const subject = await Subject.create({
      name,
      course: courseId,
      createdBy: req.user._id,
    });

    res.status(201).json(subject);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
