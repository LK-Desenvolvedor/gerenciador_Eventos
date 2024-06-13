const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const authMiddleware = require("../middleware/auth");

router.post("/", authMiddleware, eventController.createEvent);
router.get("/", authMiddleware, eventController.getEvents);
router.put("/:id", authMiddleware, eventController.updateEvent);
router.delete("/:id", authMiddleware, eventController.deleteEvent);

module.exports = router;
