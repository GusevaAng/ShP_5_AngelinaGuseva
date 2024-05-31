import React from "react"
import "./SearchCard.css"
import { Link, useParams } from "react-router-dom"


const SearchCard = (props) => {

    const { id } = useParams() 

    return (
        <div className="searchCard">
            <Link to={`/films/${props.id}`} className="filmNameSearch"> <p >{props.name}</p> </Link>
                <img className="filmPosterSearch" src={props.poster} alt="posterSearch" />
                <p className="filmDescriptionSearch">{props.description}</p>
        </div>
    )
}

export default SearchCard