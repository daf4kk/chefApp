import React, {useEffect, useState} from 'react';
import PageContainer from '../components/PageContainer';
import { useLazySearchMenuQuery } from '../store/spoonacularApi/menu.api';
import { useDebounce } from '../hooks/debounce';
import spinner from '../imgs/spinner.svg';
import MenuItem from '../components/MenuItem';
import { MenuQuery } from '../types/CommonModels';
import { ModalProps } from '../types/CommonModels';
import MenuModal from '../components/MenuModal';
const MenuPage = () => {
    useEffect(() => {
        const links = document.querySelectorAll('.header-button');
        links.forEach((linkBtn) => {
            if (linkBtn.innerHTML === 'Fast food menu'){
                linkBtn.classList.add('header-button_active')
            }
        })
    }, [])
    //В spooncularApi нельзя получить рандомное меню/продукты, в отличие от рецептов, так что придётся говорить пользователю ввести немного данных в input
    //Можно конечно ввести какие то начальные данные для запроса, но мне хотелось бы чтоб при обновлений пользователь каждый раз получал случайный продукт, а при статичном query
    //наш ответ будет один и тем же каждый раз
    const [fetchMenu, {data, isLoading}] = useLazySearchMenuQuery();
    const [queryOptions, setQuery] = useState<MenuQuery>({
        query: '',
        params: null
    })
    const debounced:any = useDebounce(queryOptions)
    useEffect(() => {
        if (debounced.query.length !== 0){
            fetchMenu(debounced)
        }
    }, [debounced])
    const [showModal,setShowModal] = useState<null | ModalProps>(null)
    return (
        <div>
            <PageContainer>
            <div>
                <div className='w-[70vw] m-auto flex justify-center items-center relative mt-[20px]'>
                        <input spellCheck = {false} placeholder = 'Enter menu name' className='content-input bg-input bg-no-repeat bg-position mt-0'
                        onChange = {e => setQuery({...queryOptions, query: e.target.value})}
                        ></input>
                        
                </div>
                <MenuModal showModal = {showModal} setShowModal = {setShowModal}/>
                <div className={`items h-[80%] w-[90vw] m-auto mt-10 p-3 grid grid-cols-5 gap-5  ${showModal ? 'opacity-25' : 'opacity-100'}`}>
                    {!data && !queryOptions.query  ? <h1 className='text-2xl text-green-500'>Please, enter anything in input</h1> : ''}
                    {isLoading && <img src = {spinner} alt = 'Loading...' className='absolute left-[50%] top-[50%]'></img>}
                    {!isLoading && data && data.menuItems.length === 0 && debounced.query.length > 0}
                    {data?.menuItems.map((item,id) => {
                        return (
                            <MenuItem item = {item} key = {`${item.id}${id}`} setShowModal = {setShowModal}/>
                        )
                    })}
                </div>
            </div>
         </PageContainer>
        </div>
    );
};

export default MenuPage;