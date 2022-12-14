import React, {useEffect, useState} from 'react';
import PageContainer from '../components/PageContainer';
import filterImg from '../imgs/filter.png';
import spinner from '../imgs/spinner.svg';
import { useLazySearchIngredientsQuery } from '../store/spoonacularApi/ingredients.api';
import { useDebounce } from '../hooks/debounce';
import IngredientItem from '../components/IngredientItem';
import { IngredientQuery } from '../types/CommonModels';
import IngredientsFilter from '../components/IngredientsFilter';
import IngredientModal from '../components/IngredientModal';
import {ModalProps} from '../types/CommonModels'
const IngredientsPage = () => {
    useEffect(() => {
        const links = document.querySelectorAll('.header-button');
        links.forEach((linkBtn) => {
            if (linkBtn.innerHTML === 'Ingredients'){
                linkBtn.classList.add('header-button_active')
            }
        })
    }, [])
    //В spooncularApi нельзя получить рандомное меню/продукты, в отличие от рецептов, так что придётся говорить пользователю ввести немного данных в input
    //Можно конечно ввести какие то начальные данные для запроса, но мне хотелось бы чтоб при обновлений пользователь каждый раз получал случайный продукт, а при статичном query
    //наш ответ будет один и тем же каждый раз
    const [fetchIngredients, {data, isLoading}] = useLazySearchIngredientsQuery()

    const [queryOptions, setQuery] = useState<IngredientQuery>({
        query: '',
        params: {
            minProteinPercent: null,
            maxProteinPercent: null,
            minFatPercent: null,
            maxFatPercent: null,
            minCarbsPercent: null,
            maxCarbsPercent: null,
            intolerances: null
        }
    })
    const [showFilter, setShowFilter] = useState<boolean>(false)
    const debounced:any = useDebounce(queryOptions)

    useEffect(() => {
        if (debounced.query.length !== 0){
            fetchIngredients(debounced)
            //Сборка применённых фильтров
            const paramsString:string = `${debounced.params.minProteinPercent && `Min protein percent = ${debounced.params.minProteinPercent}%`},${debounced.params.maxProteinPercent && `Max protein percent = ${debounced.params.minProteinPercent}%`},${debounced.params.minFatPercent && `Min fat percent = ${debounced.params.minProteinPercent}%`},${debounced.params.maxFatPercent && `Max fat percent = ${debounced.params.minProteinPercent}%`},${debounced.params.minCarbsPercent && `Min carbs percent = ${debounced.params.minProteinPercent}%`},${debounced.params.intolerances && `intolerances = ${debounced.params.minProteinPercent}%`},`;
            const paramsToArray = paramsString.split(',');
            let validatedParams:string[] = []
            paramsToArray.map((param) => {
                if (param !== 'null' && param !== undefined && param.length !== 0){
                    validatedParams.push(param)
                }
            })
            setParamsList(validatedParams)
        }
    }, [debounced]);

    const [showModal,setShowModal] = useState<null | ModalProps>(null);
    const [paramsList, setParamsList] = useState<string[] | null>(null)
    return (
            <PageContainer>
                <div className='mb-2'>
                <div className='w-[70vw] m-auto flex justify-center items-center relative mt-[20px]'>
                    <input spellCheck = {false} placeholder = 'Enter product name' className='content-input bg-input bg-no-repeat bg-position mt-0 '
                    onChange={e => setQuery({...queryOptions, query: e.target.value})}
                    ></input>
                    <img src = {filterImg} alt = 'filter' className='w-[40px] h-[40px] cursor-pointer ml-3'
                    onClick = {() => setShowFilter(!showFilter)}></img>
                    <IngredientsFilter showFilter = {showFilter} setShowFilter = {setShowFilter} queryOptions = {queryOptions} setQuery = {setQuery}/>
                </div>
                {paramsList && paramsList?.length > 0 ? 
                    <ul className='flex mt-3 items-center ml-[300px] '>
                        <h1 className='text-xl text-green-600'>Applied filters:</h1>
                        {paramsList.map((param) => {
                            if (param.length !== 0){
                                return <h1 className='ml-2 p-2 bg-green-500 rounded-xl text-white'>{param}</h1>
                            }
                        })}
                    </ul>
                    :
                    ''
                }
                <IngredientModal showModal={showModal} setShowModal = {setShowModal}/>
                <div className='flex flex-col h-[80%] w-[90vw] m-auto mt-10 p-3 relative'>
                    
                    {!data && !queryOptions.query ? <h1 className='text-2xl text-green-500'>Please, enter anything in input</h1> : ''}
                    {isLoading && <img src = {spinner} alt = 'Loading...' className='m-auto'></img>}
                    {data?.results.length !== 0 ?
                    data?.results.map((ingredient) => {
                        return (
                            <IngredientItem item = {ingredient} key = {ingredient.id} setShowModal = {setShowModal}/>
                        )
                    })
                    :
                    <h1 className='text-2xl text-amber-500'>Nothing found</h1>
                    }
                </div>
                </div>
            </PageContainer>
    );
};

export default IngredientsPage;