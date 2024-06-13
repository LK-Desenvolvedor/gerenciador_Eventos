const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, location, organizer } = req.body;
    const newEvent = new Event({
      title,
      description,
      date,
      location,
      organizer
    });
    const event = await newEvent.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvent = await Event.findByIdAndDelete(id);
    res.json(deletedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
