var mongoose = require('mongoose');
var Course = require('../models/course');

// Create new course
function createCourse(req, res) {
  // Ensure the required fields are present in the request body
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      success: false,
      message: 'Title and description are required',
    });
  }

  // Create a new course instance
  const course = new Course({
    _id: new mongoose.Types.ObjectId(),
    title: title,
    description: description,
  });

  // Save the course to the database
  return course
    .save()
    .then((newCourse) => {
      return res.status(201).json({
        success: true,
        message: 'New course created successfully',
        course: newCourse, // Use lowercase 'course' for consistency
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: error.message,
      });
    });
}

function getAllCourse( req, res){
  Course.find()
    .select('_id title description')
    .then((allCourse) => {
      return res.status(200).json({
        success: true,
        message: 'A list of all course',
        Course: allCourse,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: err.message,
      });
    });
}

function getSingleCourse(req, res) {
  const id = req.params.courseId;
  Course.findById(id)
    .then((singleCourse) => {
      res.status(200).json({
        success: true,
        message: `More on ${singleCourse.title}`,
        Course: singleCourse,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'This course does not exist',
        error: err.message,
      });
   });
}

module.exports = {
  createCourse,
  getAllCourse,
  getSingleCourse
};
