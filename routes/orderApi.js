const Order = require("../models/Order");
const OrderStatuses = require("../models/OrderStatuses");
const UserRoles = require("../models/UserRoles");
const uuid = require("uuid");
const {
  verifyToken,
  verifyTechnicianOrAdmin,
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
router.put("/:id",  verifyTechnicianOrAdmin, async (req, res) => {
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
router.put("/:id/cancel", verifyToken, async (req, res) => {
  try {

    let params = {
      _id: req.params.id,
    }

    if ((req.user.role != UserRoles.ADMIN) && (req.user.role!= UserRoles.TECHNICIAN)) {
      params["user_id"] = req.user.id
    }

    const orders = await Order.find(params)
    const order = orders[0]
    if (order == null || order == undefined) {
      res.status(403).json({"status":"Service request does not exist or you do not have permissions to edit it."})
      return
    }

    if ((order.order_status!=OrderStatuses.REQUESTED) && (order.order_status!=OrderStatuses.CONFIRMED)) {
      res.status(400).json({"status":"Service request can be canceled only if it is in Requested or Confirmed state. Current status "+order.order_status})
      return
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
    let params = {}
    if (req.query.name!= null && req.query.name!=undefined && req.query.name.length>0) {
      params["last_name"] = req.query.name
    }
    if (req.query.date!= null && req.query.date!=undefined) {
      params["appointments.appointment_date"] =  new Date(req.query.date)     
    }
    if (req.query.status!= null && req.query.status!=undefined && req.query.status.length>0) {
      params["order_status"] =  req.query.status
    }
    if (req.user.role == UserRoles.TECHNICIAN || req.user.role == UserRoles.ADMIN) {
      // technicians and admins can see all orders
    } else {
      // regular users can see only their orders 
      params["user_id"] = req.user.id
    }
    const orders = await Order.find(params);
    res.status(200).json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({"status":err});
  }
});

module.exports = router;