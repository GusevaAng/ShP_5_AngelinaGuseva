import React from "react"
import "./Recomendation.css"
import { Link } from "react-router-dom"


const Recomendation = (props) => {

    return (
        <div className="Recomendation" key={props.id}>
            <Link to={`/films/${props.id}`} className="filmNameRecomendation"> <p >{props.name}</p> </Link>
            <img className="filmPosterRecomendation" src={props.poster} alt="poster" />
            <p className="filmRatingRecomendation">рейтинг: <span> {props.rating} </span></p>
        </div>
    )
}

export default Recomendation