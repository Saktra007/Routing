import express from "express";
import cors from "cors";

// import user routes
import userRoutes from "./routes/user.routes.js";

const app = express();
const PORT = 3000;


//Middleware
app.use(cors());
app.use(express.json());



//Routes
app.use("/api/users",userRoutes);


app.get("/", (req, res) => {
  res.send("Backend is running!");
});

//Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
