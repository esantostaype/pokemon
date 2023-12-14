import Link from "next/link";
import { HeartIcon, PokeballIcon } from "../components";

export const Header = () => {
    return (
        <header className="pokemon-app__header">
            <div className='pokemon-app__logo'>
                <Link href='/'>
                    <PokeballIcon height={ 32 } width={ 32 } fill="#fff"/>
                </Link>
            </div>
            <div className='pokemon-app__header__content'>
                <Link href='/favoritos' className="button ghost-button">
                    <HeartIcon height={ 24 } width={ 24 } fill="none"/>
                    <span>Favoritos</span>
                </Link>
            </div>
            <div className='pokemon-app__links'></div>
        </header>
    )
}