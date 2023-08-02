import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { PokemonCard } from "./PokemonCard";

type Pokemon = {
  name: string;
  id: string;
};

function PokemonDailyFight() {
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [serverPokemon, setServerPokemon] = useState<Pokemon>();
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>();
  const PokeSelected = localStorage.getItem("selectedPokemon");

  function handlePokemonSelect(pokemon: any) {
    setSelectedPokemon(pokemon);
    localStorage.setItem("selectedPokemon", JSON.stringify(pokemon));
  }

  const getRandomNumber = () => {
    const randomHalf = Math.random();
    let random;
    if (randomHalf < 0.5) {
      random = Math.floor(randomHalf * (1010 - 0 + 1)) + 0;
    } else {
      random = Math.floor(randomHalf * (10263 - 10001 + 1)) + 10001;
    }
    return random;
  };
  const getPokemons = async () => {
    try {
      const pokemonIds = Array.from({ length: 4 }, () => getRandomNumber());
      const pokemonPromises = pokemonIds.map((id) =>
        axios.get("https://pokeapi.co/api/v2/pokemon/" + id)
      );
      const responses = await Promise.all(pokemonPromises);
      const pokemonsData = responses.map((response) => response.data);
      const lastPokemon = pokemonsData.pop();
      localStorage.clear();
      setSelectedPokemon(null);
      setAllPokemons(pokemonsData as Pokemon[]);
      localStorage.setItem("allPokemons", JSON.stringify(pokemonsData));
      setServerPokemon(lastPokemon);
      localStorage.setItem("serverPokemon", JSON.stringify(lastPokemon));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const storedPokemons = localStorage.getItem("allPokemons");
    const storedServerPokemon = localStorage.getItem("serverPokemon")
    if (storedPokemons && storedServerPokemon) {
      setAllPokemons(JSON.parse(storedPokemons) as Pokemon[]);
      setServerPokemon(JSON.parse(storedServerPokemon) as Pokemon);
    } else {
      getPokemons();
    }
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    if (now > midnight) {
      midnight.setDate(midnight.getDate() + 1);
    }

    const timeTilMidnight = midnight.getTime() - now.getTime();
    const getPokemonsAndSetInterval = () => {
      getPokemons();
      const nextMidnight = new Date(midnight.getTime() + 24 * 60 * 60 * 1000);
      const nextTimeTilMidnight = nextMidnight.getTime() - new Date().getTime();
      setTimeout(getPokemonsAndSetInterval, nextTimeTilMidnight);
    };
  
    setTimeout(getPokemonsAndSetInterval, timeTilMidnight);
    const selected = localStorage.getItem("selectedPokemon");
    if (selected) {
      setSelectedPokemon(JSON.parse(selected) as Pokemon);
    }
  }, []);
  return (
    <>
      <p>Pokemons refresh at midnight</p>
      <div className="pokemonFightWrapper">
      </div>
      {selectedPokemon ? (
        <div className="pokemonContainer">
          {serverPokemon && (
            <>
              <PokemonCard pokemon={serverPokemon}/>
              <PokemonCard pokemon={selectedPokemon}/>
            </>
          )}
        </div>
      ) : (
        <>
          <p>Please choose your fighter!</p>
          <div className="pokemonContainer">
            <div className="pokemonWrapper">
              {allPokemons.map((pokemon, index) => (
                <PokemonCard pokemon={pokemon} key={index} button={true} onSelect={handlePokemonSelect} />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default PokemonDailyFight;
