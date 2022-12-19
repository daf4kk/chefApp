import React, {Dispatch, SetStateAction} from 'react';
import {RecipePageIngredient } from '../types/IngredientModels';
import {ModalProps} from '../types/CommonModels';
interface Props{
    ingredient: RecipePageIngredient,
    setShowModal: Dispatch<SetStateAction<null | ModalProps>>
}
const RecipePageIngredientRender:React.FC<Props> = ({ingredient, setShowModal}) => {
    return (
        <div className='flex items-center cursor-pointer bg-green-200 p-2 rounded-xl shadow-md'
            onClick = {() => {
                setShowModal({id: ingredient.id, imageUrl: `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`})
            }}> 
            <img src = {`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`} alt = {ingredient.name} className='w-[70px] h-[70px]'></img>
            <div className='ml-2'>
                <h1 className='text-neutral-700 lg:text-xl md:text-lg'>{ingredient.name}</h1>
                <p className='text-neutral-700 lg:text-xl md:text-lg'>x{Math.round((ingredient.amount) * 10)/10} {ingredient.unit}</p>
            </div>
        </div>
    );
};

export default RecipePageIngredientRender;