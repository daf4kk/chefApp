import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { useLazyGetRecipeInfoQuery } from '../store/spoonacularApi/recipes.api';
import { RecipeInfo } from '../types/RecipeModels';
import spinner from '../imgs/spinner.svg';
import PageContainer from '../components/PageContainer';
const RecipeInfoPage = () => {
    const [fetchRecipe, {data, isLoading, isError}] = useLazyGetRecipeInfoQuery();
    const {id} = useParams();
    const [recipe, setRecipe] = useState<undefined | RecipeInfo>(undefined)
    useEffect(() => {
        if (id && !data){ // При mount делаем запрос к серверу и проверяем есть ли ответ от сервера (на ошибки, загрузку и тд)
            fetchRecipe(id)
        }else{  //Если уже получили ответ
            setRecipe(data);
        }
    }, [data])
    if (isLoading){
        return <img src = {spinner} alt = 'Loading...' className='m-auto mt-[20%]'></img>
    }
    return (
        <PageContainer>
            <div className='m-auto w-[1200px] flex flex-col justify-center items-center mt-4 mb-5'>
                <h1 className='font-semibold text-3xl text-slate-600'>{recipe?.title}</h1>
                <img src = {recipe?.image} alt = 'recipe-img' className = 'w-full h-[500px] rounded-xl mt-4'></img>
                <h1 className='text-2xl font-semibold text-semibold text-slate-600 mt-2'>Short information</h1>
                <div className='recipe-information w-[95%]  flex justify-between mt-5'>
                    {/* Диет может и не быть, так что вывести лучше одним образом */}
                    <ul className='page-info-ul diets'>
                       <li className='page-info-ul-li'>Gluten free : {recipe?.glutenFree ? <p className='page-info-p p-true'>true</p>: <p className='page-info-p p-false'>false</p>}</li>
                       <li className='page-info-ul-li'>Dairy free : {recipe?.dairyFree ? <p className='page-info-p p-true'>true</p>: <p className='page-info-p p-false'>false</p>}</li>
                       {/* <li className='page-info-ul-li'>Ketogenic : {recipe?.ketogenic ? <p className='page-info-p'>true</p>: <p className='page-info-p'>false</p>}</li>  */}
                       <li className='page-info-ul-li'>Vegan : {recipe?.vegan ? <p className='page-info-p p-true'>true</p>: <p className='page-info-p p-false'>false</p>}</li> 
                       <li className='page-info-ul-li'>Vegetarian : {recipe?.vegetarian ? <p className='page-info-p p-true'>true</p>: <p className='page-info-p p-false'>false</p>}</li> 
                    </ul>
                    <ul className='page-info-ul dish-type'>
                        <li className='page-info-ul-li'>Dishes :</li>
                       {recipe?.dishTypes ? recipe?.dishTypes.map((dish) => {
                            return (
                                <p className='page-info-ul-li text-orange-400' key = {dish}>{dish}</p>
                            )
                            
                       }) : <li className='page-info-ul-li'>Not specified</li>}
                    </ul>
                    <ul className='page-info-ul very-*'>
                       <li className='page-info-ul-li'>Very healthy : {recipe?.glutenFree ? <p className='page-info-p p-true'>true</p>: <p className='page-info-p p-false'>false</p>}</li>
                       <li className='page-info-ul-li'>Very popular : {recipe?.glutenFree ? <p className='page-info-p p-true'>true</p>: <p className='page-info-p p-false'>false</p>}</li>
                    </ul>                    
                </div>

                {/* https://spoonacular.com/cdn/ingredients_100x100/apple.jpg */}
                <h1 className='text-2xl font-semibold text-semibold text-slate-600 mt-4'>Ingredients</h1>
                <div className='ingredients grid grid-rows-2 grid-flow-col gap-7 mt-5'>
                       {recipe?.extendedIngredients.map((ingredient) => {
                            return (
                                // СДЕЛАТЬ ПОТОМ LINK (ССЫЛКИ НА PRODUCT PAGE)
                                <div className='flex items-center bg-green-200 p-2 rounded-xl shadow-md' key={ingredient.name}>
                                    <img src = {`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`} alt = 'ingredient' className='w-[70px] h-[70px]'></img>
                                    <h1 className='ml-2'>{ingredient.name}</h1>
                                    <p className='ml-2'>x{ingredient.amount}</p>
                                </div>
                            )
                       })}
                </div>
            </div>
        </PageContainer>
    );
};

export default RecipeInfoPage;