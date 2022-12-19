import React, {useState,useEffect, Dispatch, SetStateAction} from 'react';
import { IIngredient } from '../types/IngredientModels';
import addFav from '../imgs/fav.png';
import unFav from '../imgs/unFav.png';
import {useActions} from '../hooks/actions';
import { UseAppSelector } from '../hooks/useAppSelector';
import {ModalProps} from '../types/CommonModels'

interface Props{
    item: IIngredient,
    setShowModal: Dispatch<SetStateAction<null | ModalProps>>
}
const ProductItem:React.FC<Props> = ({item,setShowModal}) => {
    const {addFavIngredient, removeFavIngredient} = useActions()
    const {favIngredients} = UseAppSelector(state => state.favIngredients)
    const [isFav, setIsFav] = useState(false)
    useEffect(() => {
        const checkForFav = favIngredients.some((ingredient) => ingredient.id === item.id);
        if (checkForFav){
            setIsFav(true)
        }else{
            setIsFav(false)
        }
    },[favIngredients])

    return (
        <div className='row-item h-auto'>
            <div className = 'flex items-center' onClick = {() => {
                setShowModal({id:item.id, imageUrl: `https://spoonacular.com/cdn/ingredients_100x100/${item.image}`})
             }}>
                <img src = {`https://spoonacular.com/cdn/ingredients_100x100/${item.image}`} alt = {item.name}></img>
                <h1 className='font-semi text-2xl  ml-2 '>{item.name}</h1>
            </div>
            {isFav ? 
                <button className='cursor-pointer w-[32px] h-[32px]'
                onClick = {() => {
                    removeFavIngredient(item)
                }}><img src = {unFav} alt = 'unFav'></img></button>
            :
            <button className='cursor-pointer w-[32px] h-[32px]'
            onClick = {() => {
                addFavIngredient(item)
            }}><img src = {addFav} alt = 'fav'></img></button>
            }
        </div>
    );
};

export default ProductItem;