import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DishService } from 'src/app/services/dish.service';
import { DishInterface } from 'src/app/interfaces/dish-interface';
import { RestaurantInterface } from 'src/app/interfaces/restaurant-interface';
import { RestaurantsService } from 'src/app/services/restaurants.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss'],
})
export class DishesComponent implements OnInit, OnChanges {
  showAddModal: boolean = false;
  showUpdateModal: boolean = false;
  dishToUpdate: DishInterface = {
    _id: '',
    name: '',
    img: '',
    description: '',
    price: 0,
    isSpicy: false,
    isVegan: false,
    isVegi: false,
    restaurantRef: '',
  };
  displayedColumns: string[] = [
    'img',
    'name',
    'description',
    'restaurantRef',
    'isSpicy',
    'isVegi',
    'isVegan',
    'price',
    'actions',
  ];
  dataSource: DishInterface[] = [];
  rests: RestaurantInterface[] = [];

  constructor(
    private dishtService: DishService,
    private restService: RestaurantsService,
    private toast: HotToastService
  ) {
    this.fetchAllDishes();
    this.fetchRestaurants();
  }

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    this.fetchAllDishes();
    this.fetchRestaurants();
  }

  openAddForm(): void {
    this.showUpdateModal = false;
    this.showAddModal = true;
  }

  closeAddForm(): void {
    this.showAddModal = false;
  }
  openUpdateForm(): void {
    this.showAddModal = false;
    this.showUpdateModal = true;
  }

  closeUpdateForm(): void {
    this.showUpdateModal = false;
  }

  fetchRestaurants() {
    this.restService.getRestaurants().subscribe((rests) => {
      this.rests = rests;
      // console.log(dishes);
    });
  }

  fetchAllDishes() {
    this.dishtService.getDishes().subscribe((dishes) => {
      this.dataSource = dishes;
      // console.log(dishes);
    });
  }

  deleteDishById(id: string) {
    this.dishtService.deleteById(id).subscribe((response: any) => {
      if(response.name){
        this.toast.success(`${response.name} Deleted!!`);
      }
      this.fetchAllDishes(); // fetch the new dishes again
    });
  }

  updateDish(updatedDish: DishInterface) {
    // console.log(updatedDish);
    // console.log(typeof updatedDish.isSpicy)
    this.dishToUpdate = updatedDish;
    // console.log(this.dishToUpdate);
    this.showAddModal = false;
    this.showUpdateModal = true;
  }
}
