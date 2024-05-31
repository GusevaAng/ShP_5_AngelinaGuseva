import React, { useEffect, useState, useMemo, useContext } from "react"
import "./MoreAboutTheFilm.css"
import { useLocation } from "react-router-dom"
import ApiData from "../../../api/api"
import { mockDataTheFilm } from "./mockDataTheFilm"
import { isUseMock } from "../../../App"
import CardAboutFilm from "./CardAboutFilm/CardAboutFilm"
import Reviews from "./Reviews/Reviews"
import { StoreContext } from "../../../store/root"
import { mockData } from "../../mockData"
import Recomendation from "./Recomendation/Recomendation"


const MoreAboutTheFilm = ({ updateFavorites }) => {
    const location = useLocation()
    const [ , , id] = location.pathname.split('/')

    const [movie, setMovie] = useState();
    const [movies, setMovies] = useContext(StoreContext)?.moviesStore || []

    useEffect (
        () => {
            const apiData = isUseMock ? setMovie(mockDataTheFilm) : new ApiData();
            if (!isUseMock) {
                apiData.getDataById(id)
                .then(function (response) {
                    setMovie(response.data);
                });
            }
        }, []
    )

    useEffect (() => {
        if (!movies) {

            const apiData = isUseMock ? setMovies(mockData) : new ApiData();
            if (!isUseMock) {
                apiData.getData()
                .then((response) => {
                    setMovies({...response.data})
                    }
                );
            }
        }
    }, [movies]
)

    let fivePersons = ''
    movie?.persons?.slice(0, 4).forEach((item) => {
        fivePersons = fivePersons + item.name + ', '
    });

    let genres = ''
    movie?.genres?.forEach((item) => {
        genres = genres + item.name + ', '
    });

    const addToFavorites = (filmName) => {
        const favorites = [...movie?.name];
        favorites.push(filmName);
        updateFavorites(favorites);
      };

    const filmsForRecomendation = useMemo(() => {
        const objIncludes = {}

        if (!movie || !movies) {
            return []
        }

        let genresOfThisFilm = movie?.genres?.map((genresThisFilm) => {
            return genresThisFilm.name
        })
        
        movies?.docs?.forEach((eachFilm) => {
            let genresOfEachFilms = eachFilm.genres.map((genres) => {
                return genres.name
            })
            let countIncludes = 0
            
            genresOfEachFilms.forEach((specificGenre) => {
                if (genresOfThisFilm.includes(specificGenre)) {
                    countIncludes++
                    objIncludes[eachFilm.id] = {
                        id: eachFilm.id,
                        name: eachFilm.name,
                        poster: eachFilm.poster.url,
                        rating: eachFilm.rating.imdb,
                        count: countIncludes,
                    }
                }
            })
        })
    
        const filmsWithCountIncludes = []
        for (const key in objIncludes) {
            if (objIncludes[key].id === movie.id) {
                continue
            }
            filmsWithCountIncludes.push(objIncludes[key])
        }
    
        return filmsWithCountIncludes.sort((a, b) => b.count - a.count).slice(0, 3)
    }, [movie, movies])

    return (
        <div className="moreAboutTheFilm">
            <div className="cardAboutFilm">
                <CardAboutFilm
                    key={movie?.id}
                    id={movie?.id}
                    name={movie?.name}
                    poster={movie?.poster.url}
                    description={movie?.description}
                    cast={fivePersons}
                    genres={genres}
                    rating={movie?.rating.imdb}
                    addToFavorites={addToFavorites}
                 />
            </div>
            <div className="filmsForRecomendation">
                <p className="recomendationForWhatch"> Рекомендуем к просмотру: </p>
                {filmsForRecomendation.map(film => (
                    <div key={film.id} className="recomendation">
                        <Recomendation 
                            id={film.id}
                            name={film.name}
                            poster={film.poster}
                            rating={film.rating}
                        />
                    </div>
                ))}
            </div>
            <div>
                <Reviews id={movie?.id} />
            </div>
        </div>
    )
}

export default MoreAboutTheFilm


