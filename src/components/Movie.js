import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Movie({id, coverImg, title, summary, genres}) {
    //map을 쓰는 경우에만 key 값이 무조건 필요
    return (
        <div>
            <img src={coverImg} alt=""/>
            <h2><Link to={`/movie/${id}`}>{title}</Link></h2>
            <p>{summary.length >  235 ? `${summary.slice(0, 235)}...` : summary}</p>
            <ul>
              {genres.map((g) => (
                <li key={g}>
                  {g}
                </li>
              ))}
            </ul>
          </div>
    );
}

//proptype 정의해줄 것!
Movie.propTypes = {
  movie: PropTypes.shape({
    id : PropTypes.number.isRequired,
    coverImg: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
}
export default Movie;