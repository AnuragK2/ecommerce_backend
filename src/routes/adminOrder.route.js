const express = require("express")
const router = express.Router()

const orderController = require("../controller/adminOrder.controller.js");
const authenticate = require("../middleware/authenticate.js");

router.get("/", authenticate, orderController.getAllOrders);
router.put("/:orderId/confirmed", authenticate, orderController.confirmedOrder);
router.put("/:orderId/cancel", authenticate, orderController.cancelledOrder);
router.put("/:orderId/deliver", authenticate, orderController.deliverOrders);
router.put("/:orderId/ship", authenticate, orderController.shipOrder);
router.put("/:orderId/delete", authenticate, orderController.deleteOrders);

module.exports = router;