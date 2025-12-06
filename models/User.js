import { Schema, model } from 'mongoose'

const userSchema = new Schema({
    //server-side-scripting
    name: {
        type: String,
        require: [true, "name is req"]
    },
    email: {
        type: String,
        require: [true, "name is req"]
    },
    password: {
        type: String,
        require: [true, "name is req"]
    },
    image: String,
    role: { //access control
        type: String,
        default: "user"
    }
}, { timestamps: true }) //to-maintain-users-timestamps
const User = model('users', userSchema)
export default User