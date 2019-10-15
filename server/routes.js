const robot = require('robotjs');
const { Router } = require('express');
const router = Router();

router.post('/next', (req, res) => {
  robot.keyTap("up");
  res.sendStatus(200);
});

router.post('/previous', (req, res) => {
  robot.keyTap("down");
  res.sendStatus(200);
});

router.post('/testconnection', (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
