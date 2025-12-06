import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: true },
        imageurl: { type: String, required: true }
    },
    { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);
export default Book;
