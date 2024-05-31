import React, { useState , useEffect} from "react"
import "./Research.css"
import ApiData from "../../api/api"
import { mockData } from "../../components/mockData"
import SearchCard from "./SearchCard/SearchCard"
import { isUseMock } from "../../App"
import { MultiSelect } from "react-multi-select-component"


const Research = () => {
    const [moviesForSearch, setMoviesForSearch] = useState([]);

    useEffect (() => {
        const apiData = isUseMock ? setMoviesForSearch(mockData) : new ApiData();
        if (!isUseMock) {
            apiData.getData()
            .then((response) => {
                setMoviesForSearch({...response.data})
                }
            );
        }
    }, []
)

    const [search, setSearch] = useState('');

    const [selected, setSelected] = useState([]);

    const [selectedType, setSelectedType] = useState([]);

    const strainerFilms = moviesForSearch?.docs?.filter((film) => {
        const matchForName = film.name.toLowerCase().includes(search.toLowerCase());
        const matchForGenre = selected.length === 0 || selected.some(select => film.genres?.map((genresName) => {return genresName.name}).includes(select.value));
        const matchForType = selectedType.length === 0 || selectedType.some(select => film.type.includes(select.value));

        return matchForName && matchForGenre && matchForType;
    })

    const genres = []
    
    moviesForSearch?.docs?.forEach(el => el.genres?.forEach(_el => {
        if(!genres.includes(_el.name)) {
            genres.push(_el.name)
        }
    }))

    const optionsOfGenre = genres.map(ganre => ({
        label: ganre,
        value: ganre
    }))

    const optionsOfType = [
        { label: "фильмы 🎥", value: "movie" }, 
        { label: "мультфильмы 🦄", value: "cartoon" },
        { label: "анимационные cериалы 🧸", value: "animated-series" },
        { label: "тв-сериалы 📺", value: "tv-series"},
    ];

    const handleTypeChange = (selected) => {
        setSelectedType(selected);
    };

    return (
        <div className="forResearch">
            <form action="" className="inputSearch">
                 <input 
                    className="inputForSerch"
                    type="text"
                    placeholder="Поиск по названию"
                    onChange={(event) => setSearch(event.target.value)}
                />
                <p>{JSON.stringify(selected)}</p>
                <MultiSelect
                    options={optionsOfType}
                    value={selectedType}
                    onChange={handleTypeChange}
                    labelledBy="Select"
                    placeholder="Поиск по категории"
                />
                <p>{JSON.stringify(selected)}</p>
                <MultiSelect
                    options={optionsOfGenre}
                    value={selected}
                    onChange={setSelected}
                    labelledBy="Select"
                    placeholder="Поиск по жанрам"
                />
            </form>
            <div className="forSearch">
                {strainerFilms?.map(({id, name, poster, shortDescription}) => 
                    <div key={id}>
                        <SearchCard 
                            key={id}
                            id={id}
                            name={name}
                            poster={poster.url}
                            description={shortDescription}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Research