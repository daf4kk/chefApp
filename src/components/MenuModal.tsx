import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import { MenuModalProps, MenuItem} from '../types/MenuModels';
import close from '../imgs/close.png';
import spinner from '../imgs/spinner.svg';
import { useLazyGetMenuInfoQuery } from '../store/spoonacularApi/menu.api';
interface Props{
    showModal: null | MenuModalProps,
    setShowModal: Dispatch<SetStateAction<null | MenuModalProps>>,
}

const MenuModal:React.FC<Props> = ({showModal, setShowModal}) => {

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
        setShowModal(null)
        }    
    });

    const [fetchMenu, {data, isLoading, isError}] = useLazyGetMenuInfoQuery();
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
        <div className= {`modal-wrapper cursor-pointer w-[inherit] h-[666px] modal-bg absolute z-20 ml-[-12px] mt-[-12px] rounded flex justify-center items-center duration-100 ${!showModal && 'unactive-modal'}`} 
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
                
                <div className='content'>
                    <img src = {showModal?.imageUrl} alt = '' className=''></img>
                    {isLoading ? 
                    <img src = {spinner} alt = 'Loading...'></img>
                    :
                    <div className=''>
                        <h1>{item?.title}</h1>
                    </div>
                    }

                </div>
                
                
                
                
            </div>
        </div>
    );
};

export default MenuModal;