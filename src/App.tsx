import React from 'react';
import {Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import RecipesPage from './pages/RecipesPage';
import RecipeInfoPage from './pages/RecipeInfoPage';
import IngredientsPage from './pages/IngredientsPage';
import MenuPage from './pages/MenuPage';
import FavouritesPage from './pages/FavouritesPage';

const App = () => {

  return (
    <Routes>
      <Route path = '/' element = {<HomePage/>}></Route>
      <Route path = '/recipes' element = {<RecipesPage/>}></Route>
      <Route path = '/recipes/:id' element = {<RecipeInfoPage/>}></Route>
      <Route path = '/menu' element = {<MenuPage/>}></Route>
      <Route path = '/ingredients' element = {<IngredientsPage/>}></Route>
      <Route path = '/favourites' element = {<FavouritesPage/>}></Route>
    </Routes>
  );
};

export default App;