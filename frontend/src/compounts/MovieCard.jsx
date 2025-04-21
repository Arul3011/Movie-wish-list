import axios from "axios";
import { FaStar, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa";

const MovieCared = ({ movie, movies, setMovies }) => {
// logger.log(movies);
    const handleWatch = async (id, sts) => {


        try {
            const sres = await axios.patch('http://localhost:3000/api/movies/watched', { id, watched: !sts })

            if (sres.status === 200) {
                const updatedArr = movies.map(obj => 
                    obj._id === id ? { ...obj, watched: !obj.watched } : obj
                  );
                console.log(updatedArr);
                setMovies(updatedArr);

            } else {
                alert("something went wrong in the server !")
            }
        } catch (error) {
            console.error(error);

        }

    };

    const handleStare = async (id, sts) => {

        try {
            const sres = await axios.patch('http://localhost:3000/api/movies/fav', {

                id,
                favorites: !sts

            })

            if (sres.status === 200) {
                const updatedMovies = movies.map((movie) => {
                    if (movie._id === id) {
                        return {
                            ...movie,
                            favorites: !movie.favorites, // 🔁 toggle only this one
                        };
                    }
                    return movie; // leave others unchanged
                });
            console.log(updatedMovies);
            
                setMovies(updatedMovies);
            }
             else {
                alert("something went wrong in the server !")
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        console.log(id);
        
        try {
            const sres = await axios.delete(`http://localhost:3000/api/movies`, {
                data: { id }
              });
              

            if (sres.status === 200) {
                const updatedMovies = movies.filter((movie) => movie._id !== id);
                setMovies(updatedMovies);
            } else {
                alert("Something went wrong on the server!");
            }
        } catch (error) {
            console.log(error);
            alert("An error occurred while deleting.");
        }
    };

// console.log(movie);

    return (
        <div
            key={movie.id}
            className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-start w-max"
        >
            <h2 className="text-2xl text-gray-600 font-bold mb-2">{movie.movieName}</h2>
            <p className="text-gray-600 mb-1">
                <strong>Year:</strong> {movie.year}
            </p>
            <p className="text-gray-600 mb-4">
                <strong>Genre:</strong> {movie.genre}
            </p>
            <div className="flex items-center gap-2">
                <button
                    onClick={() => handleWatch(movie._id, movie.watched)}

                    className={`flex items-center gap-1 px-4 py-2 rounded-lg text-white ${movie.watched
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-gray-500 hover:bg-gray-600"
                        }`}
                >
                    {movie.watched ? <FaEye /> : <FaEyeSlash />}
                    {movie.watched ? "Watched" : "Watch"}
                </button>
                <button
                    onClick={() => handleStare(movie._id, movie.favorites)}
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg text-white ${movie.favorites
                            ? "bg-yellow-500 hover:bg-yellow-600"
                            : "bg-gray-500 hover:bg-gray-600"
                        }`}
                >
                    <FaStar />
                    {movie.favorites ? "Stared" : "Stare"}
                </button>
                <button
                    onClick={() => handleDelete(movie._id)}
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