export const PokemonCard = ({ pokemon, index, button, onSelect }: any) => {
  return (
    <div className="pokemonCard" key={index}>
      <div className="top-info">
        <h1>{(pokemon.name).charAt(0).toUpperCase() + (pokemon.name).slice(1)}</h1>
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
      {button ? (
        <button onClick={()=> onSelect(pokemon)}>I choose this one!</button>
        
        ): (
        null
      )}
    </div>
  );
};
