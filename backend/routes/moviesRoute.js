import express from 'express';
import clientPromise from '../lib/db.js';
import { ObjectId } from 'mongodb';

const router = express.Router();
const client = await clientPromise;
const db = client.db("movieListDb");

router.get('/', async (req, res) => {
  const { movieId } = req.query;
  try {
    const dbres = await db
      .collection("movies")
      .find(movieId ? { _id: new ObjectId(movieId) } : {})
      .toArray();

    return res.json({ data: dbres });
  } catch (err) {
    console.error("Error fetching movie:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});


router.post('/', async (req, res) => {
  const { movieName, userID, year, genre } = req.body;
  // console.log(req.body);
  

  if (!movieName || !userID || !year || !genre) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const result = await db.collection("movies").insertOne({
      userId: userID,
      movieName,
      year,
      genre,
      favorites: false,
      watched: false
    });
    if(result.acknowledged) {
      return res.status(201).json({
        message: "Movie added successfully",
        id : result.insertedId,
      });
    } return res.status(500).json({ message: "Failed to add movie" });
    
  } catch (err) {
    console.error("Error inserting movie:", err);
    return res.status(500).json({ message: "Server error" });
  }
});


router.patch('/fav', async (req, res) => {
  const { id, favorites } = req.body;
// console.log(
//   req.body
// );

  if (!id || typeof favorites !== "boolean") {
    return res.status(400).json({ message: "Invalid request body" });
  }

  try {
    const result = await db.collection("movies").updateOne(
      { _id: new ObjectId(id) },
      { $set: { favorites } }
    );

    return res.status(200).json({ message: "Favorite status updated", result });
  } catch (err) {
    console.error("Error updating favorite:", err);
    return res.status(500).json({ message: "Server error" });
  }
});


router.patch('/watched', async (req, res) => {
  // console.log(req.body);
  
  const { id, watched } = req.body;

  if (!id || typeof watched !== "boolean") {
    return res.status(400).json({ message: "Invalid request body" });
  }

  try {
    const result = await db.collection("movies").updateOne(
      { _id: new ObjectId(id) },
      { $set: { watched } }
    );

    return res.status(200).json({ message: "Watched/starred status updated" });
  } catch (err) {
    console.error("Error updating starred:", err);
    return res.status(500).json({ message: "Server error" });
  }
});


router.delete('/', async (req, res) => {
  // console.log("Body:", req.body); // ✅ Should now show { id: "..." }

  const { id } = req.body;

  if (!id) return res.status(400).json({ message: "Movie ID required" });

  try {
    const result = await db.collection("movies").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return res.json({ message: "Movie deleted successfully" });
    } else {
      return res.status(404).json({ message: "Movie not found" });
    }
  } catch (err) {
    console.error("Error deleting movie:", err);
    return res.status(500).json({ message: "Server error" });
  }
});


export default router;
