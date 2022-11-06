import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux"
// import { githubActions } from "../store/github/github.slice"; 
import {recipeActions} from '../store/reducers/favRecipes.slice'


const actions = {
    ...recipeActions,
}

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(actions, dispatch)
}