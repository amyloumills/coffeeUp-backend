const express = require("express");
const {
  getCoffee,
  addCoffee,
  updateCoffee,
  deleteCoffee,
} = require("../controllers/coffeeController");

const router = express.Router();

router.get("/:userId", getCoffee);
router.post("/", addCoffee);
router.put("/:id", updateCoffee);
router.delete("/:id", deleteCoffee);

module.exports = router;
