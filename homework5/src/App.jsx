import React , { useState } from 'react'
import './App.css'
import Header from './components/Home/Header/Header'
import Sidebar from './components/Home/Sidebar/Sidebar'
import { Routes , Route } from 'react-router-dom'
import Films from './components/Home/Films/Films'
import Research from './components/Research/Research'
import MoreAboutTheFilm from './components/FilmDescription/MoreAboutTheFilm/MoreAboutTheFilm'
import Footer from './components/Home/Footer/Footer'

// локальный отклик, когда закончились запросы к апишке кинопоиска
export const isUseMock = true

function App() {

  const [favorites, setFavorites] = useState([]);

  const updateFavorites = (newFavorites) => {
    setFavorites(newFavorites);
  };

  return (
    <div className="home">
      <div className="headerHome"> <Header /> </div>
        <div className="sidebarHome"> <Sidebar  favorites={favorites} /> </div>
        <Routes>
          <Route path='/films/' element={<Films updateFavorites={updateFavorites}/>}/>
          <Route path='/films/research' element={<Research />}/>
          <Route path='/films/:id' element={<MoreAboutTheFilm />} />
        </Routes>
      <div className="footerHome"> <Footer /> </div>
    </div>
  )
}

export default App
