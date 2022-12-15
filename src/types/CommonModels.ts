export interface RecipeQuery{
    query: string,
    params: RecipeParams
}

export interface RecipeParams{
    diet: string[] | [],
    type: string[] | [],
    maxReadyTime: number | null
}

export interface MenuQuery{
    query: string,
    params: null
}

// export interface MenuParams{
//     [key: string]: number | null
// }
// minCalories: null,
//             maxCalories: null,
//             minCarbs: null,
//             maxCarbs: null,
//             minProtein: null,
//             maxProtein: null,
//             minFat: null,
//             maxFat: null,


export interface IngredientQuery{
    query: string,
    params: IngredientParams
}
export interface IngredientParams{
    minProteinPercent: number | null,
    maxProteinPercent: number | null,
    minFatPercent: number | null,
    maxFatPercent: number | null,
    minCarbsPercent: number | null,
    maxCarbsPercent: number | null,
    intolerances: null | string | number
}

// export interface IQuery{
//     query: string,
//     params: MenuParams | RecipeParams | ProductParams по какой то причине выдаёт ошибку
// }
export interface ModalProps{
    id: number,
    imageUrl: string
}
