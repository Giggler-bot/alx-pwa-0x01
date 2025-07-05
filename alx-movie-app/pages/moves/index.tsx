import Button from "@/components/commons/Button";
import Loading from "@/components/commons/Loading";
import MovieCard from "@/components/commons/MovieCard";
import { MoviesProps } from "@/interfaces";
import { useCallback, useEffect, useState } from "react";


interface MProps {
  movies?: MoviesProps[] // Made optional as it's fetched client-side
}

const Movies: React.FC<MProps> = () => {

  const [page, setPage] = useState<number>(1)
  const [year, setYear] = useState<number | null>(null)
  const [genre, setGenre] = useState<string>("All")
  const [movies, setMovies] = useState<MoviesProps[]>([])
  const [loading, setLoading] = useState<boolean>(false)

 const fetchMovies = useCallback(async () => {
    setLoading(true)
    try {
        const response = await fetch('/api/fetch-movies', {
            method: 'POST',
            body: JSON.stringify({
                page,
                year,
                genre: genre === "All" ? "" : genre
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Something went wrong fetching movies");
        }

        const data = await response.json()
        const results = data.movies
        console.log(results)
        setMovies(results)
    } catch (error) {
        console.error("Error fetching movies:", error);
        // Optionally set an error state here to display to the user
    } finally {
        setLoading(false)
    }
  }, [page, year, genre])


  useEffect(() => {
    fetchMovies()
  }, [fetchMovies])




  return (
    <div className="min-h-screen bg-[#110F17] text-white px-4 md:px-10 lg:px-44">
  <div className="py-16">
    <div className="flex flex-col md:flex-row justify-between mb-4 items-center space-x-0 md:space-x-4">
      <input
        type="text"
        placeholder="Search for a movie..."
        className="border-2 w-full md:w-96 border-[#E2D609] outline-none bg-transparent px-4 py-2 rounded-full text-white placeholder-gray-400"
      />

      <select
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setYear(Number(event.target.value))}
        className="border-2 border-[#E2D609] outline-none bg-transparent px-4 md:px-8 py-2 mt-4 md:mt-0 rounded-full w-full md:w-auto text-black" // Added text-black for visibility
      >
        <option value="">Select Year</option>
        {
          // Generate years from current year down to 1900 or earlier if needed
          Array.from({ length: new Date().getFullYear() - 1900 + 1 }, (_, i) => new Date().getFullYear() - i)
               .map((year: number) => (
            <option value={year} key={year}>{year}</option>
          ))
        }
      </select>
    </div>

    <p className="text-[#E2D609] text-xl mb-6 mt-6">Online streaming</p>
    <div className="flex flex-col md:flex-row items-center justify-between">
      <h1 className="text-lg md:text-6xl font-bold">{year || 'Latest'} {genre} Movie List</h1> {/* Adjusted title based on year/genre */}
      <div className="flex flex-wrap gap-2 md:space-x-4 mt-4 md:mt-0 justify-center"> {/* Changed space-x-0 to gap-2 and added justify-center */}
        {
          ['All', 'Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance', 'Sci-Fi', 'Thriller', 'Animation'].map((genre: string, key: number) => (
            <Button title={genre} key={key} action={() => setGenre(genre)} />
          ))
        }
      </div>
    </div>

    {/* Movies output */}
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mt-10">
      {
        movies?.map((movie: MoviesProps, key: number) => (
          <MovieCard
            title={movie?.titleText?.text} // Added optional chaining
            posterImage={movie?.primaryImage?.url || '/path/to/placeholder-image.jpg'} // Added placeholder
            releaseYear={movie?.releaseYear?.year} // Added optional chaining
            key={movie.id || key} // Use movie.id as key if available, else fallback to index
          />
        ))
      }
    </div>
    {movies.length === 0 && !loading && (
      <div className="text-center text-gray-400 mt-10">No movies found for the selected criteria.</div>
    )}
    <div className="flex justify-end space-x-4 mt-6">
      <Button title="Previous" action={() => setPage(prev => prev > 1 ? prev - 1 : 1)} />
      <Button title="Next" action={() => setPage(page + 1)} />
    </div>
  </div>
  {
    loading && <Loading />
  }
</div>
  )
}


export default Movies;