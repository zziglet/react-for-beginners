import { useState, useEffect } from "react";
import Movie from "../components/Movie";

//route url일때 보여주는 화면 route
function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovies = async() => {
    const json = await (
      await fetch(
        'https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year'
      )
    ).json();
    setMovies(json.data.movies);
    setLoading(false);
  }
  useEffect(() => {
    getMovies();
  }, []);
  console.log(movies);
  //props는 내 맘대로 이름 지어도 됨
  //but, props의 값은 api에서 지은 이름 그대로 사용해야 함
  return (<div>
      {loading ? <h1>Loading</h1> : <div>
        {movies.map((movie) => (
          <Movie 
            id={movie.id}
            coverImg={movie.medium_cover_image} 
            title={movie.title}
            summary={movie.summary}
            genres={movie.genres} />
        ))}
        </div>}
    </div>
  );
}

export default Home;