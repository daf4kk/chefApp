import React, {useEffect, useState} from 'react';
import PageContainer from '../components/PageContainer';
import RecipeItem from '../components/RecipeItem';
import { useGetRandomRecipesQuery,useLazySearchRecipesQuery } from '../store/spoonacularApi/recipes.api';
import { useDebounce } from '../hooks/debounce';
import spinner from '../imgs/spinner.svg';
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
    interface IQuery{
        query: string,
        params: object
    }
    const [queryOptions, setQuery] = useState<IQuery>({
        query: '',
        params: {}
    })
    const debounced = useDebounce(queryOptions.query)

    useEffect(() => {
        if (debounced.length >= 3){
            fetchRecipes(debounced)
        }
    }, [debounced])
        
    return (
        <PageContainer>
            <>
            <div className='w-[70vw] m-auto flex justify-center relative'>
                    <input spellCheck = {false} placeholder = 'Enter recipe name' className='content-input bg-input bg-no-repeat bg-position'
                    onChange = {e => setQuery({...queryOptions, query: e.target.value})}
                    ></input>
            </div>
            <div className='items h-[80%] w-[1200px] m-auto mt-10 p-3 grid grid-cols-4 gap-5 '>
                {RandomRecipesLoading || fetchRecipesLoading ? <img src = {spinner} alt = 'Loading...' className='absolute top-[50%] left-[50%]'></img> : ''}
                {fetchRandomError || fetchError ? <h1 className='text-red-500 text-2xl'>Server error, please, write to support</h1>: ''}
                {randomRecipes && !foundedRecipes ? 
                randomRecipes?.recipes.map((recipe) => {
                    return (
                        <RecipeItem item = {recipe} key = {recipe.id}/>
                    )
                }) 
                : 
                foundedRecipes?.results.map((recipe) => {
                    return (
                        <RecipeItem item = {recipe} key = {recipe.id}/>
                    )
                }) }
            </div>
            </>
        </PageContainer>
    );
};

export default RecipesPage;