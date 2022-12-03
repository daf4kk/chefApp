export interface Servings {
    number: number;
    size: number;
    unit: string;
}

export interface IMenu {
    id: number;
    title: string;
    restaurantChain: string;
    image: string;
    imageType: string;
    servings: Servings;
}

export interface MenuResponse {
    menuItems: IMenu[];
    totalMenuItems: number;
    type: string;
    offset: number;
    number: number;
}
export interface Nutrient {
    name: string;
    amount: number;
    unit: string;
    percentOfDailyNeeds: number;
}

export interface CaloricBreakdown {
    percentProtein: number;
    percentFat: number;
    percentCarbs: number;
}

export interface Nutrition {
    nutrients: Nutrient[];
    caloricBreakdown: CaloricBreakdown;
}

export interface Servings {
    number: number;
    size: number;
    unit: string;
}

export interface MenuItem {
    id: number;
    title: string;
    restaurantChain: string;
    nutrition: Nutrition;
    badges: any[];
    breadcrumbs: string[];
    generatedText?: any;
    imageType: string;
    likes: number;
    servings: Servings;
    price?: any;
    spoonacularScore?: any;
}

export interface MenuModalProps{
    id: number,
    imageUrl: string
}




