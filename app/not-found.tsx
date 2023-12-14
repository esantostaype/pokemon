import Link from 'next/link'
import Image from "next/image";
import { HomeIcon } from '@/components';
 
export default function NotFound() {
    return (
        <section className="not-found fadeIn">
            <div className="not-found__content">
                <h1 className="not-found__title">
                    <span>4</span>
                    <Image
                        src="../images/open-pokeball.svg"
                        alt="404"
                        width="200"
                        height="200"
                    />
                    <span>4</span>
                </h1>
                <h2 className="not-found__subtitle">Página No Encontrada</h2>
                <p>No se pudo encontrar la Página. Por favor ingrese una URL existente.</p>
                <div className='not-found__button'>
                    <Link href='/' className="button ghost-button">
                        <HomeIcon height={ 24 } width={ 24 } fill="var(--primary-theme)"/>
                        <span>Regresar al Home</span>
                    </Link>
                </div>
            </div>
        </section>
    )
}