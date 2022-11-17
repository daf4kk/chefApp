import React, {useState, useEffect} from 'react';
import { IRecipe } from '../types/RecipeModels';
import addFav from '../imgs/fav.png';
import unFav from '../imgs/unFav.png';
import {useActions} from '../hooks/actions';
import { UseAppSelector } from '../hooks/useAppSelector';
import {Link} from 'react-router-dom';

interface Props{
    item: IRecipe
}
const RecipeItem:React.FC<Props> = ({item}) => {
    
    const {addFavRecipe, removeFavRecipe} = useActions()
    const [isFav, setIsFav] = useState(false)
    const {favRecipes} = UseAppSelector(state => state.favRecipes)
    useEffect(() => {
        const checkForFav = favRecipes.some((recipe) => recipe.id === item.id);
        if (checkForFav){
            setIsFav(true)
        }else{
            setIsFav(false)
        }
    },[favRecipes])
    return (
        <div className='column-item flex flex-col relative'>
            <Link to = {`/recipes/${item.id}`}>
                <img src = {item.image} alt = 'recipe' className='p-2 rounded-xl w-[312px] h-[200px]'></img>
                <h1 className='p-2 h-[100px] text-ellipsis'>{item.title}</h1>
            </Link>
            
            {isFav ? 
                <button className='cursor-pointer absolute right-2 bottom-2'><img src = {unFav} alt = 'unFav'
                onClick = {() => {
                    removeFavRecipe(item)
                }}></img></button>
            :
            <button className='cursor-pointer absolute right-2 bottom-2'
            onClick = {() => {
                addFavRecipe(item)
            }}
            ><img src = {addFav} alt = 'fav'></img></button>
            }
        </div>
    );
};

export default RecipeItem;