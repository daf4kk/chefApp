import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import { MenuItem} from '../types/MenuModels';
import {IngredientInfo} from '../types/IngredientModels';
import {ModalProps} from '../types/CommonModels'
import close from '../imgs/close.png';
import spinner from '../imgs/spinner.svg';
import { useLazyGetIngredientInfoQuery } from '../store/spoonacularApi/ingredients.api';
interface Props{
    showModal: null |  ModalProps,
    setShowModal: Dispatch<SetStateAction<null | ModalProps>>,
}

const IngredientModal:React.FC<Props> = ({showModal, setShowModal}) => {

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
        setShowModal(null)
        }    
    });

    const [fetchIngredient, {data, isLoading, isError}] = useLazyGetIngredientInfoQuery()
    const [item, setItem] = useState<IngredientInfo | null>(null)

    useEffect(() => {
        if (showModal?.id){ // При изменений props`ов компонента отправляем запрос на сервер
            fetchIngredient(showModal.id)
        }
    },[showModal])

    useEffect(() => {
        if (data){  // Если пришёл успех от сервера, то сохраняем в state. Нужно это для того, чтоб при закрытий pop up`a мы очищали старые данные с сервера и они не отображались пока идёт загрузка
            setItem(data)
        }
    },[data])
    
    
    return (
        <div className= {`modal-wrapper absolute top-0 left-0 cursor-pointer w-[100%] h-[100%] modal-bg rounded flex justify-center items-center duration-100 ${!showModal && 'unactive-modal'}`} 
        onClick = {(e:any) => {
            if (e.target.classList[0] === 'modal-wrapper'){
                setItem(null)   //Нужно очищать чтоб при открытий другого модального окна не отрисовывались старые данные
                setShowModal(null)
            }
        }}>
            <div className='modal w-[900px] h-[90%] bg-slate-100 rounded-xl relative z-30'>
                <div className = 'absolute top-3 right-3 cursor-pointer' onClick = {() => {
                    setItem(null)
                    setShowModal(null)
                    }}>
                    <img src = {close} alt = 'close' className='w-[40px] h-[40px] '></img>
                </div>
                
                <div className='content cursor-default'>
                    <img src = {showModal?.imageUrl} alt = {item?.name} className='w-[300px] h-[150px] m-auto mt-10 rounded'></img>
                    {item ? 
                    <div className='p-5'>
                            <h1 className='text-3xl text-slate-600 font-bold'>{item.name}</h1>
                            <div className='info-columns flex mt-4 justify-between'>
                                <div className='bg-green-200 shadow-lg w-[250px] h-[250px] p-3 rounded-xl mt-3 cursor-pointer'>
                                    <h1 className='text-lg text-slate-400'>Nutrients:</h1>
                                    <div className='overflow-auto h-[200px]'>
                                    {item?.nutrition.nutrients.map((nutrient) => {
                                        return (
                                            <p key = {nutrient.name} className='page-info-ul-li text-lg'>{nutrient.name}: <span className='text-green-500 ml-1'>{Math.round(nutrient.amount)}</span><span className='text-green-900'>{nutrient.unit}</span></p>
                                        )
                                    })}
                                    </div>
                                </div>
                                <div className='bg-green-200 shadow-lg w-[230px] h-[250px] p-3 rounded-xl mt-3 cursor-pointer'>
                                    <h1 className='text-lg text-slate-400'>Properties:</h1>
                                    <div className=' h-[200px]'>
                                    {item?.nutrition.properties.map((propertie) => {
                                        return (
                                            <p key = {propertie.name} className='page-info-ul-li text-lg'>{propertie.name}: <span className='text-green-500 ml-1'>{Math.round(propertie.amount)}</span> <span className='text-green-900'>{propertie.unit}</span></p>
                                        )
                                    })}
                                    </div>
                                </div>
                                <div className='bg-green-200 shadow-lg w-[250px] h-[250px] p-3 rounded-xl mt-3 cursor-pointer'>
                                    <h1 className='text-lg text-slate-400'>Flavonoids:</h1>
                                    <div className=' overflow-auto h-[200px]'>
                                    {item?.nutrition.flavonoids.map((flavonoid) => {
                                        return (
                                            <p key = {flavonoid.name} className='page-info-ul-li text-lg'>{flavonoid.name}: <span className='text-green-500 ml-1'>{Math.round(flavonoid.amount)}</span><span className='text-green-900'>{flavonoid.unit}</span></p>
                                        )
                                    })}
                                    </div>
                                </div>
                            </div>
                            <h1 className='text-2xl text-slate-600 mt-3'>Additionally</h1>
                            <div className='bg-green-200 shadow-lg w-[230px]  p-3 rounded-xl mt-3 cursor-pointer'>
                                <h1 className='page-info-ul-li text-lg'>Consistency: <span className='text-green-700 ml-1'> {item.consistency}</span></h1>
                                <div className='side-info'>
                                    <h1 className='page-info-ul-li text-lg'>Category:</h1>
                                    <ul className='ml-3 h-[150px] overflow-auto'>
                                        {item.categoryPath.length !== 0 ? 
                                        item.categoryPath.map((category) => {
                                            return <li key = {category} className='page-info-ul-li text-lg text-lime-500'>{category}</li>
                                        })
                                        :
                                        <h1 className='page-info-ul-li text-lg text-red-300'>Not specified</h1>
                                        }
                                    </ul>
                                </div>
                            </div>
                    </div>
                    :
                    <img src = {spinner} alt = 'Loading...' className='m-auto'></img>
                    }

                </div>
                
                
                
                
            </div>
        </div>
    );
};

export default IngredientModal;