const initialState = {
    selectedPokemonId: null,
  };
  
  const pokemonReducer = (state = initialState, action:any) => {
    switch (action.type) {
      case "SET_SELECTED_POKEMON":
        return {
          ...state,
          selectedPokemonId: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default pokemonReducer;