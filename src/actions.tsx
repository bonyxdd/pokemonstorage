export const setSelectedPokemon = (pokemonId: number) => {
    return {
      type: "SET_SELECTED_POKEMON",
      payload: pokemonId,
    };
  };