import React, {useState, useEffect, Dispatch, SetStateAction} from 'react';
import addFav from '../imgs/fav.png';
import unFav from '../imgs/unFav.png';
import { IMenu} from '../types/MenuModels';
import {ModalProps} from '../types/CommonModels'
import {useActions} from '../hooks/actions';
import { UseAppSelector } from '../hooks/useAppSelector';

interface Props{
    item: IMenu,
    setShowModal: Dispatch<SetStateAction<null | ModalProps>>
}
const MenuItem:React.FC<Props> = ({item, setShowModal}) => {
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
        <div className='menu-item column-item flex flex-col relative'>
            <div onClick = {() => {
                if (setShowModal){
                    setShowModal({id:item.id, imageUrl: item.image})
                }
            }}>
                <img src = {item.image} alt = {item.title} className='p-2 rounded-xl w-[312px] h-[200px]'>
                </img>
            </div>
                <h1 className='p-2 text-ellipsis text-lg'>{item.title}</h1>
                <h1 className='p-2 text-ellipsis text-blue-300 font-bold'>{item.restaurantChain}</h1>
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