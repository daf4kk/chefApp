import React, {useEffect, useState} from 'react';
import PageContainer from '../components/PageContainer';

const MenuPage = () => {
    useEffect(() => {
        const links = document.querySelectorAll('.header-button');
        links.forEach((linkBtn) => {
            if (linkBtn.innerHTML === 'Fast food menu'){
                linkBtn.classList.add('header-button_active')
            }
        })
    }, [])
    return (
        <PageContainer>
            <div className='w-[70vw] m-auto flex justify-center relative'>
                    <input spellCheck = {false} placeholder = 'Enter fast food name' className='content-input bg-input bg-no-repeat bg-right '></input>
            </div>
        </PageContainer>
    );
};

export default MenuPage;