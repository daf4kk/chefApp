import React, {useEffect, useState} from 'react';
import PageContainer from '../components/PageContainer';
import RecipeFilter from '../components/RecipeFilter';
import RecipeItem from '../components/RecipeItem';
import { useGetRandomRecipesQuery,useLazySearchRecipesQuery } from '../store/spoonacularApi/recipes.api';
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

    const {data:randomRecipes, isLoading:RandomRecipesLoading, error:fetchRandomError} = useGetRandomRecipesQuery('');
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
    
    const debounced:any= useDebounce(queryOptions)

    useEffect(() => {
        if (debounced.query.length >= 3){
            fetchRecipes(debounced)
        }
    }, [debounced])

    useEffect(() => {
        if (randomRecipes && !foundedRecipes){
            //Рандомные рецепты:
            setPriorityList(randomRecipes.recipes)
        }else if (foundedRecipes){
            //Найденные рецепты:
            setPriorityList(foundedRecipes.results)
        }
    })
    const [showFilter, setShowFilter] = useState(false)
    return (
        <PageContainer>
            <>
            <div className='w-[70vw] m-auto flex justify-center items-center relative mt-[20px]'>
                    <input spellCheck = {false} placeholder = 'Enter recipe name' className='content-input bg-input bg-no-repeat bg-position mt-0'
                    onChange = {e => setQuery({...queryOptions, query: e.target.value})}
                    ></input>
                    <img src = {filterImg} alt = 'filter' className='w-[40px] h-[40px] cursor-pointer ml-3'
                    onClick = {() => setShowFilter(!showFilter)}></img>
                    <RecipeFilter showFilter = {showFilter} setShowFilter = {setShowFilter} queryOptions = {queryOptions} setQuery = {setQuery}/>
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