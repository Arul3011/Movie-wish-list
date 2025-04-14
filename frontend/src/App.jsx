// App.jsx
import { Routes, Route } from 'react-router-dom';
import Layout from './compounts/Layout';
import Home from './Pages/Home';
import { useEffect, useState } from 'react';
import Watched from './Pages/Wacthed';
import Favorites from './Pages/Favorites';
import axios from 'axios';

const App = () => {
  const [movies, setMovies] = useState([]);

  const handelMoves = async()=>{
    try{
      const id = "zgzdhnmsgntsn";
    const res = await axios.get(`http://localhost:3000/api/movies?id=${id}`)
    setMovies(res.data);
    
    }catch(error){

    }
  }

  useEffect(()=>{
    handelMoves();
  },[])
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home 
          movies ={movies} 
          setMovies = {setMovies}
        
        />} />
        <Route path="favorites" element={<Favorites 
         movies={movies} 
         setMovies = {setMovies}
         />} 
         />
        <Route path="stars" element={<Watched 
        movies={movies}
        setMovies = {setMovies}
         />} />
      </Route>
    </Routes>
  );
};

export default App;
