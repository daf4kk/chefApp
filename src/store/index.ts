import { ingredientReducer } from './reducers/favIngredients.slice';
import { menuReducer } from './reducers/favMenu.slice';
import {recipeReducer} from './reducers/favRecipes.slice'
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { spooncularApi } from "./spoonacularApi/spooncular.api";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    blacklist: [spooncularApi.reducerPath]
}
const rootReducer = combineReducers({
    favRecipes: recipeReducer,
    favMenu: menuReducer,
    favIngredients: ingredientReducer,
    [spooncularApi.reducerPath]: spooncularApi.reducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultWiddleWare => getDefaultWiddleWare({
        serializableCheck:{
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    }).concat(spooncularApi.middleware)
})

export const persistor = persistStore(store)


export type RootState = ReturnType<typeof store.getState>   //Для удобства работы с данными в store