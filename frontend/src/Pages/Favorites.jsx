import MovieCared from "../compounts/MovieCard";

const Favorites = ({ movies ,setMovies}) => {
    console.log(movies);
    const arr = movies.filter((movie) => movie.favorites);console.log(arr);
    
    return (
        <div className="flex justify-evenly flex-wrap gap-4">
        {movies.filter((movie) => movie.favorites).length < 1 ? (
            <p className="text-center text-2xl m-10 uppercase">
                No movies in favorites
            </p>
        ) : (
            movies
                .filter((movie) => movie.favorites)
                .map((val) => (
                    <MovieCared // ← fixed typo if needed
                        key={val._id}
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