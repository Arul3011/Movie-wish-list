import { FaStar, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa";

const MovieCared = ({ movie ,movies, setMovies }) => {
    console.log(movie[0]);
    
    const handleWatch = (id) => {
        const updatedMovies = movies.map((movie) => {
            if (movie.id === id) {
                return { ...movie, stared: !movie.stared };
            }
            return movie;
        });
        setMovies(updatedMovies);
    };

    const handleStare = (id) => {
        const updatedMovies = movies.map((movie) => {
            if (movie.id === id) {
                return { ...movie, favorites: !movie.favorites };
            }
            return movie;
        });
        setMovies(updatedMovies);
    };

    const handleDelete = (id) => {
        const updatedMovies = movies.filter((movie) => movie.id !== id);
        setMovies(updatedMovies);
    };

    return(
        <div
        key={movie.id}
        className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-start w-max"
    >
        <h2 className="text-2xl font-bold mb-2">{movie.name}</h2>
        <p className="text-gray-600 mb-1">
            <strong>Year:</strong> {movie.year}
        </p>
        <p className="text-gray-600 mb-4">
            <strong>Genre:</strong> {movie.genre}
        </p>
        <div className="flex items-center gap-2">
            <button
                onClick={() => handleStare(movie.id)}

                className={`flex items-center gap-1 px-4 py-2 rounded-lg text-white ${
                    movie.favorites
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-gray-500 hover:bg-gray-600"
                }`}
            >
                {movie.favorites ? <FaEye /> : <FaEyeSlash />}
                {movie.favorites ? "Watched" : "Watch"}
            </button>
            <button
                onClick={() => handleWatch(movie.id)}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg text-white ${
                    movie.stared
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : "bg-gray-500 hover:bg-gray-600"
                }`}
            >
                <FaStar />
                {movie.stared ? "Stared" : "Stare"}
            </button>
            <button
                onClick={() => handleDelete(movie.id)}
                className="flex items-center gap-1 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
            >
                <FaTrash />
                Delete
            </button>
        </div>
    </div>
    )
}
export default MovieCared;