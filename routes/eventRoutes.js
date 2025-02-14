const express = require('express');
const { getEvents, createEvent } = require('../controllers/eventController');
// const verifyToken = require('../middlewares/authMiddleware');
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();

// router.get('/', authMiddleware, getEvents);
// router.post('/', authMiddleware, createEvent);

router.get('/', verifyToken, getEvents);
router.post('/', verifyToken, createEvent);
// router.get('/', verifyToken, (req, res) => {
//     res.json({ message: 'List of events' });
// });
router.post('/', verifyToken, (req, res) => {
    res.json({ message: 'Event created successfully' });
});
module.exports = router;


