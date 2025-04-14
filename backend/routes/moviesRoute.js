
import express from 'express'
import clientPromise from "../lib/db.js";
import { ObjectId } from 'mongodb';

const router = express.Router();
const client = await clientPromise;
const db = client.db("movieListDb");

// router.get('/', (req, res) => {
//     // Handle login logic here
//     res.send('Login route');
// });
router.get('/', async (req, res) => {
     const { movieId } = req.query;
    try {
      const dbres = await db
        .collection("movies")
        .find(movieId ? { _id: new ObjectId(movieId) } : {})
        .toArray();
  
      if (dbres.length > 0) {
        return res.json({ data: dbres });
      } else {
        return res.json({ data: [] });
      }
    } catch (err) {
      console.error("Error fetching movie:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });

router.post('/', async (req, res) => {
    const { movieName, userID, year, genre } = req.body;
  console.log(req.body);
  
    // Basic validation check to ensure required fields are provided
    if (!movieName || !userID || !year || !genre) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    try {
      const result = await db.collection("movies").insertOne({
        userId: userID,
        movieName: movieName,
        year: year,
        genre: genre,
        favorites: false,
        starred: false
      });
  
      if (result.acknowledged) {
        return res.status(201).json({
          message: "Movie added successfully",
          data: {
          data : result
          }
        });
      } else {
        return res.status(500).json({ message: "Failed to add movie" });
      }
    } catch (err) {
      console.error("Error inserting movie:", err);
      return res.status(500).json({ message: "Server error" });
    }
  });
  
router.patch('/',(req,res)=>{
    res.send("pacth");
})
router.delete('/',(req,res)=>{
    res.send('delete');
})
export default router;
