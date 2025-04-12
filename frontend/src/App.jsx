// App.jsx
import { Routes, Route } from 'react-router-dom';
import Layout from './compounts/Layout';
import Home from './Pages/Home';
import { useState } from 'react';
import Watched from './Pages/Wacthed';
import Favorites from './Pages/Favorites';

const App = () => {
  const [movies, setMovies] = useState([]);

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
