import React, { useEffect, useState } from "react"
import "./Sidebar.css"
import { Link } from "react-router-dom"


const Sidebar = () => {
    
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavorites);
    }, []);

    return (
        <div className="sidebarAll">
            <p> Фильмы в избранном: </p>
            <ul className="favoriteFilms">
                {favorites.map((favorite, index) => (
                    <Link to={`/films/${favorite.id}`} > <li key={index}> {favorite.name} </li> </Link>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar