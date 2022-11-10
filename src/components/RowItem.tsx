import React from 'react';
import { IProduct } from '../types/ProductModels';
import addFav from '../imgs/fav.png';
import unFav from '../imgs/unFav.png';
interface Props{
    item: IProduct
}
const RowItem:React.FC<Props> = ({item}) => {
    return (
        <div className='row-item'>
            <h1 className='font-semi text-2xl'>{item.title}</h1>
            <button className='cursor-pointer'><img src = {addFav} alt = 'fav'></img></button>
            {/* <button className='cursor-pointer absolute right-2 bottom-2'><img src = {unFav} alt = 'unFav'></img></button> */}
        </div>
    );
};

export default RowItem;