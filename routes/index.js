var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({
    "message": "Welcome to the API!"
  })
});

router.post('/', (req, res) => {
  res.send({
    "message": "You made a POST request!"
  })
})

module.exports = router;
