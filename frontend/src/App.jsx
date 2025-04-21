// App.jsx
import { Routes, Route } from 'react-router-dom';
import Layout from './compounts/Layout';
import Home from './Pages/Home';
import { useEffect, useRef, useState } from 'react';
import Watched from './Pages/Wacthed';
import Favorites from './Pages/Favorites';
import axios from 'axios';
import LoginForm from './Pages/LoginForm';
import Register from './Pages/Register';
import ProRoute from './ProRoute/Proroute';

const App = () => {
  const [movies, setMovies] = useState([]);

  const handelMoves = async()=>{
    
    try{
   
      const res = await axios.get(`http://localhost:3000/api/movies`)
      if(res.status===200) { 
        setMovies(res.data.data);
        console.log(res.data.data);
        
      }
      else throw new Error("Error fetching movies");
      

    }catch(error){
      console.log(error);
      
    }
  }
  useEffect(()=>{
    handelMoves();
  },[])
  return (

    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
      
        <Route path="login" element={<LoginForm />} />
        <Route path="register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<ProRoute state={false} />}>
          <Route
          index
          element={<Home movies={movies} setMovies={setMovies} />}
        />
          <Route
            path="favorites"
            element={<Favorites movies={movies} setMovies={setMovies} />}
          />
          <Route
            path="stars"
            element={<Watched movies={movies} setMovies={setMovies} />}
          />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Route>
    </Routes>

  );
};

export default App;
