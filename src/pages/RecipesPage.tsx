import React, {useEffect, useState} from 'react';
import PageContainer from '../components/PageContainer';
const RecipesPage = () => {
    useEffect(() => {
        const links = document.querySelectorAll('.header-button');
        links.forEach((linkBtn) => {
            if (linkBtn.innerHTML === 'Recipes'){
                linkBtn.classList.add('header-button_active')
            }
        })
    }, [])
    return (
        <div>
            <PageContainer>
                <div className='w-[70vw] m-auto flex justify-center relative'>
                    <input spellCheck = {false} placeholder = 'Enter recipe name' className='content-input bg-input bg-no-repeat bg-right '></input>
                </div>
            </PageContainer>
        </div>
    );
};

export default RecipesPage;