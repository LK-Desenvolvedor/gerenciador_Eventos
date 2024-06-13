const express = require("express");
const router = express.Router();
const participantController = require("../controllers/participantController");

router.post("/", participantController.createUser);
router.get("/", participantController.getAllUsers);
router.put("/:id", participantController.updateUser);
router.delete("/:id", participantController.deleteUser);
router.get("/:id", participantController.getUserById);

module.exports = router;
