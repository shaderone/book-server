import { Router } from 'express';
import Books from '../models/Books.js'
import mongoose from 'mongoose';
const product_router = Router();

// get all books
product_router.get('/', async (req, res) => {
    const books = await Books.find();
    res.json(books);
    // console.log(books)
});

// get a specific book
product_router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Requested ID:", id);

        // ✅ Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid product ID" });
        }

        const product = await Books.findById(id);

        // ✅ If not found
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        // ✅ Success
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// update a single book
product_router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // validate
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "Invalid Id" })
        }

        // get necessary fields from the req body
        // const { name, price, description, imageurl } = req.body;
        console.log(req.body)


        // else find the product with that id
        const updatedBook = await Books.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        // if the book with the requested id is not found then return an error
        if (!updatedBook) {
            res.status(404).json({ error: "product not found" })
        }

        // else return the updated product

        res.status(200).json({ message: "product updated successfully", data: updatedBook })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// create a new book
product_router.post("/create", async (req, res) => {
    try {
        // get the data from body
        const { name, price, description, imageurl } = req.body
        // validate the data
        if (!name || !price || !description || !imageurl) {
            return res.status(404).json({ error: "All fields are required!" })
        }
        // create a new book object & add it to database
        const newBook = await Books.create({ name, price, description, imageurl });

        // return the added data and catch any errors

        res.status(201).json({ message: "book added successfully", data: newBook })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

})

export default product_router;
