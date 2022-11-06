import React from 'react';
import { useActions } from '../hooks/actions';
import { UseAppSelector } from '../hooks/useAppSelector';
import { IRecipe } from '../types/RecipeModels';

const HomePage = () => {
    const {favProducts} = UseAppSelector(state => state.favProducts)
    return (
        <div>
            <h1>Home</h1>
        </div>
    );
};

export default HomePage;