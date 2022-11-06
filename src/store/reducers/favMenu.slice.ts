import { IMenu } from './../../types/MenuModels';
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface MenuState{
    favMenu: IMenu[]
}

const initialState: MenuState = {
    favMenu: [] 
}

export const MenuSlice = createSlice({  
    name: 'favMenu',
    initialState,
    reducers: {
        addFavMenu(state, action:PayloadAction<IMenu>){ 
            state.favMenu.push(action.payload);  
        },
        removeFavMenu(state, action: PayloadAction<IMenu>){
            state.favMenu = state.favMenu.filter(f => f.id !== action.payload.id)
        }
    }
})

export const menuActions = MenuSlice.actions
export const menuReducer = MenuSlice.reducer