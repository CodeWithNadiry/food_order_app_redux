import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mealsRoutes from "./routes/mealsRoutes.js";
import ordersRoutes from "./routes/ordersRoutes.js";
const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors());

app.use("/meals", mealsRoutes);
app.use("/orders", ordersRoutes);

// 404 handler (no route matched)
app.use((req, res) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: "Not found" });
});

// Global error handler (last)
app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.status || 500).json({
    message: error.message || "Something went wrong!",
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));
