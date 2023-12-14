import { PokemonCard } from "."
import { SimplePokemon } from "@/interfaces"

interface Props {
    pokemons: SimplePokemon[];
}

export function PokemonGrid({ pokemons } : Props ) {

	return (
		<ul className="pokemon-app__list">
            { pokemons.map(( pokemon ) => {
                return (
                    <PokemonCard key={ pokemon.id } pokemon={ pokemon } />
                )
            })}
        </ul>
	)
}