import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import product_router from "../routes/product_routes.js";
import cors from "cors"
import userRouter from "../routes/user_routes.js";

dotenv.config();
const app = express();
// for parsing req body
app.use(cors())
app.use(express.json());
const port = process.env.PORT;

// mongodb connection (to atlas)
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Mongo Connected"));


// app routes
app.use("/books", product_router);
app.use("/user", userRouter)
// app port
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
