'use client'

import { useAppSelector } from "@/store"
import { PokemonGrid } from "./"
import { useEffect, useState } from "react";
import { HeartIcon, HomeIcon } from '../components';
import Image from "next/image";
import Link from "next/link";

export const NoFavorites = () => {
    return (
        <div className="no-favorites">
            <div className="no-favorites__image">
                <Image src="/images/open-pokeball.svg" alt="No hay Favoritos" height={ 128 } width={ 128 } />
            </div>
            <h1 className="no-favorites__title">
                <HeartIcon height={ 48 } width={ 48 } fill="none" stroke="var(--primary-theme)" />
                <span>No hay favoritos</span>
            </h1>
            <p className="no-favorites__caption">Aun no has marcado ningún Pokémon como favorito :)</p>
                <div className='not-found__button'>
                    <Link href='/' className="button ghost-button">
                        <HomeIcon height={ 24 } width={ 24 } fill="var(--primary-theme)"/>
                        <span>Regresar al Home</span>
                    </Link>
                </div>
        </div>
    )
}

export const FavoritePokemons = () => {

    const favoritePokemons = useAppSelector( state => Object.values( state.pokemons.favorites ) );
    // const [ pokemons, setPokemons ] = useState( favoritePokemons );

    // useEffect(() => {
    //     setPokemons( favoritePokemons );
    // }, [ favoritePokemons ])
    

    return (
        <>
            {
                favoritePokemons.length === 0
                ? <NoFavorites/>
                : <PokemonGrid pokemons={ favoritePokemons } />
            }
        </>
    )
}
