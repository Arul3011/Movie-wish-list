import { useEffect, useState } from "react";
import MoviesList from "./MoviesList";
import axios from "axios";

const Home = ({movies, setMovies}) => {
  const [movie, setMovie] = useState({
    userId: "arul",
    name: "",
    year: "",
    genre: "",
    favorites: false,
    stared: false,
  });

  const handleForm = async(e) => {
    e.preventDefault();
    
    try {
      const resdata = await axios.post("http://localhost:3000/api/movies",
        {
          userID:"arul",
          movieName : movie.name,
          year:movie.year,
          genre:movie.genre,
        });
        if(resdata.status === 201) {
          const newMovie = {  
            userId: "arul",
            movieName: movie.name,
            year: movie.year,
            genre: movie.genre,
            favorites: false,
            stared: false,
            _id: resdata.data.id,
          }
          console.log(resdata.data.id);
          
          setMovies((prev) => [ 
            ...prev,
            newMovie,
          ]);

        }
         
    } catch (error) {
      
    }
 
   


    
    setMovie({
      userId: "",
      name: "",
      year: "",
      genre: "",
      favorites: false,
      stared: false,
    });
  };


  return (
    <>
    <h1 className="text-center text-3xl text-blue-950 uppercase">Enter your movie details to add your list</h1>
      <form
        action=""
        className="max-w-2xl mx-auto mt-10 grid grid-cols-2 gap-4 p-4"
        onSubmit={handleForm}
      >
        <input
          type="text"
          placeholder="Movie Name"
          value={movie.name}
          onChange={(e) => setMovie({ ...movie, name: e.target.value })}
          className="col-span-2 p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Release Year"
          value={movie.year}
          onChange={(e) => setMovie({ ...movie, year: e.target.value })}
          className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={movie.genre}
          onChange={(e) => setMovie({ ...movie, genre: e.target.value })}
          className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Select Genre --</option>
          <option value="comedy">Comedy</option>
          <option value="thriller">Thriller</option>
          <option value="drama">Drama</option>
        </select>

        <button
          type="submit"
          className="col-span-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Add Movie
        </button>
      </form>
<div className="flex justify-evenly ">
      <MoviesList 
      movies={movies}
      setMovies={setMovies} 
      />
</div>
  
    </>
  );
};

export default Home;
