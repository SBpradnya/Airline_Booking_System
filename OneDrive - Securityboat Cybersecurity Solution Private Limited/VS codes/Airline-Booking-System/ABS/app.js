const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const flightRoutes = require('./routes/flightRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const cors = require('cors');
require('dotenv').config();



app.use(cors({
  origin: 'http://localhost:3002', 
  credentials: true,
}));


const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
