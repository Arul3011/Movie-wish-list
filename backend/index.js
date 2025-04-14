

import express from "express";
import jwt from "jsonwebtoken";
import cros from "cors";
import loginroute from "./routes/loginRoute.js"
import moviesRoute from "./routes/moviesRoute.js"
import registerRoute from "./routes/registerRoute.js"

const app = express();
const PORT = 3000;

// Middleware
const codespaceUrl = process.env.CODESPACE_NAME
  ? `https://5173-${process.env.CODESPACE_NAME}.codespace.github.dev`
  : '*'; // fallback for local dev

app.use(cros({
  origin: codespaceUrl,
  credentials: true
}));

app.use(express.json());


const SECRET_KEY = 'your_secret_key';

app.use('/api/login',loginroute);
app.use('/api/register',registerRoute);
app.use('/api/movies',moviesRoute);

app.get('/',async(req,res)=>{
  const users = await db.collection('users').find().toArray();

    res.status(200).json({data:users});
})


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});