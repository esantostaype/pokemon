'use client'
import { useAppDispatch, useAppSelector } from "@/store";
import { HeartIcon } from "../components";
import { toggleFavorite } from "@/store/pokemonSlice";
import { SimplePokemon } from "@/interfaces";

interface Props {
    pokemon: SimplePokemon,
    className?: string
}

export const FavoriteButton = ({ pokemon, className } : Props) => {

	const isFavorite = useAppSelector( state => !!state.pokemons.favorites[ pokemon.id ] );
    const dispatch = useAppDispatch();

    const onToggle = () => {
        dispatch( toggleFavorite( pokemon ) );
    }

    return (
        <button className={ className } onClick={ onToggle }>
            { isFavorite
                ?<HeartIcon width={ 24 } height={ 24 } fill="var(--primary-theme)" stroke="var(--primary-theme)" />
                :<HeartIcon width={ 24 } height={ 24 } />
            }
        </button>
    )
}