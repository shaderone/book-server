import { Router } from 'express'
import User from '../models/User.js'
import { hash, genSalt, compare } from 'bcrypt'

const userRouter = Router()


userRouter.post('/', async (req, res) => {
    try {
        const { name, email, password, image } = req.body || {}

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        const userExists = await User.findOne({ email })

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' })
        }

        const salt = await genSalt(10)
        const hashedPassword = await hash(password, salt)

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            image,
        })

        const savedUser = await newUser.save()

        // Never send password back
        const { password: _, ...safeUser } = savedUser._doc

        return res.status(201).json({
            message: 'User created',
            user: safeUser,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
    }
})


userRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body || {}

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password required' })
        }

        const userExists = await User.findOne({ email })

        if (!userExists) {
            return res.status(404).json({ message: 'User not found' })
        }

        const passMatch = compare(password, userExists.password)

        if (!passMatch) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        const { password: _, ...safeUser } = userExists._doc

        return res.status(200).json({
            message: 'Login successful',
            user: safeUser,
        })
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: 'Internal server error' })
    }
})

export default userRouter
