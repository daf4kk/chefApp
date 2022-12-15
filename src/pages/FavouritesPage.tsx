import React, {useState} from 'react';
import PageContainer from '../components/PageContainer';
import removeFav from '../imgs/unfav.png';
import { UseAppSelector } from '../hooks/useAppSelector';
import RecipeItem from '../components/RecipeItem';
import MenuItem from '../components/MenuItem';
import IngredientItem from '../components/IngredientItem';
import { useActions } from '../hooks/actions';
import { ModalProps } from '../types/CommonModels';
import IngredientModal from '../components/IngredientModal';
import MenuModal from '../components/MenuModal';
const FavouritesPage = () => {
    const {favMenu} = UseAppSelector(state => state.favMenu);
    const {favRecipes} = UseAppSelector(state => state.favRecipes)
    const {favIngredients} = UseAppSelector(state => state.favIngredients)
    const {clearMenuState, clearIngredientsState, clearRecipeState} = useActions();


    const [showMenuModal, setShowMenuModal] = useState<null | ModalProps>(null)
    const [showIngredientModal, setShowIngredientModal] = useState<null | ModalProps>(null)

    return (
        <div>
            <PageContainer>
                <div className='items m-auto w-[1000px] h-[100%] flex items-center flex-col'> 
                        <h1 className='mt-4 text-xl p-2 bg-amber-400 rounded'>Favorites</h1>
                        <div className='recipes-content w-[100%]  h-auto  mt-3'>
                            <div className='flex justify-between items-center'>
                                <h1 className='text-2xl'>Recipes</h1>
                                <h1 className='text-xl cursor-pointer p-2 bg-red-300 rounded'
                                onClick={() => {
                                    clearRecipeState()
                                }}>Clear recipes</h1>
                            </div>
                            <div className='items grid grid-cols-4 gap-5 mt-2'>
                                {favRecipes.length === 0 && <h1 className='empty'>Recipes is empty</h1>}
                                {favRecipes.map((item) => {
                                    return (
                                        <RecipeItem item = {item} key = {item.id}/>
                                    )
                                })}       
                            </div>
                        </div>
                        <div className='menu-content w-[100%]  h-auto  mt-4'>
                        <div className='flex justify-between items-center'>
                                <h1 className='text-2xl'>Menu</h1>
                                <h1 className='text-xl cursor-pointer p-2 bg-red-300 rounded'
                                onClick={() => {
                                    clearMenuState()
                                }}>Clear menu</h1>
                            </div>
                            <div className='items grid grid-cols-4 gap-5 mt-2'>
                                <MenuModal showModal={showMenuModal} setShowModal = {setShowMenuModal}/>
                                {favMenu.length === 0 && <h1 className='empty'>Menu is empty</h1>}
                                {favMenu.map((item) => {
                                    return (
                                        <MenuItem item = {item} key = {item.id} setShowModal = {setShowMenuModal}/>
                                    )
                                })}       
                            </div>
                        </div>
                        <div className='peoduct-content w-[100%] h-auto mt-4 mb-5'>
                        <div className='flex justify-between items-center'>
                                <h1 className='text-2xl'>Ingredients</h1>
                                <h1 className='text-xl cursor-pointer p-2 bg-red-300 rounded'
                                onClick={() => {
                                    clearIngredientsState()
                                }}>Clear ingredients</h1>
                            </div>
                            <div className='flex flex-col mt-2'>
                                <IngredientModal showModal = {showIngredientModal} setShowModal = {setShowIngredientModal}/>
                                {favIngredients.length === 0 && <h1 className='empty'>Ingredients is empty</h1>}
                                {favIngredients.map((item) => {
                                    return (
                                        <IngredientItem item = {item} key = {item.id} setShowModal = {setShowIngredientModal}/>
                                    )
                                })}       
                            </div>
                        </div>
                </div>
            </PageContainer>
        </div>
    );
};

export default FavouritesPage;