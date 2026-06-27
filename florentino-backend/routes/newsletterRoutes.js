const express = require("express");
const router = express.Router();
const { getSubscribers, subscribe } = require("../controllers/newsletterController");

router.post("/subscribe", subscribe);
router.get("/subscribers", getSubscribers);

module.exports = router;
