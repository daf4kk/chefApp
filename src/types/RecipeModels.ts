export interface IRecipe {
    id: number;
    title: string;
    image: string;
    imageType: string;
}

export interface RecipesResponse {
    results: IRecipe[];
    offset: number;
    number: number;
    totalResults: number;
}

export interface RandomRecipesResponse{
    recipes: IRecipe[]
}
// RecipeInfo
interface Us {
    amount: number;
    unitShort: string;
    unitLong: string;
}

interface Metric {
    amount: number;
    unitShort: string;
    unitLong: string;
}
interface Measures {
    us: Us;
    metric: Metric;
}

interface ExtendedIngredient {
    id: number;
    aisle: string;
    image: string;
    consistency: string;
    name: string;
    nameClean: string;
    original: string;
    originalName: string;
    amount: number;
    unit: string;
    meta: string[];
    measures: Measures;
}

interface WinePairing {
    pairedWines: any[];
    pairingText: string;
    productMatches: any[];
}

export interface RecipeInfo {
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
    dairyFree: boolean;
    veryHealthy: boolean;
    cheap: boolean;
    veryPopular: boolean;
    sustainable: boolean;
    lowFodmap: boolean;
    weightWatcherSmartPoints: number;
    gaps: string;
    preparationMinutes: number;
    cookingMinutes: number;
    aggregateLikes: number;
    healthScore: number;
    creditsText: string;
    license: string;
    sourceName: string;
    pricePerServing: number;
    extendedIngredients: ExtendedIngredient[];
    id: number;
    title: string;
    readyInMinutes: number;
    servings: number;
    sourceUrl: string;
    image: string;
    imageType: string;
    summary: string;
    cuisines: any[];
    dishTypes: string[];
    diets: any[];
    occasions: any[];
    winePairing: WinePairing;
    instructions: string;
    analyzedInstructions: any[];
    originalId?: any;
    spoonacularSourceUrl: string;

}

export interface Temperature {
    number: number;
    unit: string;
}

export interface Equipment {
    id: number;
    image: string;
    name: string;
    temperature: Temperature;
}

export interface Ingredient {
    id: number;
    image: string;
    name: string;
}

export interface Length {
    number: number;
    unit: string;
}

export interface Step {
    equipment: Equipment[];
    ingredients: Ingredient[];
    number: number;
    step: string;
    length: Length;
}

export interface RecipeInstruction {
    name: string;
    steps: Step[];
}