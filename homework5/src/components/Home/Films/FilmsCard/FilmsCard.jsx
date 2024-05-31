import React , { useState } from "react"
import "./FilmsCard.css"
import { Link, useParams } from "react-router-dom"


const FilmsCard = (props) => {
    const { id } = useParams() 

    const [favorite, setFavorite] = useState(false);

    const addToFavorites = (filmName) => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        favorites.push(filmName);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        setFavorite(true)
        updateFavoritesState(favorites);
      };

    return (
        <div >
            <div key={props.id} className="filmsCard">
                <Link to={`/films/${props.id}`} className="filmName"> <p >{props.name}</p> </Link>
                <img className="filmPoster" src={props.poster} alt="poster" />
                <p className="filmDescription">{props.description}</p>
                <p className="filmCast">Актеры: {props.cast} </p>
                <p className="filmCategory">Жанры: {props.genres}</p>
                <p className="filmRating">рейтинг: <span> {props.rating} </span></p> 
                <button onClick={() => addToFavorites({name:props.name , id: props.id})} className={favorite ? "favoriteButtonTrue" : "favoriteButtonFalse"}>в избранное</button>
            </div>
        </div>
    )
}

export default FilmsCard