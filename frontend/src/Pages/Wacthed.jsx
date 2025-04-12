import MovieCared from "../compounts/MovieCard";

const Watched = ({movies,setMovies}) => {
  return (
  <div className="flex justify-evenly flex-wrap gap-4">
  {
    movies.filter((movie) => movie.favorites).length < 1 ? (<p className="text-center text-2xl m-10 uppercase">no movies in Watched list</p>) : movies.filter((val)=> val.favorites).map((val)=>(
    <>
    <MovieCared movie={val} 
     movies={movies}
     setMovies={setMovies}/>
    </>  
    )) 
  }
  </div>
  );
}
export default Watched;