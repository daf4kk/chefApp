import { IIngredient } from '../../types/IngredientModels';
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface IngredientsState{
    favIngredients: IIngredient[]
}

const initialState: IngredientsState = {
    favIngredients: [] 
}

export const IngredientSlice = createSlice({  
    name: 'favIngredients',
    initialState,
    reducers: {
        addFavIngredient(state, action:PayloadAction<IIngredient>){ 
            state.favIngredients.push(action.payload);  
        },
        removeFavIngredient(state, action: PayloadAction<IIngredient>){
            state.favIngredients = state.favIngredients.filter(f => f.id !== action.payload.id)
        },
        clearIngredientsState(state){
            state.favIngredients = []
        }
    }
})

export const ingredientActions = IngredientSlice.actions
export const ingredientReducer = IngredientSlice.reducer