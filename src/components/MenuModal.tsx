import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import { MenuItem} from '../types/MenuModels';
import { ModalProps } from '../types/CommonModels'

import close from '../imgs/close.png';
import spinner from '../imgs/spinner.svg';
import { useLazyGetMenuInfoQuery } from '../store/spoonacularApi/menu.api';
interface Props{
    showModal: null | ModalProps,
    setShowModal: Dispatch<SetStateAction<null | ModalProps>>,
}

const MenuModal:React.FC<Props> = ({showModal, setShowModal}) => {

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
        setShowModal(null)
        }    
    });

    const [fetchMenu, {data, isLoading, error}] = useLazyGetMenuInfoQuery();
    const [item, setItem] = useState<MenuItem | null>(null)

    useEffect(() => {
        if (showModal?.id){ // При изменений props`ов компонента отправляем запрос на сервер
            fetchMenu(showModal.id)
        }
    },[showModal])

    useEffect(() => {
        if (data){  // Если пришёл успех от сервера, то сохраняем в state. Нужно это для того, чтоб при закрытий pop up`a мы очищали старые данные с сервера и они не отображались пока идёт загрузка
            setItem(data)
        }
    },[data])
    
    
    return (
        <div className= {`modal-wrapper absolute z-30 top-0 left-0 cursor-pointer w-[100%] h-[100%] modal-bg rounded flex justify-center items-center duration-100 ${!showModal && 'unactive-modal'}`} 
        onClick = {(e:any) => {
            if (e.target.classList[0] === 'modal-wrapper'){
                setItem(null)   //Нужно очищать чтоб при открытий другого модального окна не отрисовывались старые данные
                setShowModal(null)
            }
        }}>
            <div className='modal lg:w-[900px] md:w-[90vw] h-[90%] bg-slate-100 rounded-xl relative z-30'>
                <div className = 'absolute top-3 right-3 cursor-pointer' onClick = {() => {
                    setItem(null)
                    setShowModal(null)
                    }}>
                    <img src = {close} alt = 'close' className='w-[40px] h-[40px] '></img>
                </div>
                
                <div className='content cursor-default'>
                    <img src = {showModal?.imageUrl} alt = {item?.title} className='w-[500px] h-[200px] m-auto mt-10 rounded'></img>
                    {item && !isLoading ? 
                    <div className='p-3'>
                        <h1 className='text-2xl text-slate-600'>{item?.title}</h1>
                        <h1 className='text-2xl text-slate-600'>Chain: <span className='text-blue-300'>{item?.restaurantChain}</span></h1>
                        <div className='m-auto flex items-center justify-between w-[450px]'>
                        <div className='bg-green-200 shadow-lg w-[230px] h-[250px] p-3 rounded-xl mt-3 cursor-pointer'>
                            <h1 className='text-lg text-slate-400'>Nutrients:</h1>
                            <div className='overflow-auto h-[200px]'>
                            {item?.nutrition.nutrients.map((nutrient) => {
                                return (
                                    <p className='page-info-ul-li text-lg' key = {nutrient.name}>{nutrient.name} : {nutrient.amount}</p>
                                )
                            })}
                            </div>
                        </div>
                        <div className='bg-green-200 shadow-lg w-[200px] h-[250px] p-3 rounded-xl mt-3'>
                            <h1 className='text-lg text-slate-400'>Caloric breakdown:</h1>
                            <div className='h-[200px]'>
                                <p className='page-info-ul-li text-lg'>Protein {item.nutrition.caloricBreakdown.percentProtein}%</p>
                                <p className='page-info-ul-li text-lg'>Fat {item.nutrition.caloricBreakdown.percentFat}%</p>
                                <p className='page-info-ul-li text-lg'>Carbs {item.nutrition.caloricBreakdown.percentCarbs}%</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    :
                    <img src = {spinner} alt = 'Loading...' className='m-auto'></img>
                    }
                    {error as any && <h1 className='text-xl text-red-500'>Error loading card</h1>}
                </div>
                
                
                
                
            </div>
        </div>
    );
};

export default MenuModal;