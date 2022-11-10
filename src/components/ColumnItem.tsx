import React from 'react';
import { IRecipe } from '../types/RecipeModels';
import addFav from '../imgs/fav.png';
import unFav from '../imgs/unFav.png';
import { IMenu } from '../types/MenuModels';

interface Props{
    item: IRecipe | IMenu
}
const RecipeItem:React.FC<Props> = ({item}) => {
    return (
        <div className='column-item flex flex-col relative'>
            <img src = {item.image} alt = 'recipe' className='p-2 rounded-xl w-[312px] h-[200px]'></img>
            <h1 className='p-2 h-[100px] text-ellipsis'>{item.title}</h1>
            <button className='cursor-pointer absolute right-2 bottom-2'><img src = {addFav} alt = 'fav'></img></button>
            {/* <button className='cursor-pointer absolute right-2 bottom-2'><img src = {unFav} alt = 'unFav'></img></button> */}
        </div>
    );
};

export default RecipeItem;