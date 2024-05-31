import React from "react"
import "./Header.css"
import { Link , useNavigate } from "react-router-dom"


const Header = () => {

    const navigate = useNavigate();

    return (
        <div className="header">
            <img className="logo" src="/src/public/logo.png" alt="logo" />
            <form className="research">
                <button 
                    className="researchButton"
                    type="submit"
                    onClick = {() => navigate('/films/research')}
                >
                    <img className="researchImages" src="/src/public/research.png" alt="research" />
                </button>
            </form>
            <Link to={'/films'} className="kinoprosmotr"> <h1> Кинопросмотр </h1> </Link>
            <p> здесь найдется всё, но не сразу </p>
        </div>
    )
}

export default Header