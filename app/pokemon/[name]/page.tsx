import { Metadata } from "next";
import Image from "next/image"
import { FullPokemon, PokemonListResponse } from "@/interfaces";
import { Ability, Move } from '../../../interfaces/full-pokemon';
import { Height, PokemonAbilities, PokemonImage, Weight } from "@/components";
import { Progress } from "@/components";
import { notFound } from "next/navigation";
import { FavoriteButton } from '../../../components/FavoriteButton';

interface Props {
    params: { name: string }
}

export async function generateStaticParams() {
    const data:PokemonListResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`).then( res => res.json() );

    const staticPokemons = data.results.map( pokemon => ({
        name: pokemon.name,
    }));

    return staticPokemons.map( ({ name }) => ({
        name: name
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata>{
    try {
        const { name } = await getPokemon( params.name );
        return {
            title: `${ name } | Pokémon`,
            description: `Explora a fondo a ${ name }. Descubre sus estadísticas, habilidades, tipos y más en nuestra completa guía de Pokémon. Todo lo que necesitas saber sobre este fascinante Pokémon en un solo lugar.`,
        }        
    } catch (error) {
        return {
            title: "Pokémon No Encontrado",
            description: "No se pudo encontrar el Pokémon. Por favor ingrese un nombre existente o elija uno en el Homepage.",
        }  
        
    }
}

const getPokemon = async( name: string ): Promise<FullPokemon> => {

    try {
        const response = await fetch( `https://pokeapi.co/api/v2/pokemon/${ name }` );
    
        const pokemonData:FullPokemon = await response.json();
    
        const abilities = await Promise.all(
            pokemonData.abilities.map( async ( ability: Ability ) => {
                const abilityResponse = await fetch( ability.ability.url );
                const abilities: Ability = await abilityResponse.json();
                return abilities;
            })
        );
    
        const moves = await Promise.all(
            pokemonData.moves.map( async ( move: Move ) => {
                const moveResponse = await fetch( move.move.url );
                const moves: Move = await moveResponse.json();
                return moves;
            })
        );
    
        const pokemon: FullPokemon = {
            id: pokemonData.id,
            name: pokemonData.name,
            types: pokemonData.types,
            height: pokemonData.height,
            weight: pokemonData.weight,
            stats: pokemonData.stats,
            abilities,
            moves
        }
        
        return pokemon;
    } catch (error) {
        notFound();
    }

}

export default async function PokemonPage( { params }: Props ) {

    const pokemon = await getPokemon( params.name );

    return (
        <section className={`pokemon-app__detail fadeIn ${pokemon.types[0].type.name}`}>
            <div className="pokemon-app__detail__header">
                <div className="pokemon-app__detail__header__main">
                    <h1  className="pokemon-app__detail__title">{ pokemon.name }</h1>					
                    <ul className="pokemon-app__detail__types">
                        { pokemon.types.map( ( typeObject : any ) => {
                            return (
                                <li  className="pokemon-app__item__types__item" key={ typeObject.slot }>
                                    <Image
                                        src={`/images/${ typeObject.type.name }.svg`}
                                        alt={ typeObject.type.name }
                                        width={ 32 }
                                        height={ 32 }
                                    />
                                    { typeObject.type.name }
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div  className="pokemon-app__detail__info">
                    <div  className="pokemon-app__detail__info__item">
                        <Height height={ 24 } width={ 24 } fill='#fff' />
                        <span>Height</span>
                        <span className="pokemon-app__item__info__value">{ pokemon.height / 10 } M</span>
                    </div>
                    <div  className="pokemon-app__detail__info__item">
                        <Weight height={ 24 } width={ 24 } fill='#fff' />
                        <span>Weight</span>
                        <span className="pokemon-app__item__info__value">{ pokemon.weight / 10 } KG</span>
                    </div>
                </div>
            </div>
            <div className="pokemon-app__detail__body">
                <div className="pokemon-app__detail__sidebar">
                    <h4 className="pokemon-app__detail__subtitle" >Stats</h4>
                    <ul className="pokemon-app__detail__stats" >
                        { pokemon.stats.map( ( statObject : any ) => {
                            return (
                                <li className="pokemon-app__detail__stat" key={ statObject.stat.name }>
                                    <h3 className="pokemon-app__detail__stat__label">{ statObject.stat.name }: { statObject.base_stat }</h3>
                                    <Progress value={ statObject.base_stat }/>
                                </li>
                            )
                        })}
                    </ul>

                    <h4 className="pokemon-app__detail__subtitle" >Abilities</h4>
                    <div className="pokemon-app__detail__abilities" >
                        <PokemonAbilities abilities={ pokemon.abilities } />
                    </div>
                </div>
                <figure  className="pokemon-app__detail__image">
                    <div className="pokemon-app__detail__decoration"></div>
                    <PokemonImage
                        id = { pokemon.id }
                        name = { pokemon.name }
                        width = { 512 }
                        height = { 512 }
                    />
					<FavoriteButton pokemon={ pokemon } className="pokemon-app__detail__like" />
                </figure>
                <div  className="pokemon-app__detail__more-info">
                    <h4 className="pokemon-app__detail__subtitle" >Moves</h4>
                    <div className="pokemon-app__detail__more-info__content">
                        <table className='pokemon-app__detail__more-info__list'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th className='text-center'>Acc</th>
                                    <th className='text-center'>Power</th>
                                    <th className='text-center'>PP</th>
                                </tr>
                            </thead>
                            <tbody>
                                { pokemon.moves.map( ( moveObject : any ) => {
                                    return (
                                    <tr key={ moveObject.id }>
                                        <td>{ moveObject.name }</td>
                                        <td>
                                            <div className='pokemon-app__detail__more-info__list__type'>
                                                <span>
                                                    <Image
                                                        src={`/images/${ moveObject.type.name }.svg`}
                                                        alt={ moveObject.type.name }
                                                        width={ 16 }
                                                        height={ 16 }
                                                    />
                                                </span>
                                                <span>
                                                    { moveObject.type.name }
                                                </span>
                                            </div>
                                        </td>
                                        <td className='text-center'>{ moveObject.accuracy }%</td>
                                        <td className='text-center'>{ moveObject.power }</td>
                                        <td className='text-center'>{ moveObject.pp }</td>
                                    </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}