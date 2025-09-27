require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const giftRoutes = require('./routes/giftRoutes');
const authRoutes = require('./routes/authRoutes');
app.use('/api/gifts', giftRoutes);
app.use('/api/auth', authRoutes);

// const weddingBouquetRoutes = require('./routes/weddingBouquetRoutes');
// const occasionRoutes = require('./routes/occasionRoutes');
// app.use('/api/wedding-bouquets', weddingBouquetRoutes);
// app.use('/api/occasions', occasionRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Florentino Backend is running');
});



