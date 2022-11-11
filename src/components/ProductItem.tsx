import React from 'react';
import { IProduct } from '../types/ProductModels';
import addFav from '../imgs/fav.png';
import unFav from '../imgs/unFav.png';
import {useActions} from '../hooks/actions';
interface Props{
    item: IProduct
}
const ProductItem:React.FC<Props> = ({item}) => {
    const {addFavProduct, removeFavProduct} = useActions()
    return (
        <div className='row-item h-auto'>
            <h1 className='font-semi text-2xl w-[690px]'>{item.title}</h1>
            <button className='cursor-pointer w-[32px] h-[32px]'
            onClick = {() => {
                addFavProduct(item)
            }}><img src = {addFav} alt = 'fav'></img></button>
            {/* <button className='cursor-pointer absolute right-2 bottom-2'><img src = {unFav} alt = 'unFav'></img></button> */}
        </div>
    );
};

export default ProductItem;