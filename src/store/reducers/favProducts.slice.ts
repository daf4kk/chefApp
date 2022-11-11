import { IProduct } from './../../types/ProductModels';
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ProductState{
    favProducts: IProduct[]
}

const initialState: ProductState = {
    favProducts: [] 
}

export const ProductsSlice = createSlice({  
    name: 'favProducts',
    initialState,
    reducers: {
        addFavProduct(state, action:PayloadAction<IProduct>){ 
            state.favProducts.push(action.payload);  
        },
        removeFavProduct(state, action: PayloadAction<IProduct>){
            state.favProducts = state.favProducts.filter(f => f.id !== action.payload.id)
        },
        clearProductsState(state){
            state.favProducts = []
        }
    }
})

export const productActions = ProductsSlice.actions
export const productReducer = ProductsSlice.reducer