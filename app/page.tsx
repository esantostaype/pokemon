import type { Metadata } from "next";
import { PokemonListResponse, SimplePokemon } from "@/interfaces";
import { PokemonGrid } from "../components";

export const metadata: Metadata = {
	title: "Pokémon App",
	description: "Explora el universo Pokémon. Descubre detalles, estadísticas y habilidades de cada Pokémon. ¡Conviértete en el mejor entrenador Pokémon con la información más precisa y actualizada.",
};

const getPokemons = async ( limit = 20, offset = 0 ):Promise<SimplePokemon[]> => {
    const response = await fetch( `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}` );
    
    const pokemonData:PokemonListResponse = await response.json();

    const pokemons = await Promise.all(
        pokemonData.results.map( async ( initialPokemon ) => {
            const pokemonResponse = await fetch( initialPokemon.url );
            const pokemon = await pokemonResponse.json();

            const simplePokemon: SimplePokemon = {
                id: pokemon.id,
                name: pokemon.name,
                types: pokemon.types,
                height: pokemon.height,
                weight: pokemon.weight
            };

            return simplePokemon;
        })
    );
    
    return pokemons;
}

export default async function HomePage() {

    const pokemons = await getPokemons( 151 );
  
	return (
        <PokemonGrid pokemons={ pokemons } />
    );

}
