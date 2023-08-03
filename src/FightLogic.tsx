import { useEffect, useState } from "react";
import { PokemonCard } from "./PokemonCard";
import axios from "axios";

const FightLogic = ({ enemyPokemon, userPokemon }: any) => {
  const [enemyHp, setEnemyHp] = useState(Number);
  const [userMoves, setUserMoves] = useState([]);

    const getRandomMoves = async () => {
      console.log(userPokemon);
      if (userPokemon && userPokemon.moves.length > 0) {
        console.log("C");
      const shuffledMoves = userPokemon.moves
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);
      const movesPromises = shuffledMoves.map((moveUrl: any) =>
        axios.get(moveUrl.move.url)
      );
      const responses = await Promise.all(movesPromises);
      console.log(responses);
          localStorage.setItem("userMoves", JSON.stringify(responses));
          const storedUserMoves = localStorage.getItem("userMoves");
          if (storedUserMoves) {
              setUserMoves(JSON.parse(storedUserMoves));
            } 
    }
  };
  function handleFight() {
    setEnemyHp(userPokemon.stats[0].base_stat);
    console.log(userPokemon.moves[1].move.name);
  }

  useEffect(() => {
      const storedUserMoves = localStorage.getItem("userMoves");
    if (storedUserMoves) {
        setUserMoves(JSON.parse(storedUserMoves));
        console.log("A");
    } else {
        getRandomMoves();
        console.log("B");
    }
  }, []);
  return (
    <>
      <div className="pokemonWrapper">
        <PokemonCard pokemon={enemyPokemon} />
              <PokemonCard pokemon={userPokemon} />
              </div>
        <div className="moveWrap">
          {userMoves.map(({ data: moveData }: any, index: number) => (
            <div className="moveInfo" key={index}>
              <h2>
                {moveData.name.charAt(0).toUpperCase() +
                  moveData.name.replace("-", " ").slice(1)}
              </h2>
              {moveData.power && <p>Power: {moveData.power}</p>}
              {moveData.accuracy && <p>Accuracy: {moveData.accuracy}</p>}
              {moveData.effect_entries.length > 0 && (
                <p>
                  {moveData.effect_entries[0].effect.replace(
                    "$effect_chance%",
                    moveData.effect_chance + "%"
                  )}
                </p>
              )}
            </div>
          ))}
        </div>
      <button onClick={handleFight}>FIGHT</button>
      <p>{enemyHp}</p>
    </>
  );
};
export default FightLogic;
