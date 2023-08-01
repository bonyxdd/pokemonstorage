import { Link } from "react-router-dom";
export const PokemonCard = ({ pokemon, index }: any) => {
  return (
    <div className="pokemonCard" key={index}>
      <div className="top-info">
        <h1>{(pokemon.name).charAt(0).toUpperCase() + (pokemon.name).slice(1)}</h1>
        <p>{pokemon.weight}</p>
          </div>
          <div className="statWrapper">
          {pokemon.stats.map((statObject: any, index:number) => (
              <div className="statLine">
              <div>{statObject.stat.name}</div>
            <div>{statObject.base_stat}</div>
            </div>
          ))}
          </div>
      <img
        className="pokemonImg"
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
          />
          <Link to="/">View info...</Link>
    </div>
  );
};
