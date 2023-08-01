import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { PokemonCard } from "./PokemonCard";

type Pokemon = [];

function PokemonDailyFight() {
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const getRandomNumber = () => {
    const randomHalf = Math.random();
    let random;
    if (randomHalf < 0.5) {
      random = Math.floor(randomHalf * (1010 - 0 + 1)) + 0;
    } else {
      random = Math.floor(randomHalf * (10263 - 10001 + 1)) + 10001;
    }
    console.log(random);
    return random;
  };

  const getPokemons = async () => {
    try {
      const pokemonIds = Array.from({ length: 3 }, () => getRandomNumber());
      const pokemonPromises = pokemonIds.map((id) => axios.get("https://pokeapi.co/api/v2/pokemon/" + id))
      const responses = await Promise.all(pokemonPromises);
      const pokemonsData = responses.map((response) => response.data);
        setAllPokemons(pokemonsData as Pokemon[]);
        localStorage.setItem("allPokemons", JSON.stringify(pokemonsData));
      } catch (error) {
        console.error(error);
      }
  };
    useEffect(() => {
        const storedPokemons = localStorage.getItem("allPokemons");
        if (storedPokemons) {
          setAllPokemons(JSON.parse(storedPokemons) as Pokemon[])
        } else {
            getPokemons();
      }
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      const timeTilMidnight = midnight.getTime() - now.getTime();

        console.log(timeTilMidnight);
      const intervalId = setInterval(() => {
          getPokemons();
        }, timeTilMidnight)
        return () => clearInterval(intervalId)
  }, []);

  return (
    <>
      {/* <div className="buttonContainer">
          <button onClick={() => getPokemons()}>Get Pokemons</button>
          <p>Total Pokemons: {allPokemons.length}</p>
          </div> */}
      <div className="pokemonContainer">
        <div className="pokemonWrapper">
          {allPokemons.map((pokemon, index) => (
            <PokemonCard pokemon={pokemon} key={index} link={"fight"} />
          ))}
        </div>
      </div>
    </>
  );
}

export default PokemonDailyFight;
