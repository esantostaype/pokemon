'use client'

import { useState } from 'react';
import Image from 'next/image';
import { Spinner } from '.';

interface Props {
    id: string;
    name: string;
    width: number;
    height: number;
}

export function PokemonImage({ id, name, width, height }: Props) {
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    return (
        <>
            {!imageLoaded && (
                <Spinner/>
            )}

            <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`}
                alt={ "Pokémon " + name }
                width={ width }
                height={ height }
                onLoad={ handleImageLoad }
            />
        </>
    );
}
