const Order = require("../models/Order");
const OrderStatuses = require("../models/OrderStatuses");
const UserRoles = require("../models/UserRoles");
const uuid = require("uuid");
const {
  verifyToken,
  verifyAccess,
  verifyAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE
router.post("/", verifyToken, async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    newOrder._id = uuid.v1();
    newOrder.user_id = req.user.id;
    newOrder.order_status = OrderStatuses.REQUESTED;

    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    console.log(err);
    res.status(500).json({"status":err});
  }
});

//UPDATE
router.put("/:id",  verifyAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    console.log(err);
    res.status(500).json({"status":err});
  }
});

//Cancel
router.put("/:id/cancel", verifyAccess, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)

    if (order.order_status!=OrderStatuses.REQUESTED && order.order_status!=OrderStatuses.CONFIRMED) {
      res.status(400).json({"status":"Service request can be canceled only if it is in Requested or Confirmed state"})
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          "order_status": OrderStatuses.CANCELED,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    console.log(err);
    res.status(500).json({"status":err});
  }
});

//GET ALL
router.get("/", verifyToken, async (req, res) => {
  try {
    if (req.user.role == UserRoles.TECHNICIAN || req.user.role == UserRoles.ADMIN) {
      // technicians and admins can see all orders
      const orders = await Order.find();
      res.status(200).json(orders);
    } else {
      // regular users can see only their orders 
      const orders = await Order.find({user_id:req.user.id});
      res.status(200).json(orders);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({"status":err});
  }
});

module.exports = router;