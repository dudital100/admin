import { RestaurantInterface } from "./restaurant-interface";

export interface DishInterface {
    _id: string;
    name: string;
    img: string;
    price: number;
    description: string;
    isSpicy: boolean;
    isVegan: boolean;
    isVegi: boolean;
    restaurantRef: any;
}
