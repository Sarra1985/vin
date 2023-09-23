import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getAllWines } from "../services/winesAPI";

const Home = () => {
    const [wines, setWines] = useState([]);
    const [search, setSearch] = useState("");
    const [countrySelected, setCountrySelected] = useState("");
    const [grapesSelected, setGrapesSelected] = useState("");

    const countryOption = ["France", "Espagne", "Italie", "USA", "Argentine"];

    const grapesRadio = [
        { name: "Pinot Noir" },
        { name: "Sauvignon" },
        { name: "Merlot" },
        { name: "Chardonnay" },
    ];

    const [inputType, setInputType] = useState("");

    const fetchWines = async () => {
        try {
            const data = await getAllWines();
            setWines(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchWines();
    }, []);

    const filteredWines = wines.filter(
        (wine) =>
            wine.name.toLowerCase().includes(search.toLowerCase()) &&
            wine.country
                .toLowerCase()
                .includes(countrySelected.toLowerCase()) &&
            wine.grapes.toLowerCase().includes(grapesSelected.toLowerCase())
    );

    const cancelSearch = () => {
        setSearch("");
        setCountrySelected("");
        setGrapesSelected("");
    };

    const searchInput = (param) => {
        setInputType(param);
    };

    return (
        <div>
            <Navbar />
            <div className="lobby-container">
                {(search || countrySelected || grapesSelected) && (
                    <div className="cancel" onClick={cancelSearch}>
                        <h5>Annuler la recherche</h5>
                        <i className="fas fa-time"></i>
                    </div>
                )}
                <ul>
                    <li className="name" onClick={() => searchInput("name")}>
                        <i className="fas fa-search"></i>
                        {inputType === "name" && (
                            <input
                                type="text"
                                className="search"
                                placeholder="Entrer le nom d'un vin..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        )}
                    </li>
                    <li
                        className="country"
                        onClick={() => searchInput("country")}
                    >
                        <i className="fas fa-globe-europe"></i>
                        {inputType === "country" && (
                            <select
                                value={countrySelected}
                                onChange={(e) =>
                                    setCountrySelected(e.target.value)
                                }
                            >
                                <option value="">Choisissez un pays</option>
                                {countryOption.map((country) => {
                                    return (
                                        <option key={country} value={country}>
                                            {country}
                                        </option>
                                    );
                                })}
                            </select>
                        )}
                    </li>
                    <li
                        className="grapes"
                        onClick={() => searchInput("grapes")}
                    >
                        <i className="fas fa-wine-glass-alt"></i>
                        {inputType === "grapes" && (
                            <div className="radio-container">
                                {grapesRadio.map((grape) => (
                                    <div className="radio" key={grape.name}>
                                        <input
                                            type="radio"
                                            className="radio-button"
                                            value={grape.name}
                                            id={grape.name}
                                            checked={
                                                grape.name === grapesSelected
                                            }
                                            onChange={(e) =>
                                                setGrapesSelected(
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <label htmlFor={grape.name}>
                                            {grape.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </li>
                </ul>
                {inputType === "" && <h1 className="title">Liste des vins</h1>}
                {filteredWines.length === 0 && <h3>Aucun resultat</h3>}
                <div className="list-container">
                    {filteredWines.map((wine) => (
                        <div className="wine-list">
                            <div className="wine-card">
                                <div className="card-header">
                                    <h2>{wine.name}</h2>
                                </div>
                                <div className="container">
                                    <div className="text-container">
                                        <div className="buttons">
                                            <h4>{wine.year}</h4>
                                            <h4>{wine.country}</h4>
                                            <h4>{wine.grapes}</h4>
                                        </div>
                                        <div className="location">
                                            <i className="fas fa-map-marker-alt"></i>
                                            <span>{wine.region}</span>
                                        </div>
                                        <p>{wine.description}</p>
                                    </div>
                                    <img
                                        src={`./images/${wine.picture}`}
                                        alt="Photo bouteille"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
