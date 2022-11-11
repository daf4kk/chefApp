import React, {useEffect, useState} from 'react';
import PageContainer from '../components/PageContainer';
import addFav from '../imgs/fav.png';
import unFav from '../imgs/unFav.png';
import spinner from '../imgs/spinner.svg';
import { useLazySearchProductsQuery } from '../store/spoonacularApi/products.api';
import { useDebounce } from '../hooks/debounce';
import RowItem from '../components/ProductItem';
const ProductsPage = () => {
    useEffect(() => {
        const links = document.querySelectorAll('.header-button');
        links.forEach((linkBtn) => {
            if (linkBtn.innerHTML === 'Products'){
                linkBtn.classList.add('header-button_active')
            }
        })
    }, [])
    //В spooncularApi нельзя получить рандомное меню/продукты, в отличие от рецептов, так что придётся говорить пользователю ввести немного данных в input
    //Можно конечно ввести какие то начальные данные для запроса, но мне хотелось бы чтоб при обновлений пользователь каждый раз получал случайный продукт, а при статичном query
    //наш ответ будет один и тем же каждый раз
    const [fetchProducts, {data, isLoading}] = useLazySearchProductsQuery()
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
        fetchProducts(debounced)
    }, [debounced])
    return (
            <PageContainer>
                <div className='mb-2'>
                <div className='w-[70vw] m-auto flex justify-center relative'>
                    <input spellCheck = {false} placeholder = 'Enter product name' className='content-input bg-input bg-no-repeat bg-position '
                    onChange={e => setQuery({...queryOptions, query: e.target.value})}
                    ></input>
                </div>
                <div className='flex flex-col h-[80%] w-[800px] m-auto mt-10 p-3 relative'>
                    {!data && !queryOptions.query ? <h1 className='text-2xl text-green-500'>Please, enter anything in input</h1> : ''}
                    {isLoading && <img src = {spinner} alt = 'Loading...' className='m-auto'></img>}
                    {/* {isError && <h1 className='text-red-500 text-2xl'>Server error, please, write to support</h1>} */}
                    {data?.products.map((product) => {
                        return (
                            <RowItem item = {product} key = {product.id}/>
                        )
                    })}
                </div>
                </div>
            </PageContainer>
    );
};

export default ProductsPage;