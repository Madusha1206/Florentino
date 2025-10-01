require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const giftRoutes = require("./routes/giftRoutes");
const cartRoutes = require("./routes/cartRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/gifts", giftRoutes);
app.use("/api/cart", cartRoutes);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

app.get("/", (req, res) => res.send("Florentino Backend is running ✅"));