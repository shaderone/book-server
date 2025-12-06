import { sign } from 'jsonwebtoken'

const createToken = (id, role) => {
    try {
        const token = sign({ id: id, role: role }, process.env.
            JWT_SECRET_KEY, { expiresIn: '1h' }
        )
    }
    catch (error) {
        console.log(error)

    }
}

export default createToken