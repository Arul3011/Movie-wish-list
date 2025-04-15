import axios from "axios";
import { FaStar, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa";

const MovieCared = ({ movie ,movies, setMovies }) => {
    console.log(movie[0]);
    
    const handleWatch = async(id,sts) => {

        try {
             const sres = await axios.patch('http://localhost:3000/api/movies/fav',{
            data:{
                id,
                favorites: !sts
            }
        })

        if(sres.status === 200){
            const updatedMovies = movies.map((movie) => {
                if (movie.id === id) {
                    return { ...movie, stared: !movie.stared };
                }
                return movie;
            });
            setMovies(updatedMovies);
        }else{
            alert("something went wrong in the server !")
        }
        } catch (error) {
            console.error(error);
            
        }
        
    };

    const handleStare = async(id,sts) => {
    try {
        const sres = await axios.patch('http://localhost:3000/api/movies/watched',{
            data:{
                id,
                watched: !sts
            }
        })

        if(sres.status === 200){
            const updatedMovies = movies.map((movie) => {
                if (movie._id === id) {
                    return { ...movie, favorites: !movie.favorites };
                }
                return movie;
            });
            setMovies(updatedMovies);
        }else{
            alert("something went wrong in the server !")
        }
    } catch (error) {
        console.error(error);
    }
    };

    const handleDelete = async (id) => {
        try {
          const sres = await axios.delete(`http://localhost:3000/api/movies`, {
            data: { id },
          });
      
          if (sres.status === 200) {
            const updatedMovies = movies.filter((movie) => movie.id !== id);
            setMovies(updatedMovies);
          } else {
            alert("Something went wrong on the server!");
          }
        } catch (error) {
          console.log(error);
          alert("An error occurred while deleting.");
        }
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
                onClick={() => handleStare(movie.id,movie.favorites)}

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
                onClick={() => handleWatch(movie.id,movie.stared)}
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