import React, {Dispatch, SetStateAction} from 'react';

import close from '../imgs/close.png';
import { RecipeParams, RecipeQuery} from '../types/CommonModels';

interface Props{
    showFilter: boolean,
    setShowFilter: Dispatch<SetStateAction<boolean>>,
    queryOptions: RecipeQuery,
    setQuery: Dispatch<SetStateAction<RecipeQuery>>,
    setParamsList: Dispatch<SetStateAction<string[] | null>>
}

const Filter:React.FC<Props> = ({showFilter, setShowFilter, queryOptions, setQuery,setParamsList}) => {
    const defaultParams = {
        type: [],
        diet: [],
        maxReadyTime: null
    }

    const setDefaultParams = () => {

        const inputs = document.querySelectorAll('.filter input');
        inputs.forEach((input:any) => { 
            input.checked = false
        });
        (document.getElementById('readyTime') as HTMLInputElement).value = '';
        setParamsList(null)
        setQuery({
            ...queryOptions,
            params: {
                ...defaultParams
            }
        })
    }


    const collectParams = () => {
        const paramsCopy:RecipeParams = {
            ...defaultParams
        }
        const inputs = document.querySelectorAll('.filter input');
        inputs.forEach((input:any) => { 
            if(input.checked ){
                if (input.parentElement.parentElement.id === 'diet'){
                    paramsCopy.diet = [...paramsCopy.diet, input.name]
                }else{
                    paramsCopy.type = [...paramsCopy.type, input.name]
                }
            }
        })
        const time = document.getElementById('readyTime') as HTMLInputElement;
        if (time.value && Number(time?.value)) {
            paramsCopy.maxReadyTime = Number(time?.value);
        }
        setQuery({
            ...queryOptions,
            params: {
                ...paramsCopy
            }
        })
    }

    return (
        <div className={`filter grid grid-cols-2 gap-5 absolute bg-green-100 shadow-xl rounded-xl w-[400px] h-auto z-10 right-[-10px] top-[0px] p-5 duration-300 ${showFilter ? 'active-modal': 'unactive-filter'} `}>
                        <img src = {close} alt = 'close filter' onClick = {() => setShowFilter(!showFilter)} className = 'w-[30px] absolute right-3 top-2 cursor-pointer'></img>
                        
                        <ul className='p-2 bg-green-300 rounded-xl transition-colors duration-300 hover:bg-green-400' id = 'diet'>
                            <h2 className='page-info-ul-li text-2xl'>Diet</h2>
                            <div className='flex items-center'>
                                <label htmlFor = 'gluten free' className='text-lg'>Gluten free</label>
                                <input type = 'checkbox' name='gluten free' className='ml-2 w-[15px] h-[15px]'></input>
                            </div>
                            <div>
                                <label htmlFor = 'dairy free' className='text-lg'>Dairy free</label>
                                <input type = 'checkbox' name = 'dairy free' className='ml-2 w-[15px] h-[15px]'></input>
                            </div>
                            <div>
                                <label htmlFor = 'vegan' className='text-lg'>Vegan</label>
                                <input type = 'checkbox' name = 'vegan' className='ml-2 w-[15px] h-[15px]'></input>
                            </div>
                            <div>
                                <label htmlFor = 'vegetarian' className='text-lg'>Vegetarian</label>
                                <input type = 'checkbox' name = 'vegetarian' className='ml-2 w-[15px] h-[15px]'></input>
                            </div>

                        </ul>

                        <ul className='p-2 bg-green-300 rounded-xl transition-colors duration-300 hover:bg-green-400' id = 'dishes'>
                            <h2 className='page-info-ul-li text-2xl'>Dishe</h2>
                            <div className='flex items-center'>
                                <label htmlFor = 'lunch' className='text-lg'>Lunch</label>
                                <input type = 'checkbox' name='lunch' className='ml-2 w-[15px] h-[15px]'></input>
                            </div>
                            <div>
                                <label htmlFor = 'main course' className='text-lg'>Main course</label>
                                <input type = 'checkbox' name = 'main course' className='ml-2 w-[15px] h-[15px]'></input>
                            </div>
                            <div>
                                <label htmlFor = 'main dish' className='text-lg'>Main dish</label>
                                <input type = 'checkbox' name = 'main dish' className='ml-2 w-[15px] h-[15px]'></input>
                            </div>
                            <div>
                                <label htmlFor = 'dinner' className='text-lg'>Dinner</label>
                                <input type = 'checkbox' name = 'dinner' className='ml-2 w-[15px] h-[15px]'></input>
                            </div>
                        </ul>
                        <div className='p-2 bg-green-300 rounded-xl w-auto transition-colors duration-300 hover:bg-green-400'>
                            <h2 className='page-info-ul-li text-xl'>Max ready time in minutes</h2>
                            <input className='p-2 border-none outline-none h-[30px] w-[100px] rounded text-sm' id = 'readyTime'></input>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <button className = 'p-3 text-2xl bg-red-400 rounded-xl shadom-lg text-white transition-colors duration-300 hover:bg-red-600 hover:text-stone-600' onClick = {() => {
                                setDefaultParams()
                            }}>Reset</button>
                            <button className = 'p-3 text-2xl bg-amber-300 rounded-xl shadom-lg text-white transition-colors duration-300 hover:bg-amber-500 ' onClick = {() => {
                                    collectParams();
                            }}>Apply</button>
                        </div>
                    </div>
                    
    );
};

export default Filter;