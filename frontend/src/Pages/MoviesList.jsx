import MovieCared from "../compounts/MovieCard";

const MoviesList = ({ movies, setMovies }) => {
    // const data = movies;
//    console.log(data);
   
    return (
        <div className="flex justify-evenly flex-wrap gap-4">
            {movies.length < 1 ?  
            (<p className="text-center text-2xl m-10 uppercase">
               {" No movies in your list"}
                </p>) :   
            (movies.map((movie,index) => (
               <MovieCared key={index} movie={movie} setMovies={setMovies} movies={movies} />
               )))}
        </div>
    );
};

export default MoviesList;