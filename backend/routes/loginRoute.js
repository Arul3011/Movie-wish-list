
import express from 'express'
import cros from "cors";
import clientPromise from "../lib/db.js";
const router = express.Router();
const client = await clientPromise;
import bcrypt from "bcrypt"
const db = client.db("movieListDb");
// Example route
const user  = {
    "name": "arul",
    "email": "arul@gmail.com",
    "password": "$2b$10$DDmYjbKd.ra/6WXXHBq7feLJD3oVcJASouQ1/wowTVo36OjuCXzNe"
}
router.get('/',async(req,res)=>{
    const result = await db.collection("users").find().toArray();
    return res.status(200).json({data : result})
})
router.post('/', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await db.collection("users").findOne({ email });
  
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (isMatch) {
        return res.status(200).json({ message: "Login success" });
      } else {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ message: "Server error" });
    }
  });
  



export default router;