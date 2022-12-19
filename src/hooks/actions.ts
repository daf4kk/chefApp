import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux"
import {recipeActions} from '../store/reducers/favRecipes.slice';
import { menuActions } from './../store/reducers/favMenu.slice';
import { ingredientActions } from "../store/reducers/favIngredients.slice";


const actions = {
    ...recipeActions,
    ...menuActions,
    ...ingredientActions
}

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(actions, dispatch)
}