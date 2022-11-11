import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux"
// import { githubActions } from "../store/github/github.slice"; 
import {recipeActions} from '../store/reducers/favRecipes.slice';
import { menuActions } from './../store/reducers/favMenu.slice';
import { productActions } from "../store/reducers/favProducts.slice";


const actions = {
    ...recipeActions,
    ...menuActions,
    ...productActions
}

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(actions, dispatch)
}