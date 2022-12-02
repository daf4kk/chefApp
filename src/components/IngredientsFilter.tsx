import React, {Dispatch, SetStateAction} from 'react';

import close from '../imgs/close.png';
import { IngredientParams, IngredientQuery } from '../types/CommonModels';

interface Props{
    showFilter: boolean,
    setShowFilter: Dispatch<SetStateAction<boolean>>,
    queryOptions: IngredientQuery,
    setQuery: Dispatch<SetStateAction<IngredientQuery>>
}

const IngredientsFilter:React.FC<Props> = ({showFilter, setShowFilter, queryOptions, setQuery}) => {

    const defaultParams:IngredientParams = {
        minProteinPercent: null,
        maxProteinPercent: null,
        minFatPercent: null,
        maxFatPercent: null,
        minCarbsPercent: null,
        maxCarbsPercent: null,
        intolerances: null 
    }

    const setDefaultParams = () =>{
        const inputs = document.querySelectorAll('.filter-wrapper input');
        inputs.forEach((input:any) => {
            input.value = ''
        });
        setQuery({
            ...queryOptions,
            params: {
                ...defaultParams
            }
        })
    }

    const collectParams = () => {
        const paramsCopy:IngredientParams = {
            ...defaultParams
        }

        //Верхние колонки   
        const inputs = document.querySelectorAll('.filter input');
        inputs.forEach((input:any) => { 
            if (input.value && Number(input.value) && Number(input.value) < 101){    //Проверка на валидацию, если не проходит, то игнорируем
                paramsCopy[input.id as keyof IngredientParams] = Number(input.value)
            }
        })

        //Нижняя колонка со списком исключений
        const pattern = ['dairy', 'egg', 'gluten', 'grain' , 'peanut', 'seafood','sesame','shellfish', 'soy','sulfite', 'wheat']
        const ingoreInput = (document.querySelector('.ignore input') as HTMLInputElement).value;
        let validatedIntolerancesString:string = '';
        let ignore:string[] = ingoreInput.replace(/ /g, '').split(','); //Удаляем все пробелы, после чего делаем массив элементов по запятой
        ignore.forEach((element) => {
            if (pattern.includes(element.toLowerCase())){   //Если у нас в паттерне содержится перебираемый элемент массива, то закидываем его в нашу params строку
                validatedIntolerancesString += `${element},`
            }
        })
        paramsCopy.intolerances = validatedIntolerancesString
        
        setQuery({
            ...queryOptions,
            params: {
                ...paramsCopy
            }
        })
    }

    return (
        <div className={`filter-wrapper absolute bg-green-100 shadow-xl rounded-xl w-[420px] h-auto z-10 right-[-30px] top-[0px] p-5 duration-300 ${showFilter ? 'active-modal': 'unactive-filter'}`}>
            <div className= 'filter grid grid-cols-2 gap-5'>
                        <img src = {close} alt = 'close filter' onClick = {() => setShowFilter(!showFilter)} className = 'w-[30px] absolute right-3 top-2 cursor-pointer'></img>
                        <ul className='p-2 bg-green-300 rounded-xl transition-colors duration-300 hover:bg-green-400' id = 'min'>
                            <h2 className='page-info-ul-li text-2xl'>Minimum</h2>
                            <div className='p-2  rounded-xl w-auto'>
                                <h2 className='page-info-ul-li text-xl'>Min protein percent</h2>
                                <input className='p-2 border-none outline-none h-[30px] w-[100px] rounded text-sm' id = 'minProteinPercent'></input>
                            </div>
                            <div className='p-2  rounded-xl w-auto'>
                                <h2 className='page-info-ul-li text-xl'>Min fat percent</h2>
                                <input className='p-2 border-none outline-none h-[30px] w-[100px] rounded text-sm' id = 'minFatPercent'></input>
                            </div>
                            <div className='p-2  rounded-xl w-auto'>
                                <h2 className='page-info-ul-li text-xl'>Min carbs percent</h2>
                                <input className='p-2 border-none outline-none h-[30px] w-[100px] rounded text-sm' id = 'minCarbsPercent'></input>
                            </div>
                        </ul>

                        <ul className='p-2 bg-green-300 rounded-xl transition-colors duration-300 hover:bg-green-400' id = 'max'>
                        <h2 className='page-info-ul-li text-2xl'>Maximum</h2>
                            <div className='p-2  rounded-xl w-auto'>
                                <h2 className='page-info-ul-li text-xl'>Max protein percent</h2>
                                <input className='p-2 border-none outline-none h-[30px] w-[100px] rounded text-sm' id = 'maxProteinPercent'></input>
                            </div>
                            <div className='p-2  rounded-xl w-auto'>
                                <h2 className='page-info-ul-li text-xl'>Max fat percent</h2>
                                <input className='p-2 border-none outline-none h-[30px] w-[100px] rounded text-sm' id = 'maxFatPercent'></input>
                            </div>
                            <div className='p-2  rounded-xl w-auto'>
                                <h2 className='page-info-ul-li text-xl'>Max carbs percent</h2>
                                <input className='p-2 border-none outline-none h-[30px] w-[100px] rounded text-sm' id = 'maxCarbsPercent' ></input>
                            </div>
                        </ul>
                    </div>
                    <ul className='ignore p-2 bg-green-300 rounded-xl transition-colors duration-300 hover:bg-green-400 mt-5'>
                            <h2 className='page-info-ul-li text-2xl'>Intolerances</h2>
                            <input className='mt-2 p-2 border-none outline-none h-[40px] w-[100%] rounded-lg text-xl' placeholder = 'Enter products via ,'></input>
                        </ul>
                    <div className='flex justify-between mt-5' >
                        
                        <button className = 'w-[170px] p-3 text-2xl bg-red-400 rounded-xl shadom-lg text-white transition-colors duration-300 hover:bg-red-600 hover:text-stone-600' onClick = {() => {
                            setDefaultParams()
                        }}>Reset</button>
                        <button className = 'w-[170px] p-3 text-2xl bg-amber-300 rounded-xl shadom-lg text-white  transition-colors duration-300 hover:bg-amber-500  ' onClick = {() => {
                                collectParams();
                        }}>Apply</button>
                    </div>
        </div>
                    
    );
};

export default IngredientsFilter;