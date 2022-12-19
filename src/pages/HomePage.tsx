import React from 'react';
import logo from '../imgs/logo.png';
import { Link } from 'react-router-dom';
const HomePage = () => {
    return (
        <div className='w-[100vm] h-[100vh] bg-home flex justify-center items-center'>
            <div className='w-[1000px] h-[500px]  flex flex-col items-center'>
                <a href = 'https://github.com/daf4kk' target= '_blank' rel = 'noreferrer'><img src = {logo} alt = 'logo' className='w-[150px] h-[150px] cursor-pointer mt-10'></img></a>
                <p className='text-stone-500 text-lg mt-10 w-[500px]'>On our site you will find thousands of recipes, all information about specific products, menus of large fast food chains</p>
                <div className='mt-10'>
                    <Link to = '/recipes' className='home-button text-2xl'>Recipes</Link>
                    <Link to = '/menu' className='home-button text-2xl'>Fast food menu</Link>
                    <Link to = '/ingredients' className='home-button text-2xl'>Ingredients</Link>
                    
                </div>
                <Link to = '/favourites' className='home-button m-auto p-2 text-md bg-amber-500 mt-[30px] hover:bg-amber-600 hover:text-white'>Favourites</Link>
            </div>
        </div>
    );
};

export default HomePage;