
import express from 'express'
import clientPromise from "../lib/db.js";
import bcrypt from 'bcrypt';

const router = express.Router();
const client = await clientPromise;
const db = client.db("movieListDb");
// Example route
router.get('/',(req,res)=>{
    return res.send('scucess');
})

router.post('/', async (req, res) => {
    const { name, email, password } = req.body;
  
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const result = await db.collection("users").insertOne({
        name,
        email,
        password: hashedPassword
      });
  
      if (result.insertedId) {
        return res.status(201).json({ message: "User registered successfully", userId: result.insertedId });
      } else {
        return res.status(500).json({ message: "Registration failed" });
      }
    } catch (err) {
      console.error("Registration error:", err);
      return res.status(500).json({ message: "Server error" });
    }
  });
  

export default router;
