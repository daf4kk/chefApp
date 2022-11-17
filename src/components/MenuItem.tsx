import React, {useState, useEffect} from 'react';
import addFav from '../imgs/fav.png';
import unFav from '../imgs/unFav.png';
import { IMenu } from '../types/MenuModels';
import {useActions} from '../hooks/actions';
import { UseAppSelector } from '../hooks/useAppSelector';

interface Props{
    item: IMenu
}
const MenuItem:React.FC<Props> = ({item}) => {
    const {addFavMenu, removeFavMenu} = useActions()
    const {favMenu} = UseAppSelector(state => state.favMenu)
    const [isFav, setIsFav] = useState(false)
    useEffect(() => {
        const checkForFav = favMenu.some((menu) => menu.id === item.id);
        if (checkForFav){
            setIsFav(true)
        }else{
            setIsFav(false)
        }
    },[favMenu])
    return (
        <div className='column-item flex flex-col relative'>
            <img src = {item.image} alt = 'recipe' className='p-2 rounded-xl w-[312px] h-[200px]'></img>
            <h1 className='p-2 h-[100px] text-ellipsis'>{item.title}</h1>
            {isFav ? 
                <button className='cursor-pointer absolute right-2 bottom-2'><img src = {unFav} alt = 'unFav'
                onClick = {() => {
                    removeFavMenu(item)
                }}></img></button>
            :
            <button className='cursor-pointer absolute right-2 bottom-2'
            onClick = {() => {
                addFavMenu(item)
            }}
            ><img src = {addFav} alt = 'fav'></img></button>
            }
        </div>
    );
};

export default MenuItem;