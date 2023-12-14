import Image from "next/image";

interface Props {
    id: string,
    name: string,
    width: number,
    height: number
}

export function PokemonImage({ id, name, width, height } : Props ) {

    return (
        <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${ id }.png`}
            alt={ "Pokémon " + name }
            width={ width }
            height={ height }
        />
    )
}