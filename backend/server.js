import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // <-- Import cors
import connectDB from './config/db.js';
import internshipRoutes from './routes/internshipRoutes.js';

dotenv.config();
const app = express();

// CORS Middleware
app.use(cors()); // <-- Enable CORS for all origins
// Or more strict:
// app.use(cors({ origin: 'http://localhost:5173' }));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
})

// Connect DB
connectDB();

// Routes
app.use('/api/internships', internshipRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
