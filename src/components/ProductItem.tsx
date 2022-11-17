import React, {useState,useEffect} from 'react';
import { IProduct } from '../types/ProductModels';
import addFav from '../imgs/fav.png';
import unFav from '../imgs/unFav.png';
import {useActions} from '../hooks/actions';
import { UseAppSelector } from '../hooks/useAppSelector';
interface Props{
    item: IProduct
}
const ProductItem:React.FC<Props> = ({item}) => {
    const {addFavProduct, removeFavProduct} = useActions()
    const {favProducts} = UseAppSelector(state => state.favProducts)
    const [isFav, setIsFav] = useState(false)
    useEffect(() => {
        const checkForFav = favProducts.some((product) => product.id === item.id);
        if (checkForFav){
            console.log('t')
            setIsFav(true)
        }else{
            setIsFav(false)
        }
    },[favProducts])
    return (
        <div className='row-item h-auto'>
            <h1 className='font-semi text-2xl w-[690px]'>{item.title}</h1>
            {isFav ? 
                <button className='cursor-pointer w-[32px] h-[32px]'
                onClick = {() => {
                    removeFavProduct(item)
                }}><img src = {unFav} alt = 'fav'></img></button>
            :
            <button className='cursor-pointer w-[32px] h-[32px]'
            onClick = {() => {
                addFavProduct(item)
            }}><img src = {addFav} alt = 'fav'></img></button>
            }
        </div>
    );
};

export default ProductItem;