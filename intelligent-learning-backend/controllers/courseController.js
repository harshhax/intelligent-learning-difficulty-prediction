const Course = require("../models/Course");

// Create Course (Admin only)
exports.createCourse = async (req, res) => {
  try {
    const { title, description } = req.body;

    // create course
    const course = await Course.create({
      title,
      description,
      createdBy: req.user._id, // admin id from token
    });

    res.status(201).json(course);

  } catch (error) {
  console.error(error);
  res.status(500).json({ message: error.message });
}
};
