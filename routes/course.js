var express = require('express');
const { createCourse, getAllCourse, getSingleCourse } = require('../controllers/course');

const router = express.Router();
router.post('/', createCourse);
router.get('/', getAllCourse);
router.get('/:courseId', getSingleCourse);


module.exports = router;