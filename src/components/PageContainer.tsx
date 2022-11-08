import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import logo from '../imgs/logo.png';
interface Props{
    children: JSX.Element
}
const PageContainer:React.FC<Props> = ({children}) => {
    useEffect(() => {
        const links = document.querySelectorAll('.header-button');
        links.forEach((linkBtn) => {
            linkBtn.classList.remove('header-button_active');
        })
    }, [])
    return (
        <div className='overflow-hidden'>
            <header className='w-[100vw] h-[80px] flex items-center border bg-home'>
                <a href = 'https://github.com/daf4kk' target= '_blank' rel = 'noreferrer'><img className='w-[50px] h-[50px] ml-5' src = {logo} alt = 'logo'></img></a>
                <nav className='list-none flex m-auto'>
                    <Link to = '/recipes' className='header-button header-button_active'>Recipes</Link>
                    <Link to = '/products' className='header-button'>Products</Link>
                    <Link to = '/menu' className='header-button'>Fast food menu</Link>
                </nav>
                <button className='mr-5 rounded bg-amber-400 p-1 transition-colors duration-200 hover:text-white hover:bg-amber-500'>Favourites</button>
            </header>
            <div className='content w-[100vw] h-[91.5vh] bg-emerald-200'>
                {children}
            </div>
        </div>
    );
};

export default PageContainer;