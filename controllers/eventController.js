const Event = require('../models/Event');

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    // res.send(events);
    res.status(200).json(events);
  } catch (err) {
    console.error('Error fetching events:', err);
    // res.status(500).send('Server error');
    res.status(500).json({ message: 'Server error while fetching events' });
  }
};

exports.createEvent = async (req, res) => {
  const { name, description, date } = req.body;
  if (!name || !description || !date) {
    return res.status(400).json({ message: 'All fields are required' });
}
  try {
   const event= await Event.create(name, description, date, req.user.id);
    // res.status(201).send('Event created successfully');
    res.status(201).json({ message: 'Event created successfully', event });
  } catch (err) {
    console.error('Error creating event:', err);
    // res.status(500).send('Server error');
    res.status(500).json({ message: 'Server error while creating event' });
  }
};

