import React, {useEffect} from 'react';
// import { useSearchRecipesQuery } from './store/spoonacularApi/spooncular.api';
import {Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import RecipesPage from './pages/RecipesPage';
import ProductsPage from './pages/ProductsPage';
import MenuPage from './pages/MenuPage';
// import { useLazyGetRecipeInfoQuery, useLazySearchRecipesQuery } from './store/spoonacularApi/recipes.api';
// import { useSearchMenuQuery } from './store/spoonacularApi/menu.api';
// import { useSearchProductsQuery } from './store/spoonacularApi/products.api';
import FavouritesPage from './pages/FavouritesPage';

const App = () => {

  // const {data} = useSearchRecipesQuery('')
  // const [fetchRecipeInfo, {data}] = useLazyGetRecipeInfoQuery()
  // useEffect(() => {
  //   // fetchRecipeInfo('716429')
  // }, [data])

  return (
    <Routes>
      <Route path = '/' element = {<HomePage/>}></Route>
      <Route path = '/recipes' element = {<RecipesPage/>}></Route>
      <Route path = '/products' element = {<ProductsPage/>}></Route>
      <Route path = '/menu' element = {<MenuPage/>}></Route>
      <Route path = '/favourites' element = {<FavouritesPage/>}></Route>
    </Routes>
  );
};

export default App;