import React, { useState } from "react"
import "./CardAboutFilm.css"


const CardAboutFilm = (props) => {

    const [favorite, setFavorite] = useState(false);

    const addToFavorites = (filmName) => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        favorites.push(filmName);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        setFavorite(true)
        updateFavoritesState(favorites);
      };

    return (
        <div key={props.id} className="fCard">
                <p className="fName">{props.name}</p>
                <img className="fPoster" src={props.poster} alt="poster" />
                <p className="fDescription">{props.description}</p>
                <p className="fCast">Актеры: {props.cast} </p>
                <p className="fCategory">Жанры: {props.genres}</p>
                <p className="fRating">рейтинг: <span> {props.rating} </span></p> 
                <button onClick={() => addToFavorites(props.name)} className={favorite ? "favoriteButtonTrue" : "favoriteButtonFalse"}>в избранное</button>
        </div>
    )
}

export default CardAboutFilm