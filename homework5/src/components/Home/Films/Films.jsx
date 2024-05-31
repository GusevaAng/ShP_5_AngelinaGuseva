import React, { useEffect, useState, useContext } from "react"
import ApiData from "../../../api/api"
import "./Films.css"
import FilmsCard from "./FilmsCard/FilmsCard"
import { mockData } from "../../mockData"
import { isUseMock } from "../../../App"
import { StoreContext } from "../../../store/root.jsx"


const Films = ({ updateFavorites }) => {
    const [movies, setMovies] = useContext(StoreContext)?.moviesStore || []

    useEffect (() => {
            const apiData = isUseMock ? setMovies(mockData) : new ApiData();
            if (!isUseMock) {
                apiData.getData()
                .then((response) => {
                    setMovies({...response.data})
                    }
                );
            }
        }, []
    )

    const [ratingSort, setRatingSort] = useState("high");

    const [filteringByType, setFilteringByType] = useState("all");

    const addToFavorites = (filmName) => {
        const favorites = [...movies];
        favorites.push(filmName);
        updateFavorites(favorites);
      };

    return (
        <div className="filmsHome"> 
            <div className="select">
                <select id="selectRating" onChange={(event) => {
                    setRatingSort(event.target.value)}}>
                    <option value="high" selected="selected">фильмы с высоким рейтингом</option>
                    <option value="low">фильмы с низким рейтингом</option>
                </select>
                
                <select id="selectType" onChange={(event) => {
                    setFilteringByType(event.target.value)}}>
                    <option value="all" selected="selected">все типы</option>
                    <option value="cartoon">мультфильмы</option>
                    <option value="movies">фильмы</option>
                    <option value="animated-series">мультипликационные сериалы</option>
                    <option value="tv-series">телевизионные сериалы</option>
                </select>
            </div>

            <div className="films"> 
                {movies?.docs?.sort((a, b) => { 
                    if (ratingSort == "high") {
                        return b.rating.imdb - a.rating.imdb
                    } else {
                        return a.rating.imdb - b.rating.imdb
                    }
                }).filter((item) => {
                    if (filteringByType == "all") {
                        return true
                    } else if (filteringByType == "movies") {
                        return item.type == "movies"
                    } else if (filteringByType == "cartoon") {
                        return item.type == "cartoon"
                    } else if (filteringByType == "animated-series") {
                        return item.type == "animated-series"
                    } else {
                        return item.type == "tv-series"
                    }
                }).map((aboutFilm) => {
                    let firstThreePerson = aboutFilm.persons.slice(0, 2)
                    let cast = ''
                    firstThreePerson.forEach((person) => {
                        cast = cast + person.name + ', '
                    })
                    let firstThreeGenres = aboutFilm.genres.slice(0, 2)
                    let genres = ''
                    firstThreeGenres.forEach((genre) => {
                        genres = genres + genre.name + ', '
                    })

                    return (
                        <div>
                            <FilmsCard 
                                key={aboutFilm.id}
                                id={aboutFilm.id}
                                name={aboutFilm.name}
                                poster={aboutFilm.poster.url}
                                description={aboutFilm.shortDescription}
                                cast={cast}
                                genres={genres}
                                rating={aboutFilm.rating.imdb}
                                addToFavorites={addToFavorites}
                            />
                        </div>
                    )
                })} 
            </div>
        </div>
    )
}

export default Films