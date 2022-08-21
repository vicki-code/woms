const Message = require("../models/Message");
const UserRoles = require("../models/UserRoles");
const uuid = require("uuid");

const {
    verifyToken,
    verifyAccess,
    verifyAdmin,
    verifyTechnicianOrAdmin,
  } = require("./verifyToken");
  
const router = require("express").Router();


//CREATE
router.post("/", async (req, res) => {
    try {
      const newMessage = new Message(req.body);
      newMessage._id = uuid.v1();
  
      const savedMessage = await newMessage.save();
      res.status(200).json(savedMessage);
    } catch (err) {
      console.log(err);
      res.status(500).json({"status":err});
    }
  });


//GET ALL
router.get("/", verifyTechnicianOrAdmin, async (req, res) => {
    try {
      const messages = await Message.find();
      res.status(200).json(messages);
    } catch (err) {
      console.log(err);
      res.status(500).json({"status":err});
    }
  });

  module.exports = router;