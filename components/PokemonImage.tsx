'use client'

import { useState } from 'react';
import Image from 'next/image';

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
        <div style={{ position: 'relative', width, height }}>
            {!imageLoaded && (
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Image width={ 24 } height={ 24 } src="/images/pulse.svg" alt="Loading" />
                </div>
            )}

            <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`}
                alt={"Pokémon " + name}
                width={width}
                height={height}
                onLoad={handleImageLoad}
            />
        </div>
    );
}
