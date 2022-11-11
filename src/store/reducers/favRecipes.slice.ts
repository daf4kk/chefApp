import { IRecipe } from '../../types/RecipeModels';
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface RecipeState{
    favRecipes: IRecipe[]
}

const initialState: RecipeState = {
    favRecipes: [] 
}

export const RecipeSlice = createSlice({  
    name: 'favRecipes',
    initialState,
    reducers: {
        addFavRecipe(state, action:PayloadAction<IRecipe>){ 
            state.favRecipes.push(action.payload);  
        },
        removeFavRecipe(state, action: PayloadAction<IRecipe>){
            state.favRecipes = state.favRecipes.filter(f => f.id !== action.payload.id)
        },
        clearRecipeState(state){
            state.favRecipes = []
        }
    }
})

export const recipeActions = RecipeSlice.actions
export const recipeReducer = RecipeSlice.reducer