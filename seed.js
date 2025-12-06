import mongoose from "mongoose";
import dotenv from "dotenv";
import { books } from "./data/data.js";
import Book from "./models/Books.js";

dotenv.config();

mongoose
    .connect(process.env.MONGO_URI)
    .then(async () => {
        console.log("MongoDB Connected");

        await Book.deleteMany();     // wipes old data
        await Book.insertMany(books);

        console.log("Database Seeded Successfully");
        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
