import React from "react"
import Header from "../Home/Header/Header"
import Sidebar from "../Home/Sidebar/Sidebar"
import MoreAboutTheFilm from "./MoreAboutTheFilm/MoreAboutTheFilm"
import Footer from "../Home/Footer/Footer"


const FilmDescription =   () => {

    return (
        <div className="home">
            <div className="headerHome"> <Header /> </div>
            <div className="sidebarHome"> <Sidebar /> </div>
            <div className="filmsHome"> <MoreAboutTheFilm /> </div>
            <div className="footerHome"> <Footer /> </div>
        </div> 
    )
}

export default FilmDescription