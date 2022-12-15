import React, {useEffect, useState} from 'react';
import PageContainer from '../components/PageContainer';
import RecipeFilter from '../components/RecipeFilter';
import RecipeItem from '../components/RecipeItem';
import { useLazyGetRandomRecipesQuery,useLazySearchRecipesQuery } from '../store/spoonacularApi/recipes.api';
import { useDebounce } from '../hooks/debounce';
import spinner from '../imgs/spinner.svg';
import filterImg from '../imgs/filter.png';
import { IRecipe} from '../types/RecipeModels';
import { RecipeQuery } from '../types/CommonModels';
const RecipesPage = () => {
    useEffect(() => {
        const links = document.querySelectorAll('.header-button');
        links.forEach((linkBtn) => {
            if (linkBtn.innerHTML === 'Recipes'){
                linkBtn.classList.add('header-button_active')
            }
        })
    }, [])

    const [fetchRandomRecipes, {data:randomRecipes, isLoading:RandomRecipesLoading, error:fetchRandomError}] = useLazyGetRandomRecipesQuery();
    const [fetchRecipes, {data:foundedRecipes, isLoading:fetchRecipesLoading, error:fetchError}] = useLazySearchRecipesQuery()

    const [priorityList, setPriorityList] = useState<null | IRecipe[]>(null)
    const [queryOptions, setQuery] = useState<RecipeQuery>({
        query: '',
        params: {
            diet: [],
            type: [],
            maxReadyTime: null
        }
    })
    const [paramsList, setParamsList] = useState<string[] | null>(null)
    
    const debounced:any= useDebounce(queryOptions)
    useEffect(() => {
        if (debounced.query.length >= 3){
            fetchRecipes(debounced)
        }else if(debounced.query.length < 3 && (debounced.params.diet.length > 0 || debounced.params.type.length > 0)){ //Рандомные рецепты с tags (указываем диету и тип если имеются)
            const paramsString:string = `${debounced.params.diet},${debounced.params.type}`;
            setParamsList(paramsString.split(','))
            fetchRandomRecipes(paramsString)
        }else if (debounced.query.length === 0){
            fetchRandomRecipes('')  //Рандомные рецепты при mount
        }
    }, [debounced])

    useEffect(() => {
        if (randomRecipes && !foundedRecipes){
            //Рандомные рецепты:
            setPriorityList(randomRecipes.recipes)
        }
        else if (foundedRecipes && debounced.query.length >= 3){
            //Найденные рецепты:
            setPriorityList(foundedRecipes.results)
        }
        else if (debounced.query.length < 3 && randomRecipes){
            setPriorityList(randomRecipes.recipes)
        }
    })
    const [showFilter, setShowFilter] = useState(false)
    return (
        <PageContainer>
            <>
            <div className='w-[50vw] m-auto flex flex-col relative mt-[20px]'>
                    <div className='flex justify-center items-center'>
                        <input spellCheck = {false} placeholder = 'Enter recipe name' className='content-input bg-input bg-no-repeat bg-position mt-0'
                        onChange = {e => setQuery({...queryOptions, query: e.target.value})}
                        ></input>
                        <img src = {filterImg} alt = 'filter' className='w-[40px] h-[40px] cursor-pointer ml-3'
                        onClick = {() => setShowFilter(!showFilter)}></img>
                        <RecipeFilter showFilter = {showFilter} setShowFilter = {setShowFilter} queryOptions = {queryOptions} setQuery = {setQuery} setParamsList = {setParamsList}/>
                    </div>
                    
                    {paramsList && 
                    <ul className='flex mt-3 items-center '>
                    <h1 className='text-xl text-green-600'>Applied filters:</h1>
                    {paramsList.map((param) => {
                        if (param.length !== 0){
                            return <h1 className='ml-2 p-2 bg-green-500 rounded-xl text-white'>{param}</h1>
                        }
                    })}
                </ul>
                    }
            </div>
            <div className='items h-[80%] w-[1200px] m-auto mt-10 p-3 grid grid-cols-4 gap-5 '>
                {RandomRecipesLoading === true || fetchRecipesLoading === true ? <img src = {spinner} alt = 'Loading' className='absolute top-[50%] left-[50%]'></img> : ''}
                {priorityList?.length !== 0 ? 
                priorityList?.map((item) => {     
                    return (
                        <RecipeItem item = {item} key = {`${item.id}1`}/>
                    )
                })
                :
                <h1 className='text-2xl text-amber-500'>Nothing found</h1>
                }
                
            </div>
            </>
        </PageContainer>
    );
};

export default RecipesPage;