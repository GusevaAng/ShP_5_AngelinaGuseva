import React, { useState } from "react"

export const StoreContext = React.createContext(null)

export default ({ children }) => {
    const [movies, setMovies] = useState();
  
    const store = {
      moviesStore: [movies, setMovies],
    }
  
    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  }