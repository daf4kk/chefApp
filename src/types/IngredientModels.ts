export interface IIngredient {
    id: number;
    name: string;
    image: string;
}

export interface IngredientResponse {
    results: IIngredient[];
    offset: number;
    number: number;
    totalResults: number;
}

export interface EstimatedCost {
    value: number;
    unit: string;
}

export interface Nutrient {
    name: string;
    amount: number;
    unit: string;
    percentOfDailyNeeds: number;
}

export interface Property {
    name: string;
    amount: number;
    unit: string;
}

export interface Flavonoid {
    name: string;
    amount: number;
    unit: string;
}

export interface CaloricBreakdown {
    percentProtein: number;
    percentFat: number;
    percentCarbs: number;
}

export interface WeightPerServing {
    amount: number;
    unit: string;
}

export interface Nutrition {
    nutrients: Nutrient[];
    properties: Property[];
    flavonoids: Flavonoid[];
    caloricBreakdown: CaloricBreakdown;
    weightPerServing: WeightPerServing;
}

export interface IngredientInfo {
    id: number;
    original: string;
    originalName: string;
    name: string;
    amount: number;
    unit: string;
    unitShort: string;
    unitLong: string;
    possibleUnits: string[];
    estimatedCost: EstimatedCost;
    consistency: string;
    shoppingListUnits: string[];
    aisle: string;
    image: string;
    meta: any[];
    nutrition: Nutrition;
    categoryPath: string[];
}

//////

export interface Metric {
    amount: number;
    unitLong: string;
    unitShort: string;
}

export interface Us {
    amount: number;
    unitLong: string;
    unitShort: string;
}

export interface Measures {
    metric: Metric;
    us: Us;
}

export interface RecipePageIngredient {
    aisle: string;
    amount: number;
    id: number;
    image: string;
    measures: Measures;
    meta: any[];
    name: string;
    original: string;
    originalName: string;
    unit: string;
}



