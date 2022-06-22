import { ChefInterface } from './chef-interface';
import { DishInterface } from './dish-interface';

export interface RestaurantInterface {
  _id: string;
  name: string;
  img: string;
  isOpen: boolean;
  isPopular: boolean;
  isNewRest: boolean;
  chef: any;
  signatureDish: any;
}
