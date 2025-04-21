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
      // const id = "zgzdhnmsgntsn";
      const res = await axios.get(`http://localhost:3000/api/movies`)
      if(res.status===200) {
        // console.log(res.data.data);
        
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
