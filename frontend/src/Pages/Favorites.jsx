import MovieCared from "../compounts/MovieCard";

const Favorites = ({ movies ,setMovies}) => {
    // console.log(movies);
    
    return (
        <div className="flex justify-evenly flex-wrap gap-4">
            {movies.filter((movie) => movie.stared).length < 1 ? (
                <p className="text-center text-2xl m-10 uppercase">No movies in favorites</p>
            ) : (
                movies.filter((movie) => movie.stared).map((val) => (
                    <MovieCared 
                        key={val.id} 
                        movies={movies} 
                        setMovies={setMovies} 
                        movie={val} 
                    />
                ))
            )}
        </div>
    );
};

export default Favorites;