import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { useLazyGetRecipeInfoQuery, useLazyGetRecipeInstructionQuery } from '../store/spoonacularApi/recipes.api';
import { RecipeInfo, RecipeInstruction} from '../types/RecipeModels';
import spinner from '../imgs/spinner.svg';
import clock from '../imgs/clock.png';
import serving from '../imgs/serving.png';
import PageContainer from '../components/PageContainer';
import { ModalProps } from '../types/CommonModels';
import IngredientModal from '../components/IngredientModal';
import RecipePageIngredientRender from '../components/RecipePageIngredientRender';
const RecipeInfoPage = () => {
    const [fetchRecipe, {data, isLoading}] = useLazyGetRecipeInfoQuery();
    const [fetchInstruction, {data:instructionData}] = useLazyGetRecipeInstructionQuery();
    const {id} = useParams();
    const [recipe, setRecipe] = useState<undefined | RecipeInfo>(undefined)
    const [instruction, setInstruction] = useState<undefined | RecipeInstruction>(undefined)
    useEffect(() => {
        if (id && !data && !instructionData){ // При mount делаем запрос к серверу и проверяем есть ли ответ от сервера (на ошибки, загрузку и тд)
            fetchRecipe(id)  
        }else if (data){  //Если уже получили ответ
            setRecipe(data);
            fetchInstruction(data.id)
            if (instructionData){
                setInstruction(instructionData)
            }
        }
    }, [data, instructionData])
    const [showModal,setShowModal] = useState<null | ModalProps>(null)
    if (isLoading){
        return <img src = {spinner} alt = 'Loading...' className='m-auto mt-[20%]'></img>
    }
    return (
        <PageContainer>
            <div className='m-auto w-[80vw] flex flex-col justify-center items-center mt-4 mb-5' >
                <h1 className='font-semibold text-3xl text-slate-600'>{recipe?.title}</h1>
                <img src = {recipe?.image} alt = 'recipe-img' className = 'w-full h-[500px] rounded-xl mt-4'></img>
                <h1 className='text-2xl font-semibold text-semibold text-slate-600 mt-2'>Short information</h1>
                <div className='recipe-information w-[95%] mt-5 lg:flex lg:justify-between md:grid md:grid-cols-2 md:gap-2 sm:grid sm:gap-2'>
                    {/* Диет может и не быть, так что вывести лучше одним образом */}
                    <ul className='page-info-ul diets'>
                       <li className='page-info-ul-li'>Gluten free : {recipe?.glutenFree ? <p className='page-info-p p-true'>true</p>: <p className='page-info-p p-false'>false</p>}</li>
                       <li className='page-info-ul-li'>Dairy free : {recipe?.dairyFree ? <p className='page-info-p p-true'>true</p>: <p className='page-info-p p-false'>false</p>}</li>
                       {/* <li className='page-info-ul-li'>Ketogenic : {recipe?.ketogenic ? <p className='page-info-p'>true</p>: <p className='page-info-p'>false</p>}</li>  */}
                       <li className='page-info-ul-li'>Vegan : {recipe?.vegan ? <p className='page-info-p p-true'>true</p>: <p className='page-info-p p-false'>false</p>}</li> 
                       <li className='page-info-ul-li'>Vegetarian : {recipe?.vegetarian ? <p className='page-info-p p-true'>true</p>: <p className='page-info-p p-false'>false</p>}</li> 
                    </ul>
                    <ul className='page-info-ul dish-type '>
                        <li className='page-info-ul-li'>Dishes :</li>
                       {recipe?.dishTypes ? recipe?.dishTypes.map((dish) => {
                            return (
                                <p className='page-info-ul-li text-orange-400' key = {dish}>{dish}</p>
                            )
                            
                       }) : <li className='page-info-ul-li'>Not specified</li>}
                    </ul>
                    <ul className='page-info-ul very-* '>
                       <li className='page-info-ul-li'>Very healthy : {recipe?.glutenFree ? <p className='page-info-p p-true'>true</p>: <p className='page-info-p p-false'>false</p>}</li>
                       <li className='page-info-ul-li'>Very popular : {recipe?.glutenFree ? <p className='page-info-p p-true'>true</p>: <p className='page-info-p p-false'>false</p>}</li>
                    </ul>
                    <ul className='page-info-ul xl:mt-0'>
                        <li className='page-info-ul-li'><img src = {clock} alt = 'neededTime' className='mr-2'></img>{recipe?.readyInMinutes} minutes</li>
                        <li className='page-info-ul-li'><img src = {serving} alt = 'servings' className='mr-2'></img>For {recipe?.servings} persons</li>        
                    </ul>                    
                </div>

                {/* https://spoonacular.com/cdn/ingredients_100x100/apple.jpg */}
                <h1 className='text-2xl font-semibold text-semibold text-slate-600 mt-4'>Ingredients</h1>
                <div className='ingredients grid lg:grid-rows-4 md:grid-rows-6 sm:grid-rows-6  grid-flow-col gap-7 mt-5 au'>
                        <IngredientModal showModal={showModal} setShowModal = {setShowModal} />
                        {recipe?.extendedIngredients.map((ingredient,id) => {
                            return (
                                
                                <RecipePageIngredientRender ingredient = {ingredient} setShowModal = {setShowModal} key = {`${ingredient.name}${id}`}/>
                            )
                       })}
                </div>
                <h1 className='text-2xl font-semibold text-semibold text-slate-600 mt-4'>Steps:</h1>
                <div className='steps-wrapper'>
                    {instruction?.steps ? instruction?.steps?.map((step) => {
                        return (
                            <div className='mt-5 p-3 bg-green-200 shadow-md rounded-xl flex items-center' key = {`${step.step}`}>
                                <div className='w-[70px]'>
                                    <p className='p-2 bg-green-500 rounded-full w-[50px] h-[50px] text-center font-bold text-2xl text-slate-500'>{step.number}</p>
                                </div>
                                <div className='ml-2'>
                                    <h1 className='text-slate-600 text-sm font-thin'>We will need:</h1>
                                    <div className='flex items-center mt-1'>
                                    {step.ingredients.map((ingredient,id) => {
                                        return (
                                            // В будущем Link  
                                            <img src = {`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`} alt = 'img' className='w-[40px] h-[40px] cursor-pointer pl-2' key = {`${ingredient.image}${id+10}`}></img>
                                        )
                                    })}
                                    </div>
                                    <h1 className='text-slate-600 text-sm font-thin mt-1'>Prepare:</h1>
                                    <p className='pl-2 text-md text-neutral-700'>{step.step}</p>
                                </div>
                            </div>
                        )
                    }): 
                        <h1 className='text-lg text-red-400'>Cooking method not specified</h1>
                    }
                </div>
            </div>
        </PageContainer>
    );
};

export default RecipeInfoPage;