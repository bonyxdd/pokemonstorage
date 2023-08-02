import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { PokemonCard } from "./PokemonCard";

type Pokemon = [];
  
  function PokemonList() {
    const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
    const [loadPokemons, setLoadPokemons] = useState(
      "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0"
    );
  
    const getPokemons = async () => {
      try {
        const response = await axios.get(loadPokemons);
        const data = await response.data;
        const dataResult = await response.data.results;
        setLoadPokemons(data.next);
  
        const pokemonPromises = dataResult.map((pokemon: { url: any }) =>
          axios.get(pokemon.url)
        );
        const responses = await Promise.all(pokemonPromises);
        const pokemonData = responses.map((response) => response.data);
        setAllPokemons((currentList: Pokemon[]) => [
          ...currentList,
          ...(pokemonData as Pokemon[]),])
      } catch (error) {
        console.error(error);
      }
    };
    useEffect(() => {
      getPokemons();
    }, []);
  
    useEffect(() => {
      console.log(allPokemons);
    }, [allPokemons]);
  
    return (
      <>
        <div className="buttonContainer">
          <button onClick={() => getPokemons()}>Get Pokemons</button>
          <p>Total Pokemons: {allPokemons.length}</p>
          </div>
        <div className="pokemonContainer">
          <p></p>
        <div className="pokemonWrapper">
          {allPokemons.map((pokemon, index) =>
            <PokemonCard pokemon={pokemon} key={index}
            />     
            )}
            </div>
        </div>
      </>
    );
  }
  
  export default PokemonList;