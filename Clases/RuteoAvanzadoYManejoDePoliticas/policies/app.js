import express from "express";
import jwt from 'jsonwebtoken';

const app = express();
const PORT = 8080;

function handlePolicies(policies) {
    return (req, res, next) => {
        const token = req.headers.authorization;
        if (!token && !policies.includes("PUBLIC")) {
            return res.status(401).json({ message: "No token provided" })
        }

        jwt.verify(token.split(" ")[1], 'secret', (error, decoded) => {
            if (error) {
                return res.status(403).json({ message: "Failed to authenticate token" })
            }
            const userRole = decoded.role;
            if (!policies.includes(userRole)) {
                return res.status(403).json({ message: "Insufficient permissions" })
            }
            req.user = decoded
            next()
        })
    }
}


app.post('/loign', (req, res) => {
    const user = { username: 'user1', role: 'user' }
    const token = jwt.sign(user, 'secret', { expiresIn: '1h' });
    res.json({ token })
})

app.use('/user', handlePolicies(['USER']))

app.get('/user/protected', (req, res) => {
    res.json({ message: "This is a protected endpoint for users" })
})

app.get('/public', handlePolicies(['PUBLIC']), (req, res) => {
    res.json({ message: "This is a public endpoint" })
})

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})