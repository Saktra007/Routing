import express from "express";
import cors from "cors";

// import user routes
import userRoutes from "./routes/user.routes.js";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
const PORT = 3000;

//Middleware
app.use(cors());
app.use(express.json());

app.use(logger);

//Routes
app.use("/api/users", userRoutes);

//Error Middleware (Buttom - Last)
app.use(errorHandler);

//Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});