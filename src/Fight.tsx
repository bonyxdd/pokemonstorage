import { useEffect, useState } from "react";
import { PokemonCard } from "./PokemonCard";

type Pokemon = {
};

export const Fight= ()=>{

    const [serverPokemon, setServerPokemon] = useState<Pokemon>();

    useEffect(() => {
        const storedServerPokemon = localStorage.getItem("serverPokemon");
        if (storedServerPokemon) {
            setServerPokemon(JSON.parse(storedServerPokemon) as Pokemon);
        };
    }, []);
    
    return (
        <div>
            {serverPokemon && (
                <PokemonCard pokemon={serverPokemon} />
            )}
        </div>
    );
};