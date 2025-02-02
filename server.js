import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./postgres/postgres.js";
import adminRoutes from "./routes/adminRoutes.js";
import officeAdminRoutes from "./routes/officeAdminRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.use("/admin", adminRoutes);
app.use("/office-admin", officeAdminRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
connectDB();
