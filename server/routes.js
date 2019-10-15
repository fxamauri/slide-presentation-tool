const robot = require('robotjs');
const { Router } = require('express');
const router = Router();

router.post('/', (req, res) => {
  robot.keyTap("up");
  res.send('Ok');
});

module.exports = router;
