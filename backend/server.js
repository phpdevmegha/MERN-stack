import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth" , authRoutes);

app.use("/api" , authMiddleware)
// Grouped Protected Routes
app.use("/api/tasks",taskRoutes);


app.get("/", (req, resp) => {
  resp.send("API is running...");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
